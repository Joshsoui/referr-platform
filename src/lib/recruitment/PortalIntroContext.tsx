"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import { useScout } from "@/context/ScoutContext";
import type {
  IntroStatus,
  PortalIntroduction,
} from "@/lib/recruitment/portalMockData";

type ReviewDecision = "goedgekeurd" | "afgewezen" | "meer_info";

interface StoredReview {
  status: IntroStatus;
  decision: ReviewDecision;
  note?: string;
  reviewedAt: string;
}

interface PortalIntroContextValue {
  introductions: PortalIntroduction[];
  reviewIntroduction: (
    id: string,
    decision: ReviewDecision,
    note?: string
  ) => void;
  getReview: (id: string) => StoredReview | undefined;
}

const PortalIntroContext = createContext<PortalIntroContextValue | null>(null);

function toIntroStatus(input: {
  referralApproval: string;
}): IntroStatus {
  if (input.referralApproval === "goedgekeurd") return "goedgekeurd";
  if (input.referralApproval === "afgekeurd") return "afgewezen";
  return "nieuw";
}

export function PortalIntroProvider({ children }: { children: ReactNode }) {
  const {
    candidates,
    vacancies,
    approveReferral,
    rejectReferral,
    updateCandidateStatus,
  } = useScout();

  const introductions = useMemo<PortalIntroduction[]>(
    () =>
      candidates.map((candidate) => {
        const vacancy = vacancies.find((item) => item.id === candidate.vacancyId);
        return {
          id: candidate.id,
          candidateName: candidate.name,
          candidateEmail: candidate.emailOrPhone,
          challengeTitle: vacancy?.title ?? candidate.role,
          company: "referr",
          location: vacancy?.location ?? "—",
          referrerName: candidate.referredBy,
          referrerEmail: "",
          date: new Date(candidate.createdAt).toLocaleDateString("nl-NL"),
          status: toIntroStatus(candidate),
          motivation: candidate.recommendation || candidate.description || "",
          experience: candidate.reasons.join(", "),
          href: `/recruitment/introducties/${candidate.id}`,
        };
      }),
    [candidates, vacancies]
  );

  const reviewIntroduction = useCallback(
    (id: string, decision: ReviewDecision, _note?: string) => {
      if (decision === "goedgekeurd") {
        approveReferral(id);
        updateCandidateStatus(id, "intake_gepland");
        return;
      }
      if (decision === "afgewezen") {
        rejectReferral(id);
        return;
      }
      // meer_info → keep pending but mark as viewed/approved pipeline start
      approveReferral(id);
    },
    [approveReferral, rejectReferral, updateCandidateStatus]
  );

  const value = useMemo(
    () => ({
      introductions,
      reviewIntroduction,
      getReview: () => undefined,
    }),
    [introductions, reviewIntroduction]
  );

  return (
    <PortalIntroContext.Provider value={value}>
      {children}
    </PortalIntroContext.Provider>
  );
}

export function usePortalIntroductions() {
  const ctx = useContext(PortalIntroContext);
  if (!ctx) {
    throw new Error("usePortalIntroductions must be used within PortalIntroProvider");
  }
  return ctx;
}
