import { LEVEL_DEFINITIONS } from "@/lib/mockLevels";
import { applyCashLevelBonus, formatCurrency, getLevelForXp } from "@/lib/xp";
import type { VacancyDifficulty } from "@/types/vacancy";

export interface DifficultyCashRewards {
  intake: number;
  match: number;
  keeper: number;
  total: number;
}

export const DIFFICULTY_CASH_REWARDS: Record<
  VacancyDifficulty,
  DifficultyCashRewards
> = {
  easy: { intake: 25, match: 150, keeper: 350, total: 525 },
  hard: { intake: 25, match: 250, keeper: 450, total: 725 },
  expert: { intake: 25, match: 350, keeper: 550, total: 925 },
};

export const DIFFICULTY_META: Record<
  VacancyDifficulty,
  { label: string; emoji: string; badgeClass: string }
> = {
  easy: {
    label: "Easy",
    emoji: "🟢",
    badgeClass: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  hard: {
    label: "Hard",
    emoji: "🟣",
    badgeClass: "bg-purple-50 text-purple-800 border-purple-200",
  },
  expert: {
    label: "Expert",
    emoji: "🔴",
    badgeClass: "bg-red-50 text-red-800 border-red-200",
  },
};

export const KEEPER_BONUS = {
  title: "🏆 Keeper Bonus",
  description:
    "De grootste beloning ontvang je wanneer jouw kandidaat na 1 maand nog succesvol werkzaam is.",
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

export function getIntakeReward(difficulty: VacancyDifficulty = "easy"): number {
  return getDifficultyRewards(difficulty).intake;
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
  return `Match ${formatCurrency(rewards.match)} · Keeper ${formatCurrency(rewards.keeper)}`;
}
