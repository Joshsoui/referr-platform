"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  CURRENT_USER,
  DASHBOARD_STATS,
  INITIAL_ACTIVITIES,
  INITIAL_CANDIDATES,
  INITIAL_LEADERBOARD,
} from "@/lib/mock-data";
import { CURRENT_SCOUT_REFERRAL, type ReferralProfile } from "@/lib/mockReferrals";
import {
  STATUS_LABELS,
  STATUS_ORDER,
  STATUS_XP,
  getXpForStatusChange,
} from "@/lib/xp";
import type {
  Activity,
  Candidate,
  CandidateFormData,
  CandidateStatus,
  Scout,
} from "@/types";

export interface XpEvent {
  id: number;
  amount: number;
}

interface ScoutContextValue {
  currentUser: string;
  xp: number;
  xpPulse: number;
  xpEvents: XpEvent[];
  candidates: Candidate[];
  activities: Activity[];
  leaderboard: Scout[];
  stats: typeof DASHBOARD_STATS;
  referralProfile: ReferralProfile;
  submitCandidate: (data: CandidateFormData) => void;
  submitReferralCandidate: (
    data: CandidateFormData,
    referrerName: string,
    viaReferralLink?: boolean
  ) => void;
  updateCandidateStatus: (id: string, status: CandidateStatus) => void;
}

const ScoutContext = createContext<ScoutContextValue | null>(null);

export function ScoutProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(4250);
  const [xpPulse, setXpPulse] = useState(0);
  const [xpEvents, setXpEvents] = useState<XpEvent[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [leaderboard, setLeaderboard] = useState<Scout[]>(INITIAL_LEADERBOARD);
  const [stats, setStats] = useState(DASHBOARD_STATS);
  const [referralProfile, setReferralProfile] = useState(CURRENT_SCOUT_REFERRAL);
  const idCounter = useRef(0);

  const nextId = useCallback((prefix: string) => {
    idCounter.current += 1;
    return `${prefix}-${idCounter.current}`;
  }, []);

  const awardXp = useCallback((amount: number) => {
    setXp((prev) => prev + amount);
    setXpPulse((prev) => prev + 1);
    idCounter.current += 1;
    setXpEvents((prev) => [
      ...prev,
      { id: idCounter.current, amount },
    ]);
  }, []);

  const addActivity = useCallback((text: string, xpGain: number) => {
    const activity: Activity = {
      id: nextId("a"),
      text,
      xp: xpGain,
      timestamp: new Date().toISOString(),
    };
    setActivities((prev) => [activity, ...prev]);
  }, [nextId]);

  const updateLeaderboardXp = useCallback((xpGain: number) => {
    setLeaderboard((prev) => {
      const updated = prev.map((scout) =>
        scout.isCurrentUser ? { ...scout, xp: scout.xp + xpGain } : scout
      );
      return updated
        .sort((a, b) => b.xp - a.xp)
        .map((scout, index) => ({ ...scout, rank: index + 1 }));
    });
  }, []);

  const submitReferralCandidate = useCallback(
    (
      data: CandidateFormData,
      referrerName: string,
      viaReferralLink = true
    ) => {
      const xpGain = STATUS_XP.nieuw;
      const candidate: Candidate = {
        id: nextId("c"),
        name: data.name,
        emailOrPhone: data.emailOrPhone,
        linkedin: data.linkedin || undefined,
        role: data.role,
        description: data.description || undefined,
        referredBy: referrerName,
        status: "nieuw",
        xpAwarded: xpGain,
        createdAt: new Date().toISOString(),
      };

      setCandidates((prev) => [candidate, ...prev]);

      if (referrerName === CURRENT_USER) {
        awardXp(xpGain);
        setStats((prev) => ({
          ...prev,
          candidatesReferred: prev.candidatesReferred + 1,
        }));
        addActivity(
          viaReferralLink
            ? `${data.name} aangedragen via referral link`
            : `${data.name} aangedragen`,
          xpGain
        );
        updateLeaderboardXp(xpGain);
        if (viaReferralLink) {
          setReferralProfile((prev) => ({
            ...prev,
            stats: {
              ...prev.stats,
              candidatesViaLink: prev.stats.candidatesViaLink + 1,
              xpViaReferralLink: prev.stats.xpViaReferralLink + xpGain,
            },
          }));
        }
      }
    },
    [addActivity, awardXp, nextId, updateLeaderboardXp]
  );

  const submitCandidate = useCallback(
    (data: CandidateFormData) => {
      submitReferralCandidate(data, CURRENT_USER, false);
    },
    [submitReferralCandidate]
  );

  const updateCandidateStatus = useCallback(
    (id: string, newStatus: CandidateStatus) => {
      setCandidates((prev) => {
        const candidate = prev.find((c) => c.id === id);
        if (!candidate || candidate.status === newStatus) return prev;

        const xpGain = getXpForStatusChange(candidate.status, newStatus);
        if (xpGain === 0) return prev;

        if (candidate.referredBy === CURRENT_USER) {
          awardXp(xpGain);
          updateLeaderboardXp(xpGain);

          if (newStatus === "geplaatst") {
            setStats((s) => ({
              ...s,
              successfulPlacements: s.successfulPlacements + 1,
            }));
          }

          const actionLabel =
            newStatus === "intake_gepland"
              ? "intake gepland"
              : newStatus === "voorgesteld"
                ? "voorgesteld bij klant"
                : newStatus === "geplaatst"
                  ? "succesvol geplaatst"
                  : newStatus === "proeftijd_gehaald"
                    ? "proeftijd gehaald"
                    : STATUS_LABELS[newStatus].toLowerCase();

          addActivity(`${candidate.name} ${actionLabel}`, xpGain);
        }

        return prev.map((c) =>
          c.id === id
            ? {
                ...c,
                status: newStatus,
                xpAwarded: c.xpAwarded + xpGain,
              }
            : c
        );
      });
    },
    [addActivity, awardXp, updateLeaderboardXp]
  );

  const value = useMemo(
    () => ({
      currentUser: CURRENT_USER,
      xp,
      xpPulse,
      xpEvents,
      candidates,
      activities,
      leaderboard,
      stats,
      referralProfile,
      submitCandidate,
      submitReferralCandidate,
      updateCandidateStatus,
    }),
    [
      xp,
      xpPulse,
      xpEvents,
      candidates,
      activities,
      leaderboard,
      stats,
      referralProfile,
      submitCandidate,
      submitReferralCandidate,
      updateCandidateStatus,
    ]
  );

  return (
    <ScoutContext.Provider value={value}>{children}</ScoutContext.Provider>
  );
}

export function useScout() {
  const context = useContext(ScoutContext);
  if (!context) {
    throw new Error("useScout must be used within ScoutProvider");
  }
  return context;
}

export function getNextStatus(
  current: CandidateStatus
): CandidateStatus | null {
  const index = STATUS_ORDER.indexOf(current);
  if (index < 0 || index >= STATUS_ORDER.length - 1) return null;
  return STATUS_ORDER[index + 1];
}
