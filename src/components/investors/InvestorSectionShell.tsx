"use client";

import type { ReactNode } from "react";
import { useScrollReveal } from "./useInvestorMotion";

interface InvestorSectionShellProps {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: "white" | "light" | "muted";
  wide?: boolean;
  label?: string;
}

export function InvestorSectionShell({
  id,
  children,
  className = "",
  variant = "white",
  wide = false,
  label,
}: InvestorSectionShellProps) {
  const ref = useScrollReveal<HTMLElement>({ y: 40 });

  const bg = {
    white: "bg-fk-white",
    light: "bg-fk-light",
    muted: "bg-gradient-to-b from-fk-white to-fk-primary-muted/25",
  }[variant];

  return (
    <section
      id={id}
      ref={ref}
      className={`relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 ${bg} ${className}`}
    >
      <div
        className={`mx-auto ${wide ? "max-w-6xl" : "max-w-5xl"}`}
      >
        {label ? (
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-fk-primary">
            {label}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}

export function InvestorHeadline({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag
      className={`text-balance text-3xl font-bold leading-[1.08] tracking-[-0.04em] text-fk-navy sm:text-4xl lg:text-5xl ${className}`}
    >
      {children}
    </Tag>
  );
}

export function InvestorSubtext({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mt-5 max-w-2xl text-base font-medium leading-relaxed text-fk-navy/55 sm:text-lg ${className}`}
    >
      {children}
    </p>
  );
}

export function BrowserFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-fk-navy/[0.08] bg-fk-white shadow-[0_24px_80px_-24px_rgba(15,23,42,0.18)] ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-fk-navy/[0.06] bg-fk-light/80 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" aria-hidden />
        <div className="ml-3 flex-1 rounded-md bg-fk-white px-3 py-1 text-[11px] text-fk-navy/35">
          referr.nl/vacatures
        </div>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}
