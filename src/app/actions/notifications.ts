"use server";

import { auth } from "@/auth";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "@/lib/notificationPreferencesStore";

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

  await updateNotificationPreferences(session.user.id, input);
  return { ok: true, message: "Notificatievoorkeuren opgeslagen." };
}
