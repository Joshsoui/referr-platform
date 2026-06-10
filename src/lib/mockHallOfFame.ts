export interface HallOfFameEntry {
  name: string;
  level: string;
  xp: number;
  placements: number;
  keepers: number;
  earned: number;
  badge: string;
  highlight?: string;
}

export const HALL_OF_FAME_LEGENDS: HallOfFameEntry[] = [
  {
    name: "Lennart Lakeman",
    level: "Finderz Legend",
    xp: 10250,
    placements: 8,
    keepers: 5,
    earned: 2000,
    badge: "👑",
    highlight: "All-time #1",
  },
  {
    name: "Emma Bakker",
    level: "Master Finder",
    xp: 6180,
    placements: 6,
    keepers: 4,
    earned: 1500,
    badge: "💎",
  },
  {
    name: "Peter Jansen",
    level: "Master Finder",
    xp: 5430,
    placements: 5,
    keepers: 3,
    earned: 1250,
    badge: "💎",
  },
];

export const BEST_FINDER_MONTH = {
  name: "Emma Bakker",
  level: "Elite Finder",
  xp: 2180,
  placements: 2,
  keepers: 1,
  earned: 500,
  period: "Juni 2026",
};

export const BEST_FINDER_ALL_TIME = {
  name: "Lennart Lakeman",
  level: "Finderz Legend",
  xp: 10250,
  placements: 8,
  keepers: 5,
  earned: 2000,
};
