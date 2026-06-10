"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowRight, Menu, UserPlus, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/finderz-keeperz-logo.png";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/aandragen", label: "Aandragen" },
  { href: "/challenges", label: "Challenges" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/levels", label: "Levels" },
  { href: "/rewards", label: "Rewards" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-fk-primary/10 bg-fk-white/95 shadow-sm backdrop-blur-md transition-shadow duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5 lg:px-8">
        <Link href="/" className="group shrink-0 transition-opacity hover:opacity-90">
          <Image
            src={logo}
            alt="Finderz Keeperz"
            priority
            className="h-[3.25rem] w-auto sm:h-[3.75rem] lg:h-[4.25rem]"
          />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto md:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`shrink-0 rounded-lg px-2 py-2 text-xs font-medium transition-all duration-200 sm:px-2.5 sm:text-sm ${
                  active
                    ? "bg-fk-primary-muted text-fk-primary shadow-sm"
                    : "text-fk-navy/70 hover:bg-fk-light hover:text-fk-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/aandragen"
            className="header-cta group hidden items-center gap-2 sm:inline-flex"
          >
            <UserPlus size={16} className="shrink-0" />
            <span>Draag aan</span>
            <ArrowRight
              size={15}
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </Link>

          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-fk-navy md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-fk-primary/10 bg-fk-white px-4 py-4 md:hidden">
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
              href="/aandragen"
              onClick={() => setMobileOpen(false)}
              className="header-cta mt-2 justify-center"
            >
              <UserPlus size={16} />
              <span>Draag kandidaat aan</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
