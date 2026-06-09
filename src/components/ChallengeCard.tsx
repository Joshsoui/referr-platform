import type { Challenge } from "@/types/gamification";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Badge } from "@/components/ui/Badge";

interface ChallengeCardProps {
  challenge: Challenge;
  compact?: boolean;
}

export function ChallengeCard({ challenge, compact = false }: ChallengeCardProps) {
  const progress = Math.min(
    100,
    Math.round((challenge.current / challenge.target) * 100)
  );

  return (
    <div
      className={`rounded-2xl border border-fk-primary/10 bg-fk-white shadow-sm transition-all duration-300 ${
        compact ? "p-4" : "p-6 card-hover"
      } ${challenge.isCommunity ? "ring-1 ring-fk-secondary/20" : ""}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="text-2xl leading-none" aria-hidden>
            {challenge.icon}
          </span>
          <div>
            <h3 className="font-bold text-fk-navy">{challenge.title}</h3>
            {!compact && (
              <p className="mt-1 text-sm text-fk-navy/60">
                {challenge.description}
              </p>
            )}
          </div>
        </div>
        <Badge variant={challenge.status === "active" ? "info" : "success"}>
          {challenge.status === "active" ? "Actief" : "Voltooid"}
        </Badge>
      </div>

      <div className="mb-3">
        <div className="mb-1.5 flex items-center justify-between text-sm">
          <span className="text-fk-navy/60">Voortgang</span>
          <span className="font-semibold text-fk-primary tabular-nums">
            {challenge.current}/{challenge.target}
          </span>
        </div>
        <ProgressBar progress={progress} animated={!compact} />
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="rounded-lg bg-fk-primary-muted px-2.5 py-1 font-semibold text-fk-primary">
          {challenge.reward}
        </span>
        {challenge.badgeReward && (
          <span className="rounded-lg bg-amber-50 px-2.5 py-1 font-semibold text-amber-800">
            Badge: {challenge.badgeReward}
          </span>
        )}
        {challenge.isCommunity && (
          <span className="text-xs font-medium text-fk-secondary">
            Community challenge
          </span>
        )}
      </div>
    </div>
  );
}
