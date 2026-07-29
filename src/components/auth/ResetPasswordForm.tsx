"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  resetPasswordAction,
  type ActionResult,
} from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const initial: ActionResult | null = null;

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, action, pending] = useActionState(resetPasswordAction, initial);
  const [showPassword, setShowPassword] = useState(false);

  if (!token) {
    return (
      <Card className="mx-auto w-full max-w-md border-fk-primary/10 p-6 sm:p-8">
        <h1 className="text-2xl font-extrabold text-fk-navy">
          Ongeldige link
        </h1>
        <p className="mt-3 text-sm text-fk-navy/70">
          Deze herstellink ontbreekt of is ongeldig.
        </p>
        <Link href="/wachtwoord-vergeten" className="mt-6 inline-block">
          <Button>Nieuwe link aanvragen</Button>
        </Link>
      </Card>
    );
  }

  if (state?.ok) {
    return (
      <Card className="mx-auto w-full max-w-md border-fk-primary/10 p-6 sm:p-8">
        <h1 className="text-2xl font-extrabold text-fk-navy">
          Wachtwoord bijgewerkt
        </h1>
        <p className="mt-3 text-sm text-fk-navy/70">{state.message}</p>
        <Link href="/inloggen" className="mt-6 inline-block">
          <Button>Inloggen</Button>
        </Link>
      </Card>
    );
  }

  return (
    <Card className="mx-auto w-full max-w-md border-fk-primary/10 p-6 sm:p-8">
      <h1 className="text-2xl font-extrabold text-fk-navy">
        Nieuw wachtwoord
      </h1>
      <p className="mt-2 text-sm text-fk-navy/65">
        Kies een nieuw wachtwoord van minimaal 10 tekens.
      </p>
      <form action={action} className="mt-6 space-y-4">
        <input type="hidden" name="token" value={token} />
        <div>
          <label
            htmlFor="password"
            className="mb-1.5 block text-sm font-medium text-fk-navy"
          >
            Nieuw wachtwoord
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
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2.5 pr-10 text-sm outline-none focus:border-fk-primary focus:ring-2 focus:ring-fk-primary/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1.5 text-fk-navy/50"
              aria-label={showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        {state && !state.ok && (
          <p role="alert" className="text-sm text-amber-800">
            {state.message}
          </p>
        )}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Bezig…" : "Wachtwoord opslaan"}
        </Button>
      </form>
    </Card>
  );
}
