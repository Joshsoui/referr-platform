import { Lock } from "lucide-react";
import type { ScoutBadge } from "@/types/gamification";
import { SCOUT_BADGES } from "@/lib/mockBadges";

interface BadgeGridProps {
  badges?: ScoutBadge[];
  compact?: boolean;
}

export function BadgeGrid({ badges = SCOUT_BADGES, compact = false }: BadgeGridProps) {
  const earned = badges.filter((b) => b.earned);
  const locked = badges.filter((b) => !b.earned);

  const renderBadge = (badge: ScoutBadge) => (
    <div
      key={badge.id}
      className={`relative flex flex-col items-center rounded-2xl border px-3 py-4 text-center transition-all duration-300 ${
        badge.earned
          ? "border-fk-primary/20 bg-fk-primary/5 card-hover"
          : "border-fk-primary/5 bg-fk-light/50 opacity-70"
      }`}
    >
      {!badge.earned && (
        <Lock
          size={14}
          className="absolute right-2 top-2 text-fk-navy/30"
        />
      )}
      <span className="text-3xl" aria-hidden>
        {badge.icon}
      </span>
      <p className="mt-2 text-xs font-bold text-fk-navy">{badge.name}</p>
      {!compact && (
        <p className="mt-1 text-[10px] leading-tight text-fk-navy/50">
          {badge.description}
        </p>
      )}
      {badge.earned && badge.earnedAt && !compact && (
        <p className="mt-2 text-[10px] font-semibold text-fk-primary">
          Behaald
        </p>
      )}
    </div>
  );

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-fk-navy">Badges</h3>
          <p className="text-sm text-fk-navy/55">
            {earned.length} van {badges.length} behaald
          </p>
        </div>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fk-secondary">
        Behaald
      </p>
      <div className="mb-6 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {earned.map(renderBadge)}
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fk-navy/40">
        Nog te behalen
      </p>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
        {locked.map(renderBadge)}
      </div>
    </div>
  );
}
