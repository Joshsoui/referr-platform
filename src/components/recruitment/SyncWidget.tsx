"use client";

import { AlertTriangle, Check } from "lucide-react";
import { SYNC_ITEMS } from "@/lib/recruitment/portalMockData";
import { MotionCard, SectionLabel, SectionTitle } from "./MotionCard";

export function SyncWidget() {
  return (
    <section id="sync">
      <div className="mb-4">
        <SectionLabel>Synchronisatie</SectionLabel>
        <SectionTitle>Status</SectionTitle>
      </div>

      <MotionCard className="!p-0 overflow-hidden">
        <ul className="divide-y divide-fk-navy/[0.05]">
          {SYNC_ITEMS.map((item) => (
            <li
              key={item.id}
              className="flex items-start gap-3 px-5 py-3.5"
            >
              {item.level === "ok" ? (
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Check size={14} strokeWidth={3} />
                </span>
              ) : (
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                  <AlertTriangle size={14} />
                </span>
              )}
              <p
                className={`text-sm font-medium ${
                  item.level === "ok" ? "text-fk-navy/70" : "text-fk-navy"
                }`}
              >
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      </MotionCard>
    </section>
  );
}
