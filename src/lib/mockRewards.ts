import { DIFFICULTY_CASH_REWARDS } from "@/lib/vacancyRewards";

export const XP_TIMELINE = [
  { action: "Talent Tip", xp: 10, icon: "👤" },
  { action: "Sterke Tip", xp: 25, icon: "✨", isBonus: true },
  { action: "Intake Gepland", xp: 50, icon: "📅" },
  { action: "Voorgesteld", xp: 100, icon: "📋" },
  { action: "Succesvolle Match", xp: 500, icon: "🎯" },
  { action: "Keeper Status", xp: 1000, icon: "🏆", highlight: true },
];

export const XP_REWARDS = [
  { action: "Talent getipt", xp: 10 },
  { action: "Sterke tip (Talent Confidence 70+)", xp: 25, isBonus: true },
  { action: "Intake gepland", xp: 50 },
  { action: "Voorgesteld", xp: 100 },
  { action: "Succesvolle match", xp: 500 },
  { action: "Keeper Status behaald", xp: 1000, highlight: true },
];

export const CASH_REWARDS = [
  { action: "Alleen talent getipt", cash: 0, note: "Geen cash" },
  { action: "Intake Reward", cash: 25, note: "Vast, geen level bonus" },
  { action: "Match Reward", cash: null, note: "Afhankelijk van difficulty" },
  { action: "🏆 Keeper Bonus", cash: null, note: "Afhankelijk van difficulty", highlight: true },
];

export const MAX_CASH_PER_CANDIDATE = DIFFICULTY_CASH_REWARDS.expert.total;

export const LEVEL_CASH_MULTIPLIERS = [
  { level: "Finder", bonus: "0%", percent: 0 },
  { level: "Senior Finder", bonus: "+2%", percent: 2 },
  { level: "Elite Finder", bonus: "+5%", percent: 5 },
  { level: "Master Finder", bonus: "+7.5%", percent: 7.5 },
  { level: "Finderz Legend", bonus: "+10%", percent: 10 },
];

export const CASH_BONUS_NOTE =
  "Level bonus geldt uitsluitend op Match Reward en Keeper Bonus. Niet op Intake Reward of XP.";

export const INITIAL_REWARD_SUMMARY = {
  cashEarned: 1250,
  cashPending: 250,
  nextRewardHint: "Match Reward bij Kevin de Vries (Easy vacature)",
};

export const CONFIDENCE_BONUS_XP = 25;
export const CONFIDENCE_BONUS_THRESHOLD = 70;
