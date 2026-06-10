"use client";

import { ArrowRight, Shield, Zap } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getNextStatus, useScout } from "@/context/ScoutContext";
import { CASH_STATUS_LABELS } from "@/lib/mockQualityRules";
import { getConfidenceLabel } from "@/lib/scoring";
import { STATUS_LABELS } from "@/lib/xp";
import type { CandidateStatus } from "@/types";
import type { CashStatus } from "@/types/incentives";

function statusVariant(
  status: CandidateStatus
): "default" | "success" | "warning" | "info" {
  switch (status) {
    case "proeftijd_gehaald":
    case "geplaatst":
      return "success";
    case "intake_gepland":
    case "voorgesteld":
      return "info";
    default:
      return "warning";
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
    revokeXp,
  } = useScout();
  const [flashingId, setFlashingId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

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
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fk-navy text-fk-white shadow-md">
              <Shield size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-fk-navy">Admin</h1>
              <p className="text-fk-navy/60">
                Beheer talenttips, XP, cash en kwaliteit
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="space-y-4">
            {candidates.map((candidate) => {
              const nextStatus = getNextStatus(candidate.status);
              const isFlashing = flashingId === candidate.id;
              const isUpdating = updatingId === candidate.id;

              return (
                <Card
                  key={candidate.id}
                  className={`p-0 overflow-hidden ${isFlashing ? "animate-row-flash" : ""}`}
                >
                  <div className="grid gap-0 lg:grid-cols-[1fr_auto]">
                    <div className="space-y-4 p-5 sm:p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-bold text-fk-navy">
                            {candidate.name}
                          </h3>
                          <p className="text-sm text-fk-navy/55">
                            Getipt door: {candidate.referredBy} · {candidate.sector}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={statusVariant(candidate.status)}>
                            {STATUS_LABELS[candidate.status]}
                          </Badge>
                          <Badge
                            variant={
                              candidate.referralApproval === "goedgekeurd"
                                ? "success"
                                : candidate.referralApproval === "afgekeurd"
                                  ? "warning"
                                  : "info"
                            }
                          >
                            {candidate.referralApproval}
                          </Badge>
                          {candidate.duplicateStatus !== "uniek" && (
                            <Badge variant="warning">
                              {candidate.duplicateStatus}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                        <div>
                          <p className="text-xs font-semibold uppercase text-fk-navy/45">LinkedIn</p>
                          <p className="truncate text-fk-navy">{candidate.linkedin || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase text-fk-navy/45">Contact</p>
                          <p className="text-fk-navy">{candidate.emailOrPhone || "—"}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase text-fk-navy/45">Relatie</p>
                          <p className="text-fk-navy">{candidate.relationship}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase text-fk-navy/45">
                            Talent Confidence Score
                          </p>
                          <p className="font-bold text-fk-primary">
                            {candidate.confidenceScore}/100 ·{" "}
                            {getConfidenceLabel(candidate.confidenceScore)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase text-fk-navy/45">XP</p>
                          <span className="inline-flex items-center gap-1 font-bold text-fk-primary">
                            <Zap size={14} />
                            {candidate.xpAwarded}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase text-fk-navy/45">Cash</p>
                          <p className="font-medium text-fk-navy">
                            {CASH_STATUS_LABELS[candidate.cashStatus]}
                          </p>
                        </div>
                      </div>

                      {candidate.recommendation && (
                        <p className="rounded-xl bg-fk-light px-4 py-3 text-sm text-fk-navy/70">
                          {candidate.recommendation}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2 border-t border-fk-primary/10 bg-fk-light/50 p-4 lg:w-72 lg:border-l lg:border-t-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-fk-secondary">
                        Acties
                      </p>
                      <button
                        type="button"
                        onClick={() => flash(candidate.id, () => approveReferral(candidate.id))}
                        className="rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
                      >
                        Tip goedkeuren
                      </button>
                      <button
                        type="button"
                        onClick={() => flash(candidate.id, () => rejectReferral(candidate.id))}
                        className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700"
                      >
                        Tip afkeuren
                      </button>
                      <button
                        type="button"
                        onClick={() => flash(candidate.id, () => markDuplicate(candidate.id))}
                        className="rounded-lg border border-fk-primary/20 bg-fk-white px-3 py-2 text-xs font-semibold text-fk-navy"
                      >
                        Markeer als duplicate
                      </button>
                      <hr className="border-fk-primary/10" />
                      <button
                        type="button"
                        onClick={() =>
                          flash(candidate.id, () => {
                            setCashStatus(candidate.id, "intake_in_behandeling");
                            grantIntakeBonus(candidate.id);
                          })
                        }
                        className="rounded-lg bg-fk-primary px-3 py-2 text-xs font-semibold text-white"
                      >
                        Ken intakebonus toe
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          flash(candidate.id, () => grantPlacementBonus(candidate.id))
                        }
                        className="rounded-lg bg-fk-primary px-3 py-2 text-xs font-semibold text-white"
                      >
                        Ken matchbonus toe
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          flash(candidate.id, () => grantRetentionBonus(candidate.id))
                        }
                        className="rounded-lg bg-fk-secondary px-3 py-2 text-xs font-semibold text-white"
                      >
                        Ken retentiebonus toe (€250)
                      </button>
                      <select
                        value={candidate.cashStatus}
                        onChange={(e) =>
                          setCashStatus(candidate.id, e.target.value as CashStatus)
                        }
                        className="rounded-lg border border-fk-primary/20 bg-fk-white px-2 py-2 text-xs"
                      >
                        {Object.entries(CASH_STATUS_LABELS).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => flash(candidate.id, () => revokeXp(candidate.id, 10))}
                        className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800"
                      >
                        Trek XP in
                      </button>
                      {nextStatus && (
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleStatusUpdate(candidate.id, nextStatus)}
                          className="btn-press mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg bg-fk-navy px-3 py-2 text-xs font-semibold text-white disabled:opacity-60"
                        >
                          {isUpdating ? "Bezig..." : (
                            <>
                              Status → {STATUS_LABELS[nextStatus]}
                              <ArrowRight size={14} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
