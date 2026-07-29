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
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  "in ontwikkeling": {
    label: "In ontwikkeling",
    className: "bg-amber-50 text-amber-800 border-amber-200",
  },
  gepland: {
    label: "Gepland",
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  toekomst: {
    label: "Toekomst",
    className: "bg-fk-light text-fk-navy/50 border-fk-navy/10",
  },
};

export function ProductRoadmap() {
  return (
    <InvestorSectionShell id="roadmap" wide label="Productroadmap">
      <InvestorHeadline>Productroadmap</InvestorHeadline>

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
