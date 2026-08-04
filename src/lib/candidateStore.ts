import { promises as fs } from "fs";
import path from "path";
import { getDataDir } from "@/lib/dataDir";
import { INITIAL_CANDIDATES } from "@/lib/mock-data";
import type { Candidate, CandidateFormData, CandidateStatus } from "@/types";
import type {
  CashStatus,
  DuplicateStatus,
  ReferralApproval,
} from "@/types/incentives";
import { calculateConfidenceScore } from "@/lib/scoring";
import { CONFIDENCE_BONUS_THRESHOLD, CONFIDENCE_BONUS_XP } from "@/lib/mockRewards";
import { STATUS_XP } from "@/lib/xp";

interface CandidateStore {
  candidates: Candidate[];
}

function filePath() {
  return path.join(getDataDir(), "candidates.json");
}

async function readStore(): Promise<CandidateStore> {
  const dir = getDataDir();
  await fs.mkdir(dir, { recursive: true });
  const file = filePath();
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as CandidateStore;
    if (!Array.isArray(parsed.candidates)) {
      throw new Error("invalid store");
    }
    return parsed;
  } catch {
    const seeded: CandidateStore = { candidates: [...INITIAL_CANDIDATES] };
    await fs.writeFile(file, JSON.stringify(seeded, null, 2), "utf8");
    return seeded;
  }
}

async function saveStore(store: CandidateStore): Promise<void> {
  const dir = getDataDir();
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath(), JSON.stringify(store, null, 2), "utf8");
}

export async function listCandidates(): Promise<Candidate[]> {
  const store = await readStore();
  return [...store.candidates].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function findCandidateById(id: string): Promise<Candidate | null> {
  const store = await readStore();
  return store.candidates.find((item) => item.id === id) ?? null;
}

export async function createCandidate(input: {
  data: CandidateFormData;
  referrerName: string;
  referredByUserId?: string | null;
  vacancyId?: string;
}): Promise<Candidate> {
  const store = await readStore();
  const confidenceScore = calculateConfidenceScore(input.data);
  let xpAwarded = STATUS_XP.nieuw;
  if (confidenceScore >= CONFIDENCE_BONUS_THRESHOLD) {
    xpAwarded += CONFIDENCE_BONUS_XP;
  }

  const candidate: Candidate = {
    id: crypto.randomUUID(),
    name: input.data.name.trim(),
    emailOrPhone: input.data.emailOrPhone.trim(),
    linkedin: input.data.linkedin?.trim() || undefined,
    role: input.data.sector || input.data.role || "Overig",
    sector: (input.data.sector || "Overig") as Candidate["sector"],
    description: input.data.recommendation || input.data.description || undefined,
    recommendation: input.data.recommendation || undefined,
    reasons: input.data.reasons,
    relationship: (input.data.relationship || "netwerk") as Candidate["relationship"],
    cvUploaded: input.data.cvUploaded,
    referredBy: input.referrerName.trim() || "Onbekend",
    referredByUserId: input.referredByUserId ?? null,
    status: "nieuw",
    xpAwarded,
    confidenceScore,
    cashStatus: "geen_cash",
    duplicateStatus: "uniek",
    referralApproval: "pending",
    vacancyId: input.vacancyId || input.data.vacancyId || undefined,
    createdAt: new Date().toISOString(),
  };

  store.candidates.unshift(candidate);
  await saveStore(store);
  return candidate;
}

export type CandidatePatch = Partial<{
  status: CandidateStatus;
  referralApproval: ReferralApproval;
  cashStatus: CashStatus;
  duplicateStatus: DuplicateStatus;
  vacancyId: string | null;
  xpAwarded: number;
}>;

export async function updateCandidateById(
  id: string,
  patch: CandidatePatch
): Promise<Candidate | null> {
  const store = await readStore();
  const index = store.candidates.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const current = store.candidates[index];
  const updated: Candidate = {
    ...current,
    ...patch,
    vacancyId:
      patch.vacancyId === null
        ? undefined
        : patch.vacancyId !== undefined
          ? patch.vacancyId
          : current.vacancyId,
  };
  store.candidates[index] = updated;
  await saveStore(store);
  return updated;
}
