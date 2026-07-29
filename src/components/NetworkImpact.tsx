"use client";

import { Briefcase, Euro, HeartHandshake, MessagesSquare, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import type { NetworkImpactStats } from "@/lib/activityMoments";
import { formatCurrency } from "@/lib/xp";

interface NetworkImpactProps {
  impact: NetworkImpactStats;
}

export function NetworkImpact({ impact }: NetworkImpactProps) {
  const introductions = useAnimatedNumber(impact.introductions);
  const interviews = useAnimatedNumber(impact.interviews);
  const placements = useAnimatedNumber(impact.placements);
  const earned = useAnimatedNumber(impact.earned);
  const careers = useAnimatedNumber(impact.careersChanged);

  const items = [
    {
      icon: Users,
      label: "Introducties",
      value: introductions.toLocaleString("nl-NL"),
    },
    {
      icon: MessagesSquare,
      label: "Gesprekken",
      value: interviews.toLocaleString("nl-NL"),
    },
    {
      icon: Briefcase,
      label: "Plaatsingen",
      value: placements.toLocaleString("nl-NL"),
    },
    {
      icon: Euro,
      label: "Verdiend",
      value: formatCurrency(earned),
    },
    {
      icon: HeartHandshake,
      label: "Carrières veranderd",
      value: careers.toLocaleString("nl-NL"),
    },
  ];

  return (
    <Card className="mb-8 overflow-hidden border-fk-primary/15 bg-gradient-to-br from-fk-white via-fk-white to-fk-primary/5">
      <div className="mb-5">
        <p className="text-xs font-bold uppercase tracking-wider text-fk-secondary">
          Impact
        </p>
        <h2 className="mt-1 text-xl font-bold text-fk-navy">
          Jouw netwerkimpact
        </h2>
        <p className="mt-1 text-sm text-fk-navy/55">
          Wat jouw introducties écht in beweging zetten
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-fk-primary/10 bg-fk-white px-3 py-4 text-center transition-transform duration-300 hover:scale-[1.02]"
          >
            <item.icon size={16} className="mx-auto mb-2 text-fk-primary" />
            <p className="text-lg font-extrabold tabular-nums text-fk-navy sm:text-xl">
              {item.value}
            </p>
            <p className="mt-1 text-[11px] font-medium text-fk-navy/55 sm:text-xs">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}
