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
          <p className="text-sm font-semibold text-fk-navy/60">Finderz Score</p>
          <p className="text-3xl font-extrabold tabular-nums text-fk-navy">
            {profile.score}
            <span className="text-lg text-fk-navy/40">/100</span>
          </p>
          <p className="mt-2 text-sm text-fk-navy/65">
            Finderz Score laat zien hoe sterk en betrouwbaar jouw talenttips
            zijn.
          </p>
          {!compact && (
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
              <div className="rounded-lg bg-fk-light px-3 py-2">
                <p className="text-fk-navy/50">Sterke tips 70+</p>
                <p className="font-bold text-fk-primary">
                  {profile.highConfidencePercent}%
                </p>
              </div>
              <div className="rounded-lg bg-fk-light px-3 py-2">
                <p className="text-fk-navy/50">Intakes</p>
                <p className="font-bold text-fk-navy">{profile.intakes}</p>
              </div>
              <div className="rounded-lg bg-fk-light px-3 py-2">
                <p className="text-fk-navy/50">Matches</p>
                <p className="font-bold text-fk-navy">{profile.placements}</p>
              </div>
              <div className="rounded-lg bg-fk-light px-3 py-2">
                <p className="text-fk-navy/50">Afgekeurd/dubbel</p>
                <p className="font-bold text-fk-navy">
                  {profile.rejectedOrDuplicate}
                </p>
              </div>
            </div>
          )}
          <div className="mt-4 flex gap-4 text-xs font-medium">
            <span className="text-fk-primary">XP = activiteit</span>
            <span className="text-fk-secondary">
              Finderz Score = kwaliteit
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
