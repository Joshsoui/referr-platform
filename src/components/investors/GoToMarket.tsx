"use client";

import { GTM_STEPS } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
  InvestorSubtext,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function GoToMarket() {
  return (
    <InvestorSectionShell id="gtm" label="Go-to-market">
      <InvestorHeadline>
        De eerste groei begint
        <br />
        niet met massa.
        <br />
        <span className="text-fk-navy/70">Maar met relevante netwerken.</span>
      </InvestorHeadline>

      <ol className="mt-12 space-y-4">
        {GTM_STEPS.map((step, index) => (
          <Reveal key={step} delay={index * 70}>
            <li className="flex gap-4 rounded-2xl border border-fk-primary/10 bg-fk-white px-5 py-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fk-primary-muted text-sm font-bold text-fk-primary">
                {index + 1}
              </span>
              <span className="pt-1 text-sm font-medium leading-relaxed text-fk-navy/70 sm:text-base">
                {step}
              </span>
            </li>
          </Reveal>
        ))}
      </ol>

      <InvestorSubtext className="mt-10">
        referr hoeft in de eerste fase niet direct een groot consumentennetwerk op
        te bouwen. Iedere nieuwe challenge kan zijn eigen relevante netwerk
        activeren.
      </InvestorSubtext>
    </InvestorSectionShell>
  );
}
