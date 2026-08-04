"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { NotificationCenter } from "@/components/NotificationCenter";
import { useDeckTheme } from "@/context/DeckThemeContext";
import { isStaffRole } from "@/lib/auth/roles";

const referrerNavLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/vacatures", label: "Challenges" },
  { href: "/aandragen", label: "Mijn tips" },
  { href: "/rewards", label: "Beloningen" },
  { href: "/account", label: "Profiel" },
];

const staffNavLinks = [
  { href: "/recruitment", label: "Beheeromgeving" },
  { href: "/admin", label: "Tips" },
  { href: "/admin/challenges", label: "Challenges" },
  { href: "/admin/payouts", label: "Uitbetalingen" },
  { href: "/account", label: "Profiel" },
];

function linkIsActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  if (href === "/admin/challenges") return pathname.startsWith("/admin/challenges");
  if (href === "/admin/payouts") return pathname.startsWith("/admin/payouts");
  if (href === "/recruitment") {
    return pathname === "/recruitment" || pathname.startsWith("/recruitment/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { enabled: deckTheme } = useDeckTheme();
  const { data: session } = useSession();
  const isStaff = isStaffRole(session?.user?.role);
  const links = isStaff ? staffNavLinks : referrerNavLinks;
  const homeHref = isStaff ? "/recruitment" : "/";
  const ctaHref = isStaff ? "/admin" : "/vacatures";
  const ctaLabel = isStaff ? "Tips beheren" : "Ontdek challenges";

  if (pathname === "/founders-deck") return null;

  return (
    <header
      className={`sticky top-0 z-50 shadow-sm backdrop-blur-md transition-shadow duration-300 ${
        deckTheme
          ? "fk-deck-header border-b border-fk-primary/15 bg-fk-white/80"
          : "border-b border-fk-navy/5 bg-fk-white/90"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5 lg:px-8">
        <BrandLogo height={28} priority href={homeHref} />

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto md:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => {
            const active = linkIsActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 px-2 py-2 text-xs font-medium transition-all duration-200 sm:px-2.5 sm:text-sm ${
                  deckTheme ? "rounded-full" : "rounded-lg"
                } ${
                  active
                    ? deckTheme
                      ? "bg-gradient-to-r from-fk-primary/12 to-fk-secondary/10 text-fk-primary shadow-sm ring-1 ring-fk-primary/15"
                      : "bg-fk-primary-muted text-fk-primary shadow-sm"
                    : "text-fk-navy/60 hover:bg-fk-light hover:text-fk-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <NotificationCenter />
          <Link
            href={ctaHref}
            className="header-cta group hidden items-center gap-2 sm:inline-flex"
          >
            <span>{ctaLabel}</span>
            <ArrowRight
              size={15}
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>

          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-fk-navy md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-fk-navy/5 bg-fk-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const active = linkIsActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    active
                      ? "bg-fk-primary-muted text-fk-primary"
                      : "text-fk-navy/70"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={ctaHref}
              onClick={() => setMobileOpen(false)}
              className="header-cta mt-2 justify-center"
            >
              <span>{ctaLabel}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
