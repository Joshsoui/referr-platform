"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { useDeckTheme } from "@/context/DeckThemeContext";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/vacatures", label: "Challenges" },
  { href: "/aandragen", label: "Mijn introducties" },
  { href: "/rewards", label: "Beloningen" },
  { href: "/account", label: "Profiel" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { enabled: deckTheme } = useDeckTheme();

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
        <BrandLogo height={28} priority />

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto md:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navLinks.map((link) => {
            const active = pathname === link.href;
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
          <Link
            href="/vacatures"
            className="header-cta group hidden items-center gap-2 sm:inline-flex"
          >
            <span>Ontdek challenges</span>
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
            {navLinks.map((link) => {
              const active = pathname === link.href;
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
              href="/vacatures"
              onClick={() => setMobileOpen(false)}
              className="header-cta mt-2 justify-center"
            >
              <span>Ontdek challenges</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
