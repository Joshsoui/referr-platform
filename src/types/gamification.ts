export type ChallengeStatus = "active" | "completed";

export interface Challenge {
  id: string;
  icon: string;
  title: string;
  description: string;
  goal: string;
  reward: string;
  badgeReward?: string;
  current: number;
  target: number;
  status: ChallengeStatus;
  isCommunity?: boolean;
}

export type FeedActivityType =
  | "referral"
  | "challenge"
  | "level"
  | "placement"
  | "streak";

export interface FeedActivity {
  id: string;
  type: FeedActivityType;
  userName: string;
  text: string;
  xp?: number;
  badgeLabel?: string;
  timestamp: string;
  timeAgo: string;
}

export interface ScoutBadge {
  id: string;
  icon: string;
  name: string;
  description: string;
  howToEarn: string;
  meaning: string;
  earned: boolean;
  earnedAt?: string;
}

export type LeaderboardTab = "month" | "wk-league" | "all-time";
