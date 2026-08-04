import { promises as fs } from "fs";
import path from "path";
import { getDataDir } from "@/lib/dataDir";
import { INITIAL_VACANCIES } from "@/lib/mockVacancies";
import type { Vacancy, VacancyFormData } from "@/types/vacancy";

interface VacancyStore {
  vacancies: Vacancy[];
}

function filePath() {
  return path.join(getDataDir(), "vacancies.json");
}

async function readStore(): Promise<VacancyStore> {
  const dir = getDataDir();
  await fs.mkdir(dir, { recursive: true });
  const file = filePath();
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as VacancyStore;
    if (!Array.isArray(parsed.vacancies)) {
      throw new Error("invalid store");
    }
    return parsed;
  } catch {
    const seeded: VacancyStore = { vacancies: [...INITIAL_VACANCIES] };
    await fs.writeFile(file, JSON.stringify(seeded, null, 2), "utf8");
    return seeded;
  }
}

async function saveStore(store: VacancyStore): Promise<void> {
  const dir = getDataDir();
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath(), JSON.stringify(store, null, 2), "utf8");
}

export async function listVacancies(): Promise<Vacancy[]> {
  const store = await readStore();
  return [...store.vacancies].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function findVacancyById(id: string): Promise<Vacancy | null> {
  const store = await readStore();
  return store.vacancies.find((item) => item.id === id) ?? null;
}

export async function createVacancy(data: VacancyFormData): Promise<Vacancy | null> {
  if (!data.sector || !data.title.trim()) return null;
  const store = await readStore();
  const vacancy: Vacancy = {
    id: crypto.randomUUID(),
    title: data.title.trim(),
    sector: data.sector,
    location: data.location.trim(),
    postalCode: data.postalCode?.trim() || undefined,
    latitude: data.latitude,
    longitude: data.longitude,
    description: data.description.trim(),
    difficulty: data.difficulty,
    status: data.status,
    createdAt: new Date().toISOString(),
  };
  store.vacancies.unshift(vacancy);
  await saveStore(store);
  return vacancy;
}

export async function updateVacancyById(
  id: string,
  data: VacancyFormData
): Promise<Vacancy | null> {
  if (!data.sector || !data.title.trim()) return null;
  const store = await readStore();
  const index = store.vacancies.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const current = store.vacancies[index];
  const updated: Vacancy = {
    ...current,
    title: data.title.trim(),
    sector: data.sector,
    location: data.location.trim(),
    postalCode: data.postalCode?.trim() || undefined,
    latitude: data.latitude,
    longitude: data.longitude,
    description: data.description.trim(),
    difficulty: data.difficulty,
    status: data.status,
  };
  store.vacancies[index] = updated;
  await saveStore(store);
  return updated;
}
