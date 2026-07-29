"use client";

import { Card } from "@/components/ui/Card";
import { COLLABORATION_FORMS } from "@/lib/investors/investorsData";
import {
  InvestorHeadline,
  InvestorSectionShell,
} from "./InvestorSectionShell";
import { Reveal } from "@/components/landing/Reveal";

export function CollaborationNeeds() {
  return (
    <InvestorSectionShell id="collaboration" variant="light" label="Samenwerking">
      <InvestorHeadline>De volgende fase.</InvestorHeadline>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {COLLABORATION_FORMS.map((form, index) => (
          <Reveal key={form.title} delay={index * 90}>
            <Card hover className="h-full border-fk-primary/10">
              <h3 className="text-lg font-bold text-fk-navy">{form.title}</h3>
              <ul className="mt-4 space-y-2">
                {form.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-fk-navy/65"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fk-primary" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </InvestorSectionShell>
  );
}
