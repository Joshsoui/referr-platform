"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FadeIn } from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

interface PayoutUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  iban: string;
  ibanAccountName: string;
  city: string;
  postalCode: string;
  country: string;
  updatedAt: string;
}

export default function AdminPayoutsPage() {
  const [users, setUsers] = useState<PayoutUser[]>([]);
  const [exportedAt, setExportedAt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/payouts");
        if (!res.ok) {
          if (!cancelled) setError("Kon uitbetalingsgegevens niet laden.");
          return;
        }
        const data = (await res.json()) as {
          users?: PayoutUser[];
          exportedAt?: string;
        };
        if (cancelled) return;
        setUsers(data.users ?? []);
        setExportedAt(data.exportedAt ?? null);
      } catch {
        if (!cancelled) setError("Kon uitbetalingsgegevens niet laden.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  function downloadCsv() {
    const header = [
      "naam",
      "rekeninghouder",
      "iban",
      "email",
      "telefoon",
      "plaats",
      "postcode",
      "land",
    ];
    const rows = users.map((user) => [
      `${user.firstName} ${user.lastName}`.trim(),
      user.ibanAccountName,
      user.iban,
      user.email,
      user.phone,
      user.city,
      user.postalCode,
      user.country,
    ]);
    const csv = [header, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `referr-iban-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-fk-navy/40">
                Pilot · handmatige uitbetaling
              </p>
              <h1 className="mt-1 text-2xl font-extrabold text-fk-navy">
                IBAN-overzicht
              </h1>
              <p className="mt-2 text-sm text-fk-navy/65">
                Alle referrers met ingevulde rekeninggegevens. Gebruik dit voor
                handmatige overboekingen.
              </p>
            </div>
            <div className="flex gap-2">
              <Button href="/admin" variant="outline">
                Terug naar tips
              </Button>
              <Button onClick={downloadCsv} disabled={users.length === 0}>
                Exporteer CSV
              </Button>
            </div>
          </div>
        </FadeIn>

        <Card className="mt-6 border-fk-primary/10 p-0 overflow-hidden">
          {loading ? (
            <p className="p-5 text-sm text-fk-navy/55">Laden…</p>
          ) : error ? (
            <p className="p-5 text-sm text-fk-navy/70">{error}</p>
          ) : users.length === 0 ? (
            <p className="p-5 text-sm text-fk-navy/55">
              Nog geen IBANs ingevuld. Referrers vullen dit in onder Profiel.
            </p>
          ) : (
            <ul className="divide-y divide-fk-navy/[0.06]">
              {users.map((user) => (
                <li key={user.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-semibold text-fk-navy">
                        {user.ibanAccountName ||
                          `${user.firstName} ${user.lastName}`.trim()}
                      </p>
                      <p className="mt-1 font-mono text-sm text-fk-navy/80">
                        {user.iban}
                      </p>
                      <p className="mt-1 text-xs text-fk-navy/50">
                        {user.email}
                        {user.phone ? ` · ${user.phone}` : ""}
                        {user.city ? ` · ${user.city}` : ""}
                      </p>
                    </div>
                    <Link
                      href={`mailto:${user.email}`}
                      className="text-xs font-medium text-fk-primary"
                    >
                      Mail
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
        {exportedAt && (
          <p className="mt-3 text-xs text-fk-navy/45">
            Laatst geladen: {new Date(exportedAt).toLocaleString("nl-NL")}
          </p>
        )}
      </div>
    </div>
  );
}
