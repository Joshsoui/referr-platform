"use client";

import { COMPETITIVE_POSITIONS } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
  InvestorSubtext,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function CompetitiveLandscape() {
  return (
    <InvestorSectionShell id="competition" label="Concurrentie">
      <InvestorHeadline>
        Referr bevindt zich
        <br />
        tussen recruitment, referrals en community.
      </InvestorHeadline>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-fk-navy/40">
        Positioneringshypothese
      </p>

      <Reveal>
        <div
          className="relative mx-auto mt-12 aspect-[4/3] max-w-2xl rounded-2xl border border-fk-navy/10 bg-gradient-to-br from-fk-white to-fk-primary-muted/20 p-6 sm:p-8"
          role="img"
          aria-label="Positioneringsmatrix: gesloten naar open netwerk horizontaal, losse referral naar volledige recruitmentflow verticaal"
        >
          <div className="absolute inset-x-8 top-1/2 h-px -translate-y-1/2 bg-fk-navy/10" />
          <div className="absolute inset-y-8 left-1/2 w-px -translate-x-1/2 bg-fk-navy/10" />

          <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[10px] font-medium text-fk-navy/40">
            Gesloten netwerk → Open netwerk
          </span>
          <span className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-medium text-fk-navy/40">
            Losse referral → Volledige recruitmentflow
          </span>

          {COMPETITIVE_POSITIONS.map((pos) => (
            <div
              key={pos.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${pos.x * 100}%`,
                top: `${(1 - pos.y) * 100}%`,
              }}
            >
              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold sm:text-xs ${
                  "highlight" in pos && pos.highlight
                    ? "brand-gradient-bg text-fk-white shadow-md"
                    : "border border-fk-navy/12 bg-fk-white text-fk-navy/65"
                }`}
              >
                {pos.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>

      <InvestorSubtext className="mt-10">
        Referr concurreert niet alleen met andere platforms. De grootste concurrent
        is de bestaande manier van werken: databases, jobboards, losse
        WhatsApp-introducties en onoverzichtelijke referralprocessen.
      </InvestorSubtext>
    </InvestorSectionShell>
  );
}
