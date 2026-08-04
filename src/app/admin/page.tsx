"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, Shield } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { TipReviewCard } from "@/components/admin/TipReviewCard";
import { VacancyManager } from "@/components/admin/VacancyManager";
import { getNextStatus, useScout } from "@/context/ScoutContext";
import {
  getIntakeReward,
  getKeeperBonusReward,
  getMatchReward,
} from "@/lib/vacancyRewards";
import type { CandidateStatus } from "@/types";

type TipFilter = "alle" | "nieuw" | "in_behandeling" | "beloning" | "geplaatst";

const FILTERS: Array<{ id: TipFilter; label: string }> = [
  { id: "alle", label: "Alle tips" },
  { id: "nieuw", label: "Nieuw" },
  { id: "in_behandeling", label: "In behandeling" },
  { id: "beloning", label: "Beloning open" },
  { id: "geplaatst", label: "Geplaatst" },
];

function matchesFilter(
  status: CandidateStatus,
  cashStatus: string,
  approval: string,
  filter: TipFilter
): boolean {
  switch (filter) {
    case "nieuw":
      return status === "nieuw" || approval === "pending";
    case "in_behandeling":
      return status === "intake_gepland" || status === "voorgesteld";
    case "beloning":
      return (
        cashStatus.includes("in_behandeling") ||
        cashStatus === "intake_goedgekeurd" ||
        cashStatus === "plaatsing_goedgekeurd"
      );
    case "geplaatst":
      return status === "geplaatst" || status === "proeftijd_gehaald";
    default:
      return true;
  }
}

export default function AdminPage() {
  const {
    candidates,
    updateCandidateStatus,
    approveReferral,
    rejectReferral,
    markDuplicate,
    setCashStatus,
    grantIntakeBonus,
    grantPlacementBonus,
    grantRetentionBonus,
    vacancies,
    assignCandidateVacancy,
    xp,
  } = useScout();
  const [flashingId, setFlashingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<TipFilter>("alle");

  const stats = useMemo(() => {
    const pendingApproval = candidates.filter(
      (c) => c.referralApproval === "pending"
    ).length;
    const openReward = candidates.filter(
      (c) =>
        c.cashStatus.includes("in_behandeling") ||
        c.cashStatus === "intake_goedgekeurd" ||
        c.cashStatus === "plaatsing_goedgekeurd"
    ).length;
    const placed = candidates.filter(
      (c) => c.status === "geplaatst" || c.status === "proeftijd_gehaald"
    ).length;
    return {
      total: candidates.length,
      pendingApproval,
      openReward,
      placed,
    };
  }, [candidates]);

  const visible = useMemo(
    () =>
      candidates.filter((c) =>
        matchesFilter(c.status, c.cashStatus, c.referralApproval, filter)
      ),
    [candidates, filter]
  );

  async function handleStatusUpdate(id: string, status: CandidateStatus) {
    setUpdatingId(id);
    await new Promise((r) => setTimeout(r, 400));
    updateCandidateStatus(id, status);
    setUpdatingId(null);
    setFlashingId(id);
    setTimeout(() => setFlashingId(null), 1200);
  }

  function flash(id: string, action: () => void) {
    action();
    setFlashingId(id);
    setTimeout(() => setFlashingId(null), 1200);
  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,_rgba(255,77,89,0.08),_transparent_60%)]"
      />
      <div className="relative mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fk-navy text-fk-white shadow-md">
                <Shield size={22} />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-fk-navy">
                  Beheeromgeving
                </h1>
                <p className="text-fk-navy/60">
                  Tips beoordelen, challenges koppelen en beloningen toekennen
                </p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  <a
                    href="/recruitment"
                    className="font-medium text-fk-primary hover:underline"
                  >
                    Portal dashboard
                  </a>
                  <a
                    href="/admin/payouts"
                    className="font-medium text-fk-navy/55 hover:underline"
                  >
                    IBAN-uitbetalingen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={60}>
          <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Tips totaal", value: stats.total },
              { label: "Wacht op goedkeuring", value: stats.pendingApproval },
              { label: "Beloning open", value: stats.openReward },
              { label: "Geplaatst", value: stats.placed },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-fk-navy/[0.06] bg-fk-white/90 px-4 py-3 shadow-sm backdrop-blur-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fk-navy/40">
                  {item.label}
                </p>
                <p className="mt-1 text-2xl font-extrabold tracking-tight text-fk-navy">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <VacancyManager />
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mb-4 mt-10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <LayoutGrid size={16} className="text-fk-navy/40" />
              <h2 className="text-lg font-bold tracking-[-0.02em] text-fk-navy">
                Tips
              </h2>
              <span className="rounded-full bg-fk-navy/5 px-2 py-0.5 text-xs font-semibold text-fk-navy/55">
                {visible.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {FILTERS.map((item) => {
                const active = filter === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFilter(item.id)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      active
                        ? "bg-fk-navy text-white shadow-sm"
                        : "bg-fk-white text-fk-navy/60 ring-1 ring-fk-navy/10 hover:text-fk-navy"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {visible.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-fk-navy/15 bg-fk-white/70 px-6 py-14 text-center">
              <p className="text-sm font-medium text-fk-navy/55">
                Geen tips in deze filter.
              </p>
            </div>
          ) : (
            visible.map((candidate, index) => {
              const nextStatus = getNextStatus(candidate.status);
              const vacancy = vacancies.find(
                (item) => item.id === candidate.vacancyId
              );
              const difficulty = vacancy?.difficulty ?? "easy";
              const conversationReward = getIntakeReward(difficulty);
              const placementReward = getMatchReward(difficulty, xp);
              const retentionReward = getKeeperBonusReward(difficulty, xp);

              return (
                <TipReviewCard
                  key={candidate.id}
                  candidate={candidate}
                  vacancy={vacancy}
                  conversationReward={conversationReward}
                  placementReward={placementReward}
                  retentionReward={retentionReward}
                  nextStatus={nextStatus}
                  isFlashing={flashingId === candidate.id}
                  isUpdating={updatingId === candidate.id}
                  index={index}
                  vacancies={vacancies}
                  onApprove={() =>
                    flash(candidate.id, () => approveReferral(candidate.id))
                  }
                  onReject={() =>
                    flash(candidate.id, () => rejectReferral(candidate.id))
                  }
                  onDuplicate={() =>
                    flash(candidate.id, () => markDuplicate(candidate.id))
                  }
                  onAssignVacancy={(vacancyId) =>
                    assignCandidateVacancy(candidate.id, vacancyId)
                  }
                  onGrantConversation={() =>
                    flash(candidate.id, () => {
                      setCashStatus(candidate.id, "intake_in_behandeling");
                      grantIntakeBonus(candidate.id);
                    })
                  }
                  onGrantPlacement={() =>
                    flash(candidate.id, () =>
                      grantPlacementBonus(candidate.id)
                    )
                  }
                  onGrantRetention={() =>
                    flash(candidate.id, () =>
                      grantRetentionBonus(candidate.id)
                    )
                  }
                  onCashStatus={(status) =>
                    setCashStatus(candidate.id, status)
                  }
                  onAdvanceStatus={() => {
                    if (nextStatus) {
                      void handleStatusUpdate(candidate.id, nextStatus);
                    }
                  }}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
