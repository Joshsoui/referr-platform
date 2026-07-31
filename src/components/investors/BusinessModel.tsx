"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  formatInvestorEuro,
  PLACEMENT_FEE_EXAMPLE,
  SUBSCRIPTION_TIERS,
} from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
  InvestorSubtext,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";
import { registerGsap, useReducedMotion, useScrollReveal } from "./useInvestorMotion";

const FEE_ROWS = [
  {
    label: "Opdrachtgever",
    value: PLACEMENT_FEE_EXAMPLE.clientFee,
    share: 1,
    tone: "bg-fk-navy/15",
  },
  {
    label: "referrer",
    value: PLACEMENT_FEE_EXAMPLE.referrerReward,
    share: PLACEMENT_FEE_EXAMPLE.referrerReward / PLACEMENT_FEE_EXAMPLE.clientFee,
    tone: "bg-gradient-to-r from-[#ff4d59] to-[#ff9a3c]",
  },
  {
    label: "referr platform",
    value: PLACEMENT_FEE_EXAMPLE.platformFee,
    share: PLACEMENT_FEE_EXAMPLE.platformFee / PLACEMENT_FEE_EXAMPLE.clientFee,
    tone: "bg-gradient-to-r from-[#ff4d59] to-[#ff7a30]",
    highlight: true,
  },
  {
    label: "Partner marge",
    value: PLACEMENT_FEE_EXAMPLE.partnerMargin,
    share: PLACEMENT_FEE_EXAMPLE.partnerMargin / PLACEMENT_FEE_EXAMPLE.clientFee,
    tone: "bg-fk-navy/25",
  },
] as const;

export function BusinessModel() {
  const barsRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const revealRef = useScrollReveal<HTMLDivElement>({ y: 28 });

  useEffect(() => {
    if (reduced || !barsRef.current) return;
    registerGsap();
    const bars = barsRef.current.querySelectorAll<HTMLElement>("[data-fee-bar]");
    gsap.fromTo(
      bars,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: barsRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [reduced]);

  return (
    <InvestorSectionShell id="business-model" variant="light" wide label="Businessmodel">
      <InvestorHeadline>
        Twee kernstromen.
        <br />
        <span className="brand-wordmark">Eén schaalbaar platform.</span>
      </InvestorHeadline>
      <InvestorSubtext>
        Prijsstelling wordt gevalideerd in pilots — onderstaande is illustratief.
      </InvestorSubtext>

      <Reveal>
        <div className="mt-12">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-fk-primary">
            Abonnement
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl border border-fk-primary/10 bg-gradient-to-br from-fk-white to-fk-primary-muted/20 p-4"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-fk-primary">
                  {tier.name}
                </p>
                <p className="mt-2 text-lg font-extrabold tracking-tight text-fk-navy">
                  {tier.price.includes("€") ? (
                    <>
                      <span className="brand-wordmark">
                        {tier.price.match(/€\s*[\d.]+/)?.[0] ?? tier.price}
                      </span>
                      <span className="ml-1 text-sm font-semibold text-fk-navy/45">
                        {tier.price.replace(/€\s*[\d.]+\s*/, "")}
                      </span>
                    </>
                  ) : (
                    <span className="text-base">{tier.price}</span>
                  )}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-fk-navy/50">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div ref={revealRef} className="mt-12">
        <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-fk-primary">
          Fee per plaatsing
        </h3>
        <p className="mt-2 text-sm text-fk-navy/50">
          Voorbeeldverdeling bij een plaatsingsfee van{" "}
          <span className="font-semibold text-fk-navy">
            {formatInvestorEuro(PLACEMENT_FEE_EXAMPLE.clientFee)}
          </span>
        </p>

        <div
          ref={barsRef}
          className="mt-6 space-y-4 rounded-2xl border border-fk-primary/10 bg-fk-white p-5 sm:p-6"
        >
          {FEE_ROWS.map((row) => (
            <div key={row.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span
                  className={`text-sm ${
                    "highlight" in row && row.highlight
                      ? "font-semibold text-fk-navy"
                      : "text-fk-navy/60"
                  }`}
                >
                  {row.label}
                </span>
                <span
                  className={`text-sm font-bold tabular-nums ${
                    "highlight" in row && row.highlight
                      ? "brand-wordmark"
                      : "text-fk-navy"
                  }`}
                >
                  {formatInvestorEuro(row.value)}
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-fk-navy/[0.06]">
                <div
                  data-fee-bar
                  className={`h-full origin-left rounded-full ${row.tone}`}
                  style={{ width: `${Math.max(8, row.share * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 text-sm text-fk-navy/45">
        Later: challenge credits, zichtbaarheid en enterprise / white-label.
      </p>
    </InvestorSectionShell>
  );
}
