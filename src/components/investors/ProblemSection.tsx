"use client";

import { Card } from "@/components/ui/Card";
import { PROBLEM_CARDS } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function ProblemSection() {
  return (
    <InvestorSectionShell id="problem" label="Het probleem">
      <InvestorHeadline>
        Recruitment wordt duurder.
        <br />
        <span className="text-fk-navy/70">Maar niet automatisch beter.</span>
      </InvestorHeadline>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:gap-5">
        {PROBLEM_CARDS.map((card, index) => (
          <Reveal key={card.title} delay={index * 80}>
            <Card hover className="h-full border-fk-primary/10">
              <h3 className="text-lg font-bold text-fk-navy">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fk-navy/60">
                {card.description}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>
    </InvestorSectionShell>
  );
}
