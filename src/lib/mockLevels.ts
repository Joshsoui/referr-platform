export interface LevelDefinition {
  id: string;
  name: string;
  level: number;
  minXp: number;
  maxXp: number;
  icon: string;
  badgeLabel: string;
  tagline: string;
  privileges: string[];
  cashBonusPercent: number;
  accentFrom: string;
  accentTo: string;
}

export const LEVEL_DEFINITIONS: LevelDefinition[] = [
  {
    id: "finder",
    name: "Finder",
    level: 1,
    minXp: 0,
    maxXp: 499,
    icon: "🔎",
    badgeLabel: "Finder",
    tagline: "Je eerste stappen in het Finderz Network",
    privileges: ["Talent tippen", "Basis Missions"],
    cashBonusPercent: 0,
    accentFrom: "from-slate-400",
    accentTo: "to-slate-500",
  },
  {
    id: "senior-finder",
    name: "Senior Finder",
    level: 2,
    minXp: 500,
    maxXp: 1499,
    icon: "⭐",
    badgeLabel: "Senior",
    tagline: "Actief talent zichtbaar maken",
    privileges: ["+2% cash bonus", "Finderz League toegang"],
    cashBonusPercent: 2,
    accentFrom: "from-fk-secondary",
    accentTo: "to-teal-600",
  },
  {
    id: "elite-finder",
    name: "Elite Finder",
    level: 3,
    minXp: 1500,
    maxXp: 4999,
    icon: "🏆",
    badgeLabel: "Elite",
    tagline: "Betrouwbare talent-spotter",
    privileges: ["+5% cash bonus", "Exclusieve Missions"],
    cashBonusPercent: 5,
    accentFrom: "from-blue-500",
    accentTo: "to-fk-primary",
  },
  {
    id: "master-finder",
    name: "Master Finder",
    level: 4,
    minXp: 5000,
    maxXp: 9999,
    icon: "💎",
    badgeLabel: "Master",
    tagline: "Top tier binnen het Finderz Network",
    privileges: ["+7.5% cash bonus", "VIP Vacatures"],
    cashBonusPercent: 7.5,
    accentFrom: "from-fk-primary",
    accentTo: "to-indigo-700",
  },
  {
    id: "finderz-legend",
    name: "Finderz Legend",
    level: 5,
    minXp: 10000,
    maxXp: Infinity,
    icon: "👑",
    badgeLabel: "Legend",
    tagline: "Hall of Fame status",
    privileges: [
      "+10% cash bonus",
      "Hall of Fame",
      "Jaarlijkse Finderz Award",
    ],
    cashBonusPercent: 10,
    accentFrom: "from-amber-400",
    accentTo: "to-amber-600",
  },
];
