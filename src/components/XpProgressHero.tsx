"use client";

import { Star, Zap } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { getLevelForXp, getLevelProgress } from "@/lib/xp";

interface XpProgressHeroProps {
  xp: number;
  xpPulse?: number;
}

export function XpProgressHero({ xp, xpPulse = 0 }: XpProgressHeroProps) {
  const level = getLevelForXp(xp);
  const { next, progress, xpToNext } = getLevelProgress(xp);
  const animatedXp = useAnimatedNumber(xp);

  return (
    <Card
      className="mb-8 overflow-hidden border-fk-primary/20 bg-gradient-to-br from-fk-white via-fk-white to-fk-primary/5 p-0"
      hover
    >
      <div className="p-6 sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-fk-secondary">
              Huidig level
            </p>
            <div className="mt-1 flex items-center gap-2">
              <Star size={22} className="text-fk-primary" />
              <h2 className="text-2xl font-extrabold text-fk-navy sm:text-3xl">
                {level.name}
              </h2>
            </div>
          </div>
          <div
            key={xpPulse}
            className="inline-flex items-center gap-2 self-start rounded-2xl bg-fk-primary px-5 py-3 text-fk-white shadow-lg animate-xp-pop sm:self-auto"
          >
            <Zap size={20} />
            <span className="text-2xl font-extrabold tabular-nums sm:text-3xl">
              {animatedXp.toLocaleString("nl-NL")}
            </span>
            <span className="text-sm font-semibold text-fk-white/80">XP</span>
          </div>
        </div>

        <div className="mb-2">
          <ProgressBar progress={progress} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          {next ? (
            <p className="font-medium text-fk-navy/60">
              Nog{" "}
              <span className="font-bold text-fk-primary tabular-nums">
                {xpToNext.toLocaleString("nl-NL")} XP
              </span>{" "}
              tot {next.name}
            </p>
          ) : (
            <p className="font-medium text-fk-navy/60">Maximaal level bereikt</p>
          )}
          {next && (
            <p className="font-semibold text-fk-navy/50">
              Volgend: {next.name}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
