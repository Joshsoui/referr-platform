import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isStaffRole, requireRole } from "@/lib/auth/sessionGuards";
import {
  createCandidate,
  listCandidates,
  updateCandidateById,
  type CandidatePatch,
} from "@/lib/candidateStore";
import type { CandidateFormData, CandidateStatus } from "@/types";
import type {
  CashStatus,
  DuplicateStatus,
  ReferralApproval,
  RelationshipType,
  Sector,
} from "@/types/incentives";

function parseCandidateForm(body: unknown): CandidateFormData | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;
  if (typeof data.name !== "string" || !data.name.trim()) return null;
  if (typeof data.emailOrPhone !== "string" || !data.emailOrPhone.trim()) return null;

  return {
    name: data.name,
    emailOrPhone: data.emailOrPhone,
    linkedin: typeof data.linkedin === "string" ? data.linkedin : "",
    sector: (typeof data.sector === "string" ? data.sector : "") as Sector | "",
    reasons: Array.isArray(data.reasons)
      ? data.reasons.filter((item): item is string => typeof item === "string")
      : [],
    relationship: (typeof data.relationship === "string"
      ? data.relationship
      : "") as RelationshipType | "",
    recommendation:
      typeof data.recommendation === "string" ? data.recommendation : "",
    cvUploaded: Boolean(data.cvUploaded),
    role: typeof data.role === "string" ? data.role : "",
    description: typeof data.description === "string" ? data.description : "",
    vacancyId: typeof data.vacancyId === "string" ? data.vacancyId : undefined,
  };
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  const all = await listCandidates();
  if (isStaffRole(session.user.role)) {
    return NextResponse.json({ candidates: all });
  }

  const mine = all.filter(
    (item) =>
      item.referredByUserId === session.user.id ||
      item.referredBy ===
        `${session.user.firstName ?? ""} ${session.user.lastName ?? ""}`.trim()
  );
  return NextResponse.json({ candidates: mine });
}

export async function POST(request: Request) {
  const session = await auth();
  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;
  const form = parseCandidateForm(body);
  if (!form) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  const referrerName =
    (typeof body?.referrerName === "string" && body.referrerName.trim()) ||
    (session?.user
      ? `${session.user.firstName ?? ""} ${session.user.lastName ?? ""}`.trim()
      : "") ||
    "Anoniem";

  const candidate = await createCandidate({
    data: form,
    referrerName,
    referredByUserId: session?.user?.id ?? null,
    vacancyId: form.vacancyId,
  });

  return NextResponse.json({ candidate }, { status: 201 });
}

export async function PATCH(request: Request) {
  const { error } = await requireRole(["admin", "recruiter"]);
  if (error) return error;

  const body = (await request.json().catch(() => null)) as
    | (CandidatePatch & { id?: string })
    | null;
  if (!body?.id) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  const patch: CandidatePatch = {};
  if (body.status) patch.status = body.status as CandidateStatus;
  if (body.referralApproval) {
    patch.referralApproval = body.referralApproval as ReferralApproval;
  }
  if (body.cashStatus) patch.cashStatus = body.cashStatus as CashStatus;
  if (body.duplicateStatus) {
    patch.duplicateStatus = body.duplicateStatus as DuplicateStatus;
  }
  if (body.vacancyId !== undefined) {
    patch.vacancyId = body.vacancyId;
  }
  if (typeof body.xpAwarded === "number") {
    patch.xpAwarded = body.xpAwarded;
  }

  const candidate = await updateCandidateById(body.id, patch);
  if (!candidate) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  return NextResponse.json({ candidate });
}
