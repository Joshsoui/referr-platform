import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { getDifficultyRewards } from "@/lib/vacancyRewards";
import { formatCurrency } from "@/lib/xp";
import type { Vacancy } from "@/types/vacancy";

interface VacancyCardProps {
  vacancy: Vacancy;
}

export function VacancyCard({ vacancy }: VacancyCardProps) {
  const rewards = getDifficultyRewards(vacancy.difficulty);

  return (
    <Card hover className="flex h-full flex-col border-fk-primary/10">
      <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
            {vacancy.sector}
          </p>
          <h3 className="mt-1 text-lg font-bold text-fk-navy">{vacancy.title}</h3>
        </div>
        <DifficultyBadge difficulty={vacancy.difficulty} />
      </div>

      <p className="mb-4 flex items-center gap-1.5 text-sm text-fk-navy/55">
        <MapPin size={14} className="shrink-0" />
        {vacancy.location}
      </p>

      <p className="mb-4 line-clamp-2 flex-1 text-sm text-fk-navy/70">
        {vacancy.description}
      </p>

      <div className="mb-4 rounded-xl bg-fk-light px-3 py-2.5 text-sm">
        <p className="text-xs font-semibold uppercase text-fk-navy/45">
          Beloningen
        </p>
        <p className="mt-1 font-medium text-fk-navy">
          Match {formatCurrency(rewards.match)}
        </p>
        <p className="text-base font-extrabold text-amber-700">
          🏆 Keeper Bonus {formatCurrency(rewards.keeper)}
        </p>
        <p className="mt-1 text-xs text-fk-navy/50">
          Totaal tot {formatCurrency(rewards.total)}
        </p>
      </div>

      <Link
        href={`/vacatures/${vacancy.id}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-fk-primary hover:text-fk-navy"
      >
        Bekijk vacature
        <ArrowRight size={14} />
      </Link>
    </Card>
  );
}

export function VacancyCardCompact({ vacancy }: VacancyCardProps) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="font-medium text-fk-navy">{vacancy.title}</span>
      <DifficultyBadge difficulty={vacancy.difficulty} size="sm" />
    </div>
  );
}
