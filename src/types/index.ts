import type {
  CashStatus,
  DuplicateStatus,
  ReferralApproval,
  RelationshipType,
  Sector,
} from "@/types/incentives";

export type CandidateStatus =
  | "nieuw"
  | "intake_gepland"
  | "voorgesteld"
  | "geplaatst"
  | "proeftijd_gehaald";

export interface Candidate {
  id: string;
  name: string;
  emailOrPhone: string;
  linkedin?: string;
  role: string;
  sector: Sector;
  description?: string;
  recommendation?: string;
  reasons: string[];
  relationship: RelationshipType;
  cvUploaded?: boolean;
  referredBy: string;
  referredByUserId?: string | null;
  status: CandidateStatus;
  xpAwarded: number;
  confidenceScore: number;
  cashStatus: CashStatus;
  duplicateStatus: DuplicateStatus;
  referralApproval: ReferralApproval;
  vacancyId?: string;
  createdAt: string;
}

export interface Activity {
  id: string;
  text: string;
  xp: number;
  timestamp: string;
}

export interface Scout {
  rank: number;
  name: string;
  xp: number;
  placements: number;
  keepers?: number;
  reward: number;
  isCurrentUser?: boolean;
}

export interface CandidateFormData {
  name: string;
  emailOrPhone: string;
  linkedin: string;
  sector: Sector | "";
  reasons: string[];
  relationship: RelationshipType | "";
  recommendation: string;
  cvUploaded: boolean;
  /** Legacy mapping for display */
  role: string;
  description: string;
  vacancyId?: string;
}
