import { promises as fs } from "fs";
import path from "path";

import type { NotificationKind } from "@/types/notifications";

export interface UserNotificationRecord {
  id: string;
  userId: string;
  kind: NotificationKind;
  title: string;
  message: string;
  link?: string;
  dedupeKey?: string;
  readAt: string | null;
  createdAt: string;
  updatedAt: string;
}

interface NotificationStore {
  notifications: UserNotificationRecord[];
}

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "user-notifications.json");

async function readStore(): Promise<NotificationStore> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(FILE, "utf8");
    return JSON.parse(raw) as NotificationStore;
  } catch {
    const initial: NotificationStore = { notifications: [] };
    await fs.writeFile(FILE, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  }
}

async function saveStore(store: NotificationStore) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(store, null, 2), "utf8");
}

function nowIso() {
  return new Date().toISOString();
}

export async function createNotification(input: {
  userId: string;
  kind: NotificationKind;
  title: string;
  message: string;
  link?: string;
  dedupeKey?: string;
}) {
  const store = await readStore();
  const now = nowIso();

  if (input.dedupeKey) {
    const existing = store.notifications.find(
      (n) =>
        n.userId === input.userId &&
        n.dedupeKey === input.dedupeKey
    );
    if (existing) return existing;
  }

  const record: UserNotificationRecord = {
    id: crypto.randomUUID(),
    userId: input.userId,
    kind: input.kind,
    title: input.title,
    message: input.message,
    link: input.link,
    dedupeKey: input.dedupeKey,
    readAt: null,
    createdAt: now,
    updatedAt: now,
  };

  store.notifications.push(record);
  await saveStore(store);
  return record;
}

export async function listUserNotifications(userId: string, limit = 50) {
  const store = await readStore();
  return store.notifications
    .filter((n) => n.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function markNotificationRead(userId: string, notificationId: string) {
  const store = await readStore();
  const record = store.notifications.find(
    (n) => n.userId === userId && n.id === notificationId
  );
  if (!record) return null;
  if (!record.readAt) {
    record.readAt = nowIso();
    record.updatedAt = record.readAt;
  }
  await saveStore(store);
  return record;
}

export async function markAllNotificationsRead(userId: string) {
  const store = await readStore();
  const now = nowIso();
  let changed = false;
  for (const record of store.notifications) {
    if (record.userId === userId && !record.readAt) {
      record.readAt = now;
      record.updatedAt = now;
      changed = true;
    }
  }
  if (changed) await saveStore(store);
}

