import type { CandidateFormData, Candidate } from "@/types";
import { CURRENT_USER } from "@/lib/mock-data";
import type { ScoutScoreProfile } from "@/types/incentives";

export function getConfidenceLabel(score: number): string {
  if (score >= 70) return "Sterke referral";
  if (score >= 40) return "Redelijke context";
  return "Lage context";
}

export function calculateConfidenceScore(data: CandidateFormData): number {
  let score = 0;
  if (data.linkedin.trim()) score += 20;
  if (data.emailOrPhone.trim()) score += 15;
  if (data.sector) score += 10;
  if (data.reasons.length > 0) score += 15;
  if (data.recommendation.trim().length >= 20) score += 20;
  if (data.relationship === "gewerkt" || data.relationship === "persoonlijk") {
    score += 20;
  }
  if (data.cvUploaded) score += 0; // optional, no extra points specified
  return Math.min(100, score);
}

export function calculateScoutScore(candidates: Candidate[]): ScoutScoreProfile {
  const mine = candidates.filter((c) => c.referredBy === CURRENT_USER);
  if (mine.length === 0) {
    return {
      score: 0,
      highConfidencePercent: 0,
      intakes: 0,
      placements: 0,
      rejectedOrDuplicate: 0,
    };
  }

  const highConfidence = mine.filter((c) => c.confidenceScore >= 70).length;
  const intakes = mine.filter(
    (c) =>
      c.status !== "nieuw" &&
      c.referralApproval !== "afgekeurd" &&
      c.duplicateStatus !== "duplicate"
  ).length;
  const placements = mine.filter(
    (c) => c.status === "geplaatst" || c.status === "proeftijd_gehaald"
  ).length;
  const rejectedOrDuplicate = mine.filter(
    (c) =>
      c.referralApproval === "afgekeurd" || c.duplicateStatus === "duplicate"
  ).length;

  const highConfidencePercent = Math.round(
    (highConfidence / mine.length) * 100
  );
  const placementRate = placements / mine.length;
  const rejectionPenalty = rejectedOrDuplicate * 5;

  const score = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        highConfidencePercent * 0.45 +
          placementRate * 100 * 0.35 +
          intakes * 4 -
          rejectionPenalty
      )
    )
  );

  return {
    score,
    highConfidencePercent,
    intakes,
    placements,
    rejectedOrDuplicate,
  };
}
