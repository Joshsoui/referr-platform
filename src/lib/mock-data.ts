import type { Activity, Candidate, Scout } from "@/types";

export const CURRENT_USER = "Joshua Souisay";

export const INITIAL_CANDIDATES: Candidate[] = [
  {
    id: "c1",
    name: "Kevin de Vries",
    emailOrPhone: "kevin@email.nl",
    linkedin: "linkedin.com/in/kevindv",
    role: "Frontend Developer",
    referredBy: CURRENT_USER,
    status: "nieuw",
    xpAwarded: 10,
    createdAt: "2026-06-09T10:30:00",
  },
  {
    id: "c2",
    name: "Emma Jansen",
    emailOrPhone: "06-12345678",
    role: "Product Manager",
    referredBy: CURRENT_USER,
    status: "intake_gepland",
    xpAwarded: 60,
    createdAt: "2026-06-08T14:00:00",
  },
  {
    id: "c3",
    name: "Mike van Dijk",
    emailOrPhone: "mike@email.nl",
    role: "DevOps Engineer",
    referredBy: CURRENT_USER,
    status: "geplaatst",
    xpAwarded: 660,
    createdAt: "2026-06-01T09:00:00",
  },
  {
    id: "c4",
    name: "Lisa Vermeer",
    emailOrPhone: "lisa@email.nl",
    role: "UX Designer",
    referredBy: "Kevin de Vries",
    status: "voorgesteld",
    xpAwarded: 160,
    createdAt: "2026-06-07T11:00:00",
  },
  {
    id: "c5",
    name: "Tom Bakker",
    emailOrPhone: "tom@email.nl",
    role: "Data Analyst",
    referredBy: "Emma Bakker",
    status: "nieuw",
    xpAwarded: 10,
    createdAt: "2026-06-09T08:00:00",
  },
  {
    id: "c6",
    name: "Sara de Jong",
    emailOrPhone: "06-98765432",
    role: "HR Business Partner",
    referredBy: CURRENT_USER,
    status: "proeftijd_gehaald",
    xpAwarded: 1660,
    createdAt: "2026-05-15T10:00:00",
  },
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: "a1",
    text: "Kevin de Vries aangedragen",
    xp: 10,
    timestamp: "2026-06-09T10:30:00",
  },
  {
    id: "a2",
    text: "Emma Jansen intake gepland",
    xp: 50,
    timestamp: "2026-06-08T14:00:00",
  },
  {
    id: "a3",
    text: "Mike van Dijk succesvol geplaatst",
    xp: 500,
    timestamp: "2026-06-01T09:00:00",
  },
];

export const INITIAL_LEADERBOARD: Scout[] = [
  { rank: 1, name: "Lennart Lakeman", xp: 7250, placements: 8, reward: 2000 },
  { rank: 2, name: "Emma Bakker", xp: 6180, placements: 6, reward: 1500 },
  { rank: 3, name: "Peter Jansen", xp: 5430, placements: 5, reward: 1250 },
  { rank: 4, name: "Mike de Groot", xp: 4980, placements: 4, reward: 1000 },
  { rank: 5, name: "Sophie van der Meer", xp: 4750, placements: 4, reward: 1000 },
  { rank: 6, name: "Kevin de Vries", xp: 4310, placements: 3, reward: 750 },
  {
    rank: 7,
    name: CURRENT_USER,
    xp: 4250,
    placements: 4,
    reward: 1250,
    isCurrentUser: true,
  },
];

export const DASHBOARD_STATS = {
  candidatesReferred: 18,
  successfulPlacements: 4,
  totalReward: 1250,
  regionRank: 7,
  region: "Noord-Holland",
};
