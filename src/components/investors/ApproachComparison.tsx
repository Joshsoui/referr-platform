"use client";

import { Card } from "@/components/ui/Card";
import { APPROACH_COMPARISON } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function ApproachComparison() {
  return (
    <InvestorSectionShell id="approach" variant="light" label="Vergelijking">
      <InvestorHeadline>
        Waarom de huidige aanpak beperkt is
      </InvestorHeadline>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Card className="h-full border-fk-navy/10 bg-fk-white">
            <h3 className="text-lg font-bold text-fk-navy/70">
              {APPROACH_COMPARISON.traditional.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {APPROACH_COMPARISON.traditional.items.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-fk-navy/10 pl-4 text-sm leading-relaxed text-fk-navy/60"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>

        <Reveal delay={100}>
          <Card className="h-full border-fk-primary/15 bg-gradient-to-br from-fk-white to-fk-primary-muted/30">
            <h3 className="text-lg font-bold text-fk-navy">
              {APPROACH_COMPARISON.referr.title}
            </h3>
            <ul className="mt-5 space-y-3">
              {APPROACH_COMPARISON.referr.items.map((item) => (
                <li
                  key={item}
                  className="border-l-2 border-fk-primary/30 pl-4 text-sm leading-relaxed text-fk-navy/70"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </InvestorSectionShell>
  );
}
