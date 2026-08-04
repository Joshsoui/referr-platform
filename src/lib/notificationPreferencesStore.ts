import { promises as fs } from "fs";
import path from "path";

export interface UserNotificationPreferences {
  userId: string;
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
  latitude?: number | null;
  longitude?: number | null;
  updatedAt: string;
  createdAt: string;
}

interface PreferenceStore {
  preferences: UserNotificationPreferences[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "notification-preferences.json");

const defaults = (userId: string): UserNotificationPreferences => {
  const now = new Date().toISOString();
  return {
    userId,
    nearbyChallengesEnabled: true,
    referralUpdatesEnabled: true,
    rewardUpdatesEnabled: true,
    closingSoonEnabled: true,
    emailEnabled: true,
    pushEnabled: false,
    radiusKm: 25,
    city: "",
    postalCode: "",
    locationConsent: false,
    latitude: null,
    longitude: null,
    createdAt: now,
    updatedAt: now,
  };
};

async function readStore(): Promise<PreferenceStore> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as PreferenceStore;
  } catch {
    const initial: PreferenceStore = { preferences: [] };
    await fs.writeFile(FILE, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
}

async function saveStore(store: PreferenceStore) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(store, null, 2), "utf8");
}

export async function getNotificationPreferences(userId: string) {
  const store = await readStore();
  return store.preferences.find((item) => item.userId === userId) ?? defaults(userId);
}

export async function updateNotificationPreferences(
  userId: string,
  input: Partial<UserNotificationPreferences>
) {
  const store = await readStore();
  const index = store.preferences.findIndex((item) => item.userId === userId);
  const now = new Date().toISOString();
  const next = {
    ...(index >= 0 ? store.preferences[index] : defaults(userId)),
    ...input,
    userId,
    updatedAt: now,
  };

  if (index >= 0) {
    store.preferences[index] = next;
  } else {
    store.preferences.push(next);
  }
  await saveStore(store);
  return next;
}

export async function listAllNotificationPreferences() {
  const store = await readStore();
  return store.preferences;
}
