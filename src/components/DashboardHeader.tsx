"use client";

import Link from "next/link";
import {
  ArrowRight,
  HelpCircle,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { CHALLENGES } from "@/lib/mockChallenges";
import { LEVEL_DEFINITIONS } from "@/lib/mockLevels";
import { getLevelForXp, getLevelProgress } from "@/lib/xp";

interface DashboardHeaderProps {
  userName: string;
  xp: number;
  scoutScore: number;
  regionRank: number;
  region: string;
  xpPulse?: number;
}

export function DashboardHeader({
  userName,
  xp,
  scoutScore,
  regionRank,
  region,
  xpPulse = 0,
}: DashboardHeaderProps) {
  const level = getLevelForXp(xp);
  const levelDef = LEVEL_DEFINITIONS.find((l) => l.name === level.name);
  const { next, xpToNext, progress } = getLevelProgress(xp);
  const animatedXp = useAnimatedNumber(xp);
  const wkMission = CHALLENGES.find((c) => c.id === "wk-scout-league");
  const missionRemaining = wkMission
    ? wkMission.target - wkMission.current
    : 0;

  const progressTitle = next
    ? `Nog ${xpToNext.toLocaleString("nl-NL")} XP tot ${next.name}`
    : "Maximaal level bereikt";

  const progressSubtitle =
    missionRemaining > 0
      ? `Nog ${missionRemaining} talent${missionRemaining === 1 ? "" : "en"} nodig voor jouw volgende Finderz Mission`
      : undefined;

  return (
    <div className="mb-8">
      <FadeIn>
        <Card variant="highlight" className="overflow-hidden border-0 p-0">
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-fk-white/10 blur-3xl" />
            <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-fk-white/5 blur-2xl" />

            <div className="relative">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-medium text-fk-white/70">
                    Welkom terug, {userName.split(" ")[0]}
                  </p>
                  <h1 className="mt-1 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                    Iedereen kent talent.
                  </h1>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-fk-white/90 sm:text-lg">
                    Met het Finderz Network tip je talent uit jouw netwerk, bouw
                    je reputatie op en verdien je beloningen voor succesvolle
                    matches.
                  </p>
                </div>
                <div className="flex h-20 w-20 shrink-0 animate-pulse-glow items-center justify-center rounded-2xl border-2 border-fk-white/30 bg-fk-white/15 text-4xl backdrop-blur-sm">
                  {levelDef?.icon ?? "🔎"}
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { icon: Star, label: "Level", value: level.name },
                  {
                    icon: Zap,
                    label: "XP",
                    value: animatedXp.toLocaleString("nl-NL"),
                    pulse: true,
                  },
                  {
                    icon: TrendingUp,
                    label: "Finderz Score",
                    value: `${scoutScore}/100`,
                  },
                  {
                    icon: Trophy,
                    label: "Ranking",
                    value: `#${regionRank} ${region}`,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <stat.icon size={16} className="mb-1 text-fk-white/70" />
                    <p className="text-xs text-fk-white/60">{stat.label}</p>
                    <p
                      key={stat.pulse ? xpPulse : stat.label}
                      className={`font-bold tabular-nums ${stat.pulse ? "animate-xp-pop" : ""}`}
                    >
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mb-6 rounded-2xl border border-fk-white/25 bg-fk-white/10 p-5 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2">
                  <Target size={18} className="text-fk-white/80" />
                  <p className="font-bold">{progressTitle}</p>
                </div>
                {next && (
                  <div className="relative mb-3 h-3 overflow-hidden rounded-full bg-fk-white/20">
                    <div
                      className="progress-shine h-full rounded-full bg-gradient-to-r from-fk-white/90 to-fk-white/50 transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
                {progressSubtitle && (
                  <p className="flex items-center gap-1.5 text-sm text-fk-white/85">
                    <Sparkles size={14} />
                    {progressSubtitle}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Button href="/aandragen" variant="inverse">
                  Tip Talent
                </Button>
                <Button href="/challenges" variant="on-dark">
                  Bekijk Finderz Missions
                </Button>
                <Button href="/why-finder" variant="on-dark-outline">
                  <HelpCircle size={18} />
                  Waarom Finder worden?
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={80}>
        <p className="mt-4 text-center text-sm text-fk-navy/55">
          Nieuw bij het Finderz Network?{" "}
          <Link
            href="/why-finder"
            className="inline-flex items-center gap-1 font-semibold text-fk-primary hover:text-fk-navy"
          >
            Ontdek hoe het werkt
            <ArrowRight size={14} />
          </Link>
        </p>
      </FadeIn>
    </div>
  );
}
