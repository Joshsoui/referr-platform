import { getConfidenceLabel } from "@/lib/scoring";

interface ScoutConfidenceScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showBar?: boolean;
}

export function ScoutConfidenceScore({
  score,
  size = "md",
  showBar = true,
}: ScoutConfidenceScoreProps) {
  const label = getConfidenceLabel(score);
  const labelColor =
    score >= 70
      ? "bg-emerald-100 text-emerald-800"
      : score >= 40
        ? "bg-amber-100 text-amber-800"
        : "bg-fk-light text-fk-navy/60";

  const sizeClasses = {
    sm: { score: "text-lg", wrap: "p-3" },
    md: { score: "text-2xl", wrap: "p-4" },
    lg: { score: "text-4xl", wrap: "p-6" },
  }[size];

  return (
    <div
      className={`rounded-xl border border-fk-primary/15 bg-fk-white ${sizeClasses.wrap}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-fk-secondary">
        Kwaliteit introductie
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <p className={`font-extrabold tabular-nums text-fk-primary ${sizeClasses.score}`}>
          {score}
          <span className="text-base font-semibold text-fk-navy/40">/100</span>
        </p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-bold ${labelColor}`}
        >
          {label}
        </span>
      </div>
      {showBar && (
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-fk-primary/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-fk-primary to-fk-secondary transition-all duration-700"
            style={{ width: `${score}%` }}
          />
        </div>
      )}
    </div>
  );
}
