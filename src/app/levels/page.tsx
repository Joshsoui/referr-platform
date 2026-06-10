"use client";

import { Crown, Layers, TrendingUp, Zap } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { LevelOverview } from "@/components/LevelOverview";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useScout } from "@/context/ScoutContext";
import { LEVEL_DEFINITIONS } from "@/lib/mockLevels";
import { getLevelForXp, getLevelProgress } from "@/lib/xp";

export default function LevelsPage() {
  const { xp, scoutScore } = useScout();
  const currentLevel = getLevelForXp(xp);
  const { next, progress, xpToNext } = getLevelProgress(xp);
  const currentDef = LEVEL_DEFINITIONS.find((l) => l.name === currentLevel.name);
  const currentIndex = LEVEL_DEFINITIONS.findIndex(
    (l) => l.name === currentLevel.name
  );

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fk-primary text-fk-white shadow-md">
              <Layers size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-fk-navy">Levels</h1>
              <p className="text-fk-navy/60">
                Progressieladder met privileges per level
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Hero: current level badge */}
        <FadeIn delay={60}>
          <Card
            variant="highlight"
            className="mb-8 overflow-hidden border-0 p-0"
          >
            <div className="relative p-6 sm:p-8">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fk-white/10 blur-2xl" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 animate-pulse-glow items-center justify-center rounded-2xl border-2 border-fk-white/30 bg-fk-white/15 text-4xl backdrop-blur-sm">
                    {currentDef?.icon ?? "💎"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-fk-white/70">
                      Huidig level
                    </p>
                    <h2 className="text-2xl font-extrabold sm:text-3xl">
                      {currentLevel.name}
                    </h2>
                    <p className="mt-1 text-fk-white/80">{currentDef?.tagline}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:text-right">
                  <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                    <Zap size={16} className="mb-1 text-fk-white/70" />
                    <p className="text-xl font-extrabold tabular-nums">
                      {xp.toLocaleString("nl-NL")}
                    </p>
                    <p className="text-xs text-fk-white/70">XP</p>
                  </div>
                  <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-4 py-3 backdrop-blur-sm">
                    <TrendingUp size={16} className="mb-1 text-fk-white/70" />
                    <p className="text-xl font-extrabold tabular-nums">
                      {scoutScore}
                    </p>
                    <p className="text-xs text-fk-white/70">Scout Score</p>
                  </div>
                </div>
              </div>

              {next && (
                <div className="relative mt-6">
                  <div className="mb-2 flex justify-between text-sm text-fk-white/80">
                    <span>Level {currentIndex + 1} van {LEVEL_DEFINITIONS.length}</span>
                    <span>Nog {xpToNext.toLocaleString("nl-NL")} XP → {next.name}</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-fk-white/20">
                    <div
                      className="progress-shine h-full rounded-full bg-gradient-to-r from-fk-white/90 to-fk-white/60 transition-all duration-1000"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card>
        </FadeIn>

        {/* Mini level map */}
        <FadeIn delay={100}>
          <Card className="mb-8 border-fk-primary/15">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-fk-secondary">
              Jouw progressie
            </p>
            <div className="flex items-center justify-between gap-1">
              {LEVEL_DEFINITIONS.map((level, i) => {
                const unlocked = xp >= level.minXp;
                const active = level.name === currentLevel.name;
                return (
                  <div
                    key={level.id}
                    className="flex flex-1 flex-col items-center animate-fade-in-up"
                    style={{ animationDelay: `${i * 60}ms` }}
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg transition-all duration-300 sm:h-12 sm:w-12 ${
                        active
                          ? "scale-110 bg-fk-primary text-fk-white shadow-lg ring-4 ring-fk-primary/20"
                          : unlocked
                            ? "bg-fk-primary/10"
                            : "bg-fk-light opacity-50 grayscale"
                      }`}
                      title={level.name}
                    >
                      {level.icon}
                    </div>
                    <p
                      className={`mt-1.5 hidden text-center text-[10px] font-semibold sm:block ${
                        active ? "text-fk-primary" : "text-fk-navy/45"
                      }`}
                    >
                      {level.badgeLabel}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 hidden h-1.5 overflow-hidden rounded-full bg-fk-primary/10 sm:block">
              <ProgressBar progress={((currentIndex + progress / 100) / (LEVEL_DEFINITIONS.length - 1)) * 100} animated={false} />
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={120}>
          <Card variant="glass" className="mb-8 border-fk-primary/20">
            <div className="flex items-start gap-2">
              <Crown size={18} className="mt-0.5 shrink-0 text-amber-500" />
              <div>
                <p className="font-bold text-fk-navy">Waarom levelen?</p>
                <p className="mt-2 text-sm leading-relaxed text-fk-navy/65">
                  Hogere levels ontgrendelen meer privileges, status en
                  verdienpotentie. XP is geen geld — het opent deuren binnen het
                  Scout-ecosysteem. Elke level heeft een unieke badge die je
                  voortgang zichtbaar maakt.
                </p>
              </div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={160}>
          <LevelOverview currentLevel={currentLevel} currentXp={xp} />
        </FadeIn>
      </div>
    </div>
  );
}
