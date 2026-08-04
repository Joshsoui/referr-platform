import { NextResponse } from "next/server";
import { isStaffRole, requireRole } from "@/lib/auth/sessionGuards";
import { auth } from "@/auth";
import {
  createVacancy,
  listVacancies,
  updateVacancyById,
} from "@/lib/vacancyStore";
import type { VacancyFormData, VacancyDifficulty, VacancyStatus } from "@/types/vacancy";
import type { Sector } from "@/types/incentives";

function parseVacancyBody(body: unknown): VacancyFormData | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;
  if (typeof data.title !== "string" || !data.title.trim()) return null;
  if (typeof data.sector !== "string" || !data.sector) return null;
  if (typeof data.location !== "string") return null;
  if (typeof data.description !== "string") return null;
  if (data.difficulty !== "easy" && data.difficulty !== "hard" && data.difficulty !== "expert") {
    return null;
  }
  if (data.status !== "open" && data.status !== "closed") return null;

  return {
    title: data.title,
    sector: data.sector as Sector,
    location: data.location,
    postalCode: typeof data.postalCode === "string" ? data.postalCode : undefined,
    latitude: typeof data.latitude === "number" ? data.latitude : undefined,
    longitude: typeof data.longitude === "number" ? data.longitude : undefined,
    description: data.description,
    difficulty: data.difficulty as VacancyDifficulty,
    status: data.status as VacancyStatus,
  };
}

export async function GET() {
  const vacancies = await listVacancies();
  return NextResponse.json({ vacancies });
}

export async function POST(request: Request) {
  const { error } = await requireRole(["admin", "recruiter"]);
  if (error) return error;

  const form = parseVacancyBody(await request.json().catch(() => null));
  if (!form) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  const vacancy = await createVacancy(form);
  if (!vacancy) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  if (
    typeof vacancy.latitude === "number" &&
    typeof vacancy.longitude === "number"
  ) {
    // Fire-and-forget nearby notifications via internal call pattern
    try {
      const { createNotification } = await import("@/lib/userNotificationsStore");
      const { listAllNotificationPreferences } = await import(
        "@/lib/notificationPreferencesStore"
      );
      const { haversineDistanceKm } = await import("@/lib/geoDistance");
      const { getDifficultyRewards } = await import("@/lib/vacancyRewards");
      const { formatCurrency } = await import("@/lib/xp");

      const prefs = await listAllNotificationPreferences();
      const reward = getDifficultyRewards(vacancy.difficulty).total;
      for (const pref of prefs) {
        if (!pref.nearbyChallengesEnabled || !pref.locationConsent) continue;
        if (typeof pref.latitude !== "number" || typeof pref.longitude !== "number")
          continue;
        const distKm = haversineDistanceKm(
          pref.latitude,
          pref.longitude,
          vacancy.latitude,
          vacancy.longitude
        );
        if (distKm > pref.radiusKm) continue;
        await createNotification({
          userId: pref.userId,
          kind: "nearby",
          title: "Nieuwe challenge in jouw buurt",
          message: `Nieuwe kans: ${vacancy.title} in ${vacancy.location}. Reward: ${formatCurrency(reward)}. Open challenge.`,
          link: `/vacatures/${vacancy.id}`,
          dedupeKey: `nearby:${vacancy.id}`,
        });
      }
    } catch {
      // non-blocking
    }
  }

  return NextResponse.json({ vacancy }, { status: 201 });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!isStaffRole(session?.user?.role)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as
    | { id?: string }
    | null;
  if (!body?.id) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }
  const form = parseVacancyBody(body);
  if (!form) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  const vacancy = await updateVacancyById(body.id, form);
  if (!vacancy) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  return NextResponse.json({ vacancy });
}
