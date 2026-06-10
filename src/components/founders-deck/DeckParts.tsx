"use client";

import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowDown } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function FlowArrow() {
  return (
    <div
      className="flex justify-center py-2 text-fk-primary animate-flow-arrow"
      aria-hidden
    >
      <ArrowDown size={20} />
    </div>
  );
}

export function FlowItem({
  label,
  highlight = false,
}: {
  label: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border px-5 py-3 text-center text-sm font-semibold transition-all duration-500 card-hover ${
        highlight
          ? "animate-pulse-glow border-fk-primary/30 bg-gradient-to-r from-fk-primary to-fk-secondary text-fk-white shadow-md"
          : "border-fk-primary/10 bg-fk-white text-fk-navy hover:border-fk-primary/25"
      }`}
    >
      {label}
    </div>
  );
}

export function DeckQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="relative mx-auto max-w-3xl rounded-2xl border border-fk-primary/10 bg-gradient-to-br from-fk-white via-fk-primary-muted/30 to-fk-white px-8 py-8 text-2xl font-extrabold leading-snug text-fk-navy shadow-sm transition-all duration-500 hover:border-fk-primary/20 hover:shadow-md sm:text-3xl lg:text-4xl">
      <span
        className="absolute left-0 top-6 h-[calc(100%-3rem)] w-1 rounded-full bg-gradient-to-b from-fk-secondary via-fk-primary to-fk-navy"
        aria-hidden
      />
      {children}
    </blockquote>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-fk-primary/15 bg-fk-white px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-fk-secondary shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-fk-secondary animate-pulse-glow" />
      {children}
    </p>
  );
}

const STAT_ACCENT_STYLES = {
  default: {
    card: "border-fk-primary/10 hover:border-fk-primary/20",
    icon: "from-fk-primary/12 to-fk-secondary/10 text-fk-primary group-hover:from-fk-primary/20 group-hover:to-fk-secondary/15",
    value: "text-fk-primary",
  },
  rose: {
    card: "border-rose-200/80 bg-gradient-to-br from-rose-50/80 to-fk-white hover:border-rose-300",
    icon: "from-rose-100 to-rose-50 text-rose-600 group-hover:from-rose-200 group-hover:to-rose-100",
    value: "text-rose-600",
  },
  amber: {
    card: "border-amber-200/80 bg-gradient-to-br from-amber-50/80 to-fk-white hover:border-amber-300",
    icon: "from-amber-100 to-amber-50 text-amber-600 group-hover:from-amber-200 group-hover:to-amber-100",
    value: "text-amber-600",
  },
  orange: {
    card: "border-orange-200/80 bg-gradient-to-br from-orange-50/80 to-fk-white hover:border-orange-300",
    icon: "from-orange-100 to-orange-50 text-orange-600 group-hover:from-orange-200 group-hover:to-orange-100",
    value: "text-orange-600",
  },
  violet: {
    card: "border-violet-200/80 bg-gradient-to-br from-violet-50/80 to-fk-white hover:border-violet-300",
    icon: "from-violet-100 to-violet-50 text-violet-600 group-hover:from-violet-200 group-hover:to-violet-100",
    value: "text-violet-600",
  },
} as const;

export function DeckStatTile({
  icon: Icon,
  label,
  value,
  accent = "default",
}: {
  icon: LucideIcon;
  label: string;
  value: ReactNode;
  suffix?: string;
  accent?: keyof typeof STAT_ACCENT_STYLES;
}) {
  const styles = STAT_ACCENT_STYLES[accent];

  return (
    <Card
      hover
      className={`group flex h-full min-h-[160px] flex-col items-center justify-center bg-fk-white text-center transition-all duration-500 hover:shadow-md ${styles.card}`}
    >
      <div
        className={`mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br transition-all duration-500 group-hover:scale-110 group-hover:shadow-sm ${styles.icon}`}
      >
        <Icon size={18} />
      </div>
      <p
        className={`text-2xl font-extrabold tabular-nums transition-transform duration-500 group-hover:scale-[1.02] sm:text-3xl ${styles.value}`}
      >
        {value}
      </p>
      <p className="mt-2 text-sm font-medium text-fk-navy/55">{label}</p>
    </Card>
  );
}

const ICON_CARD_ACCENTS = {
  default: {
    card: "border-fk-primary/10 hover:border-fk-primary/25",
    icon: "border-fk-primary/15 bg-fk-white group-hover:border-fk-primary/30",
  },
  amber: {
    card: "border-amber-200/80 bg-gradient-to-br from-amber-50/90 to-fk-white hover:border-amber-300",
    icon: "border-amber-200 bg-amber-50 group-hover:border-amber-300",
  },
  blue: {
    card: "border-blue-200/80 bg-gradient-to-br from-blue-50/90 to-fk-white hover:border-blue-300",
    icon: "border-blue-200 bg-blue-50 group-hover:border-blue-300",
  },
  emerald: {
    card: "border-emerald-200/80 bg-gradient-to-br from-emerald-50/90 to-fk-white hover:border-emerald-300",
    icon: "border-emerald-200 bg-emerald-50 group-hover:border-emerald-300",
  },
  violet: {
    card: "border-violet-200/80 bg-gradient-to-br from-violet-50/90 to-fk-white hover:border-violet-300",
    icon: "border-violet-200 bg-violet-50 group-hover:border-violet-300",
  },
  rose: {
    card: "border-rose-200/80 bg-gradient-to-br from-rose-50/90 to-fk-white hover:border-rose-300",
    icon: "border-rose-200 bg-rose-50 group-hover:border-rose-300",
  },
  orange: {
    card: "border-orange-200/80 bg-gradient-to-br from-orange-50/90 to-fk-white hover:border-orange-300",
    icon: "border-orange-200 bg-orange-50 group-hover:border-orange-300",
  },
  indigo: {
    card: "border-indigo-200/80 bg-gradient-to-br from-indigo-50/90 to-fk-white hover:border-indigo-300",
    icon: "border-indigo-200 bg-indigo-50 group-hover:border-indigo-300",
  },
} as const;

export function IconCard({
  icon: Icon,
  title,
  description,
  emoji,
  accent = "default",
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  emoji?: string;
  accent?: keyof typeof ICON_CARD_ACCENTS;
}) {
  const styles = ICON_CARD_ACCENTS[accent];

  return (
    <Card
      hover
      className={`group h-full text-center transition-all duration-500 hover:-translate-y-0.5 hover:shadow-md ${styles.card}`}
    >
      <div
        className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border-2 text-2xl shadow-sm transition-transform duration-500 group-hover:scale-110 ${styles.icon}`}
      >
        {emoji ?? <Icon size={22} className="text-fk-primary" />}
      </div>
      <h3 className="font-bold text-fk-navy">{title}</h3>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-fk-navy/60">
          {description}
        </p>
      )}
    </Card>
  );
}

export function ProductPreview({
  title,
  metric,
  accent,
  progress = 75,
}: {
  title: string;
  metric: string;
  accent: string;
  progress?: number;
}) {
  return (
    <Card hover className="overflow-hidden border-fk-primary/10 p-0 transition-all duration-500">
      <div className={`h-2 bg-gradient-to-r ${accent} animate-gradient`} />
      <div className="p-4">
        <div className="mb-3 flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-fk-navy/45">
          {title}
        </p>
        <p className="mt-2 text-lg font-extrabold text-fk-navy">{metric}</p>
        <div className="mt-3">
          <ProgressBar progress={progress} animated />
        </div>
      </div>
    </Card>
  );
}

export function DeckTimeline({
  steps,
}: {
  steps: string[];
}) {
  return (
    <div className="relative">
      <div
        className="animate-deck-line-grow absolute bottom-4 left-6 top-4 w-0.5 rounded-full bg-gradient-to-b from-fk-secondary via-fk-primary to-amber-500 sm:left-8"
        aria-hidden
      />
      {steps.map((step, i) => (
        <div
          key={step}
          className="animate-fade-in-up relative flex gap-5 pb-8 last:pb-0"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-fk-primary bg-fk-white text-sm font-extrabold text-fk-primary shadow-md transition-transform duration-300 hover:scale-110">
            {i + 1}
          </div>
          <div className="card-hover flex flex-1 items-center rounded-xl border border-fk-primary/10 bg-fk-white px-5 py-4 font-semibold text-fk-navy">
            {step}
            {i === steps.length - 1 && (
              <span className="ml-auto text-lg">🏆</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DeckSectionShell({
  children,
  variant = "light",
  className = "",
  id,
}: {
  children: ReactNode;
  variant?: "light" | "white" | "muted";
  className?: string;
  id?: string;
}) {
  const bg = {
    light: "bg-fk-light",
    white: "bg-fk-white border-t border-fk-primary/10",
    muted: "bg-gradient-to-b from-fk-white to-fk-primary-muted/30",
  }[variant];

  return (
    <section
      id={id}
      className={`relative px-4 py-24 sm:px-6 lg:px-8 ${bg} ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fk-primary/15 to-transparent" />
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}
