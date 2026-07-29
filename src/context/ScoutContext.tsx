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
import { syncMissions } from "@/lib/missions";
import {
  getCashNotification,
  getStatusChangeNotification,
} from "@/lib/recommendationStatus";
import {
  CONFIDENCE_BONUS_THRESHOLD,
  CONFIDENCE_BONUS_XP,
  INITIAL_REWARD_SUMMARY,
} from "@/lib/mockRewards";
import { INITIAL_VACANCIES } from "@/lib/mockVacancies";
import type { Challenge } from "@/types/gamification";
import type { AppNotification } from "@/types/notifications";
import {
  getIntakeReward,
  getKeeperBonusReward,
  getMatchReward,
} from "@/lib/vacancyRewards";
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
import type { Vacancy, VacancyFormData } from "@/types/vacancy";

export interface XpEvent {
  id: number;
  amount: number;
}

interface ScoutContextValue {
  currentUser: string;
  xp: number;
  xpPulse: number;
  xpEvents: XpEvent[];
  notifications: AppNotification[];
  candidates: Candidate[];
  activities: Activity[];
  leaderboard: Scout[];
  stats: typeof DASHBOARD_STATS;
  referralProfile: ReferralProfile;
  rewards: RewardSummary;
  challenges: Challenge[];
  vacancies: Vacancy[];
  scoutScore: number;
  addVacancy: (data: VacancyFormData) => void;
  updateVacancy: (id: string, data: VacancyFormData) => void;
  assignCandidateVacancy: (candidateId: string, vacancyId: string) => void;
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

function sortLeaderboardByImpact(leaderboard: Scout[]): Scout[] {
  return [...leaderboard]
    .sort((a, b) => {
      if (b.placements !== a.placements) return b.placements - a.placements;
      if (b.reward !== a.reward) return b.reward - a.reward;
      return b.xp - a.xp;
    })
    .map((scout, index) => ({ ...scout, rank: index + 1 }));
}

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
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>(INITIAL_CANDIDATES);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [leaderboard, setLeaderboard] = useState<Scout[]>(INITIAL_LEADERBOARD);
  const [stats, setStats] = useState(DASHBOARD_STATS);
  const [referralProfile, setReferralProfile] = useState(CURRENT_SCOUT_REFERRAL);
  const [rewards, setRewards] = useState<RewardSummary>(INITIAL_REWARD_SUMMARY);
  const [vacancies, setVacancies] = useState<Vacancy[]>(INITIAL_VACANCIES);
  const idCounter = useRef(0);

  const getCandidateDifficulty = useCallback(
    (candidate: Candidate) => {
      const vacancy = vacancies.find((item) => item.id === candidate.vacancyId);
      return vacancy?.difficulty ?? "easy";
    },
    [vacancies]
  );

  const scoutScore = useMemo(() => {
    const calculated = calculateScoutScore(candidates).score;
    return Math.max(94, calculated);
  }, [candidates]);

  const challenges = useMemo(
    () => syncMissions(candidates, CURRENT_USER),
    [candidates]
  );

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

  const pushNotification = useCallback(
    (notification: Omit<AppNotification, "id">) => {
      idCounter.current += 1;
      setNotifications((prev) => [
        ...prev,
        { ...notification, id: idCounter.current },
      ]);
    },
    []
  );

  const updateLeaderboardCurrentUser = useCallback(
    (updater: (scout: Scout) => Scout) => {
      setLeaderboard((prev) =>
        sortLeaderboardByImpact(
          prev.map((scout) => (scout.isCurrentUser ? updater(scout) : scout))
        )
      );
    },
    []
  );

  const updateLeaderboardXp = useCallback((xpGain: number) => {
    setLeaderboard((prev) => {
      const updated = prev.map((scout) =>
        scout.isCurrentUser ? { ...scout, xp: scout.xp + xpGain } : scout
      );
      return sortLeaderboardByImpact(updated);
    });
  }, []);

  const updateLeaderboardPlacements = useCallback(
    (placementGain: number) => {
      if (placementGain === 0) return;
      updateLeaderboardCurrentUser((scout) => ({
        ...scout,
        placements: scout.placements + placementGain,
      }));
    },
    [updateLeaderboardCurrentUser]
  );

  const updateLeaderboardReward = useCallback(
    (rewardGain: number) => {
      if (rewardGain === 0) return;
      updateLeaderboardCurrentUser((scout) => ({
        ...scout,
        reward: scout.reward + rewardGain,
      }));
    },
    [updateLeaderboardCurrentUser]
  );

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
            ? `${data.name} aangedragen via introductielink`
            : `${data.name} aangedragen`,
          xpGain
        );
        pushNotification({
          kind: "submitted",
          title: "Introductie verstuurd",
          message: `Je introductie voor ${data.name} is ontvangen. We houden je op de hoogte.`,
        });
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
    [addActivity, awardXp, nextId, pushNotification, updateLeaderboardXp]
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
            updateLeaderboardPlacements(1);
          }

          const actionLabel =
            newStatus === "intake_gepland"
              ? "eerste gesprek gepland"
              : newStatus === "voorgesteld"
                ? "voorstel gedaan"
                : newStatus === "geplaatst"
                  ? "kandidaat aangenomen"
                  : newStatus === "proeftijd_gehaald"
                    ? "succesvol geplaatst"
                    : STATUS_LABELS[newStatus].toLowerCase();

          addActivity(`${candidate.name} ${actionLabel}`, xpGain);

          const statusNotice = getStatusChangeNotification(
            candidate.name,
            newStatus
          );
          pushNotification({
            kind: statusNotice.kind,
            title: statusNotice.title,
            message: statusNotice.message,
          });
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
    [
      addActivity,
      awardXp,
      pushNotification,
      updateLeaderboardPlacements,
      updateLeaderboardXp,
    ]
  );

  const approveReferral = useCallback(
    (id: string) => {
      const candidate = candidates.find((c) => c.id === id);
      updateCandidateInState(id, (c) => ({
        ...c,
        referralApproval: "goedgekeurd" as ReferralApproval,
      }));

      if (candidate?.referredBy === CURRENT_USER) {
        pushNotification({
          kind: "viewed",
          title: "Introductie bekeken",
          message: `Je introductie voor ${candidate.name} is bekeken.`,
        });
      }
    },
    [candidates, pushNotification, updateCandidateInState]
  );

  const rejectReferral = useCallback(
    (id: string) => {
      const candidate = candidates.find((c) => c.id === id);
      updateCandidateInState(id, (c) => ({
        ...c,
        referralApproval: "afgekeurd" as ReferralApproval,
        cashStatus: "afgekeurd",
      }));

      if (candidate?.referredBy === CURRENT_USER) {
        pushNotification({
          kind: "rejected",
          title: "Introductie niet geaccepteerd",
          message: `De introductie van ${candidate.name} past helaas niet bij de vacature.`,
        });
      }
    },
    [candidates, pushNotification, updateCandidateInState]
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
      const candidate = candidates.find((c) => c.id === id);
      if (!candidate || candidate.cashStatus === status) return;

      updateCandidateInState(id, (c) => ({ ...c, cashStatus: status }));

      if (
        candidate.referredBy === CURRENT_USER &&
        (status === "intake_in_behandeling" ||
          status === "plaatsing_in_behandeling" ||
          status === "afgekeurd")
      ) {
        const cashNotice = getCashNotification(candidate.name, status);
        if (cashNotice) {
          pushNotification({
            kind: cashNotice.kind,
            title: cashNotice.title,
            message: cashNotice.message,
          });
        }
      }
    },
    [candidates, pushNotification, updateCandidateInState]
  );

  const addVacancy = useCallback(
    (data: VacancyFormData) => {
      if (!data.sector) return;
      idCounter.current += 1;
      const vacancy: Vacancy = {
        id: `v-${idCounter.current}`,
        title: data.title,
        sector: data.sector,
        location: data.location,
        description: data.description,
        difficulty: data.difficulty,
        status: data.status,
        createdAt: new Date().toISOString(),
      };
      setVacancies((prev) => [vacancy, ...prev]);
    },
    []
  );

  const updateVacancy = useCallback((id: string, data: VacancyFormData) => {
    if (!data.sector) return;
    setVacancies((prev) =>
      prev.map((vacancy) =>
        vacancy.id === id
          ? {
              ...vacancy,
              title: data.title,
              sector: data.sector as Vacancy["sector"],
              location: data.location,
              description: data.description,
              difficulty: data.difficulty,
              status: data.status,
            }
          : vacancy
      )
    );
  }, []);

  const assignCandidateVacancy = useCallback(
    (candidateId: string, vacancyId: string) => {
      updateCandidateInState(candidateId, (candidate) => ({
        ...candidate,
        vacancyId: vacancyId || undefined,
      }));
    },
    [updateCandidateInState]
  );

  const grantIntakeBonus = useCallback(
    (id: string) => {
      const candidate = candidates.find((item) => item.id === id);
      if (!candidate) return;

      const amount = getIntakeReward(getCandidateDifficulty(candidate));
      setCashStatus(id, "intake_goedgekeurd");
      setRewards((r) => ({
        ...r,
        cashEarned: r.cashEarned + amount,
        cashPending: Math.max(0, r.cashPending - amount),
      }));
      setStats((s) => ({ ...s, totalReward: s.totalReward + amount }));
      if (candidate.referredBy === CURRENT_USER) {
        updateLeaderboardReward(amount);
      }

      if (candidate.referredBy === CURRENT_USER) {
        const cashNotice = getCashNotification(
          candidate.name,
          "intake_goedgekeurd",
          amount
        );
        if (cashNotice) {
          pushNotification({
            kind: cashNotice.kind,
            title: cashNotice.title,
            message: cashNotice.message,
          });
        }
      }
    },
    [
      candidates,
      getCandidateDifficulty,
      pushNotification,
      setCashStatus,
      updateLeaderboardReward,
    ]
  );

  const grantPlacementBonus = useCallback(
    (id: string) => {
      const candidate = candidates.find((item) => item.id === id);
      if (!candidate) return;

      const amount = getMatchReward(
        getCandidateDifficulty(candidate),
        candidate.referredBy === CURRENT_USER ? xp : 0
      );
      setCashStatus(id, "plaatsing_goedgekeurd");
      setRewards((r) => ({
        ...r,
        cashEarned: r.cashEarned + amount,
        cashPending: Math.max(0, r.cashPending - amount),
      }));
      setStats((s) => ({ ...s, totalReward: s.totalReward + amount }));
      if (candidate.referredBy === CURRENT_USER) {
        updateLeaderboardReward(amount);
      }

      if (candidate.referredBy === CURRENT_USER) {
        const cashNotice = getCashNotification(
          candidate.name,
          "plaatsing_goedgekeurd",
          amount
        );
        if (cashNotice) {
          pushNotification({
            kind: cashNotice.kind,
            title: cashNotice.title,
            message: cashNotice.message,
          });
        }
      }
    },
    [
      candidates,
      getCandidateDifficulty,
      pushNotification,
      setCashStatus,
      updateLeaderboardReward,
      xp,
    ]
  );

  const grantRetentionBonus = useCallback(
    (id: string) => {
      const candidate = candidates.find((item) => item.id === id);
      if (!candidate) return;

      const amount = getKeeperBonusReward(
        getCandidateDifficulty(candidate),
        candidate.referredBy === CURRENT_USER ? xp : 0
      );
      setCashStatus(id, "retentie_goedgekeurd");
      setRewards((r) => ({
        ...r,
        cashEarned: r.cashEarned + amount,
      }));
      setStats((s) => ({ ...s, totalReward: s.totalReward + amount }));
      if (candidate.referredBy === CURRENT_USER) {
        updateLeaderboardReward(amount);
      }

      if (candidate.referredBy === CURRENT_USER) {
        const cashNotice = getCashNotification(
          candidate.name,
          "retentie_goedgekeurd",
          amount
        );
        if (cashNotice) {
          pushNotification({
            kind: cashNotice.kind,
            title: cashNotice.title,
            message: cashNotice.message,
          });
        }
      }
    },
    [
      candidates,
      getCandidateDifficulty,
      pushNotification,
      setCashStatus,
      updateLeaderboardReward,
      xp,
    ]
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
      notifications,
      candidates,
      activities,
      leaderboard,
      stats,
      referralProfile,
      rewards,
      challenges,
      vacancies,
      scoutScore,
      addVacancy,
      updateVacancy,
      assignCandidateVacancy,
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
      notifications,
      candidates,
      activities,
      leaderboard,
      stats,
      referralProfile,
      rewards,
      challenges,
      vacancies,
      scoutScore,
      addVacancy,
      updateVacancy,
      assignCandidateVacancy,
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
