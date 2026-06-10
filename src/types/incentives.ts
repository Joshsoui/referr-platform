export type Sector =
  | "Productie"
  | "Techniek"
  | "Bouw"
  | "Logistiek"
  | "Kantoor"
  | "Sales"
  | "Management"
  | "Overig";

export type RelationshipType =
  | "gewerkt"
  | "persoonlijk"
  | "netwerk"
  | "online";

export type CashStatus =
  | "geen_cash"
  | "intake_in_behandeling"
  | "intake_goedgekeurd"
  | "plaatsing_in_behandeling"
  | "plaatsing_goedgekeurd"
  | "retentie_goedgekeurd"
  | "afgekeurd";

export type DuplicateStatus = "uniek" | "duplicate" | "onder_review";

export type ReferralApproval = "pending" | "goedgekeurd" | "afgekeurd";

export interface RewardSummary {
  cashEarned: number;
  cashPending: number;
  nextRewardHint: string;
}

export interface ScoutScoreProfile {
  score: number;
  highConfidencePercent: number;
  intakes: number;
  placements: number;
  rejectedOrDuplicate: number;
}
