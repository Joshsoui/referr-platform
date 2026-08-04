import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/sessionGuards";
import { createNotification } from "@/lib/userNotificationsStore";
import {
  listAllNotificationPreferences,
} from "@/lib/notificationPreferencesStore";
import { haversineDistanceKm } from "@/lib/geoDistance";
import { getDifficultyRewards } from "@/lib/vacancyRewards";
import { formatCurrency } from "@/lib/xp";
import type { VacancyDifficulty } from "@/types/vacancy";

export async function POST(request: Request) {
  const { error } = await requireRole(["admin", "recruiter"]);
  if (error) return error;

  const body = (await request.json().catch(() => null)) as
    | {
        vacancyId?: string;
        title?: string;
        location?: string;
        difficulty?: VacancyDifficulty;
        latitude?: number;
        longitude?: number;
      }
    | null;

  if (!body?.vacancyId || !body?.title || !body?.location) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  const vacancyLatitude = body.latitude;
  const vacancyLongitude = body.longitude;
  if (
    typeof vacancyLatitude !== "number" ||
    typeof vacancyLongitude !== "number"
  ) {
    return NextResponse.json({ error: "MISSING_GEO" }, { status: 400 });
  }

  const reward = body.difficulty
    ? getDifficultyRewards(body.difficulty).total
    : 0;

  const preferences = await listAllNotificationPreferences();
  const createdFor: string[] = [];

  for (const pref of preferences) {
    if (!pref.nearbyChallengesEnabled) continue;
    if (!pref.locationConsent) continue;
    if (typeof pref.latitude !== "number" || typeof pref.longitude !== "number")
      continue;

    const distKm = haversineDistanceKm(
      pref.latitude,
      pref.longitude,
      vacancyLatitude,
      vacancyLongitude
    );

    if (distKm > pref.radiusKm) continue;

    const message = `Nieuwe kans: ${body.title} in ${body.location}. Reward: ${formatCurrency(
      reward
    )}. Open challenge.`;

    const notification = await createNotification({
      userId: pref.userId,
      kind: "nearby",
      title: "Nieuwe challenge in jouw buurt",
      message,
      link: `/vacatures/${body.vacancyId}`,
      dedupeKey: `nearby:${body.vacancyId}`,
    });
    if (notification) {
      createdFor.push(pref.userId);
    }
  }

  return NextResponse.json({ ok: true, createdCount: createdFor.length });
}
