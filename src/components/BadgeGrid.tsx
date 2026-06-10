import { Lock } from "lucide-react";
import type { ScoutBadge } from "@/types/gamification";
import { SCOUT_BADGES } from "@/lib/mockBadges";

interface BadgeGridProps {
  badges?: ScoutBadge[];
  compact?: boolean;
  detailed?: boolean;
}

export function BadgeGrid({
  badges = SCOUT_BADGES,
  compact = false,
  detailed = false,
}: BadgeGridProps) {
  const earned = badges.filter((b) => b.earned);
  const locked = badges.filter((b) => !b.earned);

  const renderBadge = (badge: ScoutBadge) => (
    <div
      key={badge.id}
      className={`relative flex flex-col rounded-2xl border px-3 py-4 text-left transition-all duration-300 ${
        badge.earned
          ? "border-fk-primary/20 bg-fk-primary/5 card-hover"
          : "border-fk-primary/5 bg-fk-light/50 opacity-80"
      } ${detailed ? "sm:flex-row sm:items-start sm:gap-4" : "items-center text-center"}`}
    >
      {!badge.earned && (
        <Lock
          size={14}
          className="absolute right-2 top-2 text-fk-navy/30"
        />
      )}
      <span className={`text-3xl ${detailed ? "shrink-0" : ""}`} aria-hidden>
        {badge.icon}
      </span>
      <div className={detailed ? "min-w-0 flex-1" : ""}>
        <p className={`font-bold text-fk-navy ${detailed ? "text-base" : "mt-2 text-xs"}`}>
          {badge.name}
        </p>
        <p
          className={`mt-1 text-xs font-semibold ${
            badge.earned ? "text-fk-primary" : "text-fk-navy/40"
          }`}
        >
          {badge.earned ? "Behaald" : "Nog te behalen"}
        </p>
        {!compact && (
          <>
            <p className="mt-2 text-xs leading-relaxed text-fk-navy/55">
              <strong>Hoe:</strong> {badge.howToEarn}
            </p>
            {(detailed || badge.earned) && (
              <p className="mt-1 text-xs leading-relaxed text-fk-navy/65">
                <strong>Betekenis:</strong> {badge.meaning}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );

  if (detailed) {
    return (
      <div className="space-y-3">
        {badges.map(renderBadge)}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-fk-navy">Badges</h3>
          <p className="text-sm text-fk-navy/55">
            {earned.length} van {badges.length} behaald · specialisatie & erkenning
          </p>
        </div>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fk-secondary">
        Behaald
      </p>
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {earned.map(renderBadge)}
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-fk-navy/40">
        Nog te behalen
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {locked.map(renderBadge)}
      </div>
    </div>
  );
}
