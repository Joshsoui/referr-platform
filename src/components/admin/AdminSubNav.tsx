"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Tips", match: (p: string) => p === "/admin" },
  {
    href: "/admin/challenges",
    label: "Challenges",
    match: (p: string) => p.startsWith("/admin/challenges"),
  },
  {
    href: "/admin/payouts",
    label: "Uitbetalingen",
    match: (p: string) => p.startsWith("/admin/payouts"),
  },
];

export function AdminSubNav() {
  const pathname = usePathname();

  return (
    <nav className="mb-8 flex flex-wrap gap-1.5">
      {links.map((link) => {
        const active = link.match(pathname);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              active
                ? "bg-fk-navy text-white shadow-sm"
                : "bg-fk-white text-fk-navy/60 ring-1 ring-fk-navy/10 hover:text-fk-navy"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
      <Link
        href="/recruitment"
        className="rounded-full px-3.5 py-1.5 text-xs font-semibold text-fk-navy/45 hover:text-fk-navy"
      >
        Portal dashboard
      </Link>
    </nav>
  );
}
