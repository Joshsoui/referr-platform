"use client";

import {
  Briefcase,
  Eye,
  Gift,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/landing/Reveal";

const steps: {
  n: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone: "white" | "blush" | "neutral" | "earn";
}[] = [
  {
    n: "01",
    title: "Ontdek een challenge",
    description:
      "Vind een rol waarbij iemand uit jouw netwerk het verschil kan maken.",
    icon: Briefcase,
    tone: "white",
  },
  {
    n: "02",
    title: "Start je missie",
    description: "Introduceer iemand die volgens jou perfect past.",
    icon: UserPlus,
    tone: "blush",
  },
  {
    n: "03",
    title: "Volg de voortgang",
    description: "Bekijk transparant wat er met jouw introductie gebeurt.",
    icon: Eye,
    tone: "neutral",
  },
  {
    n: "04",
    title: "Speel je beloning vrij",
    description:
      "Wordt jouw kandidaat geplaatst? Dan wordt jouw beloning beschikbaar.",
    icon: Gift,
    tone: "earn",
  },
];

export function HowItWorks() {
  return (
    <section
      id="hoe-het-werkt"
      className="relative overflow-hidden px-4 pb-24 pt-10 sm:px-6 sm:pb-32 sm:pt-16 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-72 max-w-4xl bg-[radial-gradient(ellipse_at_center,rgba(255,77,89,0.1),transparent_68%)] blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-fk-primary">
              Ontdek → Introduceer → Volg → Ontvang
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-fk-navy sm:text-5xl">
              Zo werkt het
            </h2>
            <p className="mt-4 text-base font-medium text-fk-navy/45 sm:text-lg">
              Vier stappen. Geen gedoe. Echt resultaat.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="mt-14 sm:mt-16">
          <div className="how-journey">
            <ol className="how-journey-grid">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <li key={step.n} className="how-journey-cell">
                    <article
                      className={`how-step group relative flex h-full min-h-[15.5rem] flex-col overflow-hidden p-7 sm:min-h-[16.5rem] sm:p-8 how-step--${step.tone}`}
                    >
                      <div className="how-step-glow" aria-hidden />
                      <div className="how-step-sheen" aria-hidden />

                      <div className="relative flex items-start justify-between gap-4">
                        <span className="how-step-icon inline-flex h-14 w-14 items-center justify-center rounded-[1.35rem] sm:h-16 sm:w-16">
                          <Icon
                            size={32}
                            strokeWidth={1.9}
                            className="h-8 w-8 sm:h-9 sm:w-9"
                          />
                        </span>
                        <span className="pt-1 text-sm font-bold tabular-nums tracking-tight text-fk-navy/18 transition-colors duration-300 group-hover:text-fk-primary/45">
                          {step.n}
                        </span>
                      </div>

                      <h3 className="relative mt-7 text-xl font-bold tracking-[-0.03em] text-fk-navy sm:text-[1.65rem]">
                        {step.title}
                      </h3>
                      <p className="relative mt-2.5 max-w-[20rem] text-[15px] font-medium leading-relaxed text-fk-navy/55 sm:text-base">
                        {step.description}
                      </p>
                      <div className="mt-auto pt-8" aria-hidden />
                    </article>
                  </li>
                );
              })}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
