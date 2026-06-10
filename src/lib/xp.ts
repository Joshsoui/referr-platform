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
  nieuw: "Talent getipt",
  intake_gepland: "Intake gepland",
  voorgesteld: "Voorgesteld",
  geplaatst: "Succesvolle match",
  proeftijd_gehaald: "Keeper Status behaald",
};

export const KEEPER_STATUS = {
  title: "🏆 Keeper Status Behaald",
  description:
    "Het talent werkt inmiddels één maand succesvol via Finderz Keeperz.",
  xpReward: 1000,
  cashReward: 250,
};

export interface Level {
  name: string;
  minXp: number;
  maxXp: number;
}

export const LEVELS: Level[] = [
  { name: "Finder", minXp: 0, maxXp: 499 },
  { name: "Senior Finder", minXp: 500, maxXp: 1499 },
  { name: "Elite Finder", minXp: 1500, maxXp: 4999 },
  { name: "Master Finder", minXp: 5000, maxXp: 9999 },
  { name: "Finderz Legend", minXp: 10000, maxXp: Infinity },
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
  xpTarget: number | null;
} {
  const current = getLevelForXp(xp);
  const currentIndex = LEVELS.indexOf(current);
  const next = currentIndex < LEVELS.length - 1 ? LEVELS[currentIndex + 1] : null;

  if (!next) {
    return {
      current,
      next: null,
      progress: 100,
      xpToNext: 0,
      xpTarget: null,
    };
  }

  const range = next.minXp - current.minXp;
  const earned = xp - current.minXp;
  const progress = Math.min(100, Math.round((earned / range) * 100));
  const xpToNext = next.minXp - xp;

  return { current, next, progress, xpToNext, xpTarget: next.minXp };
}

export function formatLevelXpProgress(xp: number): string {
  const { xpTarget } = getLevelProgress(xp);
  if (!xpTarget) {
    return `${xp.toLocaleString("nl-NL")} XP`;
  }
  return `${xp.toLocaleString("nl-NL")} / ${xpTarget.toLocaleString("nl-NL")} XP`;
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

export function applyCashLevelBonus(
  baseAmount: number,
  cashBonusPercent: number
): number {
  return Math.round(baseAmount * (1 + cashBonusPercent / 100));
}
