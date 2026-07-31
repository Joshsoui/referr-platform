"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { COMPETITIVE_POSITIONS } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { registerGsap, useReducedMotion } from "./useInvestorMotion";

export function CompetitiveLandscape() {
  const chartRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !chartRef.current) return;
    registerGsap();
    const nodes = chartRef.current.querySelectorAll<HTMLElement>("[data-pos]");
    gsap.from(nodes, {
      autoAlpha: 0,
      scale: 0.55,
      duration: 0.65,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: chartRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  }, [reduced]);

  return (
    <InvestorSectionShell id="competition" label="Positionering">
      <InvestorHeadline>
        Tussen recruitment,
        <br />
        referrals en{" "}
        <span className="brand-wordmark">community.</span>
      </InvestorHeadline>

      <div
        ref={chartRef}
        className="relative mx-auto mt-12 aspect-[4/3] max-w-2xl overflow-hidden rounded-2xl border border-fk-navy/10 bg-gradient-to-br from-fk-white via-fk-white to-fk-primary-muted/30 p-6 sm:p-8"
        role="img"
        aria-label="Positioneringsmatrix: gesloten naar open netwerk horizontaal, losse referral naar volledige recruitmentflow verticaal"
      >
        <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-fk-navy/10" />
        <div className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-fk-navy/10" />

        <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-medium text-fk-navy/40">
          Gesloten netwerk → Open netwerk
        </span>
        <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-medium text-fk-navy/40">
          Losse referral → Volledige flow
        </span>

        {COMPETITIVE_POSITIONS.map((pos) => {
          const highlighted = "highlight" in pos && pos.highlight;
          return (
            <div
              key={pos.label}
              data-pos
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${pos.x * 100}%`,
                top: `${(1 - pos.y) * 100}%`,
              }}
            >
              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold sm:text-xs ${
                  highlighted
                    ? "brand-gradient-bg text-fk-white shadow-md ring-4 ring-fk-primary/15"
                    : "border border-fk-navy/12 bg-fk-white text-fk-navy/65"
                }`}
              >
                {pos.label}
              </span>
            </div>
          );
        })}
      </div>

      <p className="mx-auto mt-8 max-w-xl text-center text-sm font-medium leading-relaxed text-fk-navy/50">
        Grootste concurrent: de bestaande manier van werken — databases,
        jobboards en losse WhatsApp-introducties.
      </p>
    </InvestorSectionShell>
  );
}
