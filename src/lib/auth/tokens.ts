import { promises as fs } from "fs";
import path from "path";
import { createHash, randomBytes } from "crypto";

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

const DATA_DIR = path.join(process.cwd(), ".data");
const TOKENS_FILE = path.join(DATA_DIR, "tokens.json");

const EXPIRY_MS: Record<TokenPurpose, number> = {
  email_verify: 1000 * 60 * 60 * 24,
  password_reset: 1000 * 60 * 30,
};

async function ensureStore(): Promise<TokenStore> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(TOKENS_FILE, "utf8");
    return JSON.parse(raw) as TokenStore;
  } catch {
    const empty: TokenStore = { tokens: [] };
    await fs.writeFile(TOKENS_FILE, JSON.stringify(empty, null, 2), "utf8");
    return empty;
  }
}

async function saveStore(store: TokenStore): Promise<void> {
  await fs.writeFile(TOKENS_FILE, JSON.stringify(store, null, 2), "utf8");
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createToken(
  userId: string,
  purpose: TokenPurpose
): Promise<{ token: string; expiresAt: string }> {
  const store = await ensureStore();
  const now = Date.now();

  // Invalidate previous unused tokens for same purpose
  store.tokens = store.tokens.map((t) =>
    t.userId === userId && t.purpose === purpose && !t.usedAt
      ? { ...t, usedAt: new Date().toISOString() }
      : t
  );

  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(now + EXPIRY_MS[purpose]).toISOString();
  store.tokens.push({
    id: crypto.randomUUID(),
    userId,
    purpose,
    tokenHash: hashToken(token),
    expiresAt,
    usedAt: null,
    createdAt: new Date().toISOString(),
  });
  await saveStore(store);
  return { token, expiresAt };
}

export async function consumeToken(
  token: string,
  purpose: TokenPurpose
): Promise<{ userId: string } | { error: "invalid" | "expired" | "used" }> {
  const store = await ensureStore();
  const tokenHash = hashToken(token);
  const record = store.tokens.find(
    (t) => t.tokenHash === tokenHash && t.purpose === purpose
  );

  if (!record) return { error: "invalid" };
  if (record.usedAt) return { error: "used" };
  if (new Date(record.expiresAt).getTime() < Date.now()) {
    return { error: "expired" };
  }

  record.usedAt = new Date().toISOString();
  await saveStore(store);
  return { userId: record.userId };
}
