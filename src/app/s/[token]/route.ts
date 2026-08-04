import { NextResponse } from "next/server";
import { findShareByToken, registerShareClick } from "@/lib/shareStore";

export async function GET(
  request: Request,
  context: { params: Promise<{ token: string }> }
) {
  const { token } = await context.params;
  const share = await findShareByToken(token);
  if (!share) {
    return NextResponse.redirect(new URL("/vacatures", request.url));
  }

  await registerShareClick(token);
  const redirectUrl = new URL(`/vacatures/${share.challengeId}`, request.url);
  redirectUrl.searchParams.set("share_id", token);
  redirectUrl.searchParams.set("channel", share.channel);

  return NextResponse.redirect(redirectUrl);
}
