"use client";

import { ArrowRight, Shield, Zap } from "lucide-react";
import { useState } from "react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { getNextStatus, useScout } from "@/context/ScoutContext";
import { STATUS_LABELS } from "@/lib/xp";
import type { CandidateStatus } from "@/types";

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
  const { candidates, updateCandidateStatus } = useScout();
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

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fk-navy text-fk-white shadow-md">
              <Shield size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-fk-navy">Admin</h1>
              <p className="text-fk-navy/60">
                Beheer kandidaatstatus en ken XP toe
              </p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <Card className="overflow-hidden p-0">
            <div className="hidden overflow-x-auto lg:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-fk-primary/10 bg-fk-light">
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Kandidaat</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Aangedragen door</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Functie</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Status</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">XP toegekend</th>
                    <th className="px-6 py-4 font-semibold text-fk-navy/60">Actie</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate, i) => {
                    const nextStatus = getNextStatus(candidate.status);
                    const isFlashing = flashingId === candidate.id;
                    const isUpdating = updatingId === candidate.id;

                    return (
                      <tr
                        key={candidate.id}
                        className={`border-b border-fk-primary/5 transition-colors hover:bg-fk-light/50 ${
                          isFlashing ? "animate-row-flash" : ""
                        }`}
                        style={{ animationDelay: `${i * 40}ms` }}
                      >
                        <td className="px-6 py-4 font-medium text-fk-navy">
                          {candidate.name}
                        </td>
                        <td className="px-6 py-4 text-fk-navy/70">
                          {candidate.referredBy}
                        </td>
                        <td className="px-6 py-4 text-fk-navy/70">
                          {candidate.role}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={statusVariant(candidate.status)}>
                            {STATUS_LABELS[candidate.status]}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 font-bold text-fk-primary tabular-nums ${
                              isFlashing ? "animate-xp-pop" : ""
                            }`}
                          >
                            <Zap size={14} className="text-fk-secondary" />
                            {candidate.xpAwarded} XP
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {nextStatus ? (
                            <button
                              type="button"
                              disabled={isUpdating}
                              onClick={() =>
                                handleStatusUpdate(candidate.id, nextStatus)
                              }
                              className="btn-press inline-flex items-center gap-1.5 rounded-lg bg-fk-primary px-3 py-1.5 text-xs font-semibold text-fk-white transition hover:bg-fk-navy disabled:opacity-60"
                            >
                              {isUpdating ? (
                                <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                              ) : (
                                <>
                                  → {STATUS_LABELS[nextStatus]}
                                  <ArrowRight size={14} />
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="text-xs text-fk-navy/40">Voltooid</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-fk-primary/10 lg:hidden">
              {candidates.map((candidate) => {
                const nextStatus = getNextStatus(candidate.status);
                const isFlashing = flashingId === candidate.id;
                const isUpdating = updatingId === candidate.id;

                return (
                  <div
                    key={candidate.id}
                    className={`space-y-3 p-4 ${isFlashing ? "animate-row-flash" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-bold text-fk-navy">{candidate.name}</p>
                        <p className="text-sm text-fk-navy/55">{candidate.role}</p>
                      </div>
                      <Badge variant={statusVariant(candidate.status)}>
                        {STATUS_LABELS[candidate.status]}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-fk-navy/60">
                      <span>Door: {candidate.referredBy}</span>
                      <span className="font-bold text-fk-primary">
                        {candidate.xpAwarded} XP
                      </span>
                    </div>
                    {nextStatus && (
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() =>
                          handleStatusUpdate(candidate.id, nextStatus)
                        }
                        className="btn-press inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-fk-primary px-3 py-2 text-sm font-semibold text-fk-white disabled:opacity-60"
                      >
                        {isUpdating
                          ? "Bezig..."
                          : `Status → ${STATUS_LABELS[nextStatus]}`}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
