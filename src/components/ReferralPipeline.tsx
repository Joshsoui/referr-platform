"use client";

import { ArrowRight, Euro, UserPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatRelativeTimeNl } from "@/lib/activityMoments";
import {
  getNextStepLabel,
  getUserCashLabel,
  getUserJourneyIndex,
  getUserStatusLabel,
  USER_JOURNEY_STEPS,
} from "@/lib/recommendationStatus";
import type { Candidate } from "@/types";

function userStatusVariant(
  candidate: Candidate
): "default" | "success" | "warning" | "info" {
  if (candidate.referralApproval === "afgekeurd") return "warning";

  const index = getUserJourneyIndex(candidate);
  if (index >= 5) return "success";
  if (index >= 3) return "info";
  if (index >= 1) return "info";
  return "default";
}

function cashBadgeVariant(
  cashStatus: Candidate["cashStatus"]
): "default" | "success" | "warning" | "info" {
  if (cashStatus === "retentie_goedgekeurd") return "success";
  if (cashStatus === "afgekeurd") return "warning";
  if (cashStatus === "geen_cash") return "default";
  return "info";
}

function PipelineSteps({ candidate }: { candidate: Candidate }) {
  const currentIndex = getUserJourneyIndex(candidate);

  if (currentIndex < 0) {
    return (
      <p className="mt-3 text-sm font-medium text-amber-700">
        Deze introductie is niet geaccepteerd en wordt niet verder verwerkt.
      </p>
    );
  }

  return (
    <div className="mt-3">
      <div className="flex items-center gap-1">
        {USER_JOURNEY_STEPS.map((step, index) => {
          const done = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step} className="flex min-w-0 flex-1 items-center gap-1">
              <div
                className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                  done ? "bg-fk-primary" : "bg-fk-primary/15"
                } ${
                  isCurrent
                    ? "animate-pulse ring-2 ring-fk-primary/30 ring-offset-1"
                    : ""
                }`}
                title={step}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 hidden justify-between gap-1 text-[10px] font-medium text-fk-navy/45 sm:flex">
        {USER_JOURNEY_STEPS.map((step, index) => (
          <span
            key={step}
            className={`min-w-0 flex-1 truncate text-center ${
              index === currentIndex ? "font-bold text-fk-primary" : ""
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

interface ReferralPipelineProps {
  candidates: Candidate[];
}

export function ReferralPipeline({ candidates }: ReferralPipelineProps) {
  const sorted = [...candidates].sort((a, b) => {
    const aIndex = getUserJourneyIndex(a);
    const bIndex = getUserJourneyIndex(b);
    if (aIndex !== bIndex) return bIndex - aIndex;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  if (sorted.length === 0) {
    return (
      <Card className="mb-8 overflow-hidden border-2 border-fk-primary/20 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-fk-primary/15 to-fk-secondary/10 text-fk-primary shadow-sm">
          <UserPlus size={24} />
        </div>
        <h2 className="text-xl font-bold text-fk-navy">Nog geen introducties</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-fk-navy/60">
          Introduceer iemand uit je netwerk en volg hier de voortgang tot
          gesprek, plaatsing en beloning.
        </p>
        <div className="mt-6">
          <Button href="/aandragen?nieuw=1">Start introductie</Button>
        </div>
      </Card>
    );
  }

  const movingCount = sorted.filter(
    (c) =>
      c.referralApproval !== "afgekeurd" && c.status !== "proeftijd_gehaald"
  ).length;

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border-2 border-fk-primary/20 bg-gradient-to-br from-fk-white via-fk-white to-fk-primary/5 shadow-md">
      <div className="border-b border-fk-primary/10 bg-fk-primary/5 px-6 py-4 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Euro size={20} className="text-emerald-600" />
            <div>
              <h2 className="text-xl font-extrabold text-fk-navy">
                Jouw introducties
              </h2>
              <p className="text-sm text-fk-navy/55">
                {movingCount} in beweging · volg tot beloning
              </p>
            </div>
          </div>
          <Button href="/aandragen" variant="outline" className="text-sm">
            Nieuwe introductie
          </Button>
        </div>
      </div>

      <div className="space-y-4 p-6 sm:p-8">
        {sorted.map((candidate) => {
          const statusLabel = getUserStatusLabel(candidate);
          const cashLabel = getUserCashLabel(candidate.cashStatus);
          const nextStep = getNextStepLabel(candidate);

          return (
            <div
              key={candidate.id}
              className="rounded-xl border border-fk-primary/10 bg-fk-white p-4 shadow-sm transition-all duration-300 hover:border-fk-primary/25 hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-bold text-fk-navy">{candidate.name}</p>
                  <p className="text-sm text-fk-navy/55">
                    {candidate.sector}
                    <span className="mx-1.5 text-fk-navy/25">·</span>
                    {formatRelativeTimeNl(candidate.createdAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant={userStatusVariant(candidate)}>
                    {statusLabel}
                  </Badge>
                  {cashLabel && (
                    <Badge variant={cashBadgeVariant(candidate.cashStatus)}>
                      {cashLabel}
                    </Badge>
                  )}
                </div>
              </div>

              <PipelineSteps candidate={candidate} />

              <div className="mt-3 text-sm">
                {nextStep ? (
                  <p className="text-fk-navy/65">
                    <span className="font-medium text-fk-navy">
                      Volgende stap:
                    </span>{" "}
                    {nextStep}
                  </p>
                ) : candidate.referralApproval === "afgekeurd" ? null : (
                  <p className="font-medium text-emerald-700">
                    Traject afgerond — alle stappen doorlopen
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="border-t border-fk-primary/10 bg-fk-light/50 px-6 py-4 text-center text-sm text-fk-navy/50 sm:px-8">
        Nieuwe challenges ontdekken?{" "}
        <Link
          href="/vacatures"
          className="inline-flex items-center gap-1 font-semibold text-fk-primary hover:text-fk-navy"
        >
          Bekijk challenges
          <ArrowRight size={14} />
        </Link>
      </p>
    </div>
  );
}
