"use client";

import {
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
import { CHALLENGES } from "@/lib/mockChallenges";
import { getLevelForXp, getLevelProgress } from "@/lib/xp";

interface DashboardHeaderProps {
  userName: string;
  xp: number;
  scoutScore: number;
  regionRank: number;
  region: string;
}

export function DashboardHeader({
  userName,
  xp,
  scoutScore,
  regionRank,
  region,
}: DashboardHeaderProps) {
  const level = getLevelForXp(xp);
  const { next, xpToNext, progress } = getLevelProgress(xp);
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
      <FadeIn delay={100}>
        <div className="mb-6">
          <p className="text-sm font-medium text-fk-navy/50">Welkom terug</p>
          <h1 className="mt-1 text-3xl font-extrabold text-fk-navy sm:text-4xl">
            Iedereen kent talent.
          </h1>
          <p className="mt-3 max-w-2xl text-fk-navy/65">
            Met het Finderz Network tip je talent uit jouw netwerk, bouw je
            reputatie op en verdien je beloningen voor succesvolle matches.
          </p>
          <p className="mt-2 text-sm font-semibold text-fk-primary">
            {userName} · {level.name}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={140}>
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Card className="p-4">
            <Star size={16} className="mb-1 text-fk-primary" />
            <p className="text-xs text-fk-navy/50">Level</p>
            <p className="font-bold text-fk-navy">{level.name}</p>
          </Card>
          <Card className="p-4">
            <Zap size={16} className="mb-1 text-fk-primary" />
            <p className="text-xs text-fk-navy/50">XP</p>
            <p className="font-bold tabular-nums text-fk-navy">
              {xp.toLocaleString("nl-NL")}
            </p>
          </Card>
          <Card className="p-4">
            <TrendingUp size={16} className="mb-1 text-fk-primary" />
            <p className="text-xs text-fk-navy/50">Finderz Score</p>
            <p className="font-bold tabular-nums text-fk-navy">
              {scoutScore}/100
            </p>
          </Card>
          <Card className="p-4">
            <Trophy size={16} className="mb-1 text-fk-primary" />
            <p className="text-xs text-fk-navy/50">Ranking</p>
            <p className="font-bold text-fk-navy">
              #{regionRank} in de {region}
            </p>
          </Card>
        </div>
      </FadeIn>

      <FadeIn delay={160}>
        <div className="mb-4 flex flex-wrap gap-3">
          <Button href="/aandragen">Tip Talent</Button>
          <Button href="/challenges" variant="secondary">
            Bekijk Finderz Missions
          </Button>
          <Button href="/why-finder" variant="outline">
            Waarom Finder worden?
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={180}>
        <div className="relative mb-4 overflow-hidden rounded-2xl bg-gradient-to-r from-fk-navy via-fk-primary to-fk-secondary p-5 text-fk-white shadow-md">
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fk-white/10 blur-2xl"
            aria-hidden
          />
          <div className="relative flex items-start gap-3">
            <Target size={20} className="mt-0.5 shrink-0 text-fk-white/80" />
            <div className="flex-1">
              <p className="font-bold">{progressTitle}</p>
              {next && (
                <div className="relative mt-3 h-2.5 overflow-hidden rounded-full bg-fk-white/20">
                  <div
                    className="progress-shine h-full rounded-full bg-gradient-to-r from-fk-white/90 to-fk-white/50 transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
              {progressSubtitle && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-fk-white/85">
                  <Sparkles size={14} />
                  {progressSubtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
