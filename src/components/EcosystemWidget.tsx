"use client";

import { Award, Euro, Shield, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { SCOUT_BADGES } from "@/lib/mockBadges";
import { formatCurrency, getLevelForXp } from "@/lib/xp";
import type { RewardSummary } from "@/types/incentives";

interface EcosystemWidgetProps {
  xp: number;
  scoutScore: number;
  rewards: RewardSummary;
}

export function EcosystemWidget({ xp, scoutScore, rewards }: EcosystemWidgetProps) {
  const level = getLevelForXp(xp);
  const earnedBadges = SCOUT_BADGES.filter((b) => b.earned)
    .slice(0, 4)
    .map((b) => b.name);

  return (
    <div className="mb-8 overflow-hidden rounded-2xl border-2 border-fk-primary/20 bg-gradient-to-br from-fk-white via-fk-white to-fk-primary/5 shadow-md">
      <div className="border-b border-fk-primary/10 bg-fk-primary/5 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-2">
          <Shield size={20} className="text-fk-primary" />
          <h2 className="text-xl font-extrabold text-fk-navy">Jouw reputatie</h2>
        </div>
      </div>

      <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-fk-primary/10 bg-fk-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
                Reputatie
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-lg font-extrabold text-fk-navy">
                <Star size={16} className="text-fk-primary" />
                {level.name}
              </p>
            </div>
            <div className="rounded-xl border border-fk-primary/10 bg-fk-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
                Kwaliteit
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-lg font-extrabold text-fk-navy tabular-nums">
                <TrendingUp size={16} className="text-fk-secondary" />
                {scoutScore}/100
              </p>
            </div>
            <div className="rounded-xl border border-fk-primary/10 bg-fk-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
                Verdiend
              </p>
              <p className="mt-1 flex items-center gap-1.5 text-lg font-extrabold text-fk-navy">
                <Euro size={16} className="text-emerald-600" />
                {formatCurrency(rewards.cashEarned)}
              </p>
            </div>
            <div className="rounded-xl border border-fk-primary/10 bg-fk-white p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
                In behandeling
              </p>
              <p className="mt-1 font-bold text-amber-700">
                {formatCurrency(rewards.cashPending)}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-fk-secondary">
              <Award size={14} />
              Mijlpalen
            </p>
            <div className="flex flex-wrap gap-2">
              {earnedBadges.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-fk-primary-muted px-3 py-1 text-xs font-semibold text-fk-primary"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-xl border border-fk-primary/15 bg-fk-primary/5 p-5">
          <p className="text-sm font-bold text-fk-navy">Hoe referr werkt</p>
          <ul className="mt-3 space-y-2 text-sm text-fk-navy/70">
            <li>
              <strong className="text-fk-primary">Introducties</strong> = activiteit
            </li>
            <li>
              <strong className="text-fk-secondary">Kwaliteit</strong> = vertrouwen
            </li>
            <li>
              <strong className="text-fk-navy">Reputatie</strong> = erkenning
            </li>
            <li>
              <strong className="text-fk-navy">Mijlpalen</strong> = voortgang
            </li>
            <li>
              <strong className="text-emerald-700">Beloning</strong> = resultaat
            </li>
          </ul>
          <p className="mt-4 text-sm leading-relaxed text-fk-navy/65">
            Cash verdien je alleen bij echte resultaten: gesprekken, plaatsingen
            en retentie.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/levels"
              className="text-sm font-semibold text-fk-primary hover:underline"
            >
              Bekijk profiel →
            </Link>
            <Link
              href="/rewards"
              className="text-sm font-semibold text-fk-primary hover:underline"
            >
              Bekijk beloningen →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
