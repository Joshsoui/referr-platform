"use client";

import Link from "next/link";
import { Calendar, Target, Trophy, Users, Zap } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ChallengeCard } from "@/components/ChallengeCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CHALLENGES, WK_LEAGUE_STATS } from "@/lib/mockChallenges";

export default function ChallengesPage() {
  const stats = [
    {
      icon: Users,
      label: "Actieve Finders",
      value: WK_LEAGUE_STATS.activeFinders.toLocaleString("nl-NL"),
    },
    {
      icon: Target,
      label: "Talenten getipt",
      value: WK_LEAGUE_STATS.talentsTipped.toString(),
    },
    {
      icon: Zap,
      label: "Totaal verdiende XP",
      value: WK_LEAGUE_STATS.totalXpEarned.toLocaleString("nl-NL"),
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <Card variant="highlight" className="mb-8 overflow-hidden border-0 p-0">
            <div className="relative p-8 sm:p-10">
              <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-fk-white/10 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-fk-white/5 blur-2xl" />

              <div className="relative">
                <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-fk-white/70">
                  🎯 Finderz Missions
                </p>
                <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
                  Finderz Missions
                </h1>
                <p className="mt-4 max-w-2xl text-base text-fk-white/90 sm:text-lg">
                  Voltooi missies, verdien XP en stijg in de Finderz League.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-fk-white/25 bg-fk-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                  <Calendar size={16} />
                  Periode: {WK_LEAGUE_STATS.period}
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-4 backdrop-blur-sm"
                    >
                      <stat.icon size={20} className="mb-2 text-fk-white/70" />
                      <p className="text-2xl font-extrabold tabular-nums">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-fk-white/75">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button href="/leaderboard" variant="inverse">
                    <Trophy size={18} />
                    Bekijk Finderz League
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-fk-primary-muted text-fk-primary">
              <Target size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-fk-navy">
                Actieve Finderz Missions
              </h2>
              <p className="text-sm text-fk-navy/60">
                Tip talent. Maak impact. Verdien XP.
              </p>
            </div>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {CHALLENGES.map((challenge, i) => (
            <FadeIn key={challenge.id} delay={150 + i * 60}>
              <ChallengeCard challenge={challenge} />
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={500}>
          <div className="mt-8 text-center">
            <Link
              href="/aandragen"
              className="btn-press inline-flex items-center gap-2 rounded-xl bg-fk-primary px-6 py-3 text-sm font-semibold text-fk-white shadow-md"
            >
              Tip Talent en verdien XP
            </Link>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
