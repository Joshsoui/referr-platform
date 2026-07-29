"use client";

import { Card } from "@/components/ui/Card";
import { INVESTMENT_ASK } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function InvestmentAsk() {
  const rows = [
    { label: "Investeringsbehoefte", value: INVESTMENT_ASK.amount },
    { label: "Voorgestelde structuur", value: INVESTMENT_ASK.structure },
    { label: "Type investering", value: INVESTMENT_ASK.type },
    { label: "Runway", value: INVESTMENT_ASK.runway },
    { label: "Doel", value: INVESTMENT_ASK.goal },
  ];

  return (
    <InvestorSectionShell id="investment-ask" label="Investeringsvraag">
      <InvestorHeadline>
        Investeer in
        <br />
        <span className="brand-wordmark">de volgende fase van Referr.</span>
      </InvestorHeadline>

      <Reveal>
        <Card className="mt-12 border-fk-primary/10">
          <dl className="divide-y divide-fk-navy/6">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:justify-between"
              >
                <dt className="text-sm font-medium text-fk-navy/50">
                  {row.label}
                </dt>
                <dd className="text-sm font-semibold text-fk-navy sm:max-w-md sm:text-right">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Card>
      </Reveal>

      <Reveal delay={100}>
        <div className="mt-10">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-fk-primary">
            Beoogde besteding
          </h3>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {INVESTMENT_ASK.spending.map((item) => (
              <li
                key={item}
                className="rounded-xl border border-fk-navy/8 bg-fk-light/60 px-4 py-2.5 text-sm text-fk-navy/65"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </InvestorSectionShell>
  );
}
