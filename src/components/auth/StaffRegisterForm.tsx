"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  registerStaffAction,
  type ActionResult,
} from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BrandLogo } from "@/components/brand/BrandLogo";

const initial: ActionResult | null = null;

function passwordStrength(password: string): {
  score: number;
  label: string;
} {
  let score = 0;
  if (password.length >= 10) score += 1;
  if (password.length >= 14) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;
  if (password.length >= 20) score += 1;
  const labels = ["Zwak", "Matig", "Redelijk", "Sterk", "Zeer sterk"];
  return { score, label: labels[Math.min(score, 4)] ?? "Zwak" };
}

export function StaffRegisterForm({
  inviteConfigured,
}: {
  inviteConfigured: boolean;
}) {
  const [state, action, pending] = useActionState(registerStaffAction, initial);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const strength = passwordStrength(password);

  if (state?.ok) {
    return (
      <Card className="mx-auto w-full max-w-md border-fk-navy/5 p-6 sm:p-8">
        <BrandLogo height={28} href="/" />
        <h1 className="mt-6 text-2xl font-bold tracking-tight text-fk-navy">
          Check je inbox
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-fk-navy/65">
          {state.message}
        </p>
        {state.demoLink && (
          <p className="mt-4 rounded-lg bg-fk-primary-muted px-3 py-2 text-sm text-fk-navy">
            Demo:{" "}
            <Link
              href={state.demoLink}
              className="font-semibold text-fk-primary underline"
            >
              Bevestig e-mail
            </Link>
          </p>
        )}
        <Link
          href="/inloggen?mode=partner&next=/recruitment"
          className="mt-6 inline-block"
        >
          <Button variant="secondary">Naar beheerder-inloggen</Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md border-fk-navy/5 p-6 sm:p-8">
      <BrandLogo height={28} href="/" />
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-fk-navy">
        Beheerderaccount
      </h1>
      <p className="mt-2 text-sm text-fk-navy/55">
        Voor partners en admins die challenges en tips beheren. Je hebt de
        uitnodigingscode nodig (dezelfde als{" "}
        <code className="text-xs">ADMIN_BOOTSTRAP_TOKEN</code> op Render).
      </p>

      {!inviteConfigured ? (
        <p
          role="alert"
          className="mt-6 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900"
        >
          Beheerder-aanmelden is nog niet geconfigureerd. Zet{" "}
          <code className="text-xs">ADMIN_BOOTSTRAP_TOKEN</code> op Render en
          deploy opnieuw.
        </p>
      ) : (
        <form action={action} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="inviteCode"
              className="mb-1.5 block text-sm font-medium text-fk-navy"
            >
              Uitnodigingscode
            </label>
            <input
              id="inviteCode"
              name="inviteCode"
              type="password"
              required
              autoComplete="off"
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2.5 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-1.5 block text-sm font-medium text-fk-navy"
            >
              Rol
            </label>
            <select
              id="role"
              name="role"
              defaultValue="admin"
              className="w-full rounded-lg border border-fk-primary/20 bg-fk-white px-3 py-2.5 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
            >
              <option value="admin">Admin</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="mb-1.5 block text-sm font-medium text-fk-navy"
              >
                Voornaam
              </label>
              <input
                id="firstName"
                name="firstName"
                required
                autoComplete="given-name"
                maxLength={80}
                className="w-full rounded-lg border border-fk-primary/20 px-3 py-2.5 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="mb-1.5 block text-sm font-medium text-fk-navy"
              >
                Achternaam
              </label>
              <input
                id="lastName"
                name="lastName"
                required
                autoComplete="family-name"
                maxLength={80}
                className="w-full rounded-lg border border-fk-primary/20 px-3 py-2.5 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-medium text-fk-navy"
            >
              E-mailadres
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2.5 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-medium text-fk-navy"
            >
              Wachtwoord
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={10}
                maxLength={128}
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-fk-primary/20 px-3 py-2.5 pr-10 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-fk-navy/50 hover:text-fk-navy"
                aria-label={
                  showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"
                }
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-fk-navy/55">
              Minimaal 10 tekens. Sterkte: {password ? strength.label : "—"}
            </p>
          </div>

          <div className="space-y-3 rounded-lg border border-fk-primary/10 bg-fk-light/40 p-3">
            <label className="flex gap-3 text-sm text-fk-navy">
              <input
                type="checkbox"
                name="acceptTerms"
                required
                className="mt-1 h-4 w-4 rounded border-fk-primary/30"
              />
              <span>
                Ik ga akkoord met de{" "}
                <Link
                  href="/voorwaarden"
                  className="font-semibold text-fk-primary hover:underline"
                >
                  gebruikersvoorwaarden
                </Link>
                .
              </span>
            </label>
            <label className="flex gap-3 text-sm text-fk-navy/80">
              <input
                type="checkbox"
                name="marketingConsent"
                className="mt-1 h-4 w-4 rounded border-fk-primary/30"
              />
              <span>
                Ja, stuur mij af en toe relevante productupdates per e-mail.
              </span>
            </label>
          </div>

          {state && !state.ok && (
            <p
              role="alert"
              className="rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-900"
            >
              {state.message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Bezig…" : "Beheerderaccount aanmaken"}
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-fk-navy/65">
        Al een account?{" "}
        <Link
          href="/inloggen?mode=partner&next=/recruitment"
          className="font-semibold text-fk-primary hover:underline"
        >
          Inloggen als beheerder
        </Link>
      </p>
      <p className="mt-2 text-center text-sm text-fk-navy/55">
        Wil je tippen?{" "}
        <Link
          href="/account-aanmaken"
          className="font-semibold text-fk-primary hover:underline"
        >
          Maak een referrer-account
        </Link>
      </p>
    </Card>
  );
}
