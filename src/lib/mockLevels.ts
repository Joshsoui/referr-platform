export interface LevelDefinition {
  id: string;
  name: string;
  minXp: number;
  maxXp: number;
  icon: string;
  badgeLabel: string;
  tagline: string;
  privileges: string[];
  cashBonusPercent: number;
  xpChallengeBonusPercent: number;
  accentFrom: string;
  accentTo: string;
}

export const LEVEL_DEFINITIONS: LevelDefinition[] = [
  {
    id: "talent-spotter",
    name: "Talent Spotter",
    minXp: 0,
    maxXp: 499,
    icon: "🔭",
    badgeLabel: "Starter",
    tagline: "Je eerste stappen als Scout",
    privileges: [
      "Kandidaten aandragen",
      "Meedoen aan basis challenges",
    ],
    cashBonusPercent: 0,
    xpChallengeBonusPercent: 0,
    accentFrom: "from-slate-400",
    accentTo: "to-slate-500",
  },
  {
    id: "scout",
    name: "Scout",
    minXp: 500,
    maxXp: 1499,
    icon: "🎯",
    badgeLabel: "Scout",
    tagline: "Actief talent signaleren",
    privileges: [
      "+5% bonus XP op challenges",
      "Toegang tot maandelijkse Scout League",
    ],
    cashBonusPercent: 5,
    xpChallengeBonusPercent: 5,
    accentFrom: "from-fk-secondary",
    accentTo: "to-teal-600",
  },
  {
    id: "senior-scout",
    name: "Senior Scout",
    minXp: 1500,
    maxXp: 3999,
    icon: "⭐",
    badgeLabel: "Senior",
    tagline: "Betrouwbare netwerk-scout",
    privileges: [
      "+10% bonus XP op challenges",
      "Early access tot exclusieve vacatures/challenges",
      "Priority visibility op leaderboard",
    ],
    cashBonusPercent: 10,
    xpChallengeBonusPercent: 10,
    accentFrom: "from-blue-500",
    accentTo: "to-fk-primary",
  },
  {
    id: "elite-scout",
    name: "Elite Scout",
    minXp: 4000,
    maxXp: 9999,
    icon: "💎",
    badgeLabel: "Elite",
    tagline: "Top tier binnen FK",
    privileges: [
      "+20% bonus XP op challenges",
      "Hogere referral bonus bij plaatsing",
      "Elite Scout badge",
      "Toegang tot Elite Leaderboard",
    ],
    cashBonusPercent: 20,
    xpChallengeBonusPercent: 20,
    accentFrom: "from-fk-primary",
    accentTo: "to-indigo-700",
  },
  {
    id: "fk-legend",
    name: "FK Legend",
    minXp: 10000,
    maxXp: Infinity,
    icon: "👑",
    badgeLabel: "Legend",
    tagline: "Hall of Fame status",
    privileges: [
      "Hoogste referral bonus",
      "Hall of Fame",
      "VIP events / exclusieve rewards",
      "Legend badge",
    ],
    cashBonusPercent: 30,
    xpChallengeBonusPercent: 30,
    accentFrom: "from-amber-400",
    accentTo: "to-amber-600",
  },
];
