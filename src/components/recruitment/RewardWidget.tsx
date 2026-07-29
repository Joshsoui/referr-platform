"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  formatEuro,
  PORTAL_REWARDS,
  rewardKindLabel,
  type RewardAttention,
} from "@/lib/recruitment/portalMockData";
import { MotionCard, SectionLabel, SectionTitle } from "./MotionCard";

function kindVariant(
  kind: RewardAttention
): "default" | "success" | "warning" | "info" {
  if (kind === "uitbetaling_gereed") return "success";
  if (kind === "wachtperiode") return "warning";
  return "info";
}

export function RewardWidget() {
  return (
    <section id="beloningen">
      <div className="mb-4">
        <SectionLabel>Beloningen</SectionLabel>
        <SectionTitle>Aandacht nodig</SectionTitle>
      </div>

      <MotionCard className="!p-0 overflow-hidden">
        <ul className="divide-y divide-fk-navy/[0.05]">
          {PORTAL_REWARDS.map((reward) => (
            <li key={reward.id}>
              <Link
                href={reward.href}
                className="group flex items-start gap-3 px-5 py-4 transition hover:bg-fk-light/60"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant={kindVariant(reward.kind)}>
                      {rewardKindLabel(reward.kind)}
                    </Badge>
                    <span className="text-sm font-medium text-fk-navy/70">
                      {formatEuro(reward.amount)}
                    </span>
                  </div>
                  <p className="mt-2 font-semibold text-fk-navy">
                    {reward.candidateName}
                  </p>
                  <p className="text-sm text-fk-navy/50">
                    {reward.challengeTitle}
                  </p>
                  <p className="mt-1 text-sm text-fk-navy/60">{reward.detail}</p>
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
