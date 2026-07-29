import Link from "next/link";
import type { ReactNode } from "react";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold text-fk-secondary">referr</p>
        <h1 className="mt-2 text-3xl font-extrabold text-fk-navy">{title}</h1>
        <p className="mt-2 text-xs text-amber-800">
          Concepttekst met placeholders. Juridische review vereist vóór
          productie.
        </p>
        <div className="prose-legal mt-8 space-y-6 text-sm leading-relaxed text-fk-navy/80">
          {children}
        </div>
        <p className="mt-10 text-sm">
          <Link href="/" className="font-semibold text-fk-primary hover:underline">
            ← Terug naar home
          </Link>
        </p>
      </div>
    </article>
  );
}

export function Placeholder({ children }: { children: string }) {
  return (
    <code className="rounded bg-amber-50 px-1.5 py-0.5 text-amber-900">
      {children}
    </code>
  );
}
