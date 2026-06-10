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
  CONFIDENCE_BONUS_THRESHOLD,
  CONFIDENCE_BONUS_XP,
  INITIAL_REWARD_SUMMARY,
} from "@/lib/mockRewards";
import { calculateConfidenceScore, calculateScoutScore } from "@/lib/scoring";
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
import type {
  CashStatus,
  DuplicateStatus,
  ReferralApproval,
  RewardSummary,
} from "@/types/incentives";

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
  rewards: RewardSummary;
  scoutScore: number;
  submitCandidate: (data: CandidateFormData) => number;
  submitReferralCandidate: (
    data: CandidateFormData,
    referrerName: string,
    viaReferralLink?: boolean
  ) => number;
  updateCandidateStatus: (id: string, status: CandidateStatus) => void;
  approveReferral: (id: string) => void;
  rejectReferral: (id: string) => void;
  markDuplicate: (id: string) => void;
  setCashStatus: (id: string, status: CashStatus) => void;
  grantIntakeBonus: (id: string) => void;
  grantPlacementBonus: (id: string) => void;
  grantRetentionBonus: (id: string) => void;
  revokeXp: (id: string, amount: number) => void;
}

const ScoutContext = createContext<ScoutContextValue | null>(null);

function buildCandidate(
  data: CandidateFormData,
  referrerName: string,
  id: string
): Candidate {
  const confidenceScore = calculateConfidenceScore(data);
  return {
    id,
    name: data.name,
    emailOrPhone: data.emailOrPhone,
    linkedin: data.linkedin || undefined,
    role: data.sector || data.role || "Overig",
    sector: (data.sector || "Overig") as Candidate["sector"],
    description: data.recommendation || data.description || undefined,
    recommendation: data.recommendation || undefined,
    reasons: data.reasons,
    relationship: (data.relationship || "netwerk") as Candidate["relationship"],
    cvUploaded: data.cvUploaded,
    referredBy: referrerName,
    status: "nieuw",
    xpAwarded: 0,
    confidenceScore,
    cashStatus: "geen_cash",
    duplicateStatus: "uniek",
    referralApproval: "pending",
    createdAt: new Date().toISOString(),
  };
}

export function ScoutProvider({ children }: { children: ReactNode }) {
  const [xp, setXp] = useState(4250);
  const [xpPulse, setXpPulse] = useState(0);
  const [xpEvents, setXpEvents] = useState<XpEvent[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [leaderboard, setLeaderboard] = useState<Scout[]>(INITIAL_LEADERBOARD);
  const [stats, setStats] = useState(DASHBOARD_STATS);
  const [referralProfile, setReferralProfile] = useState(CURRENT_SCOUT_REFERRAL);
  const [rewards, setRewards] = useState<RewardSummary>(INITIAL_REWARD_SUMMARY);
  const idCounter = useRef(0);

  const scoutScore = useMemo(() => {
    const calculated = calculateScoutScore(candidates).score;
    return Math.max(94, calculated);
  }, [candidates]);

  const nextId = useCallback((prefix: string) => {
    idCounter.current += 1;
    return `${prefix}-${idCounter.current}`;
  }, []);

  const awardXp = useCallback((amount: number) => {
    if (amount <= 0) return;
    setXp((prev) => prev + amount);
    setXpPulse((prev) => prev + 1);
    idCounter.current += 1;
    setXpEvents((prev) => [...prev, { id: idCounter.current, amount }]);
  }, []);

  const deductXp = useCallback((amount: number) => {
    if (amount <= 0) return;
    setXp((prev) => Math.max(0, prev - amount));
    setXpPulse((prev) => prev + 1);
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
    ): number => {
      const candidateId = nextId("c");
      const candidate = buildCandidate(data, referrerName, candidateId);
      let xpGain = STATUS_XP.nieuw;
      if (candidate.confidenceScore >= CONFIDENCE_BONUS_THRESHOLD) {
        xpGain += CONFIDENCE_BONUS_XP;
      }
      candidate.xpAwarded = xpGain;

      setCandidates((prev) => [candidate, ...prev]);

      if (referrerName === CURRENT_USER) {
        awardXp(xpGain);
        setStats((prev) => ({
          ...prev,
          candidatesReferred: prev.candidatesReferred + 1,
        }));
        addActivity(
          viaReferralLink
            ? `${data.name} getipt via Finderz Link`
            : `${data.name} getipt`,
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

      return candidate.confidenceScore;
    },
    [addActivity, awardXp, nextId, updateLeaderboardXp]
  );

  const submitCandidate = useCallback(
    (data: CandidateFormData) =>
      submitReferralCandidate(data, CURRENT_USER, false),
    [submitReferralCandidate]
  );

  const updateCandidateInState = useCallback(
    (id: string, updater: (c: Candidate) => Candidate) => {
      setCandidates((prev) =>
        prev.map((c) => (c.id === id ? updater(c) : c))
      );
    },
    []
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

  const approveReferral = useCallback(
    (id: string) => {
      updateCandidateInState(id, (c) => ({
        ...c,
        referralApproval: "goedgekeurd" as ReferralApproval,
      }));
    },
    [updateCandidateInState]
  );

  const rejectReferral = useCallback(
    (id: string) => {
      updateCandidateInState(id, (c) => ({
        ...c,
        referralApproval: "afgekeurd" as ReferralApproval,
        cashStatus: "afgekeurd",
      }));
    },
    [updateCandidateInState]
  );

  const markDuplicate = useCallback(
    (id: string) => {
      updateCandidateInState(id, (c) => ({
        ...c,
        duplicateStatus: "duplicate" as DuplicateStatus,
      }));
    },
    [updateCandidateInState]
  );

  const setCashStatus = useCallback(
    (id: string, status: CashStatus) => {
      updateCandidateInState(id, (c) => ({ ...c, cashStatus: status }));
    },
    [updateCandidateInState]
  );

  const grantIntakeBonus = useCallback(
    (id: string) => {
      setCashStatus(id, "intake_goedgekeurd");
      setRewards((r) => ({
        ...r,
        cashEarned: r.cashEarned + 25,
        cashPending: Math.max(0, r.cashPending - 25),
      }));
      setStats((s) => ({ ...s, totalReward: s.totalReward + 25 }));
    },
    [setCashStatus]
  );

  const grantPlacementBonus = useCallback(
    (id: string) => {
      setCashStatus(id, "plaatsing_goedgekeurd");
      setRewards((r) => ({
        ...r,
        cashEarned: r.cashEarned + 250,
        cashPending: Math.max(0, r.cashPending - 250),
      }));
      setStats((s) => ({ ...s, totalReward: s.totalReward + 250 }));
    },
    [setCashStatus]
  );

  const grantRetentionBonus = useCallback(
    (id: string) => {
      setCashStatus(id, "retentie_goedgekeurd");
      setRewards((r) => ({
        ...r,
        cashEarned: r.cashEarned + 250,
      }));
      setStats((s) => ({ ...s, totalReward: s.totalReward + 250 }));
    },
    [setCashStatus]
  );

  const revokeXp = useCallback(
    (id: string, amount: number) => {
      const candidate = candidates.find((c) => c.id === id);
      if (!candidate || candidate.referredBy !== CURRENT_USER) return;

      const revokeAmount = Math.min(amount, candidate.xpAwarded);
      deductXp(revokeAmount);
      updateLeaderboardXp(-revokeAmount);
      updateCandidateInState(id, (c) => ({
        ...c,
        xpAwarded: Math.max(0, c.xpAwarded - revokeAmount),
      }));
      addActivity(`XP ingetrokken voor ${candidate.name}`, -revokeAmount);
    },
    [
      addActivity,
      candidates,
      deductXp,
      updateCandidateInState,
      updateLeaderboardXp,
    ]
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
      rewards,
      scoutScore,
      submitCandidate,
      submitReferralCandidate,
      updateCandidateStatus,
      approveReferral,
      rejectReferral,
      markDuplicate,
      setCashStatus,
      grantIntakeBonus,
      grantPlacementBonus,
      grantRetentionBonus,
      revokeXp,
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
      rewards,
      scoutScore,
      submitCandidate,
      submitReferralCandidate,
      updateCandidateStatus,
      approveReferral,
      rejectReferral,
      markDuplicate,
      setCashStatus,
      grantIntakeBonus,
      grantPlacementBonus,
      grantRetentionBonus,
      revokeXp,
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
