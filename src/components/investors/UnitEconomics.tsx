"use client";

import { Card } from "@/components/ui/Card";
import {
  formatInvestorEuro,
  FUTURE_KPIS,
  PLACEMENT_FEE_EXAMPLE,
  UNIT_ECONOMICS_STAKEHOLDERS,
} from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function UnitEconomics() {
  return (
    <InvestorSectionShell id="unit-economics" variant="light" label="Unit economics">
      <InvestorHeadline>
        Eén plaatsing.
        <br />
        Meerdere winnaars.
      </InvestorHeadline>

      <Reveal>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {UNIT_ECONOMICS_STAKEHOLDERS.map((line) => (
            <Card key={line} className="border-fk-primary/10 py-4 text-center">
              <p className="text-sm font-medium text-fk-navy/70">{line}</p>
            </Card>
          ))}
        </div>
      </Reveal>

      <Reveal delay={100}>
        <p className="mt-8 text-center text-sm font-medium text-fk-navy/55">
          Het model ontvangt opbrengst uit een plaatsing wanneer er daadwerkelijk
          waarde wordt gecreëerd — platformfee illustratief{" "}
          {formatInvestorEuro(PLACEMENT_FEE_EXAMPLE.platformFee)}.
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div className="mt-14">
          <h3 className="text-lg font-bold text-fk-navy">
            Mogelijke kernindicatoren
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-fk-primary">
            Toekomstige meetpunten — nog niet gerapporteerd
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {FUTURE_KPIS.map((kpi) => (
              <li
                key={kpi}
                className="rounded-xl border border-fk-navy/8 bg-fk-white px-4 py-2.5 text-sm text-fk-navy/60"
              >
                {kpi}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </InvestorSectionShell>
  );
}
