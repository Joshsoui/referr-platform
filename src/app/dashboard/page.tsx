"use client";

import {
  Award,
  Euro,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useScout } from "@/context/ScoutContext";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { formatCurrency, getLevelForXp, getLevelProgress } from "@/lib/xp";

export default function DashboardPage() {
  const { currentUser, xp, xpPulse, activities, stats } = useScout();
  const level = getLevelForXp(xp);
  const { next, progress, xpToNext } = getLevelProgress(xp);
  const animatedXp = useAnimatedNumber(xp);
  const animatedCandidates = useAnimatedNumber(stats.candidatesReferred);
  const animatedPlacements = useAnimatedNumber(stats.successfulPlacements);

  const statCards = [
    {
      icon: Users,
      label: "Kandidaten aangedragen",
      value: animatedCandidates.toString(),
      delay: 200,
    },
    {
      icon: Target,
      label: "Succesvol geplaatst",
      value: animatedPlacements.toString(),
      delay: 280,
    },
    {
      icon: Euro,
      label: "Verdiende beloning",
      value: formatCurrency(stats.totalReward),
      delay: 360,
    },
    {
      icon: Trophy,
      label: `Ranking ${stats.region}`,
      value: `#${stats.regionRank}`,
      delay: 440,
    },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <Card
            variant="glass"
            className="mb-8 border-fk-primary/20"
            hover
          >
            <p className="text-center text-lg font-bold leading-snug text-fk-primary sm:text-xl">
              &ldquo;Wat als wij niet 5 recruiters hebben die zoeken, maar 500
              scouts die signaleren?&rdquo;
            </p>
          </Card>
        </FadeIn>

        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <FadeIn delay={100}>
            <div>
              <p className="text-sm font-medium text-fk-navy/50">Welkom terug</p>
              <h1 className="mt-1 text-3xl font-extrabold text-fk-navy sm:text-4xl">
                {currentUser}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-fk-primary px-4 py-1.5 text-sm font-bold text-fk-white shadow-md">
                  <Star size={14} />
                  {level.name}
                </span>
                <span
                  key={xpPulse}
                  className="inline-flex items-center gap-1.5 rounded-full border border-fk-primary/20 bg-fk-primary-muted px-4 py-1.5 text-sm font-bold text-fk-primary animate-xp-pop"
                >
                  <Zap size={16} />
                  {animatedXp.toLocaleString("nl-NL")} XP
                </span>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200} className="w-full lg:max-w-md">
            <Card hover>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-fk-navy/60">
                  Voortgang naar {next?.name ?? "max level"}
                </span>
                {next && (
                  <span className="text-fk-navy/50">
                    nog {xpToNext.toLocaleString("nl-NL")} XP
                  </span>
                )}
              </div>
              <ProgressBar progress={progress} />
            </Card>
          </FadeIn>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => (
            <FadeIn key={stat.label} delay={stat.delay}>
              <Card hover className="h-full">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-fk-primary-muted text-fk-primary transition-transform duration-300 hover:scale-110">
                  <stat.icon size={20} />
                </div>
                <p className="text-2xl font-extrabold text-fk-navy tabular-nums">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-fk-navy/55">{stat.label}</p>
              </Card>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={500}>
          <Card>
            <div className="mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-fk-primary" />
              <h2 className="text-xl font-bold text-fk-navy">
                Recente activiteiten
              </h2>
            </div>

            <div className="space-y-3">
              {activities.map((activity, i) => (
                <div
                  key={activity.id}
                  className={`flex items-center justify-between rounded-xl bg-fk-light px-4 py-3 transition-colors hover:bg-fk-primary/5 ${
                    i === 0 ? "animate-slide-in-right" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-fk-primary/10 text-fk-primary">
                      <Award size={16} />
                    </div>
                    <span className="text-sm font-medium text-fk-navy">
                      {activity.text}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    +{activity.xp} XP
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
