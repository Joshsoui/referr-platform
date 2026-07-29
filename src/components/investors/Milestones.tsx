"use client";

import { CONCEPT_MILESTONES } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function Milestones() {
  return (
    <InvestorSectionShell id="milestones" variant="light" label="Mijlpalen">
      <InvestorHeadline>
        Wat deze investering
        <br />
        mogelijk moet maken.
      </InvestorHeadline>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-fk-navy/40">
        Conceptdoelen — definitieve targets nog vast te stellen
      </p>

      <ul className="mt-10 space-y-3">
        {CONCEPT_MILESTONES.map((milestone, index) => (
          <Reveal key={milestone} delay={index * 60}>
            <li className="flex gap-4 rounded-2xl border border-fk-primary/10 bg-fk-white px-5 py-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-fk-primary-muted text-xs font-bold text-fk-primary">
                {index + 1}
              </span>
              <span className="pt-0.5 text-sm font-medium text-fk-navy/70 sm:text-base">
                {milestone}
              </span>
            </li>
          </Reveal>
        ))}
      </ul>
    </InvestorSectionShell>
  );
}
