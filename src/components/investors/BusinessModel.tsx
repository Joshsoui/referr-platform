"use client";

import { Card } from "@/components/ui/Card";
import {
  CHALLENGE_CREDITS_FEATURES,
  ENTERPRISE_FEATURES,
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

export function BusinessModel() {
  const feeRows = [
    { label: "Plaatsingsfee opdrachtgever", value: PLACEMENT_FEE_EXAMPLE.clientFee },
    { label: "Beloning referrer", value: PLACEMENT_FEE_EXAMPLE.referrerReward },
    { label: "Platformfee Referr", value: PLACEMENT_FEE_EXAMPLE.platformFee, highlight: true },
    { label: "Resterende marge recruitmentpartner", value: PLACEMENT_FEE_EXAMPLE.partnerMargin },
  ];

  return (
    <InvestorSectionShell id="business-model" variant="light" wide label="Businessmodel">
      <InvestorHeadline>
        Meerdere inkomstenstromen.
        <br />
        Eén schaalbaar platform.
      </InvestorHeadline>
      <InvestorSubtext>
        De exacte prijsstelling wordt nog getest en gevalideerd in pilots.
      </InvestorSubtext>
      <p className="mt-4 inline-flex rounded-full border border-fk-primary/15 bg-fk-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-fk-primary">
        Potentieel verdienmodel
      </p>

      {/* Model 1 */}
      <Reveal>
        <div className="mt-14">
          <h3 className="text-xl font-bold text-fk-navy">
            Model 1 — Platformabonnement
          </h3>
          <p className="mt-2 text-sm text-fk-navy/55">
            Recruitmentbureaus en werkgevers betalen voor toegang tot het Referr-platform.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SUBSCRIPTION_TIERS.map((tier) => (
              <Card key={tier.name} hover className="border-fk-primary/10">
                <p className="text-sm font-bold text-fk-primary">{tier.name}</p>
                <p className="mt-2 text-lg font-extrabold text-fk-navy">
                  {tier.price}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-fk-navy/55">
                  {tier.description}
                </p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-xs text-fk-navy/45">
            Illustratieve prijsstelling. Definitieve tarieven worden bepaald op
            basis van pilots en marktvalidatie.
          </p>
        </div>
      </Reveal>

      {/* Model 2 */}
      <Reveal delay={80}>
        <div className="mt-14">
          <h3 className="text-xl font-bold text-fk-navy">
            Model 2 — Fee per succesvolle plaatsing
          </h3>
          <p className="mt-2 text-sm text-fk-navy/55">
            Referr ontvangt een vast bedrag of percentage bij een succesvolle plaatsing.
          </p>
          <Card className="mt-6 border-fk-primary/10">
            <div className="grid gap-3 sm:grid-cols-2">
              {feeRows.map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 ${
                    row.highlight
                      ? "bg-fk-primary-muted/50"
                      : "bg-fk-light/80"
                  }`}
                >
                  <span className="text-sm text-fk-navy/65">{row.label}</span>
                  <span
                    className={`text-sm font-bold tabular-nums ${
                      row.highlight ? "text-fk-primary" : "text-fk-navy"
                    }`}
                  >
                    {formatInvestorEuro(row.value)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-fk-navy/45">
              Dit voorbeeld is uitsluitend bedoeld om de economische verdeling
              zichtbaar te maken. De werkelijke fee kan per klant, vacature en
              samenwerking verschillen.
            </p>
          </Card>
        </div>
      </Reveal>

      {/* Model 3 */}
      <Reveal delay={120}>
        <div className="mt-14">
          <h3 className="text-xl font-bold text-fk-navy">
            Model 3 — Challenge credits en zichtbaarheid
          </h3>
          <p className="mt-2 text-sm text-fk-navy/55">
            Organisaties kunnen aanvullend betalen voor:
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {CHALLENGE_CREDITS_FEATURES.map((feature) => (
              <li
                key={feature}
                className="rounded-xl border border-fk-primary/10 bg-fk-white px-4 py-2.5 text-sm text-fk-navy/65"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* Model 4 */}
      <Reveal delay={160}>
        <div className="mt-14">
          <h3 className="text-xl font-bold text-fk-navy">
            Model 4 — Enterprise en white-label
          </h3>
          <p className="mt-2 text-sm text-fk-navy/55">
            Voor grotere werkgevers en recruitmentorganisaties — een latere groeifase.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {ENTERPRISE_FEATURES.map((feature) => (
              <li
                key={feature}
                className="rounded-xl border border-fk-navy/8 bg-fk-white px-4 py-2.5 text-sm text-fk-navy/65"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </InvestorSectionShell>
  );
}
