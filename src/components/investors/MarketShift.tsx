"use client";

import { Card } from "@/components/ui/Card";
import { MARKET_SHIFT_DEVELOPMENTS } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
  InvestorSubtext,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function MarketShift() {
  return (
    <InvestorSectionShell id="market-shift" label="Marktverschuiving">
      <InvestorHeadline>
        AI verandert hoe recruiters zoeken.
        <br />
        <span className="text-fk-navy/70">Maar niet wie mensen kennen.</span>
      </InvestorHeadline>
      <InvestorSubtext>
        Technologie maakt recruitment sneller.
        <br />
        Netwerken maken recruitment menselijker.
      </InvestorSubtext>

      <div className="mt-12 space-y-4">
        {MARKET_SHIFT_DEVELOPMENTS.map((item, index) => (
          <Reveal key={item} delay={index * 80}>
            <Card className="border-fk-primary/10 py-4">
              <p className="text-sm font-medium leading-relaxed text-fk-navy/70 sm:text-base">
                <span className="mr-3 font-bold text-fk-primary">
                  {index + 1}.
                </span>
                {item}
              </p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <blockquote className="mt-14 text-center text-2xl font-bold leading-snug tracking-[-0.03em] text-fk-navy sm:text-3xl lg:text-4xl">
          AI vergroot de snelheid.
          <br />
          <span className="brand-wordmark">Referr vergroot het bereik.</span>
        </blockquote>
      </Reveal>
    </InvestorSectionShell>
  );
}
