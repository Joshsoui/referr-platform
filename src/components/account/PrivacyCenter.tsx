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
import { updateNotificationPreferencesAction } from "@/app/actions/notifications";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const initial: ActionResult | null = null;

export function PrivacyCenter({
  user,
  notificationPreferences,
}: {
  user: {
    email: string;
    firstName: string;
    lastName: string;
    emailVerifiedAt: string | null;
    marketingConsent: boolean;
    createdAt: string;
    termsAcceptedAt: string;
    phone: string;
    street: string;
    houseNumber: string;
    postalCode: string;
    city: string;
    country: string;
    iban: string;
    ibanAccountName: string;
  };
  notificationPreferences: {
    nearbyChallengesEnabled: boolean;
    referralUpdatesEnabled: boolean;
    rewardUpdatesEnabled: boolean;
    closingSoonEnabled: boolean;
    emailEnabled: boolean;
    pushEnabled: boolean;
    radiusKm: 10 | 25 | 50 | 100;
    city: string;
    postalCode: string;
    locationConsent: boolean;
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
  const [notifyPrefs, setNotifyPrefs] = useState(notificationPreferences);
  const [notifyMsg, setNotifyMsg] = useState<string | null>(null);

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
          <div>
            <label htmlFor="country" className="mb-1 block text-sm font-medium">
              Land
            </label>
            <input
              id="country"
              name="country"
              defaultValue={user.country || "Nederland"}
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="street" className="mb-1 block text-sm font-medium">
              Straat
            </label>
            <input
              id="street"
              name="street"
              defaultValue={user.street}
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="houseNumber" className="mb-1 block text-sm font-medium">
              Huisnummer
            </label>
            <input
              id="houseNumber"
              name="houseNumber"
              defaultValue={user.houseNumber}
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="mb-1 block text-sm font-medium">
              Postcode
            </label>
            <input
              id="postalCode"
              name="postalCode"
              defaultValue={user.postalCode}
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="city" className="mb-1 block text-sm font-medium">
              Plaats
            </label>
            <input
              id="city"
              name="city"
              defaultValue={user.city}
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>
          <div className="sm:col-span-2 mt-2 rounded-lg border border-fk-primary/10 bg-fk-light/40 p-3">
            <p className="text-sm font-semibold text-fk-navy">Uitbetaling</p>
            <p className="mt-1 text-xs text-fk-navy/55">
              Vul je rekeninggegevens in voor reward-uitbetalingen.
            </p>
          </div>
          <div>
            <label htmlFor="ibanAccountName" className="mb-1 block text-sm font-medium">
              Rekeninghouder
            </label>
            <input
              id="ibanAccountName"
              name="ibanAccountName"
              defaultValue={user.ibanAccountName}
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label htmlFor="iban" className="mb-1 block text-sm font-medium">
              IBAN
            </label>
            <input
              id="iban"
              name="iban"
              defaultValue={user.iban}
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2 text-sm"
              placeholder="NL00BANK0123456789"
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
        <h2 className="font-bold text-fk-navy">Notificaties</h2>
        <p className="mt-1 text-sm text-fk-navy/60">
          Kies welke updates je wil ontvangen.
        </p>
        <div className="mt-4 space-y-2 text-sm">
          {[
            ["nearbyChallengesEnabled", "Nieuwe challenge in mijn buurt"],
            ["referralUpdatesEnabled", "Statusupdate van mijn referral"],
            ["rewardUpdatesEnabled", "Nieuwe reward of uitbetaling"],
            ["closingSoonEnabled", "Challenge sluit binnenkort"],
            ["emailEnabled", "E-mailnotificaties"],
            ["pushEnabled", "Pushnotificaties (indien ondersteund)"],
          ].map(([key, label]) => (
            <label key={key} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={Boolean(notifyPrefs[key as keyof typeof notifyPrefs])}
                onChange={(event) =>
                  setNotifyPrefs((prev) => ({
                    ...prev,
                    [key]: event.target.checked,
                  }))
                }
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block text-xs font-semibold uppercase text-fk-navy/45">
              Woonplaats
            </span>
            <input
              value={notifyPrefs.city}
              onChange={(event) =>
                setNotifyPrefs((prev) => ({ ...prev, city: event.target.value }))
              }
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-xs font-semibold uppercase text-fk-navy/45">
              Postcode
            </span>
            <input
              value={notifyPrefs.postalCode}
              onChange={(event) =>
                setNotifyPrefs((prev) => ({ ...prev, postalCode: event.target.value }))
              }
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2"
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-xs font-semibold uppercase text-fk-navy/45">
              Afstand
            </span>
            <select
              value={notifyPrefs.radiusKm}
              onChange={(event) =>
                setNotifyPrefs((prev) => ({
                  ...prev,
                  radiusKm: Number(event.target.value) as 10 | 25 | 50 | 100,
                }))
              }
              className="w-full rounded-lg border border-fk-primary/20 px-3 py-2"
            >
              <option value={10}>10 km</option>
              <option value={25}>25 km</option>
              <option value={50}>50 km</option>
              <option value={100}>100 km</option>
            </select>
          </label>
          <label className="mt-6 flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={notifyPrefs.locationConsent}
              onChange={(event) =>
                setNotifyPrefs((prev) => ({
                  ...prev,
                  locationConsent: event.target.checked,
                }))
              }
            />
            Locatiegebaseerde notificaties toestaan
          </label>
        </div>
        <Button
          className="mt-4"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.localStorage.setItem(
                "referr-notification-preferences",
                JSON.stringify(notifyPrefs)
              );
            }
            startTransition(async () => {
              const result = await updateNotificationPreferencesAction(notifyPrefs);
              setNotifyMsg(result.message ?? null);
            });
          }}
        >
          Notificatievoorkeuren opslaan
        </Button>
        {notifyMsg && <p className="mt-2 text-xs text-fk-navy/60">{notifyMsg}</p>}
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
