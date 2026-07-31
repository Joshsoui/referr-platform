"use client";

import { Card } from "@/components/ui/Card";
import {
  COLLABORATION_FORMS,
  CONCEPT_MILESTONES,
  INVESTMENT_ASK,
} from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function InvestmentAsk() {
  const rows = [
    { label: "Investeringsbehoefte", value: INVESTMENT_ASK.amount },
    { label: "Structuur", value: INVESTMENT_ASK.structure },
    { label: "Type", value: INVESTMENT_ASK.type },
    { label: "Doel", value: INVESTMENT_ASK.goal },
  ];

  return (
    <InvestorSectionShell id="investment-ask" label="Ask" variant="muted">
      <InvestorHeadline>
        Investeer in
        <br />
        <span className="brand-wordmark">de volgende fase.</span>
      </InvestorHeadline>

      <Reveal>
        <Card className="mt-10 border-fk-primary/10 bg-gradient-to-br from-fk-white to-fk-primary-muted/20">
          <dl className="divide-y divide-fk-navy/[0.06]">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between"
              >
                <dt className="text-sm font-medium text-fk-navy/45">
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

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <Reveal delay={60}>
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-fk-primary">
              Besteding
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {INVESTMENT_ASK.spending.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-fk-primary/15 bg-fk-white px-3 py-1.5 text-xs font-medium text-fk-navy/65"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-fk-primary">
              Milestones
            </h3>
            <ul className="mt-3 space-y-2">
              {CONCEPT_MILESTONES.slice(0, 5).map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm text-fk-navy/65"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-[#ff4d59] to-[#ff9a3c]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={140}>
        <div className="mt-10">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.16em] text-fk-primary">
            Samenwerkingsvormen
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {COLLABORATION_FORMS.map((form) => (
              <div
                key={form.title}
                className="rounded-2xl border border-fk-navy/[0.08] bg-fk-white px-4 py-4"
              >
                <p className="text-sm font-bold text-fk-navy">{form.title}</p>
                <p className="mt-2 text-xs leading-relaxed text-fk-navy/50">
                  {form.items.slice(0, 2).join(" · ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </InvestorSectionShell>
  );
}
