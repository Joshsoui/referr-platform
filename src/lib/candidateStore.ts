import { promises as fs } from "fs";
import path from "path";
import { getDataDir } from "@/lib/dataDir";
import { getPrisma, hasDatabase } from "@/lib/db";
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
import type { Candidate as PrismaCandidate } from "@prisma/client";

interface CandidateStore {
  candidates: Candidate[];
}

function filePath() {
  return path.join(getDataDir(), "candidates.json");
}

function mapCandidate(row: PrismaCandidate): Candidate {
  let reasons: string[] = [];
  try {
    reasons = JSON.parse(row.reasonsJson) as string[];
  } catch {
    reasons = [];
  }
  return {
    id: row.id,
    name: row.name,
    emailOrPhone: row.emailOrPhone,
    linkedin: row.linkedin ?? undefined,
    role: row.role,
    sector: row.sector as Candidate["sector"],
    description: row.description ?? undefined,
    recommendation: row.recommendation ?? undefined,
    reasons,
    relationship: row.relationship as Candidate["relationship"],
    cvUploaded: row.cvUploaded,
    referredBy: row.referredBy,
    referredByUserId: row.referredByUserId,
    status: row.status as CandidateStatus,
    xpAwarded: row.xpAwarded,
    confidenceScore: row.confidenceScore,
    cashStatus: row.cashStatus as CashStatus,
    duplicateStatus: row.duplicateStatus as DuplicateStatus,
    referralApproval: row.referralApproval as ReferralApproval,
    vacancyId: row.vacancyId ?? undefined,
    createdAt: row.createdAt.toISOString(),
  };
}

async function readFileStore(): Promise<CandidateStore> {
  const dir = getDataDir();
  await fs.mkdir(dir, { recursive: true });
  const file = filePath();
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as CandidateStore;
    if (!Array.isArray(parsed.candidates)) throw new Error("invalid store");
    return parsed;
  } catch {
    const seeded: CandidateStore = { candidates: [...INITIAL_CANDIDATES] };
    await fs.writeFile(file, JSON.stringify(seeded, null, 2), "utf8");
    return seeded;
  }
}

async function saveFileStore(store: CandidateStore): Promise<void> {
  await fs.mkdir(getDataDir(), { recursive: true });
  await fs.writeFile(filePath(), JSON.stringify(store, null, 2), "utf8");
}

async function ensureDbSeeded(): Promise<void> {
  const prisma = getPrisma();
  const count = await prisma.candidate.count();
  if (count > 0) return;
  for (const item of INITIAL_CANDIDATES) {
    await prisma.candidate.create({
      data: {
        id: item.id,
        name: item.name,
        emailOrPhone: item.emailOrPhone,
        linkedin: item.linkedin ?? null,
        role: item.role,
        sector: item.sector,
        description: item.description ?? null,
        recommendation: item.recommendation ?? null,
        reasonsJson: JSON.stringify(item.reasons),
        relationship: item.relationship,
        cvUploaded: Boolean(item.cvUploaded),
        referredBy: item.referredBy,
        referredByUserId: item.referredByUserId ?? null,
        status: item.status,
        xpAwarded: item.xpAwarded,
        confidenceScore: item.confidenceScore,
        cashStatus: item.cashStatus,
        duplicateStatus: item.duplicateStatus,
        referralApproval: item.referralApproval,
        vacancyId: item.vacancyId ?? null,
        createdAt: new Date(item.createdAt),
      },
    });
  }
}

export async function listCandidates(): Promise<Candidate[]> {
  if (hasDatabase()) {
    await ensureDbSeeded();
    const rows = await getPrisma().candidate.findMany({
      orderBy: { createdAt: "desc" },
    });
    return rows.map(mapCandidate);
  }
  const store = await readFileStore();
  return [...store.candidates].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function findCandidateById(id: string): Promise<Candidate | null> {
  if (hasDatabase()) {
    await ensureDbSeeded();
    const row = await getPrisma().candidate.findUnique({ where: { id } });
    return row ? mapCandidate(row) : null;
  }
  const store = await readFileStore();
  return store.candidates.find((item) => item.id === id) ?? null;
}

export async function createCandidate(input: {
  data: CandidateFormData;
  referrerName: string;
  referredByUserId?: string | null;
  vacancyId?: string;
}): Promise<Candidate> {
  const confidenceScore = calculateConfidenceScore(input.data);
  let xpAwarded = STATUS_XP.nieuw;
  if (confidenceScore >= CONFIDENCE_BONUS_THRESHOLD) {
    xpAwarded += CONFIDENCE_BONUS_XP;
  }

  const payload = {
    name: input.data.name.trim(),
    emailOrPhone: input.data.emailOrPhone.trim(),
    linkedin: input.data.linkedin?.trim() || null,
    role: input.data.sector || input.data.role || "Overig",
    sector: input.data.sector || "Overig",
    description: input.data.recommendation || input.data.description || null,
    recommendation: input.data.recommendation || null,
    reasonsJson: JSON.stringify(input.data.reasons),
    relationship: input.data.relationship || "netwerk",
    cvUploaded: Boolean(input.data.cvUploaded),
    referredBy: input.referrerName.trim() || "Onbekend",
    referredByUserId: input.referredByUserId ?? null,
    status: "nieuw",
    xpAwarded,
    confidenceScore,
    cashStatus: "geen_cash",
    duplicateStatus: "uniek",
    referralApproval: "pending",
    vacancyId: input.vacancyId || input.data.vacancyId || null,
  };

  if (hasDatabase()) {
    const row = await getPrisma().candidate.create({ data: payload });
    return mapCandidate(row);
  }

  const store = await readFileStore();
  const candidate: Candidate = {
    id: crypto.randomUUID(),
    name: payload.name,
    emailOrPhone: payload.emailOrPhone,
    linkedin: payload.linkedin ?? undefined,
    role: payload.role,
    sector: payload.sector as Candidate["sector"],
    description: payload.description ?? undefined,
    recommendation: payload.recommendation ?? undefined,
    reasons: input.data.reasons,
    relationship: payload.relationship as Candidate["relationship"],
    cvUploaded: payload.cvUploaded,
    referredBy: payload.referredBy,
    referredByUserId: payload.referredByUserId,
    status: "nieuw",
    xpAwarded,
    confidenceScore,
    cashStatus: "geen_cash",
    duplicateStatus: "uniek",
    referralApproval: "pending",
    vacancyId: payload.vacancyId ?? undefined,
    createdAt: new Date().toISOString(),
  };
  store.candidates.unshift(candidate);
  await saveFileStore(store);
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
  if (hasDatabase()) {
    try {
      const row = await getPrisma().candidate.update({
        where: { id },
        data: {
          ...(patch.status ? { status: patch.status } : {}),
          ...(patch.referralApproval
            ? { referralApproval: patch.referralApproval }
            : {}),
          ...(patch.cashStatus ? { cashStatus: patch.cashStatus } : {}),
          ...(patch.duplicateStatus
            ? { duplicateStatus: patch.duplicateStatus }
            : {}),
          ...(patch.vacancyId !== undefined
            ? { vacancyId: patch.vacancyId }
            : {}),
          ...(typeof patch.xpAwarded === "number"
            ? { xpAwarded: patch.xpAwarded }
            : {}),
        },
      });
      return mapCandidate(row);
    } catch {
      return null;
    }
  }

  const store = await readFileStore();
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
  await saveFileStore(store);
  return updated;
}
