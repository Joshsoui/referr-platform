"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";

const navLinks = [
  { href: "/#hoe-het-werkt", label: "Hoe het werkt" },
  { href: "/vacatures", label: "Challenges" },
  { href: "/media", label: "Media" },
  { href: "/vision", label: "Vision" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border,backdrop-filter,box-shadow] duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-fk-navy/5 bg-fk-white/80 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl"
          : "border-b border-transparent bg-gradient-to-b from-fk-white/80 to-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
        <BrandLogo height={28} priority />

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-fk-navy"
                  : "text-fk-navy/50 hover:text-fk-navy"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-1 sm:flex">
          <Link
            href="/inloggen"
            className="header-cta inline-flex items-center justify-center"
          >
            Inloggen
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex rounded-full p-2 text-fk-navy md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-fk-navy/5 bg-fk-white/95 px-4 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-fk-navy/70"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/inloggen"
              onClick={() => setMobileOpen(false)}
              className="header-cta mt-2 justify-center"
            >
              Inloggen
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
