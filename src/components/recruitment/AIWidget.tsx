"use client";

import { Sparkles } from "lucide-react";
import { AI_QUICK_ACTIONS } from "@/lib/recruitment/portalMockData";
import { MotionCard, SectionLabel, SectionTitle } from "./MotionCard";

export function AIWidget() {
  return (
    <MotionCard>
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-fk-navy/[0.06] bg-fk-light/50 text-fk-navy/50">
          <Sparkles size={15} />
        </span>
        <div>
          <SectionLabel>Assistent</SectionLabel>
          <SectionTitle>AI Recruitment Assistant</SectionTitle>
        </div>
      </div>

      <p className="mt-4 text-sm text-fk-navy/50">
        Waar kan ik je vandaag mee helpen?
      </p>

      <ul className="mt-4 space-y-1.5">
        {AI_QUICK_ACTIONS.map((action) => (
          <li key={action.id}>
            <button
              type="button"
              className="w-full rounded-lg border border-transparent px-3 py-2.5 text-left text-sm text-fk-navy/70 transition hover:border-fk-navy/[0.06] hover:bg-fk-light/60 hover:text-fk-navy"
            >
              {action.label}
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-fk-navy/35">
        Binnenkort beschikbaar
      </p>
    </MotionCard>
  );
}
