"use client";

import { Check, Lock, Sparkles, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LEVEL_DEFINITIONS } from "@/lib/mockLevels";
import { getLevelProgress } from "@/lib/xp";
import type { Level } from "@/lib/xp";

interface LevelOverviewProps {
  currentLevel: Level;
  currentXp: number;
}

export function LevelOverview({ currentLevel, currentXp }: LevelOverviewProps) {
  const { progress, xpToNext, next } = getLevelProgress(currentXp);

  return (
    <div className="relative">
      {/* Vertical progress spine */}
      <div
        className="absolute bottom-8 left-7 top-8 w-1 rounded-full bg-fk-primary/10 sm:left-8"
        aria-hidden
      >
        <div
          className="rounded-full bg-gradient-to-b from-fk-secondary via-fk-primary to-amber-500 transition-all duration-1000 ease-out"
          style={{
            height: `${Math.min(
              100,
              ((LEVEL_DEFINITIONS.findIndex((l) => l.name === currentLevel.name) + 1) /
                LEVEL_DEFINITIONS.length) *
                100
            )}%`,
          }}
        />
      </div>

      <div className="space-y-6">
        {LEVEL_DEFINITIONS.map((level, i) => {
          const isCurrent = level.name === currentLevel.name;
          const isUnlocked = currentXp >= level.minXp;
          const isCompleted = currentXp > level.maxXp;
          const rangeLabel =
            level.maxXp === Infinity
              ? `${level.minXp.toLocaleString("nl-NL")}+ XP`
              : `${level.minXp.toLocaleString("nl-NL")} – ${level.maxXp.toLocaleString("nl-NL")} XP`;

          return (
            <div
              key={level.id}
              className="animate-fade-in-up relative flex gap-4 sm:gap-6"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Level badge node */}
              <div className="relative z-10 flex shrink-0 flex-col items-center">
                <div
                  className={`relative flex h-14 w-14 items-center justify-center rounded-2xl border-2 bg-fk-white text-2xl shadow-md transition-all duration-500 sm:h-16 sm:w-16 ${
                    isCurrent
                      ? "animate-pulse-glow scale-110 border-fk-primary"
                      : isUnlocked
                        ? "border-fk-primary/30"
                        : "border-fk-primary/10 opacity-60 grayscale"
                  }`}
                >
                  <span aria-hidden>{level.icon}</span>
                  {!isUnlocked && (
                    <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-fk-white/70">
                      <Lock size={18} className="text-fk-navy/40" />
                    </div>
                  )}
                </div>
                <span
                  className={`mt-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    isCurrent
                      ? "bg-fk-primary text-fk-white"
                      : isUnlocked
                        ? "bg-fk-primary-muted text-fk-primary"
                        : "bg-fk-light text-fk-navy/40"
                  }`}
                >
                  {level.badgeLabel}
                </span>
              </div>

              {/* Level card */}
              <Card
                className={`min-w-0 flex-1 transition-all duration-500 ${
                  isCurrent
                    ? "border-2 border-fk-primary bg-gradient-to-br from-fk-white to-fk-primary/5 ring-4 ring-fk-primary/10"
                    : isUnlocked
                      ? "border-fk-primary/15 card-hover"
                      : "border-fk-primary/5 opacity-80"
                } ${isCompleted ? "border-emerald-200/50" : ""}`}
                hover={isUnlocked && !isCurrent}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-extrabold text-fk-navy sm:text-xl">
                        {level.name}
                      </h3>
                      {isCurrent && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-fk-primary px-2.5 py-0.5 text-xs font-bold text-fk-white animate-xp-pop">
                          <Sparkles size={12} />
                          Jij bent hier
                        </span>
                      )}
                      {isCompleted && !isCurrent && (
                        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                          Behaald ✓
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-fk-navy/55">{level.tagline}</p>
                    <p className="mt-1 flex items-center gap-1 text-sm font-semibold text-fk-primary">
                      <Zap size={14} className="text-fk-secondary" />
                      {rangeLabel}
                    </p>
                  </div>

                  <div
                    className={`rounded-xl bg-gradient-to-br ${level.accentFrom} ${level.accentTo} px-3 py-2 text-center text-fk-white shadow-sm`}
                  >
                    <p className="text-[10px] font-semibold uppercase opacity-80">
                      Badge
                    </p>
                    <p className="text-xs font-bold">{level.badgeLabel}</p>
                  </div>
                </div>

                {isCurrent && next && (
                  <div className="mt-4 rounded-xl border border-fk-primary/10 bg-fk-primary/5 p-3">
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="font-medium text-fk-navy/60">
                        Voortgang naar {next.name}
                      </span>
                      <span className="font-bold text-fk-primary">
                        nog {xpToNext.toLocaleString("nl-NL")} XP
                      </span>
                    </div>
                    <ProgressBar progress={progress} />
                  </div>
                )}

                <div className="mt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-fk-secondary">
                    Privileges
                  </p>
                  <ul className="space-y-1.5">
                    {level.privileges.map((priv, pi) => (
                      <li
                        key={priv}
                        className="animate-slide-in-right flex items-start gap-2 text-sm text-fk-navy/70"
                        style={{ animationDelay: `${i * 100 + pi * 50}ms` }}
                      >
                        <Check
                          size={14}
                          className={`mt-0.5 shrink-0 ${
                            isUnlocked ? "text-fk-primary" : "text-fk-navy/25"
                          }`}
                        />
                        {priv}
                      </li>
                    ))}
                  </ul>
                </div>

                {(level.cashBonusPercent > 0 || level.xpChallengeBonusPercent > 0) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {level.xpChallengeBonusPercent > 0 && (
                      <span className="rounded-lg bg-fk-primary-muted px-2.5 py-1 text-xs font-semibold text-fk-primary">
                        +{level.xpChallengeBonusPercent}% challenge XP
                      </span>
                    )}
                    {level.cashBonusPercent > 0 && (
                      <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        +{level.cashBonusPercent}% plaatsingsbonus
                      </span>
                    )}
                  </div>
                )}
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
