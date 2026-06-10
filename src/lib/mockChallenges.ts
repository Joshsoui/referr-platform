import type { Challenge } from "@/types/gamification";

export const WK_LEAGUE_STATS = {
  activeFinders: 247,
  talentsTipped: 68,
  totalXpEarned: 24500,
  period: "11 juni t/m 19 juli",
};

export const CHALLENGES: Challenge[] = [
  {
    id: "wk-scout-league",
    icon: "⚽",
    title: "WK Finderz Mission",
    description: "Tip 3 talenten tijdens het WK.",
    goal: "3 talenten getipt",
    reward: "+500 XP",
    current: 1,
    target: 3,
    status: "active",
  },
  {
    id: "oranje-talent",
    icon: "🏆",
    title: "Oranje Talent Mission",
    description:
      "Tip een talent binnen Productie, Techniek of Bouw.",
    goal: "1 talent in Productie, Techniek of Bouw",
    reward: "+250 XP",
    current: 0,
    target: 1,
    status: "active",
  },
  {
    id: "golden-boot",
    icon: "🥅",
    title: "Golden Boot Mission",
    description: "Realiseer een succesvolle match tijdens het WK.",
    goal: "1 succesvolle match",
    reward: "+1000 XP",
    badgeReward: "Golden Boot Mission",
    current: 0,
    target: 1,
    status: "active",
  },
  {
    id: "van-breukelen",
    icon: "🧤",
    title: "Van Breukelen Mission",
    description: "Tip 5 talenten tijdens het WK.",
    goal: "5 talenten getipt",
    reward: "+1500 XP",
    badgeReward: "Keeper Maker",
    current: 2,
    target: 5,
    status: "active",
  },
  {
    id: "team-oranje",
    icon: "🏟",
    title: "Team Oranje Mission",
    description:
      "Community doel: alle Finders samen 100 talenten getipt.",
    goal: "100 talenten getipt (community)",
    reward: "Iedere actieve Finder ontvangt +500 XP",
    current: 42,
    target: 100,
    status: "active",
    isCommunity: true,
  },
];
