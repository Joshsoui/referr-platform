import { NextResponse } from "next/server";
import { updateUserRoleByEmail } from "@/lib/auth/users";

type BootstrapBody = {
  email?: string;
  role?: "admin" | "recruiter";
  token?: string;
};

export async function POST(request: Request) {
  const envToken = process.env.ADMIN_BOOTSTRAP_TOKEN;
  if (!envToken) {
    return NextResponse.json(
      { error: "ADMIN_BOOTSTRAP_TOKEN ontbreekt." },
      { status: 503 }
    );
  }

  const body = (await request.json().catch(() => null)) as BootstrapBody | null;
  const email = String(body?.email ?? "").trim().toLowerCase();
  const role = body?.role === "recruiter" ? "recruiter" : "admin";
  const token = String(body?.token ?? "");

  if (!email || !token) {
    return NextResponse.json({ error: "email en token zijn verplicht." }, { status: 400 });
  }

  if (token !== envToken) {
    return NextResponse.json({ error: "Ongeldige token." }, { status: 401 });
  }

  const updated = await updateUserRoleByEmail(email, role);
  if (!updated) {
    return NextResponse.json({ error: "Gebruiker niet gevonden." }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    email: updated.email,
    role: updated.role,
    message: `Rol bijgewerkt naar ${updated.role}.`,
  });
}

