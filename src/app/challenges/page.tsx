"use client";

import Link from "next/link";
import { CheckCircle2, Clock3, Target, Trophy, Wallet } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { ChallengeCard } from "@/components/ChallengeCard";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import { useScout } from "@/context/ScoutContext";
import { getActiveMissions, getCompletedMissions } from "@/lib/missions";
import { MISSION_STATS } from "@/lib/mockChallenges";

export default function ChallengesPage() {
  const { challenges } = useScout();
  const activeMissions = getActiveMissions(challenges);
  const completedMissions = getCompletedMissions(challenges);

  const stats = [
    {
      icon: Clock3,
      label: "Bezig",
      value: activeMissions.length.toString(),
    },
    {
      icon: Target,
      label: "Introducties",
      value: MISSION_STATS.talentsTipped.toString(),
    },
    {
      icon: Wallet,
      label: "Volgende focus",
      value: "Beloning",
    },
    {
      icon: CheckCircle2,
      label: "Behaalde mijlpalen",
      value: completedMissions.length.toString(),
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
                  Voortgang
                </p>
                <h1 className="text-3xl font-extrabold sm:text-4xl">
                  Jouw mijlpalen
                  <GradientText
                    variant="flame-light"
                    as="span"
                    className="mt-2 block text-2xl sm:text-3xl"
                  >
                    Echte voortgang. Echte erkenning.
                  </GradientText>
                </h1>
                <p className="mt-4 max-w-2xl text-base text-fk-white/90">
                  Deze mijlpalen volgen jouw echte reis: van eerste introductie
                  tot gesprek, plaatsing en uitbetaalde beloning.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm"
                    >
                      <stat.icon size={16} className="mb-1 text-fk-white/70" />
                      <p className="text-xs text-fk-white/60">{stat.label}</p>
                      <p className="text-lg font-extrabold tabular-nums">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={80}>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-fk-navy">Bezig</h2>
            <p className="text-sm text-fk-navy/55">
              {activeMissions.length} open mijlpalen
            </p>
          </div>
          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            {activeMissions.map((challenge) => (
              <ChallengeCard key={challenge.id} challenge={challenge} />
            ))}
          </div>
        </FadeIn>

        {completedMissions.length > 0 && (
          <FadeIn delay={120}>
            <div className="mb-6 flex items-center gap-2">
              <Trophy size={20} className="text-fk-primary" />
              <h2 className="text-xl font-extrabold text-fk-navy">Behaald</h2>
            </div>
            <div className="mb-10 grid gap-4 sm:grid-cols-2">
              {completedMissions.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          </FadeIn>
        )}

        <FadeIn delay={160}>
          <Card className="border-fk-primary/15 bg-fk-primary-muted/30 p-6 text-center">
            <p className="font-bold text-fk-navy">
              Mijlpalen worden automatisch bijgewerkt
            </p>
            <p className="mt-2 text-sm text-fk-navy/60">
              Geen losse quests of seizoensacties. Alleen tastbare voortgang in
              jouw echte introducties.
            </p>
            <Button href="/aandragen" className="mt-4">
              Draag iemand aan
            </Button>
          </Card>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mt-6 text-center text-sm text-fk-navy/55">
            Meer context over beloningen en reputatie vind je op{" "}
            <Link
              href="/levels"
              className="font-semibold text-fk-primary hover:text-fk-navy"
            >
              je profiel
            </Link>
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
