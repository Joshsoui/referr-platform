import { DIFFICULTY_META } from "@/lib/vacancyRewards";
import type { VacancyDifficulty } from "@/types/vacancy";

interface DifficultyBadgeProps {
  difficulty: VacancyDifficulty;
  size?: "sm" | "md";
}

export function DifficultyBadge({
  difficulty,
  size = "md",
}: DifficultyBadgeProps) {
  const meta = DIFFICULTY_META[difficulty];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border font-semibold ${meta.badgeClass} ${
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm"
      }`}
    >
      <span aria-hidden>{meta.emoji}</span>
      {meta.label}
    </span>
  );
}
