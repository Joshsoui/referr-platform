import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createChallengeShare, type ShareChannel } from "@/lib/shareStore";

interface ShareBody {
  challengeId?: string;
  channel?: ShareChannel;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ShareBody | null;
  if (!body?.challengeId || !body?.channel) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  const session = await auth();
  const share = await createChallengeShare({
    challengeId: body.challengeId,
    channel: body.channel,
    userId: session?.user?.id ?? null,
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const shareUrl = `${baseUrl}/s/${share.shareToken}?channel=${encodeURIComponent(body.channel)}`;

  return NextResponse.json({
    shareId: share.id,
    shareToken: share.shareToken,
    shareUrl,
  });
}
