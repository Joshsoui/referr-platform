export const XP_REWARDS = [
  { action: "Talent getipt", xp: 10 },
  { action: "Sterke tip (Talent Confidence 70+)", xp: 25, isBonus: true },
  { action: "Intake gepland", xp: 50 },
  { action: "Voorgesteld", xp: 100 },
  { action: "Succesvolle match", xp: 500 },
  { action: "1 maand werkzaam / Keeper-status", xp: 1000 },
];

export const CASH_REWARDS = [
  { action: "Alleen talent getipt", cash: 0, note: "Geen cash" },
  { action: "Succesvolle intake", cash: 25 },
  { action: "Succesvolle match", cash: 250 },
  { action: "Talent na 1 maand nog werkzaam", cash: 250, note: "Keeper-bonus" },
];

export const MAX_CASH_PER_CANDIDATE = 525;

export const LEVEL_CASH_MULTIPLIERS = [
  { level: "Finder", bonus: "Standaard" },
  { level: "Senior Finder", bonus: "+5%" },
  { level: "Elite Finder", bonus: "+10%" },
  { level: "Master Finder", bonus: "+20%" },
  { level: "Finderz Legend", bonus: "+30%" },
];

export const INITIAL_REWARD_SUMMARY = {
  cashEarned: 1250,
  cashPending: 250,
  nextRewardHint: "€250 bij succesvolle match van Kevin de Vries",
};

export const CONFIDENCE_BONUS_XP = 25;
export const CONFIDENCE_BONUS_THRESHOLD = 70;
