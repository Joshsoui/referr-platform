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

function demoMode(): boolean {
  return process.env.AUTH_DEMO_MODE === "true";
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
    const demoLink = demoMode()
      ? `/email-bevestigen?token=${encodeURIComponent(token)}`
      : undefined;

    return {
      ok: true,
      message:
        "Je account is aangemaakt. Bevestig je e-mailadres om verder te gaan.",
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

export async function loginAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/dashboard");

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: next.startsWith("/") ? next : "/dashboard",
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
  const demoLink = demoMode()
    ? `/wachtwoord-herstellen?token=${encodeURIComponent(token)}`
    : undefined;

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
  return {
    ok: true,
    message: "Nieuwe bevestigingsmail is klaargezet.",
    demoLink: demoMode()
      ? `/email-bevestigen?token=${encodeURIComponent(token)}`
      : undefined,
  };
}

export async function updateProfileAction(
  _prev: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false, message: "Niet ingelogd." };

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  if (!firstName || !lastName) {
    return { ok: false, message: "Voor- en achternaam zijn verplicht." };
  }

  const phone = String(formData.get("phone") ?? "").trim();
  const street = String(formData.get("street") ?? "").trim();
  const houseNumber = String(formData.get("houseNumber") ?? "").trim();
  const postalCode = String(formData.get("postalCode") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const country = String(formData.get("country") ?? "Nederland").trim();
  const iban = String(formData.get("iban") ?? "").trim().toUpperCase();
  const ibanAccountName = String(formData.get("ibanAccountName") ?? "").trim();

  await updateProfile(session.user.id, {
    firstName,
    lastName,
    phone,
    street,
    houseNumber,
    postalCode,
    city,
    country,
    iban,
    ibanAccountName,
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
