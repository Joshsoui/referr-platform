"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  TODAY_ACTIONS,
  type TodayPriority,
} from "@/lib/recruitment/portalMockData";
import { MotionCard, SectionLabel, SectionTitle } from "./MotionCard";

const priorityStyles: Record<
  TodayPriority,
  { dot: string; label: string }
> = {
  critical: { dot: "bg-fk-primary", label: "Urgent" },
  high: { dot: "bg-amber-500", label: "Hoog" },
  success: { dot: "bg-emerald-500", label: "Afgerond" },
  attention: { dot: "bg-orange-400", label: "Actie" },
  warning: { dot: "bg-fk-navy/30", label: "Let op" },
};

export function TodayCard() {
  return (
    <MotionCard className="!p-0 overflow-hidden">
      <div className="border-b border-fk-navy/[0.05] px-5 py-4 sm:px-6">
        <SectionLabel>Vandaag</SectionLabel>
        <SectionTitle>Jouw werk voor vandaag</SectionTitle>
      </div>
      <ul className="divide-y divide-fk-navy/[0.05]">
        {TODAY_ACTIONS.slice(0, 5).map((action) => {
          const style = priorityStyles[action.priority];
          return (
            <li key={action.id}>
              <Link
                href={action.href}
                className="group flex items-center gap-3 px-5 py-3.5 transition hover:bg-fk-light/50 sm:px-6"
              >
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${style.dot}`}
                  aria-hidden
                />
                <span className="flex-1 text-sm text-fk-navy sm:text-[15px]">
                  {action.label}
                </span>
                <span className="hidden text-[10px] font-medium uppercase tracking-wide text-fk-navy/35 sm:inline">
                  {style.label}
                </span>
                <ArrowRight
                  size={15}
                  className="shrink-0 text-fk-navy/25 transition group-hover:text-fk-navy/60"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </MotionCard>
  );
}
