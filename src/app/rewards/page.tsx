"use client";

import { ArrowRight, Banknote, Gift, Lock } from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import { CURRENT_USER } from "@/lib/mock-data";
import {
  getUserCashLabel,
  getUserStatusLabel,
} from "@/lib/recommendationStatus";
import { getDifficultyRewards } from "@/lib/vacancyRewards";
import { formatCurrency } from "@/lib/xp";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

export default function RewardsPage() {
  const { rewards, candidates, vacancies } = useScout();
  const animatedCash = useAnimatedNumber(rewards.cashEarned);

  const myReferrals = candidates.filter((c) => c.referredBy === CURRENT_USER);

  const pending = myReferrals.filter(
    (c) =>
      c.referralApproval !== "afgekeurd" &&
      c.status !== "proeftijd_gehaald" &&
      (c.cashStatus === "intake_in_behandeling" ||
        c.cashStatus === "plaatsing_in_behandeling" ||
        c.cashStatus === "geen_cash" ||
        c.cashStatus === "intake_goedgekeurd" ||
        c.cashStatus === "plaatsing_goedgekeurd")
  );

  const available = myReferrals.filter(
    (c) =>
      c.cashStatus === "retentie_goedgekeurd" || c.status === "proeftijd_gehaald"
  );

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <div className="mb-8">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-fk-primary-muted px-3 py-1 text-xs font-semibold text-fk-primary">
              <Gift size={14} />
              Beloningen
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-fk-navy sm:text-4xl">
              Jouw beloningen
            </h1>
            <p className="mt-2 max-w-xl text-fk-navy/55">
              Beloningen volgen echte voortgang. Een bedrag is pas vrijgespeeld
              wanneer een challenge is voltooid en de voorwaarden zijn
              gehaald.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={40}>
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card className="border-fk-primary/10 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-fk-navy/45">
                In behandeling
              </p>
              <p className="mt-1 text-2xl font-bold text-fk-navy">
                {formatCurrency(rewards.cashPending)}
              </p>
              <p className="mt-1 text-xs text-fk-navy/45">
                Mogelijke beloning — nog niet vrijgegeven
              </p>
            </Card>
            <Card className="border-emerald-200/70 bg-emerald-50/40 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800/70">
                Beschikbaar
              </p>
              <p className="mt-1 text-2xl font-bold text-emerald-800">
                {formatCurrency(animatedCash)}
              </p>
              <p className="mt-1 text-xs text-emerald-900/50">
                Vrijgespeeld of klaar voor uitbetaling
              </p>
            </Card>
            <Card className="border-fk-primary/10 px-4 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-fk-navy/45">
                Uitbetaald
              </p>
              <p className="mt-1 text-2xl font-bold text-fk-navy">
                {formatCurrency(0)}
              </p>
              <p className="mt-1 text-xs text-fk-navy/45">
                Al overgemaakt naar jou
              </p>
            </Card>
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <section className="mb-8">
            <h2 className="mb-3 text-lg font-bold text-fk-navy">
              In behandeling
            </h2>
            {pending.length === 0 ? (
              <Card className="border-fk-primary/10 py-8 text-center text-sm text-fk-navy/55">
                Geen beloningen in behandeling. Start een challenge en
                introduceer iemand.
              </Card>
            ) : (
              <div className="space-y-3">
                {pending.map((candidate) => {
                  const vacancy = candidate.vacancyId
                    ? vacancies.find((v) => v.id === candidate.vacancyId)
                    : undefined;
                  const amount = vacancy
                    ? getDifficultyRewards(vacancy.difficulty).total
                    : 0;
                  return (
                    <Card
                      key={candidate.id}
                      className="border-fk-primary/10 px-4 py-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-amber-700">
                            <Lock size={12} />
                            Mogelijke beloning
                          </p>
                          <p className="mt-1 text-xl font-bold text-fk-navy">
                            {amount > 0
                              ? formatCurrency(amount)
                              : "Nog te bepalen"}
                          </p>
                          <p className="mt-1 text-sm font-medium text-fk-navy">
                            {candidate.name}
                          </p>
                          <p className="text-sm text-fk-navy/55">
                            {vacancy?.title ?? candidate.sector} ·{" "}
                            {getUserStatusLabel(candidate)}
                          </p>
                          <p className="mt-2 text-xs text-fk-navy/45">
                            Wordt vrijgegeven wanneer de kandidaat start en aan
                            de voorwaarden voldoet.
                          </p>
                        </div>
                        <Link
                          href="/aandragen"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-fk-primary"
                        >
                          Bekijk voortgang
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </section>
        </FadeIn>

        <FadeIn delay={110}>
          <section className="mb-8">
            <h2 className="mb-3 text-lg font-bold text-fk-navy">Beschikbaar</h2>
            {available.length === 0 && rewards.cashEarned === 0 ? (
              <Card className="border-fk-primary/10 py-8 text-center text-sm text-fk-navy/55">
                Nog geen beloningen vrijgespeeld. Voltooi een challenge om hier
                iets te zien.
              </Card>
            ) : (
              <div className="space-y-3">
                {available.map((candidate) => {
                  const vacancy = candidate.vacancyId
                    ? vacancies.find((v) => v.id === candidate.vacancyId)
                    : undefined;
                  const amount = vacancy
                    ? getDifficultyRewards(vacancy.difficulty).total
                    : rewards.cashEarned;
                  return (
                    <Card
                      key={candidate.id}
                      className="border-emerald-200/60 bg-emerald-50/30 px-4 py-4"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800/70">
                        Beloning vrijgespeeld
                      </p>
                      <p className="mt-1 text-2xl font-bold text-emerald-800">
                        {formatCurrency(amount)}
                      </p>
                      <p className="mt-1 text-sm font-medium text-fk-navy">
                        {candidate.name}
                      </p>
                      <p className="text-sm text-fk-navy/55">
                        {vacancy?.title ?? candidate.sector}
                      </p>
                      <p className="mt-2 text-xs text-fk-navy/45">
                        {getUserCashLabel(candidate.cashStatus) ??
                          "Beschikbaar voor uitbetaling"}
                      </p>
                    </Card>
                  );
                })}
                {available.length === 0 && rewards.cashEarned > 0 && (
                  <Card className="border-emerald-200/60 bg-emerald-50/30 px-4 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800/70">
                      Beschikbaar
                    </p>
                    <p className="mt-1 text-2xl font-bold text-emerald-800">
                      {formatCurrency(rewards.cashEarned)}
                    </p>
                    <p className="mt-2 text-sm text-fk-navy/55">
                      Beschikbaar voor uitbetaling
                    </p>
                  </Card>
                )}
              </div>
            )}
          </section>
        </FadeIn>

        <FadeIn delay={140}>
          <section className="mb-10">
            <h2 className="mb-3 text-lg font-bold text-fk-navy">Uitbetaald</h2>
            <Card className="border-fk-primary/10 py-8 text-center text-sm text-fk-navy/55">
              Nog geen uitbetalingen. Vrijgespeelde beloningen verschijnen hier
              nadat ze zijn overgemaakt.
            </Card>
          </section>
        </FadeIn>

        <FadeIn delay={160}>
          <Card className="border-fk-primary/10 text-center">
            <Banknote className="mx-auto text-fk-primary" size={28} />
            <p className="mt-3 text-lg font-bold text-fk-navy">
              Klaar voor een nieuwe challenge?
            </p>
            <p className="mt-1 text-sm text-fk-navy/55">
              Ontdek open challenges of volg je actieve introducties.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button href="/vacatures">Ontdek challenges</Button>
              <Button href="/aandragen" variant="secondary">
                Mijn introducties
              </Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
