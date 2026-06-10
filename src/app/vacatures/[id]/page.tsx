"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, MapPin } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useScout } from "@/context/ScoutContext";
import { getDifficultyRewards, KEEPER_BONUS } from "@/lib/vacancyRewards";
import { formatCurrency } from "@/lib/xp";

export default function VacatureDetailPage() {
  const params = useParams();
  const vacancyId = params.id as string;
  const { vacancies } = useScout();
  const vacancy = vacancies.find((item) => item.id === vacancyId);

  if (!vacancy) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-lg font-semibold text-fk-navy">Vacature niet gevonden.</p>
        <Link href="/vacatures" className="mt-4 inline-block text-fk-primary">
          Terug naar vacatures
        </Link>
      </div>
    );
  }

  const rewards = getDifficultyRewards(vacancy.difficulty);

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <Link
            href="/vacatures"
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-fk-primary hover:text-fk-navy"
          >
            <ArrowLeft size={16} />
            Terug naar vacatures
          </Link>

          <Card className="mb-6 border-fk-primary/15">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
                  {vacancy.sector}
                </p>
                <h1 className="mt-1 text-3xl font-extrabold text-fk-navy">
                  {vacancy.title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-fk-navy/55">
                  <MapPin size={14} />
                  {vacancy.location}
                </p>
              </div>
              <DifficultyBadge difficulty={vacancy.difficulty} />
            </div>

            <p className="text-base leading-relaxed text-fk-navy/75">
              {vacancy.description}
            </p>
          </Card>
        </FadeIn>

        <FadeIn delay={80}>
          <Card className="mb-6 border-emerald-200/60">
            <h2 className="mb-4 text-lg font-bold text-fk-navy">Cash beloningen</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between rounded-xl bg-fk-light px-4 py-3">
                <span className="text-fk-navy/70">Intake Reward</span>
                <span className="font-bold text-fk-navy">
                  {formatCurrency(rewards.intake)}
                </span>
              </div>
              <div className="flex justify-between rounded-xl bg-emerald-50 px-4 py-3">
                <span className="text-fk-navy/70">Match Reward</span>
                <span className="text-lg font-bold text-emerald-700">
                  {formatCurrency(rewards.match)}
                </span>
              </div>
              <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-fk-white to-amber-50/60 px-4 py-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-extrabold text-amber-900">
                      {KEEPER_BONUS.title}
                    </p>
                    <p className="mt-2 text-sm text-fk-navy/65">
                      {KEEPER_BONUS.description}
                    </p>
                  </div>
                  <p className="text-3xl font-extrabold text-amber-700">
                    {formatCurrency(rewards.keeper)}
                  </p>
                </div>
              </div>
              <div className="flex justify-between border-t border-fk-primary/10 pt-3 font-semibold text-fk-navy">
                <span>Totaal mogelijk</span>
                <span>{formatCurrency(rewards.total)}</span>
              </div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="flex flex-wrap gap-3">
            <Button href="/aandragen">Tip talent voor deze vacature</Button>
            <Button href="/rewards" variant="secondary">
              Bekijk beloningsmodel
            </Button>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
