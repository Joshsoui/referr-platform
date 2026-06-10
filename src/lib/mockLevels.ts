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
    id: "finder",
    name: "Finder",
    minXp: 0,
    maxXp: 499,
    icon: "🔎",
    badgeLabel: "Finder",
    tagline: "Je eerste stappen in het Finderz Network",
    privileges: [
      "Talent tippen",
      "Basis Finderz Missions",
    ],
    cashBonusPercent: 0,
    xpChallengeBonusPercent: 0,
    accentFrom: "from-slate-400",
    accentTo: "to-slate-500",
  },
  {
    id: "senior-finder",
    name: "Senior Finder",
    minXp: 500,
    maxXp: 1499,
    icon: "⭐",
    badgeLabel: "Senior",
    tagline: "Actief talent zichtbaar maken",
    privileges: [
      "+5% bonus XP op Finderz Missions",
      "Toegang tot maandelijkse Finderz League",
    ],
    cashBonusPercent: 5,
    xpChallengeBonusPercent: 5,
    accentFrom: "from-fk-secondary",
    accentTo: "to-teal-600",
  },
  {
    id: "elite-finder",
    name: "Elite Finder",
    minXp: 1500,
    maxXp: 3999,
    icon: "🏆",
    badgeLabel: "Elite",
    tagline: "Betrouwbare talent-spotter",
    privileges: [
      "+10% bonus XP",
      "Exclusieve Finderz Missions",
      "Hogere referral bonus",
    ],
    cashBonusPercent: 10,
    xpChallengeBonusPercent: 10,
    accentFrom: "from-blue-500",
    accentTo: "to-fk-primary",
  },
  {
    id: "master-finder",
    name: "Master Finder",
    minXp: 4000,
    maxXp: 9999,
    icon: "💎",
    badgeLabel: "Master",
    tagline: "Top tier binnen het Finderz Network",
    privileges: [
      "+20% bonus XP",
      "Priority ranking",
      "Master Finder badge",
    ],
    cashBonusPercent: 20,
    xpChallengeBonusPercent: 20,
    accentFrom: "from-fk-primary",
    accentTo: "to-indigo-700",
  },
  {
    id: "finderz-legend",
    name: "Finderz Legend",
    minXp: 10000,
    maxXp: Infinity,
    icon: "👑",
    badgeLabel: "Legend",
    tagline: "Hall of Fame status",
    privileges: [
      "Hoogste bonusniveau",
      "Hall of Fame",
      "Exclusieve rewards",
      "Finderz Legend badge",
    ],
    cashBonusPercent: 30,
    xpChallengeBonusPercent: 30,
    accentFrom: "from-amber-400",
    accentTo: "to-amber-600",
  },
];
