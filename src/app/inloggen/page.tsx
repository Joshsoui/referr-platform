import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Inloggen",
  robots: { index: false, follow: false },
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; mode?: "referrer" | "partner" }>;
}) {
  const params = await searchParams;
  const mode = params.mode === "partner" ? "partner" : "referrer";
  const nextPath =
    params.next && params.next.startsWith("/") ? params.next : "/dashboard";
  const suggestedNext = mode === "partner" ? "/recruitment" : nextPath;

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto mb-6 max-w-md rounded-2xl border border-fk-primary/10 bg-fk-white p-4 sm:p-5">
        <p className="text-sm font-medium text-fk-navy/55">Kies hoe je inlogt</p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <a
            href="/inloggen?mode=referrer"
            className={`rounded-xl border px-4 py-3 transition ${
              mode === "referrer"
                ? "border-fk-primary/40 bg-fk-primary-muted/40"
                : "border-fk-primary/15 hover:border-fk-primary/30"
            }`}
          >
            <p className="text-sm font-semibold text-fk-navy">Ik wil tippen</p>
            <p className="mt-1 text-xs text-fk-navy/60">
              Voor referrers
            </p>
          </a>
          <a
            href="/inloggen?mode=partner&next=/recruitment"
            className={`rounded-xl border px-4 py-3 transition ${
              mode === "partner"
                ? "border-fk-primary/40 bg-fk-primary-muted/40"
                : "border-fk-primary/15 hover:border-fk-primary/30"
            }`}
          >
            <p className="text-sm font-semibold text-fk-navy">Ik beheer challenges</p>
            <p className="mt-1 text-xs text-fk-navy/60">
              Voor partners &amp; admins
            </p>
          </a>
        </div>
      </div>
      <LoginForm nextPath={suggestedNext} />
    </div>
  );
}
