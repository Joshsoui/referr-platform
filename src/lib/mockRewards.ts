import { DIFFICULTY_CASH_REWARDS } from "@/lib/vacancyRewards";

export const XP_TIMELINE = [
  { action: "Introductie verstuurd", xp: 10, icon: "👤" },
  { action: "Sterke introductie", xp: 25, icon: "✨", isBonus: true },
  { action: "Eerste gesprek gepland", xp: 50, icon: "📅" },
  { action: "Voorstel gedaan", xp: 100, icon: "📋" },
  { action: "Kandidaat aangenomen", xp: 500, icon: "🎯" },
  { action: "Succesvolle plaatsing", xp: 1000, icon: "🏆", highlight: true },
];

export const XP_REWARDS = [
  { action: "Introductie verstuurd", xp: 10 },
  { action: "Sterke introductie (kwaliteit 70+)", xp: 25, isBonus: true },
  { action: "Eerste gesprek gepland", xp: 50 },
  { action: "Voorstel gedaan", xp: 100 },
  { action: "Kandidaat aangenomen", xp: 500 },
  { action: "Succesvolle plaatsing", xp: 1000, highlight: true },
];

export const CASH_REWARDS = [
  { action: "Alleen introductie verstuurd", cash: 0, note: "Geen beloning" },
  { action: "Gesprek bereikt", cash: 25, note: "Vast bedrag" },
  { action: "Plaatsingsbeloning", cash: null, note: "Afhankelijk van vacature" },
  { action: "Retentiebeloning", cash: null, note: "Afhankelijk van vacature", highlight: true },
];

export const MAX_CASH_PER_CANDIDATE = DIFFICULTY_CASH_REWARDS.expert.total;

export const LEVEL_CASH_MULTIPLIERS = [
  { level: "Nieuwe verbinder", bonus: "0%", percent: 0 },
  { level: "Betrouwbare verbinder", bonus: "+2%", percent: 2 },
  { level: "Talentkenner", bonus: "+5%", percent: 5 },
  { level: "Topverbinder", bonus: "+7.5%", percent: 7.5 },
  { level: "Netwerkleider", bonus: "+10%", percent: 10 },
];

export const CASH_BONUS_NOTE =
  "Reputatiebonus geldt op plaatsings- en retentiebeloning. Niet op de beloning voor een eerste gesprek.";

export const INITIAL_REWARD_SUMMARY = {
  cashEarned: 1250,
  cashPending: 250,
  nextRewardHint: "Plaatsingsbeloning bij Kevin de Vries (makkelijke vacature)",
};

export const CONFIDENCE_BONUS_XP = 25;
export const CONFIDENCE_BONUS_THRESHOLD = 70;
