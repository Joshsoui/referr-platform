"use client";

import { Card } from "@/components/ui/Card";
import { STAKEHOLDER_VALUE } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function StakeholderValue() {
  return (
    <InvestorSectionShell id="stakeholders" label="Waarde">
      <InvestorHeadline>Voor wie Referr waarde creëert</InvestorHeadline>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {STAKEHOLDER_VALUE.map((group, index) => (
          <Reveal key={group.title} delay={index * 90}>
            <Card hover className="h-full border-fk-primary/10">
              <h3 className="text-lg font-bold text-fk-navy">{group.title}</h3>
              <ul className="mt-5 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-fk-navy/65"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fk-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </InvestorSectionShell>
  );
}
