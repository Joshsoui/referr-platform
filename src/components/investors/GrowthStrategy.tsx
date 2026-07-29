"use client";

import { Card } from "@/components/ui/Card";
import { GROWTH_PHASES } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function GrowthStrategy() {
  return (
    <InvestorSectionShell id="growth-strategy" variant="light" label="Groei">
      <InvestorHeadline>
        Begin klein.
        <br />
        Bewijs het model.
        <br />
        <span className="brand-wordmark">Schaal wat werkt.</span>
      </InvestorHeadline>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {GROWTH_PHASES.map((phase, index) => (
          <Reveal key={phase.phase} delay={index * 80}>
            <Card hover className="h-full border-fk-primary/10">
              <h3 className="font-bold text-fk-primary">{phase.phase}</h3>
              <ul className="mt-4 space-y-2">
                {phase.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-fk-navy/65"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fk-secondary" />
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
