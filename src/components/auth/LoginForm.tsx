"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  loginAction,
  type ActionResult,
} from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BrandLogo } from "@/components/brand/BrandLogo";

const initial: ActionResult | null = null;

export function LoginForm({
  nextPath = "/dashboard",
  registerHref = "/account-aanmaken",
  registerLabel = "Account aanmaken",
}: {
  nextPath?: string;
  registerHref?: string;
  registerLabel?: string;
}) {
  const [state, action, pending] = useActionState(loginAction, initial);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Card className="mx-auto w-full max-w-md border-fk-navy/5 p-6 sm:p-8">
      <div className="mb-6">
        <BrandLogo height={28} href="/" />
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-fk-navy">Welkom terug</h1>
      <p className="mt-2 text-sm text-fk-navy/55">
        Log in om verder te gaan.
      </p>

      <form action={action} className="mt-6 space-y-4">
        <input type="hidden" name="next" value={nextPath} />
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
            autoComplete="email"
            required
            className="w-full rounded-lg border border-fk-primary/20 bg-fk-white px-3 py-2.5 text-sm text-fk-navy outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
          />
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-fk-navy"
            >
              Wachtwoord
            </label>
            <Link
              href="/wachtwoord-vergeten"
              className="text-xs font-medium text-fk-primary hover:underline"
            >
              Wachtwoord vergeten?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="w-full rounded-lg border border-fk-primary/20 bg-fk-white px-3 py-2.5 pr-10 text-sm text-fk-navy outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-fk-navy/50 hover:text-fk-navy"
              aria-label={showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
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
          {pending ? "Bezig…" : "Inloggen"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-fk-navy/65">
        Nog geen account?{" "}
        <Link
          href={registerHref}
          className="font-semibold text-fk-primary hover:underline"
        >
          {registerLabel}
        </Link>
      </p>
    </Card>
  );
}
