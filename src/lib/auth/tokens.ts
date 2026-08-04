import { createHash, randomBytes } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { getDataDir } from "@/lib/dataDir";
import { getPrisma, hasDatabase } from "@/lib/db";
import type { TokenPurpose as PrismaTokenPurpose } from "@prisma/client";

export type TokenPurpose = "email_verify" | "password_reset";

interface TokenRecord {
  id: string;
  userId: string;
  purpose: TokenPurpose;
  tokenHash: string;
  expiresAt: string;
  usedAt: string | null;
  createdAt: string;
}

interface TokenStore {
  tokens: TokenRecord[];
}

function tokensFile() {
  return path.join(getDataDir(), "tokens.json");
}

const EXPIRY_MS: Record<TokenPurpose, number> = {
  email_verify: 1000 * 60 * 60 * 24,
  password_reset: 1000 * 60 * 30,
};

async function ensureFileStore(): Promise<TokenStore> {
  await fs.mkdir(getDataDir(), { recursive: true });
  try {
    const raw = await fs.readFile(tokensFile(), "utf8");
    return JSON.parse(raw) as TokenStore;
  } catch {
    const empty: TokenStore = { tokens: [] };
    await fs.writeFile(tokensFile(), JSON.stringify(empty, null, 2), "utf8");
    return empty;
  }
}

async function saveFileStore(store: TokenStore): Promise<void> {
  await fs.mkdir(getDataDir(), { recursive: true });
  await fs.writeFile(tokensFile(), JSON.stringify(store, null, 2), "utf8");
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createToken(
  userId: string,
  purpose: TokenPurpose
): Promise<{ token: string; expiresAt: string }> {
  const now = Date.now();
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(now + EXPIRY_MS[purpose]);

  if (hasDatabase()) {
    const prisma = getPrisma();
    await prisma.authToken.updateMany({
      where: { userId, purpose: purpose as PrismaTokenPurpose, usedAt: null },
      data: { usedAt: new Date() },
    });
    await prisma.authToken.create({
      data: {
        userId,
        purpose: purpose as PrismaTokenPurpose,
        tokenHash: hashToken(token),
        expiresAt,
      },
    });
    return { token, expiresAt: expiresAt.toISOString() };
  }

  const store = await ensureFileStore();
  store.tokens = store.tokens.map((t) =>
    t.userId === userId && t.purpose === purpose && !t.usedAt
      ? { ...t, usedAt: new Date().toISOString() }
      : t
  );
  store.tokens.push({
    id: crypto.randomUUID(),
    userId,
    purpose,
    tokenHash: hashToken(token),
    expiresAt: expiresAt.toISOString(),
    usedAt: null,
    createdAt: new Date().toISOString(),
  });
  await saveFileStore(store);
  return { token, expiresAt: expiresAt.toISOString() };
}

export async function consumeToken(
  token: string,
  purpose: TokenPurpose
): Promise<{ userId: string } | { error: "invalid" | "expired" | "used" }> {
  const tokenHash = hashToken(token);

  if (hasDatabase()) {
    const record = await getPrisma().authToken.findFirst({
      where: { tokenHash, purpose: purpose as PrismaTokenPurpose },
    });
    if (!record) return { error: "invalid" };
    if (record.usedAt) return { error: "used" };
    if (record.expiresAt.getTime() < Date.now()) return { error: "expired" };
    await getPrisma().authToken.update({
      where: { id: record.id },
      data: { usedAt: new Date() },
    });
    return { userId: record.userId };
  }

  const store = await ensureFileStore();
  const record = store.tokens.find(
    (t) => t.tokenHash === tokenHash && t.purpose === purpose
  );
  if (!record) return { error: "invalid" };
  if (record.usedAt) return { error: "used" };
  if (new Date(record.expiresAt).getTime() < Date.now()) {
    return { error: "expired" };
  }
  record.usedAt = new Date().toISOString();
  await saveFileStore(store);
  return { userId: record.userId };
}
