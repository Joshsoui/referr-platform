"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  ATTENTION_CANDIDATES,
  attentionChipLabel,
  type AttentionKind,
} from "@/lib/recruitment/portalMockData";
import { MotionCard, SectionLabel, SectionTitle } from "./MotionCard";

function chipVariant(
  kind: AttentionKind
): "default" | "success" | "warning" | "info" {
  if (kind === "start_bevestigd") return "success";
  if (kind === "gesprek_gepland") return "info";
  if (kind === "wacht_beoordeling" || kind === "geen_feedback") return "warning";
  return "default";
}

export function AttentionList() {
  return (
    <section id="aandacht">
      <div className="mb-4">
        <SectionLabel>Aandacht</SectionLabel>
        <SectionTitle>Kandidaten die aandacht nodig hebben</SectionTitle>
      </div>

      <MotionCard className="!p-0 overflow-hidden">
        <ul className="divide-y divide-fk-navy/[0.05]">
          {ATTENTION_CANDIDATES.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="group flex items-start gap-3 px-5 py-4 transition hover:bg-fk-light/60 sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-fk-navy">{item.name}</p>
                    <Badge variant={chipVariant(item.kind)}>
                      {attentionChipLabel(item.kind)}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-fk-navy/50">
                    {item.challengeTitle}
                  </p>
                  <p className="mt-0.5 text-sm font-medium text-fk-navy/70">
                    {item.detail}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  className="mt-1 shrink-0 text-fk-navy/25 transition group-hover:translate-x-0.5 group-hover:text-fk-primary"
                />
              </Link>
            </li>
          ))}
        </ul>
      </MotionCard>
    </section>
  );
}
