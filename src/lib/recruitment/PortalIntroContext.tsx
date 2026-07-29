"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  PORTAL_INTRODUCTIONS,
  type IntroStatus,
  type PortalIntroduction,
} from "@/lib/recruitment/portalMockData";

const STORAGE_KEY = "referr-portal-intro-reviews";

type ReviewDecision = "goedgekeurd" | "afgewezen" | "meer_info";

interface StoredReview {
  status: IntroStatus;
  decision: ReviewDecision;
  note?: string;
  reviewedAt: string;
}

type ReviewMap = Record<string, StoredReview>;

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

function loadReviews(): ReviewMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ReviewMap) : {};
  } catch {
    return {};
  }
}

function saveReviews(reviews: ReviewMap) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

function decisionToStatus(decision: ReviewDecision): IntroStatus {
  if (decision === "goedgekeurd") return "goedgekeurd";
  if (decision === "afgewezen") return "afgewezen";
  return "in_beoordeling";
}

export function PortalIntroProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<ReviewMap>({});

  useEffect(() => {
    setReviews(loadReviews());
    const sync = () => setReviews(loadReviews());
    window.addEventListener("focus", sync);
    return () => window.removeEventListener("focus", sync);
  }, []);

  const reviewIntroduction = useCallback(
    (id: string, decision: ReviewDecision, note?: string) => {
      setReviews((prev) => {
        const next: ReviewMap = {
          ...prev,
          [id]: {
            status: decisionToStatus(decision),
            decision,
            note,
            reviewedAt: new Date().toISOString(),
          },
        };
        saveReviews(next);
        return next;
      });
    },
    []
  );

  const introductions = useMemo(
    () =>
      PORTAL_INTRODUCTIONS.map((intro) => {
        const review = reviews[intro.id];
        if (!review) return intro;
        return { ...intro, status: review.status };
      }),
    [reviews]
  );

  const value = useMemo(
    () => ({
      introductions,
      reviewIntroduction,
      getReview: (id: string) => reviews[id],
    }),
    [introductions, reviewIntroduction, reviews]
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
