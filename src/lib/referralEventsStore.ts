import { promises as fs } from "fs";
import path from "path";
import { getDataDir } from "@/lib/dataDir";

import type { CandidateStatus } from "@/types";
import type { CashStatus } from "@/types/incentives";

export type ReferralEventType =
  | "submitted"
  | "status_update"
  | "reward_update"
  | "approval_update";

export interface ReferralEventRecord {
  id: string;
  candidateId: string;
  userId: string | null;
  candidateName: string;
  type: ReferralEventType;
  status?: CandidateStatus;
  cashStatus?: CashStatus;
  title: string;
  message: string;
  createdAt: string;
}

interface ReferralEventStore {
  events: ReferralEventRecord[];
}

const DATA_DIR = getDataDir();
const FILE = path.join(DATA_DIR, "referral-events.json");

async function readStore(): Promise<ReferralEventStore> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as ReferralEventStore;
  } catch {
    const initial: ReferralEventStore = { events: [] };
    await fs.writeFile(FILE, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
}

async function saveStore(store: ReferralEventStore) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function createReferralEvent(
  input: Omit<ReferralEventRecord, "id" | "createdAt">
) {
  const store = await readStore();
  const event: ReferralEventRecord = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...input,
  };
  store.events.push(event);
  await saveStore(store);
  return event;
}

export async function listReferralEvents(candidateIds?: string[]) {
  const store = await readStore();
  const filtered =
    candidateIds && candidateIds.length > 0
      ? store.events.filter((e) => candidateIds.includes(e.candidateId))
      : store.events;
  return filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

