import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { markNotificationRead } from "@/lib/userNotificationsStore";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { id?: string };
  const notificationId = String(body?.id ?? "");
  if (!notificationId) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  const record = await markNotificationRead(session.user.id, notificationId);
  return NextResponse.json({ notification: record });
}

