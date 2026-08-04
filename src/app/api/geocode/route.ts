import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/sessionGuards";
import { geocodeQuery } from "@/lib/geocode";

export async function POST(request: Request) {
  const { error } = await requireRole(["admin", "recruiter"]);
  if (error) return error;

  const body = (await request.json().catch(() => null)) as { query?: string };
  const query = String(body?.query ?? "");
  if (!query.trim()) {
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });
  }

  const result = await geocodeQuery(query);
  if (!result) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  return NextResponse.json(result);
}
