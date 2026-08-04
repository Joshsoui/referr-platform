import { NextResponse } from "next/server";
import { auth } from "@/auth";
import {
  createNotification,
  listUserNotifications,
} from "@/lib/userNotificationsStore";
import type { NotificationKind } from "@/types/notifications";

const ALLOWED_KINDS: NotificationKind[] = [
  "submitted",
  "viewed",
  "progress",
  "nearby",
  "celebration",
  "reward",
  "rejected",
];

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  const notifications = await listUserNotifications(session.user.id, 30);
  return NextResponse.json({ notifications });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | {
        kind?: unknown;
        title?: string;
        message?: string;
        link?: string;
        dedupeKey?: string;
      }
    | null;

  const kind =
    body?.kind && ALLOWED_KINDS.includes(body.kind as NotificationKind)
      ? (body.kind as NotificationKind)
      : null;

  if (!kind || !body?.title || !body?.message) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  const record = await createNotification({
    userId: session.user.id,
    kind,
    title: body.title,
    message: body.message,
    link: body.link,
    dedupeKey: body.dedupeKey,
  });

  return NextResponse.json({ notification: record });
}

