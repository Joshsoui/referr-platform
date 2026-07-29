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
    name: "Nieuwe verbinder",
    level: 1,
    minXp: 0,
    maxXp: 499,
    icon: "🔎",
    badgeLabel: "Nieuw",
    tagline: "Je eerste stap in de community",
    privileges: ["Kandidaten aandragen", "Statusupdates volgen"],
    cashBonusPercent: 0,
    accentFrom: "from-slate-400",
    accentTo: "to-slate-500",
  },
  {
    id: "senior-finder",
    name: "Betrouwbare verbinder",
    level: 2,
    minXp: 500,
    maxXp: 1499,
    icon: "⭐",
    badgeLabel: "Betrouwbaar",
    tagline: "Jouw introducties worden serieus genomen",
    privileges: ["Sterkere zichtbaarheid", "Toegang tot de ranglijst"],
    cashBonusPercent: 2,
    accentFrom: "from-fk-secondary",
    accentTo: "to-teal-600",
  },
  {
    id: "elite-finder",
    name: "Talentkenner",
    level: 3,
    minXp: 1500,
    maxXp: 4999,
    icon: "🏆",
    badgeLabel: "Kenner",
    tagline: "Je levert aantoonbaar sterke introducties",
    privileges: ["Meer vertrouwen", "Voorrang bij topvacatures"],
    cashBonusPercent: 5,
    accentFrom: "from-blue-500",
    accentTo: "to-fk-primary",
  },
  {
    id: "master-finder",
    name: "Topverbinder",
    level: 4,
    minXp: 5000,
    maxXp: 9999,
    icon: "💎",
    badgeLabel: "Top",
    tagline: "Jouw netwerk en track record vallen op",
    privileges: ["Topstatus", "Toegang tot premium vacatures"],
    cashBonusPercent: 7.5,
    accentFrom: "from-fk-primary",
    accentTo: "to-indigo-700",
  },
  {
    id: "finderz-legend",
    name: "Netwerkleider",
    level: 5,
    minXp: 10000,
    maxXp: Infinity,
    icon: "👑",
    badgeLabel: "Leider",
    tagline: "Erkende leider binnen de referr-community",
    privileges: ["Topreputatie", "Community Champions", "Jaarlijkse erkenning"],
    cashBonusPercent: 10,
    accentFrom: "from-amber-400",
    accentTo: "to-amber-600",
  },
];
