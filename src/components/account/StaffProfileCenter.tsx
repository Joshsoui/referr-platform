"use client";

import { useActionState, useTransition } from "react";
import {
  deleteAccountAction,
  logoutAction,
  updateProfileAction,
  type ActionResult,
} from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const initial: ActionResult | null = null;

const ROLE_LABELS: Record<string, string> = {
  admin: "Admin",
  recruiter: "Recruiter",
};

export function StaffProfileCenter({
  user,
}: {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    emailVerifiedAt: string | null;
    phone: string;
    companyName: string;
    jobTitle: string;
    companyCity: string;
    companyKvK: string;
  };
}) {
  const [profileState, profileAction, profilePending] = useActionState(
    updateProfileAction,
    initial
  );
  const [deleteState, deleteAction, deletePending] = useActionState(
    deleteAccountAction,
    initial
  );
  const [, startTransition] = useTransition();

  return (
    <div className="mt-8 space-y-6">
      <Card className="border-fk-primary/10 p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-bold text-fk-navy">Beheerderprofiel</h2>
            <p className="mt-1 text-sm text-fk-navy/60">{user.email}</p>
            <p className="mt-1 text-xs text-fk-navy/50">
              E-mail{" "}
              {user.emailVerifiedAt
                ? `bevestigd op ${new Date(user.emailVerifiedAt).toLocaleDateString("nl-NL")}`
                : "nog niet bevestigd"}
            </p>
          </div>
          <span className="rounded-full bg-fk-navy px-3 py-1 text-xs font-semibold text-white">
            {ROLE_LABELS[user.role] ?? user.role}
          </span>
        </div>

        <form action={profileAction} className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2 rounded-xl border border-fk-navy/[0.06] bg-fk-light/40 px-3 py-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-fk-navy/40">
              Accountrol
            </p>
            <p className="mt-0.5 text-sm font-semibold text-fk-navy">
              {ROLE_LABELS[user.role] ?? user.role}
            </p>
            <p className="mt-1 text-xs text-fk-navy/50">
              Deze rol bepaalt toegang tot tips, challenges en uitbetalingen.
            </p>
          </div>

          <div>
            <label htmlFor="firstName" className="mb-1 block text-sm font-medium">
              Voornaam
            </label>
            <input
              id="firstName"
              name="firstName"
              defaultValue={user.firstName}
              required
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-1 block text-sm font-medium">
              Achternaam
            </label>
            <input
              id="lastName"
              name="lastName"
              defaultValue={user.lastName}
              required
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="jobTitle" className="mb-1 block text-sm font-medium">
              Functie / rol in het bedrijf
            </label>
            <input
              id="jobTitle"
              name="jobTitle"
              defaultValue={user.jobTitle}
              placeholder="Bijv. Recruiter, Partner manager"
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium">
              Telefoonnummer
            </label>
            <input
              id="phone"
              name="phone"
              defaultValue={user.phone}
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>

          <div className="sm:col-span-2 mt-1 rounded-lg border border-fk-primary/10 bg-fk-light/40 p-3">
            <p className="text-sm font-semibold text-fk-navy">Bedrijfsgegevens</p>
            <p className="mt-1 text-xs text-fk-navy/55">
              Gegevens van het bureau of de organisatie die challenges beheert.
            </p>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="companyName" className="mb-1 block text-sm font-medium">
              Bedrijfsnaam
            </label>
            <input
              id="companyName"
              name="companyName"
              defaultValue={user.companyName}
              required
              placeholder="Bijv. referr B.V."
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="companyCity" className="mb-1 block text-sm font-medium">
              Vestigingsplaats
            </label>
            <input
              id="companyCity"
              name="companyCity"
              defaultValue={user.companyCity}
              placeholder="Bijv. Den Bosch"
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="companyKvK" className="mb-1 block text-sm font-medium">
              KvK-nummer
            </label>
            <input
              id="companyKvK"
              name="companyKvK"
              defaultValue={user.companyKvK}
              placeholder="Optioneel"
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>

          <input type="hidden" name="profileKind" value="staff" />

          {profileState && (
            <p role="status" className="sm:col-span-2 text-sm text-fk-navy/70">
              {profileState.message}
            </p>
          )}
          <div className="sm:col-span-2">
            <Button type="submit" disabled={profilePending}>
              Profiel opslaan
            </Button>
          </div>
        </form>
      </Card>

      <Card className="border-fk-primary/10 p-5">
        <h2 className="font-bold text-fk-navy">Sessie</h2>
        <p className="mt-1 text-sm text-fk-navy/60">
          Log uit op dit apparaat.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-4"
          onClick={() => startTransition(() => logoutAction())}
        >
          Uitloggen
        </Button>
      </Card>

      <Card className="border-red-100 p-5">
        <h2 className="font-bold text-fk-navy">Account verwijderen</h2>
        <p className="mt-1 text-sm text-fk-navy/60">
          Dit verwijdert je beheerderaccount permanent.
        </p>
        <form action={deleteAction} className="mt-4 space-y-3">
          <input
            name="confirm"
            required
            placeholder='Typ "VERWIJDER" ter bevestiging'
            className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
          />
          {deleteState && !deleteState.ok && (
            <p role="alert" className="text-sm text-red-700">
              {deleteState.message}
            </p>
          )}
          <Button type="submit" variant="secondary" disabled={deletePending}>
            Account verwijderen
          </Button>
        </form>
      </Card>
    </div>
  );
}
