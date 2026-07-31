"use client";

import { Card } from "@/components/ui/Card";
import { THESIS_FLOW } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
  InvestorSubtext,
} from "./InvestorSectionShell";
import { useScrollReveal } from "./useInvestorMotion";

export function InvestmentThesis() {
  const flowRef = useScrollReveal<HTMLDivElement>({ y: 32, start: "top 80%" });

  return (
    <InvestorSectionShell id="investment-thesis" variant="light">
      <InvestorHeadline>Iedereen kent talent.</InvestorHeadline>
      <InvestorSubtext>
        referr maakt het voor iedereen mogelijk om talent te introduceren bij
        bedrijven en recruitmentorganisaties.
      </InvestorSubtext>
      <InvestorSubtext className="mt-3">
        Bij een succesvolle plaatsing ontvangt de referrer een beloning.
      </InvestorSubtext>

      <div ref={flowRef} className="mt-14">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-fk-navy/40">
          Productflow
        </p>
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-0">
          {THESIS_FLOW.map((step, index) => (
            <div key={step} className="flex items-center gap-2 sm:gap-0">
              <Card
                hover
                className="min-w-[140px] border-fk-primary/10 px-5 py-3 text-center text-sm font-semibold text-fk-navy sm:min-w-[120px]"
              >
                {step}
              </Card>
              {index < THESIS_FLOW.length - 1 ? (
                <span
                  className="hidden text-fk-primary/50 sm:inline sm:px-2"
                  aria-hidden
                >
                  →
                </span>
              ) : null}
              {index < THESIS_FLOW.length - 1 ? (
                <span
                  className="self-center text-fk-primary/40 sm:hidden"
                  aria-hidden
                >
                  ↓
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </InvestorSectionShell>
  );
}
