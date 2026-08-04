import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { UserRole } from "@/lib/auth/users";

export async function requireSession() {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      session: null,
      error: NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 }),
    };
  }
  return { session, error: null };
}

export async function requireRole(roles: UserRole[]) {
  const { session, error } = await requireSession();
  if (error || !session) return { session: null, error };

  const role = session.user.role as UserRole | undefined;
  if (!role || !roles.includes(role)) {
    return {
      session: null,
      error: NextResponse.json({ error: "FORBIDDEN" }, { status: 403 }),
    };
  }
  return { session, error: null };
}

export function isStaffRole(role: string | undefined | null): boolean {
  return role === "admin" || role === "recruiter";
}
