import { promises as fs } from "fs";
import path from "path";
import { getDataDir } from "@/lib/dataDir";
import { getPrisma, hasDatabase, tryPrisma } from "@/lib/db";
import { INITIAL_VACANCIES } from "@/lib/mockVacancies";
import type { Vacancy, VacancyFormData } from "@/types/vacancy";
import type { Vacancy as PrismaVacancy } from "@prisma/client";

interface VacancyStore {
  vacancies: Vacancy[];
}

function filePath() {
  return path.join(getDataDir(), "vacancies.json");
}

function mapVacancy(row: PrismaVacancy): Vacancy {
  return {
    id: row.id,
    title: row.title,
    sector: row.sector as Vacancy["sector"],
    location: row.location,
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,
    postalCode: row.postalCode ?? undefined,
    description: row.description,
    difficulty: row.difficulty as Vacancy["difficulty"],
    status: row.status as Vacancy["status"],
    createdAt: row.createdAt.toISOString(),
  };
}

async function readFileStore(): Promise<VacancyStore> {
  const dir = getDataDir();
  await fs.mkdir(dir, { recursive: true });
  const file = filePath();
  try {
    const raw = await fs.readFile(file, "utf8");
    const parsed = JSON.parse(raw) as VacancyStore;
    if (!Array.isArray(parsed.vacancies)) throw new Error("invalid store");
    return parsed;
  } catch {
    const seeded: VacancyStore = { vacancies: [...INITIAL_VACANCIES] };
    await fs.writeFile(file, JSON.stringify(seeded, null, 2), "utf8");
    return seeded;
  }
}

async function saveFileStore(store: VacancyStore): Promise<void> {
  await fs.mkdir(getDataDir(), { recursive: true });
  await fs.writeFile(filePath(), JSON.stringify(store, null, 2), "utf8");
}

async function ensureDbSeeded(): Promise<void> {
  const prisma = getPrisma();
  const count = await prisma.vacancy.count();
  if (count > 0) return;
  await prisma.vacancy.createMany({
    data: INITIAL_VACANCIES.map((item) => ({
      id: item.id,
      title: item.title,
      sector: item.sector,
      location: item.location,
      latitude: item.latitude ?? null,
      longitude: item.longitude ?? null,
      postalCode: item.postalCode ?? null,
      description: item.description,
      difficulty: item.difficulty,
      status: item.status,
      createdAt: new Date(item.createdAt),
    })),
  });
}

export async function listVacancies(): Promise<Vacancy[]> {
  if (hasDatabase()) {
    const rows = await tryPrisma(async (prisma) => {
      await ensureDbSeeded();
      return prisma.vacancy.findMany({ orderBy: { createdAt: "desc" } });
    });
    if (rows) return rows.map(mapVacancy);
  }
  const store = await readFileStore();
  return [...store.vacancies].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function findVacancyById(id: string): Promise<Vacancy | null> {
  if (hasDatabase()) {
    const row = await tryPrisma(async (prisma) => {
      await ensureDbSeeded();
      return prisma.vacancy.findUnique({ where: { id } });
    });
    if (row) return mapVacancy(row);
    if (hasDatabase()) return null;
  }
  const store = await readFileStore();
  return store.vacancies.find((item) => item.id === id) ?? null;
}

export async function createVacancy(data: VacancyFormData): Promise<Vacancy | null> {
  if (!data.sector || !data.title.trim()) return null;

  if (hasDatabase()) {
    const row = await tryPrisma((prisma) =>
      prisma.vacancy.create({
        data: {
          title: data.title.trim(),
          sector: data.sector,
          location: data.location.trim(),
          postalCode: data.postalCode?.trim() || null,
          latitude: data.latitude ?? null,
          longitude: data.longitude ?? null,
          description: data.description.trim(),
          difficulty: data.difficulty,
          status: data.status,
        },
      })
    );
    if (row) return mapVacancy(row);
  }

  const store = await readFileStore();
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
  await saveFileStore(store);
  return vacancy;
}

export async function updateVacancyById(
  id: string,
  data: VacancyFormData
): Promise<Vacancy | null> {
  if (!data.sector || !data.title.trim()) return null;

  if (hasDatabase()) {
    const row = await tryPrisma((prisma) =>
      prisma.vacancy.update({
        where: { id },
        data: {
          title: data.title.trim(),
          sector: data.sector,
          location: data.location.trim(),
          postalCode: data.postalCode?.trim() || null,
          latitude: data.latitude ?? null,
          longitude: data.longitude ?? null,
          description: data.description.trim(),
          difficulty: data.difficulty,
          status: data.status,
        },
      })
    );
    if (row) return mapVacancy(row);
    if (hasDatabase()) return null;
  }

  const store = await readFileStore();
  const index = store.vacancies.findIndex((item) => item.id === id);
  if (index < 0) return null;
  const updated: Vacancy = {
    ...store.vacancies[index],
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
  await saveFileStore(store);
  return updated;
}
