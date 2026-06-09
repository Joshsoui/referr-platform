import type { Challenge } from "@/types/gamification";

export const WK_LEAGUE_STATS = {
  activeScouts: 247,
  candidatesReferred: 68,
  totalXpEarned: 24500,
  period: "11 juni t/m 19 juli",
};

export const CHALLENGES: Challenge[] = [
  {
    id: "wk-scout-league",
    icon: "⚽",
    title: "WK Scout League",
    description: "Draag 3 kandidaten aan tijdens het WK.",
    goal: "3 kandidaten aandragen",
    reward: "+500 XP",
    current: 1,
    target: 3,
    status: "active",
  },
  {
    id: "oranje-talent",
    icon: "🏆",
    title: "Oranje Talent Challenge",
    description:
      "Draag een kandidaat aan binnen Productie, Techniek of Bouw.",
    goal: "1 kandidaat in Productie, Techniek of Bouw",
    reward: "+250 XP",
    current: 0,
    target: 1,
    status: "active",
  },
  {
    id: "golden-boot",
    icon: "🥅",
    title: "Golden Boot Challenge",
    description: "Realiseer een succesvolle plaatsing tijdens het WK.",
    goal: "1 succesvolle plaatsing",
    reward: "+1000 XP",
    badgeReward: "Golden Boot Scout",
    current: 0,
    target: 1,
    status: "active",
  },
  {
    id: "van-breukelen",
    icon: "🧤",
    title: "Van Breukelen Challenge",
    description: "Draag 5 kandidaten aan tijdens het WK.",
    goal: "5 kandidaten aandragen",
    reward: "+1500 XP",
    badgeReward: "Elite Keeper",
    current: 2,
    target: 5,
    status: "active",
  },
  {
    id: "team-oranje",
    icon: "🏟",
    title: "Team Oranje Challenge",
    description:
      "Community challenge: alle scouts samen 100 kandidaten aandragen.",
    goal: "100 kandidaten (community)",
    reward: "Iedere actieve scout ontvangt +500 XP",
    current: 42,
    target: 100,
    status: "active",
    isCommunity: true,
  },
];
