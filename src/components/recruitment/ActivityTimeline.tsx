"use client";

import { PORTAL_ACTIVITY } from "@/lib/recruitment/portalMockData";
import { MotionCard, SectionLabel, SectionTitle } from "./MotionCard";

export function ActivityTimeline() {
  return (
    <section>
      <div className="mb-4">
        <SectionLabel>Activiteit</SectionLabel>
        <SectionTitle>Vandaag</SectionTitle>
      </div>

      <MotionCard>
        <ol className="relative space-y-5 border-l border-fk-navy/[0.08] pl-5">
          {PORTAL_ACTIVITY.map((item) => (
            <li key={item.id} className="relative">
              <span
                className="absolute -left-[1.4rem] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-fk-white bg-fk-primary"
                aria-hidden
              />
              <time className="text-xs font-semibold tabular-nums text-fk-navy/40">
                {item.time}
              </time>
              <p className="mt-1 text-sm font-medium leading-relaxed text-fk-navy/75">
                {item.text}
              </p>
            </li>
          ))}
        </ol>
      </MotionCard>
    </section>
  );
}
