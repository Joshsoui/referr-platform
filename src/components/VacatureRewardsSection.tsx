import { Banknote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import {
  DIFFICULTY_CASH_REWARDS,
  DIFFICULTY_META,
  KEEPER_BONUS,
  PLACEMENT_REWARD,
} from "@/lib/vacancyRewards";
import { formatCurrency } from "@/lib/xp";
import type { VacancyDifficulty } from "@/types/vacancy";

const DIFFICULTY_ORDER: VacancyDifficulty[] = ["easy", "hard", "expert"];

export function VacatureRewardsSection() {
  return (
    <Card hover className="border-fk-primary/15">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-fk-secondary text-fk-white shadow-md">
          <Banknote size={22} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-fk-navy">Challengebeloningen</h3>
          <p className="text-sm text-fk-navy/55">
            Beloning bij plaatsing, plus extra als de kandidaat 2 maanden blijft.
          </p>
        </div>
      </div>

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        {DIFFICULTY_ORDER.map((difficulty) => {
          const rewards = DIFFICULTY_CASH_REWARDS[difficulty];
          const meta = DIFFICULTY_META[difficulty];

          return (
            <div
              key={difficulty}
              className="rounded-2xl border border-fk-primary/10 bg-fk-light p-5"
            >
              <div className="mb-4 flex items-center justify-between gap-2">
                <DifficultyBadge difficulty={difficulty} />
                <span className="text-xs font-semibold uppercase text-fk-navy/45">
                  {meta.emoji} {meta.label}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="rounded-xl border border-fk-primary/15 bg-fk-white px-3 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-fk-navy">
                      {PLACEMENT_REWARD.title}
                    </span>
                    <span className="text-lg font-extrabold text-emerald-700">
                      {formatCurrency(rewards.match)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-fk-navy/60">
                    {PLACEMENT_REWARD.description}
                  </p>
                </div>
                <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-fk-white px-3 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900">
                      {KEEPER_BONUS.title}
                    </span>
                    <span className="text-xl font-extrabold text-amber-700">
                      {formatCurrency(rewards.keeper)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-fk-navy/60">
                    {KEEPER_BONUS.description}
                  </p>
                </div>
                <div className="flex justify-between border-t border-fk-primary/10 pt-2 font-semibold text-fk-navy">
                  <span>Totaal mogelijk</span>
                  <span>{formatCurrency(rewards.total)}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="rounded-xl border border-fk-primary/15 bg-fk-primary-muted px-4 py-3 text-sm text-fk-navy/70">
        Geen beloning bij alleen een tip of gesprek. Uitbetaling bij succesvolle
        plaatsing, en opnieuw als de kandidaat na 2 maanden nog in dienst is.
        Reputatiebonus geldt op beide beloningen.
      </p>
    </Card>
  );
}
