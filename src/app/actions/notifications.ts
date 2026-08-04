"use server";

import { auth } from "@/auth";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/lib/notificationPreferencesStore";
import { geocodeQuery } from "@/lib/geocode";

export async function getNotificationPreferencesAction() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return getNotificationPreferences(session.user.id);
}

export async function updateNotificationPreferencesAction(input: {
  nearbyChallengesEnabled: boolean;
  referralUpdatesEnabled: boolean;
  rewardUpdatesEnabled: boolean;
  closingSoonEnabled: boolean;
  emailEnabled: boolean;
  pushEnabled: boolean;
  radiusKm: 10 | 25 | 50 | 100;
  city: string;
  postalCode: string;
  locationConsent: boolean;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: "Niet ingelogd." };
  }

  let geo:
    | { latitude: number; longitude: number }
    | null = null;

  if (input.locationConsent) {
    const city = input.city.trim();
    const postalCode = input.postalCode.trim();
    const query = postalCode ? `${postalCode} ${city}`.trim() : city;
    geo = await geocodeQuery(query);
  }

  await updateNotificationPreferences(session.user.id, {
    ...input,
    latitude: geo?.latitude ?? null,
    longitude: geo?.longitude ?? null,
  });
  return { ok: true, message: "Notificatievoorkeuren opgeslagen." };
}
