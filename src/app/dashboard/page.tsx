"use client";

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ReferralPipeline } from "@/components/ReferralPipeline";
import { ChallengeCard } from "@/components/VacancyCard";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import {
  buildPersonalMoments,
} from "@/lib/activityMoments";
import { CURRENT_USER } from "@/lib/mock-data";
import {
  getNextStepLabel,
  getUserJourneyIndex,
  getUserStatusLabel,
  USER_JOURNEY_STEPS,
} from "@/lib/recommendationStatus";
import { formatCurrency } from "@/lib/xp";

const LAST_VISIT_KEY = "referr-last-visit";

export default function DashboardPage() {
  const { data: session } = useSession();
  const { currentUser, rewards, candidates, vacancies } = useScout();

  const displayName = session?.user?.firstName
    ? `${session.user.firstName} ${session.user.lastName ?? ""}`.trim()
    : currentUser;

  useEffect(() => {
    window.localStorage.setItem(LAST_VISIT_KEY, new Date().toISOString());
  }, []);

  const myReferrals = candidates.filter((c) => c.referredBy === CURRENT_USER);
  const activeReferrals = myReferrals.filter(
    (candidate) =>
      candidate.referralApproval !== "afgekeurd" &&
      candidate.status !== "proeftijd_gehaald"
  );
  const nearlyDone = activeReferrals.filter(
    (c) => c.status === "geplaatst" || c.status === "voorgesteld"
  );
  const nextActionCandidate =
    [...activeReferrals].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0] ?? myReferrals[0];

  const openVacancies = vacancies.filter((v) => v.status === "open");
  const moments = buildPersonalMoments(myReferrals).slice(0, 5);

  const activeVacancy = nextActionCandidate?.vacancyId
    ? vacancies.find((v) => v.id === nextActionCandidate.vacancyId)
    : openVacancies[0];

  const summary = [
    { label: "Actieve challenges", value: String(openVacancies.length) },
    {
      label: "Introducties in behandeling",
      value: String(activeReferrals.length),
    },
    { label: "Bijna voltooid", value: String(nearlyDone.length) },
    {
      label: "Beschikbare beloningen",
      value: formatCurrency(rewards.cashEarned),
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <DashboardHeader userName={displayName} />

        {session?.user && !session.user.emailVerifiedAt && (
          <Card className="mb-6 border-amber-200 bg-amber-50/50 p-4">
            <p className="text-sm text-amber-950">
              Bevestig je e-mailadres om alle accountfuncties te gebruiken.{" "}
              <Link
                href="/email-bevestigen"
                className="font-semibold text-fk-primary underline"
              >
                Naar bevestiging
              </Link>
            </p>
          </Card>
        )}

        <FadeIn delay={40}>
          <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {summary.map((item) => (
              <Card
                key={item.label}
                className="border-fk-primary/10 px-4 py-3.5"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-fk-navy/45">
                  {item.label}
                </p>
                <p className="mt-1 text-xl font-bold tracking-tight text-fk-navy">
                  {item.value}
                </p>
              </Card>
            ))}
          </div>
        </FadeIn>

        {nextActionCandidate && (
          <FadeIn delay={80}>
            <Card className="mb-8 border-fk-primary/15 bg-gradient-to-br from-fk-white via-fk-white to-fk-primary/5">
              <p className="text-xs font-bold uppercase tracking-wider text-fk-secondary">
                Actieve challenge
              </p>
              <h2 className="mt-2 text-xl font-bold text-fk-navy sm:text-2xl">
                {activeVacancy?.title ?? "Jouw introductie"}
              </h2>
              <p className="mt-1 text-sm font-medium text-fk-navy/60">
                {nextActionCandidate.name} ·{" "}
                {getUserStatusLabel(nextActionCandidate)}
              </p>
              {(() => {
                const journeyIndex = getUserJourneyIndex(nextActionCandidate);
                if (journeyIndex < 0) return null;
                return (
                  <div className="mt-4">
                    <div className="flex gap-1">
                      {USER_JOURNEY_STEPS.map((step, index) => (
                        <div
                          key={step}
                          className={`h-1.5 flex-1 rounded-full ${
                            index <= journeyIndex
                              ? "bg-fk-primary"
                              : "bg-fk-primary/15"
                          }`}
                          title={step}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-fk-navy/45">
                      {journeyIndex + 1} van {USER_JOURNEY_STEPS.length} stappen
                      · {USER_JOURNEY_STEPS[journeyIndex]}
                    </p>
                  </div>
                );
              })()}
              <p className="mt-3 text-sm text-fk-navy/55">
                {getNextStepLabel(nextActionCandidate)
                  ? `Volgende update: ${getNextStepLabel(nextActionCandidate)}`
                  : "Er zit beweging in je introductie."}
              </p>
              <Link
                href="/aandragen"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-fk-primary hover:text-fk-navy"
              >
                Bekijk voortgang
                <ArrowRight size={14} />
              </Link>
            </Card>
          </FadeIn>
        )}

        <FadeIn delay={100}>
          <div className="mb-3 flex items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-fk-navy">
                Nieuwe challenges voor jou
              </h2>
              <p className="mt-1 text-sm text-fk-navy/50">
                Misschien ken jij precies de persoon die hier past.
              </p>
            </div>
            <Link
              href="/vacatures"
              className="hidden text-sm font-semibold text-fk-primary sm:inline"
            >
              Alles bekijken
            </Link>
          </div>
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {openVacancies.slice(0, 3).map((vacancy) => {
              const intros = candidates.filter(
                (c) => c.vacancyId === vacancy.id
              ).length;
              return (
                <ChallengeCard
                  key={vacancy.id}
                  vacancy={vacancy}
                  mission={vacancy.description}
                  hours="32–40 uur"
                  activeIntroductions={intros > 0 ? intros : undefined}
                />
              );
            })}
          </div>
        </FadeIn>

        <div className="mb-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <FadeIn delay={140}>
            <ActivityTimeline
              moments={moments}
              title="Recente activiteit"
              subtitle="Wat er bewoog rond jouw introducties"
            />
          </FadeIn>
          <FadeIn delay={160}>
            <Card className="border-fk-primary/15">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-fk-secondary">
                Beloningen
              </p>
              <p className="text-2xl font-bold text-fk-navy">
                {formatCurrency(rewards.cashEarned)}
              </p>
              <p className="mt-1 text-sm text-fk-navy/50">
                Beschikbaar of recent vrijgespeeld
              </p>
              {rewards.cashPending > 0 && (
                <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-900">
                  In behandeling: {formatCurrency(rewards.cashPending)}
                </p>
              )}
              <Link
                href="/rewards"
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-fk-primary"
              >
                Bekijk beloningen
                <ArrowRight size={14} />
              </Link>
            </Card>
          </FadeIn>
        </div>

        <FadeIn delay={180}>
          <ReferralPipeline candidates={myReferrals} />
        </FadeIn>
      </div>
    </div>
  );
}
