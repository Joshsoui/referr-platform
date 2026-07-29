"use client";

import { Clock, Euro, Sparkles } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { formatCurrency } from "@/lib/xp";
import type { RewardSummary } from "@/types/incentives";

interface RewardsWidgetProps {
  xp: number;
  rewards: RewardSummary;
}

export function RewardsWidget({ rewards }: RewardsWidgetProps) {
  const earned = useAnimatedNumber(rewards.cashEarned);
  const pending = useAnimatedNumber(rewards.cashPending);

  return (
    <Card className="mb-8 border-fk-primary/15" hover>
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-fk-navy">Jouw beloningen</h2>
          <p className="mt-0.5 text-sm text-fk-navy/55">
            Wat al binnen is — en wat nog onderweg is
          </p>
        </div>
        <Link
          href="/rewards"
          className="text-sm font-semibold text-fk-primary hover:underline"
        >
          Hoe werkt dit?
        </Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 transition-transform duration-300 hover:scale-[1.01]">
          <Euro size={18} className="mb-2 text-emerald-600" />
          <p className="text-xs font-semibold uppercase tracking-wider text-fk-navy/50">
            Totaal verdiend
          </p>
          <p className="text-2xl font-extrabold tabular-nums text-emerald-800">
            {formatCurrency(earned)}
          </p>
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 transition-transform duration-300 hover:scale-[1.01]">
          <Clock size={18} className="mb-2 text-amber-600" />
          <p className="text-xs font-semibold uppercase tracking-wider text-fk-navy/50">
            In behandeling
          </p>
          <p className="text-2xl font-extrabold tabular-nums text-amber-800">
            {formatCurrency(pending)}
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
