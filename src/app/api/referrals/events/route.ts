import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createReferralEvent, listReferralEvents } from "@/lib/referralEventsStore";
import type { CandidateStatus } from "@/types";
import type { CashStatus } from "@/types/incentives";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const raw = url.searchParams.get("candidateIds") ?? "";
  const candidateIds = raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  const events = await listReferralEvents(candidateIds);
  return NextResponse.json({ events });
}

export async function POST(request: Request) {
  const session = await auth();
  const body = (await request.json().catch(() => null)) as
    | {
        candidateId?: string;
        candidateName?: string;
        type?: "submitted" | "status_update" | "reward_update" | "approval_update";
        status?: CandidateStatus;
        cashStatus?: CashStatus;
        title?: string;
        message?: string;
      }
    | null;

  if (!body?.candidateId || !body?.candidateName || !body?.type || !body?.title || !body?.message) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  const event = await createReferralEvent({
    candidateId: body.candidateId,
    candidateName: body.candidateName,
    type: body.type,
    status: body.status,
    cashStatus: body.cashStatus,
    title: body.title,
    message: body.message,
    userId: session?.user?.id ?? null,
  });

  return NextResponse.json({ event });
}

