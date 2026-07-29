"use client";

import Link from "next/link";
import { Bell, Search, ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function PortalDashboardHeader() {
  const { data: session } = useSession();
  const name = session?.user?.firstName || "Joshua";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fk-navy/40">
          Recruitment Portal
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-fk-navy sm:text-3xl">
          Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <label className="relative hidden min-w-[200px] flex-1 sm:block sm:max-w-xs">
          <span className="sr-only">Zoeken</span>
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-fk-navy/35"
          />
          <input
            type="search"
            placeholder="Zoeken…"
            className="w-full rounded-xl border border-fk-navy/10 bg-fk-white py-2.5 pl-9 pr-3 text-sm text-fk-navy placeholder:text-fk-navy/35 outline-none transition focus:border-fk-primary/40 focus:ring-2 focus:ring-fk-primary/15"
          />
        </label>

        <button
          type="button"
          className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-fk-navy/10 bg-fk-white text-fk-navy/60 transition hover:border-fk-primary/25 hover:text-fk-navy"
          aria-label="Notificaties"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-fk-primary" />
        </button>

        <Link
          href="/account"
          className="inline-flex items-center gap-2 rounded-xl border border-fk-navy/10 bg-fk-white py-1.5 pl-1.5 pr-2.5 text-sm font-medium text-fk-navy transition hover:border-fk-primary/25"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-fk-navy text-xs font-semibold text-white">
            {initial}
          </span>
          <span className="hidden sm:inline">{name}</span>
          <ChevronDown size={14} className="text-fk-navy/40" />
        </Link>

        <div className="hidden lg:block">
          <BrandLogo href="/" height={22} />
        </div>
      </div>
    </div>
  );
}
