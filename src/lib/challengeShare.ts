import { formatCurrency } from "@/lib/xp";
import { getDifficultyRewards } from "@/lib/vacancyRewards";
import type { Vacancy } from "@/types/vacancy";

export function buildChallengeShareMessage(vacancy: Vacancy, url: string): string {
  const reward = formatCurrency(getDifficultyRewards(vacancy.difficulty).total);
  return `Ken jij iemand voor de challenge ${vacancy.title} in ${vacancy.location}? Tip diegene via Referr en verdien tot ${reward} bij een succesvolle match. ${url}`;
}

export function resolveBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}
