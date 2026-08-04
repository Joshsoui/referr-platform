import type { Sector } from "@/types/incentives";

export type VacancyDifficulty = "easy" | "hard" | "expert";

export type VacancyStatus = "open" | "closed";

export interface Vacancy {
  id: string;
  title: string;
  sector: Sector;
  location: string;
  latitude?: number;
  longitude?: number;
  postalCode?: string;
  description: string;
  difficulty: VacancyDifficulty;
  status: VacancyStatus;
  createdAt: string;
}

export interface VacancyFormData {
  title: string;
  sector: Sector | "";
  location: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  description: string;
  difficulty: VacancyDifficulty;
  status: VacancyStatus;
}
