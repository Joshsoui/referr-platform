import { LEVEL_DEFINITIONS } from "@/lib/mockLevels";
import { applyCashLevelBonus, formatCurrency, getLevelForXp } from "@/lib/xp";
import type { VacancyDifficulty } from "@/types/vacancy";

export interface DifficultyCashRewards {
  /** @deprecated Gesprekbeloning uitgeschakeld — altijd 0 */
  intake: number;
  match: number;
  keeper: number;
  total: number;
}

export const DIFFICULTY_CASH_REWARDS: Record<
  VacancyDifficulty,
  DifficultyCashRewards
> = {
  // Alleen plaatsing + retentie (na 2 maanden). Geen gesprekbeloning.
  easy: { intake: 0, match: 175, keeper: 350, total: 525 },
  hard: { intake: 0, match: 275, keeper: 450, total: 725 },
  expert: { intake: 0, match: 375, keeper: 550, total: 925 },
};

export const DIFFICULTY_META: Record<
  VacancyDifficulty,
  { label: string; emoji: string; badgeClass: string }
> = {
  easy: {
    label: "Makkelijk",
    emoji: "🟢",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  hard: {
    label: "Uitdagend",
    emoji: "🟣",
    badgeClass: "bg-purple-50 text-purple-800 border-purple-200",
  },
  expert: {
    label: "Specialist",
    emoji: "🔴",
    badgeClass: "bg-red-50 text-red-800 border-red-200",
  },
};

export const KEEPER_BONUS = {
  title: "Retentiebeloning",
  description:
    "De grootste beloning ontvang je wanneer jouw kandidaat na 2 maanden nog succesvol in dienst is.",
};

export const PLACEMENT_REWARD = {
  title: "Plaatsingsbeloning",
  description:
    "Je ontvangt een beloning wanneer jouw tip succesvol wordt aangenomen.",
};

export function getDifficultyRewards(
  difficulty: VacancyDifficulty = "easy"
): DifficultyCashRewards {
  return DIFFICULTY_CASH_REWARDS[difficulty];
}

export function getLevelCashBonusPercent(xp: number): number {
  const level = getLevelForXp(xp);
  const definition = LEVEL_DEFINITIONS.find((item) => item.name === level.name);
  return definition?.cashBonusPercent ?? 0;
}

/** Gesprekbeloning is uitgeschakeld. */
export function getIntakeReward(_difficulty: VacancyDifficulty = "easy"): number {
  return 0;
}

export function getMatchReward(
  difficulty: VacancyDifficulty = "easy",
  finderXp = 0
): number {
  const base = getDifficultyRewards(difficulty).match;
  return applyCashLevelBonus(base, getLevelCashBonusPercent(finderXp));
}

export function getKeeperBonusReward(
  difficulty: VacancyDifficulty = "easy",
  finderXp = 0
): number {
  const base = getDifficultyRewards(difficulty).keeper;
  return applyCashLevelBonus(base, getLevelCashBonusPercent(finderXp));
}

export function formatDifficultyRewardSummary(
  difficulty: VacancyDifficulty
): string {
  const rewards = getDifficultyRewards(difficulty);
  return `Plaatsing ${formatCurrency(rewards.match)} · Retentie ${formatCurrency(rewards.keeper)}`;
}
