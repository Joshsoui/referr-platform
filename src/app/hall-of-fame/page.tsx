"use client";

import { ArrowRight, Crown, Medal, Sparkles, Star, Trophy } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { GradientText } from "@/components/ui/GradientText";
import {
  BEST_FINDER_ALL_TIME,
  BEST_FINDER_MONTH,
  HALL_OF_FAME_LEGENDS,
} from "@/lib/mockHallOfFame";
import { formatCurrency } from "@/lib/xp";

function ChampionCard({
  name,
  level,
  placements,
  keepers,
  earned,
  badge,
  highlight,
  variant = "default",
}: {
  name: string;
  level: string;
  xp: number;
  placements: number;
  keepers: number;
  earned: number;
  badge: string;
  highlight?: string;
  variant?: "default" | "gold" | "silver";
}) {
  const variantStyles = {
    default: "border-fk-primary/15 bg-fk-white",
    gold: "border-amber-300 bg-gradient-to-br from-amber-50 via-fk-white to-amber-100/50 shadow-lg shadow-amber-200/30",
    silver: "border-slate-200 bg-gradient-to-br from-slate-50 to-fk-white shadow-md",
  };

  return (
    <Card
      className={`relative overflow-hidden p-6 transition-transform duration-300 hover:scale-[1.02] ${variantStyles[variant]}`}
    >
      {highlight && (
        <div className="absolute right-4 top-4 rounded-full bg-amber-500 px-2.5 py-0.5 text-xs font-bold text-fk-white">
          {highlight}
        </div>
      )}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-fk-primary/20 bg-fk-primary-muted text-3xl">
          {badge}
        </div>
        <div>
          <p className="text-xl font-extrabold text-fk-navy">{name}</p>
          <p className="text-sm font-semibold text-fk-primary">{level}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-lg bg-fk-light px-3 py-2">
          <p className="text-xs text-fk-navy/50">Verdiend</p>
          <p className="font-bold text-emerald-700">
            {formatCurrency(earned)}
          </p>
        </div>
        <div className="rounded-lg bg-fk-light px-3 py-2">
          <p className="text-xs text-fk-navy/50">Plaatsingen</p>
          <p className="font-bold text-fk-navy">{placements}</p>
        </div>
        <div className="rounded-lg bg-fk-light px-3 py-2">
          <p className="text-xs text-fk-navy/50">Retenties</p>
          <p className="font-bold text-fk-navy">{keepers}</p>
        </div>
        <div className="rounded-lg bg-fk-light px-3 py-2">
          <p className="text-xs text-fk-navy/50">Impact</p>
          <p className="font-bold text-fk-navy">{placements + keepers}</p>
        </div>
      </div>
    </Card>
  );
}

export default function HallOfFamePage() {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <Card
            variant="highlight"
            className="mb-10 overflow-hidden border-0 p-0"
          >
            <div className="relative p-8 sm:p-10 lg:p-12">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-fk-white/10 blur-2xl" />

              <div className="relative text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-fk-white/25 bg-fk-white/10 px-4 py-1.5 text-sm font-semibold text-fk-white/90">
                  <Crown size={16} className="text-amber-300" />
                  Exclusief voor netwerkleiders
                </div>
                <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-6xl">
                  Community Champions
                  <GradientText
                    variant="flame-light"
                    as="span"
                    className="mt-2 block text-2xl sm:text-3xl lg:text-4xl"
                  >
                    De sterkste connecties binnen referr.
                  </GradientText>
                </h1>
                <p className="mx-auto mt-4 max-w-2xl text-base text-fk-white/90 sm:text-lg">
                  Mensen die structureel impact maken via succesvolle
                  introducties en plaatsingen.
                </p>
              </div>
            </div>
          </Card>
        </FadeIn>

        <FadeIn delay={60}>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500 text-fk-white shadow-md">
              <Crown size={20} />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-fk-navy">
                Netwerkleiders
              </h2>
              <p className="text-sm text-fk-navy/55">
                De absolute top van de community
              </p>
            </div>
          </div>
          <div className="mb-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {HALL_OF_FAME_LEGENDS.map((legend, i) => (
              <ChampionCard
                key={legend.name}
                {...legend}
                variant={i === 0 ? "gold" : "default"}
              />
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mb-8 grid gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fk-primary text-fk-white shadow-md">
                  <Medal size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-fk-navy">
                    Beste van de maand
                  </h2>
                  <p className="text-sm text-fk-navy/55">
                    {BEST_FINDER_MONTH.period}
                  </p>
                </div>
              </div>
              <ChampionCard {...BEST_FINDER_MONTH} badge="🏆" variant="silver" />
            </div>

            <div>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600 text-fk-white shadow-md">
                  <Trophy size={20} />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-fk-navy">
                    Beste all-time
                  </h2>
                  <p className="text-sm text-fk-navy/55">
                    Hoogste impact ooit binnen referr
                  </p>
                </div>
              </div>
              <ChampionCard
                {...BEST_FINDER_ALL_TIME}
                badge="👑"
                variant="gold"
                highlight="All-time #1"
              />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={180}>
          <Card className="border-fk-primary/15 bg-gradient-to-r from-fk-primary-muted/50 to-fk-white p-6 text-center sm:p-8">
            <Sparkles size={24} className="mx-auto mb-3 text-fk-primary" />
            <p className="text-lg font-bold text-fk-navy">
              Word jij de volgende netwerkleider?
            </p>
            <p className="mt-2 text-sm text-fk-navy/60">
              Draag iemand aan, bouw een sterk track record op en realiseer
              succesvolle plaatsingen om hier te komen.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href="/aandragen">Draag iemand aan</Button>
              <Button href="/leaderboard" variant="secondary">
                <Star size={16} />
                Ranglijst
              </Button>
              <Button href="/levels" variant="secondary">
                Bekijk profiel
                <ArrowRight size={16} />
              </Button>
            </div>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
