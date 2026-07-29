"use client";

import { PORTAL_STATS } from "@/lib/recruitment/portalMockData";
import { MotionCard } from "./MotionCard";

export function StatsCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {PORTAL_STATS.map((stat) => {
        const positive = stat.delta >= 0;
        return (
          <MotionCard key={stat.id} className="!p-4 sm:!p-5">
            <p className="text-xs font-medium text-fk-navy/45">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-fk-navy">
              {stat.value}
            </p>
            <p
              className={`mt-1 text-xs ${
                positive ? "text-fk-navy/45" : "text-fk-navy/35"
              }`}
            >
              {positive ? "+" : ""}
              {stat.delta} {stat.deltaLabel}
            </p>
          </MotionCard>
        );
      })}
    </div>
  );
}
