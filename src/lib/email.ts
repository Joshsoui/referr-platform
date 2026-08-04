import nodemailer from "nodemailer";
import { Resend } from "resend";

function siteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.AUTH_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");
}

function fromAddress(): string {
  return process.env.EMAIL_FROM?.trim() || "referr <onboarding@resend.dev>";
}

export function isEmailConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY?.trim() ||
      (process.env.SMTP_HOST?.trim() &&
        process.env.SMTP_USER?.trim() &&
        process.env.SMTP_PASS?.trim())
  );
}

async function sendViaResend(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<void> {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) throw new Error("RESEND_API_KEY missing");
  const resend = new Resend(key);
  const result = await resend.emails.send({
    from: fromAddress(),
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
  if (result.error) {
    throw new Error(result.error.message || "Resend send failed");
  }
}

async function sendViaSmtp(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<void> {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) throw new Error("SMTP config missing");

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: fromAddress(),
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: input.text,
  });
}

export async function sendEmail(input: {
  to: string;
  subject: string;
  html: string;
  text: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    if (process.env.RESEND_API_KEY?.trim()) {
      await sendViaResend(input);
      return { ok: true };
    }
    if (process.env.SMTP_HOST?.trim()) {
      await sendViaSmtp(input);
      return { ok: true };
    }
    return { ok: false, error: "Geen e-mailprovider geconfigureerd." };
  } catch (error) {
    console.error("[email]", error);
    return {
      ok: false,
      error: error instanceof Error ? error.message : "E-mail verzenden mislukt.",
    };
  }
}

function emailShell(title: string, bodyHtml: string, ctaLabel: string, ctaUrl: string) {
  return `<!DOCTYPE html>
<html lang="nl">
<body style="margin:0;padding:0;background:#f5f7fa;font-family:system-ui,-apple-system,sans-serif;color:#0f172a;">
  <div style="max-width:560px;margin:32px auto;background:#ffffff;border-radius:16px;padding:32px;border:1px solid #e2e8f0;">
    <p style="margin:0 0 8px;font-size:14px;font-weight:700;color:#ff4d59;">referr</p>
    <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;">${title}</h1>
    <div style="font-size:15px;line-height:1.6;color:#334155;">${bodyHtml}</div>
    <p style="margin:28px 0 0;">
      <a href="${ctaUrl}" style="display:inline-block;background:linear-gradient(90deg,#ff4d59,#ff7a30);color:#fff;text-decoration:none;font-weight:600;padding:12px 18px;border-radius:10px;">${ctaLabel}</a>
    </p>
    <p style="margin:24px 0 0;font-size:12px;color:#94a3b8;">Werkt de knop niet? Kopieer deze link:<br/>${ctaUrl}</p>
  </div>
</body>
</html>`;
}

export async function sendVerificationEmail(input: {
  to: string;
  firstName: string;
  token: string;
}) {
  const url = `${siteUrl()}/email-bevestigen?token=${encodeURIComponent(input.token)}`;
  const name = input.firstName.trim() || "daar";
  return sendEmail({
    to: input.to,
    subject: "Bevestig je referr-account",
    text: `Hoi ${name},\n\nWelkom bij referr. Bevestig je e-mailadres via deze link:\n${url}\n\nDeze link is 24 uur geldig.`,
    html: emailShell(
      "Bevestig je e-mailadres",
      `<p>Hoi ${name},</p><p>Welkom bij referr. Bevestig je e-mailadres om verder te gaan.</p>`,
      "E-mail bevestigen",
      url
    ),
  });
}

export async function sendPasswordResetEmail(input: {
  to: string;
  firstName: string;
  token: string;
}) {
  const url = `${siteUrl()}/wachtwoord-herstellen?token=${encodeURIComponent(input.token)}`;
  const name = input.firstName.trim() || "daar";
  return sendEmail({
    to: input.to,
    subject: "Wachtwoord resetten · referr",
    text: `Hoi ${name},\n\nJe vroeg een nieuw wachtwoord aan. Gebruik deze link:\n${url}\n\nDeze link is 30 minuten geldig. Heb je dit niet zelf gedaan? Negeer deze mail.`,
    html: emailShell(
      "Wachtwoord resetten",
      `<p>Hoi ${name},</p><p>Je vroeg een nieuw wachtwoord aan voor referr. Klik op de knop hieronder om een nieuw wachtwoord te kiezen.</p><p>Heb je dit niet zelf gedaan? Dan kun je deze mail negeren.</p>`,
      "Nieuw wachtwoord kiezen",
      url
    ),
  });
}
