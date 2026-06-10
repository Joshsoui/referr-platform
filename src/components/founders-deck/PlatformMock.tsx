"use client";

import { Star, TrendingUp, Trophy, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/founders-deck/ScrollReveal";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function PlatformDashboardMock() {
  return (
    <ScrollReveal direction="scale">
      <Card variant="highlight" className="overflow-hidden border-0 p-0 shadow-2xl">
        <div className="relative p-5 sm:p-6">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-fk-white/10 blur-2xl" />

          <div className="relative mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-fk-white/60">Welkom terug, Joshua</p>
              <p className="text-lg font-extrabold">Master Finder</p>
            </div>
            <div className="flex h-12 w-12 animate-pulse-glow items-center justify-center rounded-xl border border-fk-white/25 bg-fk-white/10 text-2xl">
              💎
            </div>
          </div>

          <div className="relative mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { icon: Star, label: "Level", value: "Master" },
              { icon: Zap, label: "XP", value: "4.250" },
              { icon: TrendingUp, label: "Score", value: "94" },
              { icon: Trophy, label: "Rank", value: "#7" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-fk-white/20 bg-fk-white/10 px-3 py-2 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.03]"
              >
                <stat.icon size={12} className="mb-0.5 text-fk-white/60" />
                <p className="text-[10px] text-fk-white/50">{stat.label}</p>
                <p className="text-sm font-bold tabular-nums">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-fk-white/20 bg-fk-white/10 p-3 backdrop-blur-sm">
            <p className="mb-2 text-xs font-semibold text-fk-white/80">
              Nog 750 XP tot Finderz Legend
            </p>
            <div className="relative h-2 overflow-hidden rounded-full bg-fk-white/20">
              <div
                className="progress-shine h-full w-[85%] rounded-full bg-gradient-to-r from-fk-white/90 to-fk-white/50"
              />
            </div>
          </div>
        </div>
      </Card>
    </ScrollReveal>
  );
}

export function PlatformMiniPreviews() {
  const previews = [
    {
      title: "Vacatures",
      badge: "🟢 Easy",
      detail: "Match €150 · Keeper €350",
      progress: 72,
    },
    {
      title: "Finderz Missions",
      badge: "Actief",
      detail: "3/3 talenten getipt",
      progress: 100,
    },
    {
      title: "Rewards",
      badge: "€1.250",
      detail: "Keeper Bonus prominent",
      progress: 58,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {previews.map((item, i) => (
        <ScrollReveal key={item.title} delay={i * 100} direction="scale">
          <Card hover className="border-fk-primary/10 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-fk-secondary">
                {item.title}
              </p>
              <span className="rounded-full bg-fk-primary-muted px-2 py-0.5 text-xs font-semibold text-fk-primary">
                {item.badge}
              </span>
            </div>
            <p className="text-sm font-semibold text-fk-navy">{item.detail}</p>
            <div className="mt-3">
              <ProgressBar progress={item.progress} animated />
            </div>
          </Card>
        </ScrollReveal>
      ))}
    </div>
  );
}

export function GamificationPodium() {
  const ranks = [
    { rank: 2, name: "Emma B.", xp: "2.180", medal: "🥈", height: "h-24" },
    { rank: 1, name: "Lennart L.", xp: "10.250", medal: "🥇", height: "h-32" },
    { rank: 3, name: "Peter J.", xp: "1.840", medal: "🥉", height: "h-20" },
  ];

  return (
    <div className="flex items-end justify-center gap-3 sm:gap-5">
      {ranks.map((item, i) => (
        <ScrollReveal
          key={item.rank}
          delay={i * 120}
          direction="up"
          className="flex flex-col items-center"
        >
          <span className="mb-2 text-2xl">{item.medal}</span>
          <div
            className={`animate-podium-rise flex w-20 flex-col items-center justify-end rounded-t-2xl border border-fk-primary/15 bg-gradient-to-t from-fk-primary/20 to-fk-white px-2 pb-3 sm:w-24 ${item.height}`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <p className="text-xs font-bold text-fk-navy">{item.name}</p>
            <p className="text-[10px] font-semibold text-fk-primary">
              {item.xp} XP
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

export function FinderScaleVisual() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
      <ScrollReveal direction="scale">
        <div className="rounded-2xl border border-fk-primary/15 bg-fk-white px-6 py-5 text-center shadow-sm">
          <p className="text-4xl font-extrabold text-fk-navy/40">3</p>
          <p className="mt-1 text-sm font-medium text-fk-navy/50">Recruiters</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={200} direction="fade">
        <div className="text-3xl text-fk-primary animate-flow-arrow">→</div>
      </ScrollReveal>

      <ScrollReveal delay={300} direction="scale">
        <div className="animate-pulse-glow rounded-2xl border-2 border-fk-primary bg-gradient-to-br from-fk-primary to-fk-secondary px-8 py-6 text-center text-fk-white shadow-lg">
          <p className="text-5xl font-extrabold">
            <span className="animate-xp-pop inline-block">300</span>
          </p>
          <p className="mt-1 text-sm font-semibold text-fk-white/90">Finders</p>
        </div>
      </ScrollReveal>

      <ScrollReveal delay={450} direction="fade">
        <div className="text-3xl text-fk-primary animate-flow-arrow">→</div>
      </ScrollReveal>

      <ScrollReveal delay={550} direction="scale">
        <div className="rounded-2xl border border-fk-secondary/30 bg-fk-primary-muted px-6 py-5 text-center">
          <p className="text-3xl font-extrabold text-fk-primary">30K+</p>
          <p className="mt-1 text-sm font-medium text-fk-navy/60">Contacten</p>
        </div>
      </ScrollReveal>
    </div>
  );
}
