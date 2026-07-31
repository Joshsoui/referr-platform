"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FLYWHEEL_STEPS, GROWTH_PHASES } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
  InvestorSubtext,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";
import { registerGsap, useReducedMotion } from "./useInvestorMotion";

const PHASE_SHORT = GROWTH_PHASES.map((phase) => ({
  phase: phase.phase.replace("Fase ", ""),
  items: phase.items.slice(0, 3),
}));

const RING = FLYWHEEL_STEPS.slice(0, -1);

export function GrowthStrategy() {
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !ringRef.current) return;
    registerGsap();
    const nodes = ringRef.current.querySelectorAll("[data-fly-node]");
    gsap.fromTo(
      nodes,
      { autoAlpha: 0, scale: 0.7 },
      {
        autoAlpha: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.06,
        ease: "back.out(1.4)",
        scrollTrigger: {
          trigger: ringRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [reduced]);

  return (
    <InvestorSectionShell id="growth-strategy" variant="light" wide label="Groei">
      <InvestorHeadline>
        Begin klein.
        <br />
        Bewijs het model.
        <br />
        <span className="brand-wordmark">Schaal wat werkt.</span>
      </InvestorHeadline>
      <InvestorSubtext>
        Eerste groei via relevante netwerken — niet via massaconsumentenacquisitie.
      </InvestorSubtext>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PHASE_SHORT.map((phase, index) => (
          <Reveal key={phase.phase} delay={index * 70}>
            <div className="h-full rounded-2xl border border-fk-primary/10 bg-gradient-to-br from-fk-white to-fk-primary-muted/20 p-5">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-fk-primary">
                {phase.phase}
              </p>
              <ul className="mt-4 space-y-2">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-snug text-fk-navy/65"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#ff4d59] to-[#ff9a3c]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <div ref={ringRef} className="relative mx-auto mt-16 max-w-xl">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-fk-primary">
          Netwerkflywheel
        </p>
        <div className="relative mx-auto aspect-square max-w-sm">
          <div className="absolute inset-[18%] rounded-full border border-dashed border-fk-primary/25" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="brand-wordmark text-lg font-bold tracking-tight">
              referr
            </span>
          </div>
          {RING.map((step, index) => {
            const angle = (index / RING.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * 42;
            const y = 50 + Math.sin(angle) * 42;
            return (
              <div
                key={step}
                data-fly-node
                className="absolute max-w-[6.5rem] -translate-x-1/2 -translate-y-1/2 text-center"
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span className="inline-block rounded-full border border-fk-primary/15 bg-fk-white px-2.5 py-1 text-[10px] font-semibold leading-tight text-fk-navy/70 shadow-sm">
                  {step.replace("Meer ", "")}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </InvestorSectionShell>
  );
}
