"use client";

import Link from "next/link";
import { useActionState, useState, useTransition } from "react";
import {
  deleteAccountAction,
  requestExportAction,
  updateMarketingAction,
  updateProfileAction,
  logoutAction,
  type ActionResult,
} from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const initial: ActionResult | null = null;

export function PrivacyCenter({
  user,
}: {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    emailVerifiedAt: string | null;
    marketingConsent: boolean;
    createdAt: string;
    termsAcceptedAt: string;
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
  const [marketing, setMarketing] = useState(user.marketingConsent);
  const [marketingMsg, setMarketingMsg] = useState<string | null>(null);
  const [exportMsg, setExportMsg] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <div className="mt-8 space-y-6">
      <Card className="border-fk-primary/10 p-5">
        <h2 className="font-bold text-fk-navy">Accountgegevens</h2>
        <p className="mt-1 text-sm text-fk-navy/60">{user.email}</p>
        <p className="mt-1 text-xs text-fk-navy/50">
          E-mail{" "}
          {user.emailVerifiedAt
            ? `bevestigd op ${new Date(user.emailVerifiedAt).toLocaleDateString("nl-NL")}`
            : "nog niet bevestigd"}
        </p>
        <form action={profileAction} className="mt-4 grid gap-3 sm:grid-cols-2">
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
          {profileState && (
            <p
              role="status"
              className="sm:col-span-2 text-sm text-fk-navy/70"
            >
              {profileState.message}
            </p>
          )}
          <div className="sm:col-span-2">
            <Button type="submit" disabled={profilePending}>
              Opslaan
            </Button>
          </div>
        </form>
      </Card>

      <Card className="border-fk-primary/10 p-5">
        <h2 className="font-bold text-fk-navy">Communicatie</h2>
        <label className="mt-3 flex gap-3 text-sm">
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => {
              const next = e.target.checked;
              setMarketing(next);
              startTransition(async () => {
                const res = await updateMarketingAction(next);
                setMarketingMsg(res.message ?? null);
              });
            }}
            className="mt-0.5"
          />
          <span>
            Ja, stuur mij af en toe relevante updates en nieuwe vacatures per
            e-mail.
          </span>
        </label>
        {marketingMsg && (
          <p className="mt-2 text-xs text-fk-navy/60">{marketingMsg}</p>
        )}
        <p className="mt-3 text-xs text-fk-navy/50">
          Inlogmethode: e-mail en wachtwoord.{" "}
          <Link href="/privacy" className="text-fk-primary hover:underline">
            Privacyverklaring
          </Link>
        </p>
      </Card>

      <Card className="border-fk-primary/10 p-5">
        <h2 className="font-bold text-fk-navy">Gegevensexport</h2>
        <p className="mt-2 text-sm text-fk-navy/65">
          Download een kopie van je accountgegevens (JSON).
        </p>
        <Button
          className="mt-3"
          variant="secondary"
          disabled={pending}
          onClick={() => {
            startTransition(async () => {
              const res = await requestExportAction();
              setExportMsg(res.message ?? null);
              if (res.ok && "data" in res && res.data) {
                const blob = new Blob([JSON.stringify(res.data, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "referr-gegevensexport.json";
                a.click();
                URL.revokeObjectURL(url);
              }
            });
          }}
        >
          Export aanvragen
        </Button>
        {exportMsg && (
          <p className="mt-2 text-xs text-fk-navy/60">{exportMsg}</p>
        )}
      </Card>

      <Card className="border-fk-primary/10 p-5">
        <h2 className="font-bold text-fk-navy">Sessie</h2>
        <p className="mt-2 text-sm text-fk-navy/65">
          Log uit op dit apparaat. Uitloggen op alle apparaten volgt wanneer
          sessieopslag multi-device ondersteunt.
        </p>
        <form action={logoutAction} className="mt-3">
          <Button type="submit" variant="outline">
            Uitloggen
          </Button>
        </form>
      </Card>

      <Card className="border-amber-200 bg-amber-50/40 p-5">
        <h2 className="font-bold text-fk-navy">Account verwijderen</h2>
        <p className="mt-2 text-sm text-fk-navy/70">
          Dit verwijdert je account. Gegevens die wettelijk of operationeel
          bewaard moeten blijven, kunnen geanonimiseerd worden bewaard. Typ{" "}
          <strong>VERWIJDER</strong> ter bevestiging.
        </p>
        <form action={deleteAction} className="mt-4 space-y-3">
          <input
            name="confirm"
            placeholder="VERWIJDER"
            className="w-full rounded-lg border border-amber-300 px-3 py-2 text-sm"
            autoComplete="off"
          />
          {deleteState && !deleteState.ok && (
            <p role="alert" className="text-sm text-amber-900">
              {deleteState.message}
            </p>
          )}
          <Button type="submit" variant="outline" disabled={deletePending}>
            Account definitief verwijderen
          </Button>
        </form>
      </Card>
    </div>
  );
}
