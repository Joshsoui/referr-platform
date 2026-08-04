"use client";

import { useMemo } from "react";
import { useScout } from "@/context/ScoutContext";
import { MotionCard } from "./MotionCard";

export function StatsCards() {
  const { candidates, vacancies } = useScout();

  const stats = useMemo(() => {
    const pending = candidates.filter(
      (item) => item.referralApproval === "pending"
    ).length;
    const approved = candidates.filter(
      (item) => item.referralApproval === "goedgekeurd"
    ).length;
    const openChallenges = vacancies.filter((item) => item.status === "open").length;
    const payoutReady = candidates.filter((item) =>
      ["intake_goedgekeurd", "plaatsing_goedgekeurd", "retentie_goedgekeurd"].includes(
        item.cashStatus
      )
    ).length;

    return [
      {
        id: "pending",
        label: "Te beoordelen",
        value: pending,
        deltaLabel: "tips wachten",
      },
      {
        id: "approved",
        label: "Goedgekeurd",
        value: approved,
        deltaLabel: "tips in pipeline",
      },
      {
        id: "challenges",
        label: "Open challenges",
        value: openChallenges,
        deltaLabel: "actief",
      },
      {
        id: "payouts",
        label: "Uitbetaling gereed",
        value: payoutReady,
        deltaLabel: "handmatig overmaken",
      },
    ];
  }, [candidates, vacancies]);

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <MotionCard key={stat.id} className="!p-4 sm:!p-5">
          <p className="text-xs font-medium text-fk-navy/45">{stat.label}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-fk-navy">
            {stat.value}
          </p>
          <p className="mt-1 text-xs text-fk-navy/45">{stat.deltaLabel}</p>
        </MotionCard>
      ))}
    </div>
  );
}
