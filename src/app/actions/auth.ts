"use server";

import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn, signOut, auth } from "@/auth";
import { createToken, consumeToken } from "@/lib/auth/tokens";
import { rateLimit } from "@/lib/auth/rate-limit";
import {
  createUser,
  deleteUser,
  exportUserData,
  findUserByEmail,
  findUserById,
  markEmailVerified,
  updateMarketingConsent,
  updatePassword,
  updateProfile,
} from "@/lib/auth/users";
import { isStaffRole } from "@/lib/auth/roles";
import {
  isEmailConfigured,
  sendPasswordResetEmail,
  sendVerificationEmail,
} from "@/lib/email";

const registerSchema = z.object({
  firstName: z.string().trim().min(1).max(80),
  lastName: z.string().trim().min(1).max(80),
  email: z.string().trim().email().max(254),
  password: z.string().min(10).max(128),
  acceptTerms: z.literal(true, {
    message: "Je moet akkoord gaan met de voorwaarden.",
  }),
  marketingConsent: z.boolean().optional().default(false),
});

const staffRegisterSchema = registerSchema.extend({
  inviteCode: z.string().trim().min(1).max(256),
  role: z.enum(["admin", "recruiter"]).default("admin"),
});

function demoMode(): boolean {
  return process.env.AUTH_DEMO_MODE === "true";
}

function staffInviteConfigured(): boolean {
  return Boolean(process.env.ADMIN_BOOTSTRAP_TOKEN?.trim());
}

function inviteCodeMatches(code: string): boolean {
  const expected = process.env.ADMIN_BOOTSTRAP_TOKEN?.trim();
  if (!expected) return false;
  return code === expected;
}

export type ActionResult =
  | { ok: true; message?: string; demoLink?: string }
  | { ok: false; message: string; fieldErrors?: Record<string, string[]> };

export async function registerAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const limited = rateLimit("register:global", 20, 60_000);
  if (!limited.ok) {
    return {
      ok: false,
      message: "Te veel pogingen. Probeer het later opnieuw.",
    };
  }

  const parsed = registerSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    acceptTerms: formData.get("acceptTerms") === "on",
    marketingConsent: formData.get("marketingConsent") === "on",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Controleer je gegevens en probeer het opnieuw.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    const user = await createUser(parsed.data);
    const { token } = await createToken(user.id, "email_verify");

    let demoLink: string | undefined;
    if (isEmailConfigured()) {
      const sent = await sendVerificationEmail({
        to: user.email,
        firstName: user.firstName,
        token,
      });
      if (!sent.ok) {
        console.error("[register] verification email failed", sent.error);
      }
    } else if (demoMode()) {
      demoLink = `/email-bevestigen?token=${encodeURIComponent(token)}`;
    }

    return {
      ok: true,
      message: isEmailConfigured()
        ? "Je account is aangemaakt. We hebben een bevestigingsmail gestuurd — check je inbox (en spam)."
        : "Je account is aangemaakt. Bevestig je e-mailadres om verder te gaan.",
      demoLink,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_TAKEN") {
      // Enumeration-resistant generic message
      return {
        ok: true,
        message:
          "Als dit e-mailadres nog niet in gebruik is, ontvang je een bevestiging. Controleer je inbox.",
      };
    }
    return {
      ok: false,
      message: "Account aanmaken lukte niet. Probeer het later opnieuw.",
    };
  }
}

export async function registerStaffAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  if (!staffInviteConfigured()) {
    return {
      ok: false,
      message:
        "Beheerder-aanmelden is nog niet geconfigureerd. Zet ADMIN_BOOTSTRAP_TOKEN op de server.",
    };
  }

  const limited = rateLimit("register-staff:global", 10, 60_000);
  if (!limited.ok) {
    return {
      ok: false,
      message: "Te veel pogingen. Probeer het later opnieuw.",
    };
  }

  const parsed = staffRegisterSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    acceptTerms: formData.get("acceptTerms") === "on",
    marketingConsent: formData.get("marketingConsent") === "on",
    inviteCode: formData.get("inviteCode"),
    role: formData.get("role") || "admin",
  });

  if (!parsed.success) {
    return {
      ok: false,
      message: "Controleer je gegevens en probeer het opnieuw.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  if (!inviteCodeMatches(parsed.data.inviteCode)) {
    return {
      ok: false,
      message: "Ongeldige uitnodigingscode.",
    };
  }

  try {
    const user = await createUser({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      password: parsed.data.password,
      marketingConsent: parsed.data.marketingConsent,
      role: parsed.data.role,
    });
    const { token } = await createToken(user.id, "email_verify");

    let demoLink: string | undefined;
    if (isEmailConfigured()) {
      const sent = await sendVerificationEmail({
        to: user.email,
        firstName: user.firstName,
        token,
      });
      if (!sent.ok) {
        console.error("[register-staff] verification email failed", sent.error);
      }
    } else if (demoMode()) {
      demoLink = `/email-bevestigen?token=${encodeURIComponent(token)}`;
    }

    return {
      ok: true,
      message: isEmailConfigured()
        ? "Je beheerderaccount is aangemaakt. We hebben een bevestigingsmail gestuurd — check je inbox (en spam)."
        : "Je beheerderaccount is aangemaakt. Bevestig je e-mailadres om verder te gaan.",
      demoLink,
    };
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_TAKEN") {
      return {
        ok: true,
        message:
          "Als dit e-mailadres nog niet in gebruik is, ontvang je een bevestiging. Controleer je inbox.",
      };
    }
    return {
      ok: false,
      message: "Beheerderaccount aanmaken lukte niet. Probeer het later opnieuw.",
    };
  }
}

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  const existing = await findUserByEmail(email);
  let redirectTo = next.startsWith("/") ? next : "/dashboard";
  if (existing && isStaffRole(existing.role)) {
    const isReferrerDestination =
      redirectTo.startsWith("/dashboard") ||
      redirectTo.startsWith("/aandragen") ||
      redirectTo.startsWith("/levels") ||
      redirectTo.startsWith("/challenges") ||
      redirectTo.startsWith("/rewards") ||
      redirectTo.startsWith("/leaderboard") ||
      redirectTo.startsWith("/hall-of-fame");
    if (isReferrerDestination || redirectTo === "/") {
      redirectTo = "/recruitment";
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo,
    });
    return { ok: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        ok: false,
        message: "De combinatie van e-mailadres en inloggegevens klopt niet.",
      };
    }
    // NEXT_REDIRECT from Auth.js must propagate
    throw error;
  }
}

export async function logoutAction(): Promise<void> {
  await signOut({ redirectTo: "/" });
}

export async function requestPasswordResetAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const limited = rateLimit(`reset:${email || "unknown"}`, 5, 60_000);
  if (!limited.ok) {
    return {
      ok: false,
      message: "Te veel verzoeken. Probeer het later opnieuw.",
    };
  }

  const generic =
    "Als er een account bij dit e-mailadres hoort, ontvang je binnen enkele minuten een e-mail.";

  const user = await findUserByEmail(email);
  if (!user) {
    return { ok: true, message: generic };
  }

  const { token } = await createToken(user.id, "password_reset");

  let demoLink: string | undefined;
  if (isEmailConfigured()) {
    const sent = await sendPasswordResetEmail({
      to: user.email,
      firstName: user.firstName,
      token,
    });
    if (!sent.ok) {
      console.error("[reset] password email failed", sent.error);
    }
  } else if (demoMode()) {
    demoLink = `/wachtwoord-herstellen?token=${encodeURIComponent(token)}`;
  }

  return { ok: true, message: generic, demoLink };
}

export async function resetPasswordAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");

  if (password.length < 10 || password.length > 128) {
    return {
      ok: false,
      message: "Kies een wachtwoord van minimaal 10 tekens.",
    };
  }

  const result = await consumeToken(token, "password_reset");
  if ("error" in result) {
    const messages = {
      invalid: "Deze herstellink is ongeldig.",
      expired: "Deze herstellink is verlopen.",
      used: "Deze herstellink is al gebruikt.",
    } as const;
    return { ok: false, message: messages[result.error] };
  }

  await updatePassword(result.userId, password);
  return {
    ok: true,
    message: "Je wachtwoord is bijgewerkt. Je kunt nu inloggen.",
  };
}

export async function verifyEmailAction(token: string): Promise<ActionResult> {
  const result = await consumeToken(token, "email_verify");
  if ("error" in result) {
    const messages = {
      invalid: "Deze bevestigingslink is ongeldig.",
      expired: "Deze bevestigingslink is verlopen.",
      used: "Dit e-mailadres is al bevestigd.",
    } as const;
    return { ok: false, message: messages[result.error] };
  }

  await markEmailVerified(result.userId);
  return { ok: true, message: "E-mailadres bevestigd. Je kunt verder." };
}

export async function resendVerificationAction(): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: "Log eerst in." };
  }

  const limited = rateLimit(`verify:${session.user.id}`, 3, 60_000);
  if (!limited.ok) {
    return {
      ok: false,
      message: "Te veel verzoeken. Probeer het later opnieuw.",
    };
  }

  const user = await findUserById(session.user.id);
  if (!user) return { ok: false, message: "Account niet gevonden." };
  if (user.emailVerifiedAt) {
    return { ok: true, message: "Je e-mailadres is al bevestigd." };
  }

  const { token } = await createToken(user.id, "email_verify");

  let demoLink: string | undefined;
  if (isEmailConfigured()) {
    const sent = await sendVerificationEmail({
      to: user.email,
      firstName: user.firstName,
      token,
    });
    if (!sent.ok) {
      return {
        ok: false,
        message: "Bevestigingsmail versturen lukte niet. Probeer het later opnieuw.",
      };
    }
  } else if (demoMode()) {
    demoLink = `/email-bevestigen?token=${encodeURIComponent(token)}`;
  }

  return {
    ok: true,
    message: isEmailConfigured()
      ? "Nieuwe bevestigingsmail is verstuurd. Check je inbox."
      : "Nieuwe bevestigingsmail is klaargezet.",
    demoLink,
  };
}

export async function updateProfileAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, message: "Niet ingelogd." };

  const existing = await findUserById(session.user.id);
  if (!existing) return { ok: false, message: "Gebruiker niet gevonden." };

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  if (!firstName || !lastName) {
    return { ok: false, message: "Voor- en achternaam zijn verplicht." };
  }

  const isStaffProfile = formData.get("profileKind") === "staff";
  const phone = String(formData.get("phone") ?? "").trim();

  await updateProfile(session.user.id, {
    firstName,
    lastName,
    phone,
    street: isStaffProfile
      ? existing.street ?? ""
      : String(formData.get("street") ?? "").trim(),
    houseNumber: isStaffProfile
      ? existing.houseNumber ?? ""
      : String(formData.get("houseNumber") ?? "").trim(),
    postalCode: isStaffProfile
      ? existing.postalCode ?? ""
      : String(formData.get("postalCode") ?? "").trim(),
    city: isStaffProfile
      ? existing.city ?? ""
      : String(formData.get("city") ?? "").trim(),
    country: isStaffProfile
      ? existing.country ?? "Nederland"
      : String(formData.get("country") ?? "Nederland").trim(),
    iban: isStaffProfile
      ? existing.iban ?? ""
      : String(formData.get("iban") ?? "").trim().toUpperCase(),
    ibanAccountName: isStaffProfile
      ? existing.ibanAccountName ?? ""
      : String(formData.get("ibanAccountName") ?? "").trim(),
    companyName: isStaffProfile
      ? String(formData.get("companyName") ?? "").trim()
      : existing.companyName ?? "",
    jobTitle: isStaffProfile
      ? String(formData.get("jobTitle") ?? "").trim()
      : existing.jobTitle ?? "",
    companyCity: isStaffProfile
      ? String(formData.get("companyCity") ?? "").trim()
      : existing.companyCity ?? "",
    companyKvK: isStaffProfile
      ? String(formData.get("companyKvK") ?? "").trim()
      : existing.companyKvK ?? "",
  });
  return { ok: true, message: "Profiel bijgewerkt." };
}

export async function updateMarketingAction(
  consent: boolean
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, message: "Niet ingelogd." };
  await updateMarketingConsent(session.user.id, consent);
  return {
    ok: true,
    message: consent
      ? "Je ontvangt voortaan optionele updates."
      : "Optionele updates zijn uitgeschakeld.",
  };
}

export async function requestExportAction(): Promise<ActionResult & { data?: unknown }> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, message: "Niet ingelogd." };

  const limited = rateLimit(`export:${session.user.id}`, 3, 60 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Je hebt recent al een export aangevraagd." };
  }

  const data = await exportUserData(session.user.id);
  return {
    ok: true,
    message: "Je gegevensexport is klaar om te downloaden.",
    data,
  };
}

export async function deleteAccountAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, message: "Niet ingelogd." };

  const confirm = String(formData.get("confirm") ?? "");
  if (confirm !== "VERWIJDER") {
    return {
      ok: false,
      message: 'Typ VERWIJDER om je account definitief te verwijderen.',
    };
  }

  await deleteUser(session.user.id);
  await signOut({ redirectTo: "/" });
  return { ok: true };
}
