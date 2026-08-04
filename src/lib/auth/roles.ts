import type { UserRole } from "@/lib/auth/users";

export function isStaffRole(role: string | undefined | null): boolean {
  return role === "admin" || role === "recruiter";
}

export function isReferrerRole(role: string | undefined | null): boolean {
  return !isStaffRole(role);
}

export type StaffRole = Extract<UserRole, "admin" | "recruiter">;
