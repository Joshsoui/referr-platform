"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  requestPasswordResetAction,
  type ActionResult,
} from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const initial: ActionResult | null = null;

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(
    requestPasswordResetAction,
    initial
  );

  return (
    <Card className="mx-auto w-full max-w-md border-fk-primary/10 p-6 sm:p-8">
      <h1 className="text-2xl font-extrabold text-fk-navy">
        Wachtwoord vergeten
      </h1>
      <p className="mt-2 text-sm text-fk-navy/65">
        Vul je e-mailadres in. Als er een account bestaat, sturen we een
        herstellink.
      </p>

      {state?.ok ? (
        <div className="mt-6 space-y-3">
          <p role="status" className="text-sm text-fk-navy/80">
            {state.message}
          </p>
          {state.demoLink && (
            <p className="rounded-lg bg-fk-primary-muted px-3 py-2 text-sm">
              Demo:{" "}
              <Link
                href={state.demoLink}
                className="font-semibold text-fk-primary underline"
              >
                Wachtwoord herstellen
              </Link>
            </p>
          )}
          <Link href="/inloggen">
            <Button variant="secondary" className="mt-2">
              Terug naar inloggen
            </Button>
          </Link>
        </div>
      ) : (
        <form action={action} className="mt-6 space-y-4">
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
          {state && !state.ok && (
            <p role="alert" className="text-sm text-amber-800">
              {state.message}
            </p>
          )}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Bezig…" : "Verstuur herstellink"}
          </Button>
        </form>
      )}
    </Card>
  );
}
