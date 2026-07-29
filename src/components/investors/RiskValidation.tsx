"use client";

import { Card } from "@/components/ui/Card";
import { RISK_MITIGATIONS, VALIDATION_QUESTIONS } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function RiskValidation() {
  return (
    <InvestorSectionShell id="risks" variant="light" label="Validatie">
      <InvestorHeadline>
        Een sterk idee
        <br />
        moet in de praktijk worden bewezen.
      </InvestorHeadline>

      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-fk-primary">
              Validatievragen
            </h3>
            <ul className="mt-4 space-y-3">
              {VALIDATION_QUESTIONS.map((q) => (
                <li
                  key={q}
                  className="rounded-xl border border-fk-primary/10 bg-fk-white px-4 py-3 text-sm leading-relaxed text-fk-navy/70"
                >
                  {q}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-fk-primary">
              Hoe we dit testen
            </h3>
            <Card className="mt-4 border-fk-primary/10">
              <ul className="space-y-2">
                {RISK_MITIGATIONS.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm text-fk-navy/65"
                  >
                    <span className="text-fk-primary">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Reveal>
      </div>
    </InvestorSectionShell>
  );
}
