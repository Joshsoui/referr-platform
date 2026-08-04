import { promises as fs } from "fs";
import path from "path";

export type ShareChannel =
  | "whatsapp"
  | "linkedin"
  | "facebook"
  | "instagram"
  | "copy"
  | "native";

export interface ChallengeShareRecord {
  id: string;
  challengeId: string;
  userId: string | null;
  channel: ShareChannel;
  shareToken: string;
  clickCount: number;
  clickedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ShareStore {
  shares: ChallengeShareRecord[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const SHARES_FILE = path.join(DATA_DIR, "challenge-shares.json");

async function readStore(): Promise<ShareStore> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(SHARES_FILE, "utf8");
    return JSON.parse(raw) as ShareStore;
  } catch {
    const empty: ShareStore = { shares: [] };
    await fs.writeFile(SHARES_FILE, JSON.stringify(empty, null, 2), "utf8");
    return empty;
  }
}

async function saveStore(store: ShareStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(SHARES_FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function createChallengeShare(input: {
  challengeId: string;
  userId: string | null;
  channel: ShareChannel;
}): Promise<ChallengeShareRecord> {
  const store = await readStore();
  const now = new Date().toISOString();
  const record: ChallengeShareRecord = {
    id: crypto.randomUUID(),
    challengeId: input.challengeId,
    userId: input.userId,
    channel: input.channel,
    shareToken: crypto.randomUUID().replace(/-/g, ""),
    clickCount: 0,
    clickedAt: null,
    createdAt: now,
    updatedAt: now,
  };
  store.shares.push(record);
  await saveStore(store);
  return record;
}

export async function registerShareClick(
  token: string
): Promise<ChallengeShareRecord | null> {
  const store = await readStore();
  const share = store.shares.find((item) => item.shareToken === token);
  if (!share) return null;
  share.clickCount += 1;
  share.clickedAt = new Date().toISOString();
  share.updatedAt = share.clickedAt;
  await saveStore(store);
  return share;
}

export async function findShareByToken(
  token: string
): Promise<ChallengeShareRecord | null> {
  const store = await readStore();
  return store.shares.find((item) => item.shareToken === token) ?? null;
}
