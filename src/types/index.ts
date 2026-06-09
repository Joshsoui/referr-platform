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
  description?: string;
  referredBy: string;
  status: CandidateStatus;
  xpAwarded: number;
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
  reward: number;
  isCurrentUser?: boolean;
}

export interface CandidateFormData {
  name: string;
  emailOrPhone: string;
  linkedin: string;
  role: string;
  description: string;
}
