"use client";

import { useEffect, useRef, useState } from "react";
import {
  Banknote,
  Briefcase,
  Crown,
  Layers,
  Sparkles,
  UserPlus,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { ScrollReveal } from "@/components/founders-deck/ScrollReveal";
import { SectionLabel } from "@/components/founders-deck/DeckParts";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  DIFFICULTY_CASH_REWARDS,
  DIFFICULTY_META,
  KEEPER_BONUS,
} from "@/lib/vacancyRewards";

interface HowItWorksStep {
  title: string;
  description: string;
  icon: LucideIcon;
  reward?: string;
  highlight?: boolean;
}

const STEPS: HowItWorksStep[] = [
  {
    title: "Word Finder",
    description: "Meld je aan in het Finderz Network.",
    icon: UserPlus,
    reward: "Gratis starten",
  },
  {
    title: "Bekijk vacatures",
    description: "Kies een missie met difficulty en beloning.",
    icon: Briefcase,
    reward: "🟢 Easy · 🔴 Expert",
  },
  {
    title: "Draag talent aan",
    description: "Tip iemand uit je netwerk.",
    icon: Sparkles,
    reward: "+10 XP",
  },
  {
    title: "Verdien XP",
    description: "Elke actie levert progressie op.",
    icon: Zap,
    reward: "Tot +1000 XP",
  },
  {
    title: "Stijg in level",
    description: "Ontgrendel voordelen en hogere bonuses.",
    icon: Layers,
    reward: "Tot +10% cash",
  },
  {
    title: "Ontvang rewards",
    description: "Beloning bij plaatsing en na 2 maanden retentie.",
    icon: Banknote,
    reward: "Tot €925",
  },
  {
    title: "Behaal Keeper Status",
    description:
      "De grootste beloning: jouw kandidaat werkt na 2 maanden nog succesvol.",
    icon: Crown,
    reward: "Tot €550 + 1000 XP",
    highlight: true,
  },
];

const KEEPER_REWARD_ROWS = (
  ["easy", "hard", "expert"] as const
).map((difficulty) => ({
  difficulty,
  ...DIFFICULTY_META[difficulty],
  keeper: DIFFICULTY_CASH_REWARDS[difficulty].keeper,
  total: DIFFICULTY_CASH_REWARDS[difficulty].total,
}));

function useStepsInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let interval: ReturnType<typeof setInterval> | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        let index = 0;
        interval = setInterval(() => {
          index += 1;
          setActiveIndex(index);
          if (index >= STEPS.length && interval) clearInterval(interval);
        }, 180);

        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (interval) clearInterval(interval);
    };
  }, []);

  return { ref, activeIndex };
}

export function HowItWorksSection() {
  const { ref, activeIndex } = useStepsInView();
  const progress = Math.round((activeIndex / STEPS.length) * 100);

  return (
    <div className="mx-auto max-w-3xl">
      <ScrollReveal className="text-center">
        <SectionLabel>Hoe het werkt</SectionLabel>
        <h2 className="text-3xl font-extrabold text-fk-navy sm:text-4xl">
          Van Finder tot Keeper Status
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-fk-navy/60 sm:text-base">
          Zeven stappen. Eén duidelijk pad van aanmelden tot duurzame match.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={80} className="mt-10">
        <Card className="border-fk-primary/15 bg-gradient-to-r from-fk-white to-fk-primary-muted/30 p-4 sm:p-5">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold text-fk-navy/55">
            <span>Jouw voortgang</span>
            <span className="tabular-nums text-fk-primary">
              {Math.min(activeIndex, STEPS.length)}/{STEPS.length}
            </span>
          </div>
          <ProgressBar progress={progress || 8} animated />
        </Card>
      </ScrollReveal>

      <div ref={ref} className="relative mt-10">
        <div
          className="absolute bottom-6 left-7 top-6 w-0.5 rounded-full bg-fk-primary/10 sm:left-8"
          aria-hidden
        >
          <div
            className="rounded-full bg-gradient-to-b from-fk-secondary via-fk-primary to-amber-500 transition-all duration-700 ease-out"
            style={{
              height: `${Math.max(8, (activeIndex / STEPS.length) * 100)}%`,
            }}
          />
        </div>

        <div className="space-y-4">
          {STEPS.map((step, i) => {
            const isActive = i < activeIndex;
            const isCurrent = i === activeIndex - 1;
            const Icon = step.icon;

            return (
              <ScrollReveal key={step.title} delay={i * 60} direction="right">
                <div
                  className={`relative flex gap-4 sm:gap-5 ${
                    isActive ? "opacity-100" : "opacity-40"
                  } transition-opacity duration-500`}
                >
                  <div
                    className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 bg-fk-white shadow-sm transition-all duration-500 sm:h-16 sm:w-16 ${
                      step.highlight
                        ? "animate-pulse-glow border-amber-400 bg-amber-50 text-amber-700"
                        : isCurrent
                          ? "scale-110 border-fk-primary text-fk-primary"
                          : isActive
                            ? "border-fk-primary/40 text-fk-primary"
                            : "border-fk-primary/15 text-fk-navy/35"
                    }`}
                  >
                    <Icon size={22} />
                  </div>

                  <Card
                    hover
                    className={`min-w-0 flex-1 border-fk-primary/10 p-4 transition-all duration-500 sm:p-5 ${
                      step.highlight
                        ? "border-amber-200 bg-gradient-to-r from-amber-50 via-fk-white to-amber-50/40 shadow-md"
                        : isCurrent
                          ? "border-fk-primary/25 bg-fk-white shadow-md"
                          : "bg-fk-white"
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider text-fk-secondary">
                          Stap {i + 1}
                        </p>
                        <h3
                          className={`mt-0.5 font-extrabold ${
                            step.highlight ? "text-amber-900" : "text-fk-navy"
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-relaxed text-fk-navy/65">
                          {step.description}
                        </p>
                      </div>
                      {step.reward && (
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                            step.highlight
                              ? "bg-amber-500 text-fk-white"
                              : "bg-fk-primary-muted text-fk-primary"
                          }`}
                        >
                          {step.reward}
                        </span>
                      )}
                    </div>
                  </Card>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      <ScrollReveal delay={150} className="mt-10">
        <Card className="overflow-hidden border-amber-200 bg-gradient-to-br from-amber-50 via-fk-white to-amber-50/50 p-5 sm:p-6">
          <div className="flex flex-wrap items-start gap-4">
            <div className="animate-crown-shine flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-fk-white shadow-md shadow-amber-500/25">
              <Crown size={26} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                De grootste beloning
              </p>
              <h3 className="mt-1 text-lg font-extrabold text-amber-950 sm:text-xl">
                {KEEPER_BONUS.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fk-navy/70">
                {KEEPER_BONUS.description} Daarnaast ontvang je{" "}
                <span className="font-bold text-amber-700">+1000 XP</span> —
                de hoogste XP-beloning in het systeem.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {KEEPER_REWARD_ROWS.map((row) => (
              <div
                key={row.difficulty}
                className={`rounded-xl border px-4 py-3 text-center ${row.badgeClass}`}
              >
                <p className="text-xs font-bold uppercase tracking-wider opacity-70">
                  {row.emoji} {row.label}
                </p>
                <p className="mt-1 text-xl font-extrabold tabular-nums">
                  €{row.keeper}
                </p>
                <p className="mt-0.5 text-[11px] opacity-65">
                  Keeper Bonus · totaal €{row.total}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-4 text-center text-xs text-fk-navy/50">
            Level-bonus (+2% tot +10%) geldt extra op match- én Keeper Bonus.
          </p>
        </Card>
      </ScrollReveal>

      <ScrollReveal delay={200} className="mt-14 text-center">
        <Card
          variant="highlight"
          className="inline-block border-0 px-8 py-6 sm:px-12"
        >
          <p className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Find Talent.
          </p>
          <p className="mt-1 text-2xl font-extrabold tracking-tight text-fk-white/85 sm:text-3xl">
            Keep Talent.
          </p>
        </Card>
      </ScrollReveal>
    </div>
  );
}
