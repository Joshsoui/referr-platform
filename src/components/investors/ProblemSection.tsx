"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  APPROACH_COMPARISON,
  PROBLEM_CARDS,
} from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";
import { registerGsap, useReducedMotion } from "./useInvestorMotion";

const PROBLEM_SHORT = PROBLEM_CARDS.map((card) => ({
  title: card.title,
  // Keep first sentence only for density
  line: card.description.split(". ")[0] + ".",
}));

const APPROACH_PAIRS = APPROACH_COMPARISON.traditional.items.map((item, i) => ({
  traditional: item,
  referr: APPROACH_COMPARISON.referr.items[i],
}));

export function ProblemSection() {
  const [showReferr, setShowReferr] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !listRef.current) return;
    registerGsap();
    const items = listRef.current.querySelectorAll("li");
    gsap.fromTo(
      items,
      { autoAlpha: 0.35, x: showReferr ? -12 : 12 },
      { autoAlpha: 1, x: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" }
    );
  }, [showReferr, reduced]);

  return (
    <InvestorSectionShell id="problem" label="Waarom nu">
      <InvestorHeadline>
        Recruitment wordt duurder.
        <br />
        <span className="text-fk-navy/45">Maar niet automatisch beter.</span>
      </InvestorHeadline>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {PROBLEM_SHORT.map((card, index) => (
          <Reveal key={card.title} delay={index * 60}>
            <div className="rounded-2xl border border-fk-primary/10 bg-gradient-to-br from-fk-white to-fk-primary-muted/25 p-5">
              <h3 className="text-base font-bold tracking-tight text-fk-navy">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fk-navy/55">
                {card.line}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-14 overflow-hidden rounded-2xl border border-fk-navy/[0.08] bg-fk-white">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-fk-navy/[0.06] px-5 py-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-fk-primary">
              Modelvergelijking
            </p>
            <div className="inline-flex rounded-full bg-fk-light p-1">
              <button
                type="button"
                onClick={() => setShowReferr(false)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  !showReferr
                    ? "bg-fk-white text-fk-navy shadow-sm"
                    : "text-fk-navy/45 hover:text-fk-navy/70"
                }`}
              >
                Traditioneel
              </button>
              <button
                type="button"
                onClick={() => setShowReferr(true)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                  showReferr
                    ? "brand-gradient-bg text-white shadow-sm"
                    : "text-fk-navy/45 hover:text-fk-navy/70"
                }`}
              >
                referr
              </button>
            </div>
          </div>

          <ul ref={listRef} className="space-y-0 px-5 py-2">
            {APPROACH_PAIRS.map((pair) => (
              <li
                key={pair.traditional}
                className={`border-b border-fk-navy/[0.05] py-3.5 text-sm leading-relaxed last:border-0 ${
                  showReferr
                    ? "border-l-2 border-l-fk-primary/40 pl-4 text-fk-navy/75"
                    : "border-l-2 border-l-fk-navy/15 pl-4 text-fk-navy/55"
                }`}
              >
                {showReferr ? pair.referr : pair.traditional}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <blockquote className="mt-14 text-center text-2xl font-bold leading-snug tracking-[-0.03em] text-fk-navy sm:text-3xl lg:text-4xl">
        AI vergroot de snelheid.
        <br />
        <span className="brand-wordmark">referr vergroot het bereik.</span>
      </blockquote>
    </InvestorSectionShell>
  );
}
