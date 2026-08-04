import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/sessionGuards";
import { listUsersWithPayoutDetails } from "@/lib/auth/users";

export async function GET() {
  const { error } = await requireRole(["admin", "recruiter"]);
  if (error) return error;

  const users = await listUsersWithPayoutDetails();
  return NextResponse.json({
    users,
    exportedAt: new Date().toISOString(),
  });
}
