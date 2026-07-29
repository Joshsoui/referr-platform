import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import type { ScoutScoreProfile } from "@/types/incentives";

interface ScoutScoreCardProps {
  profile: ScoutScoreProfile;
  compact?: boolean;
}

export function ScoutScoreCard({ profile, compact = false }: ScoutScoreCardProps) {
  return (
    <Card className={compact ? "p-4" : ""}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-fk-secondary/15 text-fk-secondary">
          <TrendingUp size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-fk-navy/60">Kwaliteitsscore</p>
          <p className="text-3xl font-extrabold tabular-nums text-fk-navy">
            {profile.score}
            <span className="text-lg text-fk-navy/40">/100</span>
          </p>
          <p className="mt-2 text-sm text-fk-navy/65">
            Deze score laat zien hoe sterk en betrouwbaar jouw introducties zijn.
          </p>
          {!compact && (
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
              <div className="rounded-lg bg-fk-light px-3 py-2">
                <p className="text-fk-navy/50">Sterke introducties</p>
                <p className="font-bold text-fk-primary">
                  {profile.highConfidencePercent}%
                </p>
              </div>
              <div className="rounded-lg bg-fk-light px-3 py-2">
                <p className="text-fk-navy/50">Gesprekken</p>
                <p className="font-bold text-fk-navy">{profile.intakes}</p>
              </div>
              <div className="rounded-lg bg-fk-light px-3 py-2">
                <p className="text-fk-navy/50">Plaatsingen</p>
                <p className="font-bold text-fk-navy">{profile.placements}</p>
              </div>
              <div className="rounded-lg bg-fk-light px-3 py-2">
                <p className="text-fk-navy/50">Niet geaccepteerd</p>
                <p className="font-bold text-fk-navy">
                  {profile.rejectedOrDuplicate}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
