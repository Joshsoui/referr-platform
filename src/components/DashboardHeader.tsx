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
  const wkChallenge = CHALLENGES.find((c) => c.id === "wk-scout-league");
  const wkRemaining = wkChallenge
    ? wkChallenge.target - wkChallenge.current
    : 0;

  const progressTitle = next
    ? `Nog ${xpToNext.toLocaleString("nl-NL")} XP tot ${next.name}`
    : "Maximaal level bereikt";

  const progressSubtitle =
    wkRemaining > 0
      ? `Nog ${wkRemaining} kandidaat${wkRemaining === 1 ? "" : "en"} nodig voor de WK Scout League Challenge`
      : undefined;

  return (
    <div className="mb-8">
      <FadeIn delay={100}>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-fk-navy/50">Welkom terug</p>
            <h1 className="mt-1 text-3xl font-extrabold text-fk-navy sm:text-4xl">
              {userName}
            </h1>
            <p className="mt-1 text-sm font-semibold text-fk-primary">
              {level.name}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/aandragen">
              Kandidaat aandragen
            </Button>
            <Button href="/challenges" variant="secondary">
              Bekijk challenges
            </Button>
          </div>
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
            <p className="text-xs text-fk-navy/50">Scout Score</p>
            <p className="font-bold tabular-nums text-fk-navy">
              {scoutScore}/100
            </p>
          </Card>
          <Card className="p-4">
            <Trophy size={16} className="mb-1 text-fk-primary" />
            <p className="text-xs text-fk-navy/50">Ranking</p>
            <p className="font-bold text-fk-navy">
              #{regionRank} {region}
            </p>
          </Card>
        </div>
      </FadeIn>

      <FadeIn delay={180}>
        <Card variant="highlight" className="mb-4 border-0">
          <div className="flex items-start gap-3">
            <Target size={20} className="mt-0.5 shrink-0 text-fk-white/80" />
            <div className="flex-1">
              <p className="font-bold text-fk-white">{progressTitle}</p>
              {next && (
                <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-fk-white/20">
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
        </Card>
      </FadeIn>
    </div>
  );
}
