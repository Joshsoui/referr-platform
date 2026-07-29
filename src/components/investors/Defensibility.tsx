"use client";

import { Card } from "@/components/ui/Card";
import { DEFENSIBILITY_PILLARS } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
  InvestorSubtext,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function Defensibility() {
  return (
    <InvestorSectionShell id="defensibility" variant="light" label="Verdedigbaarheid">
      <InvestorHeadline>
        De software is het begin.
        <br />
        <span className="brand-wordmark">Het netwerk wordt de voorsprong.</span>
      </InvestorHeadline>
      <InvestorSubtext>
        Deze voordelen worden opgebouwd naarmate het platform groeit — niet als
        gegeven feit vandaag.
      </InvestorSubtext>

      <div className="mt-12 grid gap-5 sm:grid-cols-2">
        {DEFENSIBILITY_PILLARS.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 80}>
            <Card hover className="h-full border-fk-primary/10">
              <p className="text-sm font-bold text-fk-primary">
                {index + 1}. {pillar.title}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-fk-navy/65">
                {pillar.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </InvestorSectionShell>
  );
}
