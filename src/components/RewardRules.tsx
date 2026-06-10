import { Card } from "@/components/ui/Card";
import {
  CASH_REWARDS,
  LEVEL_CASH_MULTIPLIERS,
  MAX_CASH_PER_CANDIDATE,
  XP_REWARDS,
} from "@/lib/mockRewards";
import { FAIR_USE_RULES } from "@/lib/mockQualityRules";
import { formatCurrency } from "@/lib/xp";

export function RewardRules() {
  return (
    <div className="space-y-8">
      <Card>
        <h3 className="mb-4 text-lg font-bold text-fk-navy">XP-beloningen</h3>
        <p className="mb-4 text-sm text-fk-navy/60">
          XP verdien je met activiteit. Het is geen geld — het meet je progressie
          als Scout.
        </p>
        <div className="space-y-2">
          {XP_REWARDS.map((item) => (
            <div
              key={item.action}
              className="flex items-center justify-between rounded-xl bg-fk-light px-4 py-3 text-sm"
            >
              <span className="text-fk-navy">{item.action}</span>
              <span className="font-bold text-fk-primary">+{item.xp} XP</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-bold text-fk-navy">Cash-beloningen</h3>
        <p className="mb-4 text-sm text-fk-navy/60">
          Cash verdien je alleen met resultaat. Geen cash voor alleen aandragen.
        </p>
        <div className="space-y-2">
          {CASH_REWARDS.map((item) => (
            <div
              key={item.action}
              className="flex items-center justify-between rounded-xl bg-fk-light px-4 py-3 text-sm"
            >
              <span className="text-fk-navy">
                {item.action}
                {item.note && (
                  <span className="ml-1 text-fk-navy/45">({item.note})</span>
                )}
              </span>
              <span className="font-bold text-emerald-700">
                {item.cash === 0 ? "€0" : formatCurrency(item.cash)}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm font-semibold text-fk-primary">
          Maximaal {formatCurrency(MAX_CASH_PER_CANDIDATE)} per kandidaat
        </p>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-bold text-fk-navy">
          Level multipliers op cash
        </h3>
        <div className="space-y-2">
          {LEVEL_CASH_MULTIPLIERS.map((item) => (
            <div
              key={item.level}
              className="flex items-center justify-between rounded-xl border border-fk-primary/10 px-4 py-3 text-sm"
            >
              <span className="font-semibold text-fk-navy">{item.level}</span>
              <span className="text-fk-primary">{item.bonus}</span>
            </div>
          ))}
        </div>
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Cash wordt nooit automatisch uitgekeerd. Cash staat eerst op
          &ldquo;in behandeling&rdquo; en wordt handmatig goedgekeurd door
          Finderz Keeperz.
        </p>
      </Card>

      <Card>
        <h3 className="mb-4 text-lg font-bold text-fk-navy">Eerlijk gebruik</h3>
        <ul className="space-y-2">
          {FAIR_USE_RULES.map((rule) => (
            <li
              key={rule}
              className="flex items-start gap-2 text-sm text-fk-navy/70"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-fk-primary" />
              {rule}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
