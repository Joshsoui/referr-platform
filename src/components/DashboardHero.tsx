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
import { CHALLENGES } from "@/lib/mockChallenges";
import { getLevelForXp, getLevelProgress } from "@/lib/xp";

interface DashboardHeroProps {
  userName: string;
  xp: number;
  scoutScore: number;
  regionRank: number;
  region: string;
}

export function DashboardHero({
  userName,
  xp,
  scoutScore,
  regionRank,
  region,
}: DashboardHeroProps) {
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
      <FadeIn>
        <Card
          variant="highlight"
          className="overflow-hidden border-0 p-0"
        >
          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-fk-white/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-fk-white/5 blur-2xl" />

            <div className="relative">
              <p className="mb-2 text-sm font-medium text-fk-white/70">
                Welkom terug, {userName.split(" ")[0]}
              </p>
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
                Iedereen kent talent.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-fk-white/90 sm:text-lg">
                Bouw jouw reputatie als Scout, help mensen aan een nieuwe
                uitdaging en verdien beloningen voor succesvolle matches.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                  <Star size={16} className="mb-1 text-fk-white/70" />
                  <p className="text-xs text-fk-white/60">Level</p>
                  <p className="font-bold">{level.name}</p>
                </div>
                <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                  <Zap size={16} className="mb-1 text-fk-white/70" />
                  <p className="text-xs text-fk-white/60">XP</p>
                  <p className="font-bold tabular-nums">
                    {xp.toLocaleString("nl-NL")}
                  </p>
                </div>
                <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                  <TrendingUp size={16} className="mb-1 text-fk-white/70" />
                  <p className="text-xs text-fk-white/60">Scout Score</p>
                  <p className="font-bold tabular-nums">{scoutScore}/100</p>
                </div>
                <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                  <Trophy size={16} className="mb-1 text-fk-white/70" />
                  <p className="text-xs text-fk-white/60">Ranking</p>
                  <p className="font-bold">#{regionRank} {region}</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-fk-white/25 bg-fk-white/10 p-5 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2">
                  <Target size={18} className="text-fk-white/80" />
                  <p className="font-bold text-fk-white">{progressTitle}</p>
                </div>
                {next && (
                  <div className="mb-3 h-3 overflow-hidden rounded-full bg-fk-white/20">
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

              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="/why-scout" variant="inverse">
                  <HelpCircle size={18} />
                  Waarom Scout worden?
                </Button>
                <Button href="/aandragen" variant="on-dark">
                  Kandidaat aandragen
                </Button>
                <Button href="/challenges" variant="on-dark-outline">
                  Bekijk challenges
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </FadeIn>

      <FadeIn delay={80}>
        <p className="mt-4 text-center text-sm text-fk-navy/55">
          Nieuw bij Scout Engine?{" "}
          <Link
            href="/why-scout"
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
