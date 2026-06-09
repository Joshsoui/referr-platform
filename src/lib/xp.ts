import type { CandidateStatus } from "@/types";

export const STATUS_XP: Record<CandidateStatus, number> = {
  nieuw: 10,
  intake_gepland: 50,
  voorgesteld: 100,
  geplaatst: 500,
  proeftijd_gehaald: 1000,
};

export const STATUS_ORDER: CandidateStatus[] = [
  "nieuw",
  "intake_gepland",
  "voorgesteld",
  "geplaatst",
  "proeftijd_gehaald",
];

export const STATUS_LABELS: Record<CandidateStatus, string> = {
  nieuw: "Nieuw",
  intake_gepland: "Intake gepland",
  voorgesteld: "Voorgesteld",
  geplaatst: "Geplaatst",
  proeftijd_gehaald: "Proeftijd gehaald",
};

export interface Level {
  name: string;
  minXp: number;
  maxXp: number;
}

export const LEVELS: Level[] = [
  { name: "Talent Spotter", minXp: 0, maxXp: 499 },
  { name: "Scout", minXp: 500, maxXp: 1499 },
  { name: "Senior Scout", minXp: 1500, maxXp: 3999 },
  { name: "Elite Scout", minXp: 4000, maxXp: 9999 },
  { name: "FK Legend", minXp: 10000, maxXp: Infinity },
];

export function getLevelForXp(xp: number): Level {
  return (
    LEVELS.find((level) => xp >= level.minXp && xp <= level.maxXp) ??
    LEVELS[LEVELS.length - 1]
  );
}

export function getLevelProgress(xp: number): {
  current: Level;
  next: Level | null;
  progress: number;
  xpToNext: number;
} {
  const current = getLevelForXp(xp);
  const currentIndex = LEVELS.indexOf(current);
  const next = currentIndex < LEVELS.length - 1 ? LEVELS[currentIndex + 1] : null;

  if (!next) {
    return { current, next: null, progress: 100, xpToNext: 0 };
  }

  const range = next.minXp - current.minXp;
  const earned = xp - current.minXp;
  const progress = Math.min(100, Math.round((earned / range) * 100));
  const xpToNext = next.minXp - xp;

  return { current, next, progress, xpToNext };
}

export function getXpForStatusChange(
  oldStatus: CandidateStatus,
  newStatus: CandidateStatus
): number {
  const oldIndex = STATUS_ORDER.indexOf(oldStatus);
  const newIndex = STATUS_ORDER.indexOf(newStatus);
  if (newIndex <= oldIndex) return 0;
  return STATUS_XP[newStatus];
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
