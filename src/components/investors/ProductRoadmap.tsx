"use client";

import type { RoadmapStatus } from "@/lib/investors/investorsData";
import { PRODUCT_ROADMAP } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

const STATUS_STYLES: Record<
  RoadmapStatus,
  { label: string; className: string }
> = {
  gebouwd: {
    label: "Gebouwd",
    className: "border-fk-primary/25 bg-fk-primary-muted text-fk-primary",
  },
  "in ontwikkeling": {
    label: "In ontwikkeling",
    className: "border-fk-secondary/30 bg-[#fff4e8] text-[#c45a12]",
  },
  gepland: {
    label: "Gepland",
    className: "border-fk-navy/12 bg-fk-light text-fk-navy/55",
  },
  toekomst: {
    label: "Toekomst",
    className: "border-fk-navy/8 bg-fk-white text-fk-navy/40",
  },
};

export function ProductRoadmap() {
  return (
    <InvestorSectionShell id="roadmap" wide label="Productroadmap">
      <InvestorHeadline>
        Van MVP naar
        <br />
        <span className="brand-wordmark">schaalbaar platform.</span>
      </InvestorHeadline>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {PRODUCT_ROADMAP.map((phase, phaseIndex) => (
          <Reveal key={phase.phase} delay={phaseIndex * 100}>
            <div className="rounded-2xl border border-fk-primary/10 bg-fk-white p-5">
              <h3 className="text-lg font-bold text-fk-navy">{phase.phase}</h3>
              <ul className="mt-5 space-y-3">
                {phase.items.map((item) => {
                  const style = STATUS_STYLES[item.status];
                  return (
                    <li
                      key={item.label}
                      className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-fk-navy/6 bg-fk-light/50 px-3 py-2"
                    >
                      <span className="text-sm text-fk-navy/70">{item.label}</span>
                      <span
                        className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style.className}`}
                      >
                        {style.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </InvestorSectionShell>
  );
}
