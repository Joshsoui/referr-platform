export const XP_REWARDS = [
  { action: "Kandidaat aangedragen", xp: 10 },
  { action: "Sterke referral, Scout Confidence 70+", xp: 25, isBonus: true },
  { action: "Intake gepland", xp: 50 },
  { action: "Voorgesteld bij klant", xp: 100 },
  { action: "Succesvolle plaatsing", xp: 500 },
  { action: "Proeftijd gehaald", xp: 1000 },
];

export const CASH_REWARDS = [
  { action: "Alleen aandragen", cash: 0, note: "Geen cash" },
  { action: "Goedgekeurde intake", cash: 25 },
  { action: "Succesvolle plaatsing", cash: 250 },
  { action: "Kandidaat na 1 maand nog werkzaam", cash: 250, note: "Retentiebonus" },
];

export const MAX_CASH_PER_CANDIDATE = 525;

export const LEVEL_CASH_MULTIPLIERS = [
  { level: "Talent Spotter", bonus: "Standaard bonus" },
  { level: "Scout", bonus: "+5% bonus op plaatsingsbonus" },
  { level: "Senior Scout", bonus: "+10% bonus op plaatsingsbonus" },
  { level: "Elite Scout", bonus: "+20% bonus op plaatsingsbonus" },
  { level: "FK Legend", bonus: "+30% bonus op plaatsingsbonus" },
];

export const INITIAL_REWARD_SUMMARY = {
  cashEarned: 1250,
  cashPending: 250,
  nextRewardHint: "€250 bij succesvolle plaatsing van Kevin de Vries",
};

export const CONFIDENCE_BONUS_XP = 25;
export const CONFIDENCE_BONUS_THRESHOLD = 70;
