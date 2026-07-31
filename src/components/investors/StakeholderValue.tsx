"use client";

import { STAKEHOLDER_VALUE } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

const TRIMMED = STAKEHOLDER_VALUE.map((group) => ({
  ...group,
  items: group.items.slice(0, 3),
}));

export function StakeholderValue() {
  return (
    <InvestorSectionShell id="stakeholders" label="Waarde">
      <InvestorHeadline>
        Waarde voor
        <br />
        <span className="brand-wordmark">iedere kant van de match.</span>
      </InvestorHeadline>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {TRIMMED.map((group, index) => (
          <Reveal key={group.title} delay={index * 80}>
            <div className="h-full rounded-2xl border border-fk-primary/10 bg-gradient-to-br from-fk-white via-fk-white to-fk-primary-muted/35 p-6">
              <h3 className="text-lg font-bold tracking-tight text-fk-navy">
                {group.title.replace("Voor ", "")}
              </h3>
              <ul className="mt-5 space-y-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-fk-navy/65"
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
    </InvestorSectionShell>
  );
}
