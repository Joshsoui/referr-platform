"use client";

import { Card } from "@/components/ui/Card";
import { MARKET_SEGMENTS, MARKET_SOURCES } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
  InvestorSubtext,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function MarketOpportunity() {
  return (
    <InvestorSectionShell id="market" variant="light" label="Marktpotentieel">
      <InvestorHeadline>
        Een grote markt.
        <br />
        <span className="text-fk-navy/70">Met een gerichte eerste stap.</span>
      </InvestorHeadline>
      <InvestorSubtext>
        Geen verzonnen marktbedragen — placeholders voor latere validatie met
        betrouwbare bronnen.
      </InvestorSubtext>

      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {MARKET_SEGMENTS.map((segment, index) => (
          <Reveal key={segment.id} delay={index * 90}>
            <Card hover className="flex h-full flex-col border-fk-primary/10">
              <p className="text-2xl font-extrabold text-fk-primary">
                {segment.label}
              </p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-fk-navy/60">
                {segment.description}
              </p>
              <p className="mt-4 rounded-xl bg-fk-light px-3 py-2 text-xs font-medium text-fk-navy/50">
                {segment.value}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>

      {MARKET_SOURCES.length > 0 ? (
        <div className="mt-8 text-xs text-fk-navy/40">
          <p className="font-semibold uppercase tracking-wider">Bronnen</p>
          <ul className="mt-2 space-y-1">
            {MARKET_SOURCES.map((source) => (
              <li key={source}>{source}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="mt-8 text-xs text-fk-navy/40">
          Bronvermeldingen worden toegevoegd zodra marktdata is gevalideerd.
        </p>
      )}
    </InvestorSectionShell>
  );
}
