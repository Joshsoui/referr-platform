import type { Sector } from "@/types/incentives";

export type VacancyDifficulty = "easy" | "hard" | "expert";

export type VacancyStatus = "open" | "closed";

export interface Vacancy {
  id: string;
  title: string;
  sector: Sector;
  location: string;
  description: string;
  difficulty: VacancyDifficulty;
  status: VacancyStatus;
  createdAt: string;
}

export interface VacancyFormData {
  title: string;
  sector: Sector | "";
  location: string;
  description: string;
  difficulty: VacancyDifficulty;
  status: VacancyStatus;
}
