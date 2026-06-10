"use client";

import { Clock, Euro, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/xp";
import type { RewardSummary } from "@/types/incentives";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface RewardsWidgetProps {
  xp: number;
  rewards: RewardSummary;
}

export function RewardsWidget({ xp, rewards }: RewardsWidgetProps) {
  const animatedXp = useAnimatedNumber(xp);

  return (
    <Card className="mb-8 border-fk-primary/15" hover>
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-fk-navy">Jouw beloningen</h2>
        <Link
          href="/rewards"
          className="text-sm font-semibold text-fk-primary hover:underline"
        >
          Hoe werkt dit?
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-fk-primary/10 bg-fk-primary/5 p-4">
          <Zap size={18} className="mb-2 text-fk-primary" />
          <p className="text-xs font-semibold uppercase tracking-wider text-fk-navy/50">
            XP verdiend
          </p>
          <p className="text-2xl font-extrabold tabular-nums text-fk-primary">
            {animatedXp.toLocaleString("nl-NL")}
          </p>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <Euro size={18} className="mb-2 text-emerald-600" />
          <p className="text-xs font-semibold uppercase tracking-wider text-fk-navy/50">
            Cash verdiend
          </p>
          <p className="text-2xl font-extrabold text-emerald-800">
            {formatCurrency(rewards.cashEarned)}
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
          <Clock size={18} className="mb-2 text-amber-600" />
          <p className="text-xs font-semibold uppercase tracking-wider text-fk-navy/50">
            In behandeling
          </p>
          <p className="text-2xl font-extrabold text-amber-800">
            {formatCurrency(rewards.cashPending)}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2 rounded-xl border border-fk-primary/10 bg-fk-light px-4 py-3">
        <Sparkles size={16} className="mt-0.5 shrink-0 text-fk-secondary" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
            Volgende mogelijke beloning
          </p>
          <p className="mt-1 text-sm font-medium text-fk-navy">
            {rewards.nextRewardHint}
          </p>
        </div>
      </div>
    </Card>
  );
}
