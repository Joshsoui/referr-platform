"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FLYWHEEL_STEPS } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
  InvestorSubtext,
} from "./InvestorSectionShell";
import { registerGsap, useReducedMotion } from "./useInvestorMotion";

export function NetworkFlywheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !containerRef.current) return;
    registerGsap();

    const items = containerRef.current.querySelectorAll<HTMLElement>("[data-flywheel]");

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 0.5,
        onUpdate: (self) => {
          const activeCount = Math.ceil(self.progress * items.length);
          items.forEach((item, index) => {
            const active = index < activeCount;
            item.style.opacity = active ? "1" : "0.35";
            item.style.transform = active ? "translateY(0)" : "translateY(8px)";
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <InvestorSectionShell id="network-effect" label="Netwerkeffect">
      <InvestorHeadline>
        Iedere nieuwe deelnemer
        <br />
        maakt het netwerk sterker.
      </InvestorHeadline>

      <div ref={containerRef} className="mx-auto mt-14 max-w-md">
        {FLYWHEEL_STEPS.map((step, index) => (
          <div key={`${step}-${index}`}>
            <div
              data-flywheel
              className="rounded-xl border border-fk-primary/15 bg-fk-white px-5 py-3 text-center text-sm font-semibold text-fk-navy transition-all duration-300"
              style={{ opacity: index === 0 ? 1 : 0.35 }}
            >
              {step}
            </div>
            {index < FLYWHEEL_STEPS.length - 1 ? (
              <div
                className="flex justify-center py-1 text-fk-primary/40"
                aria-hidden
              >
                ↓
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <InvestorSubtext className="mx-auto mt-10 text-center">
        Het product wordt waardevoller wanneer vraag, netwerk en succesvolle
        plaatsingen samen groeien.
      </InvestorSubtext>
    </InvestorSectionShell>
  );
}
