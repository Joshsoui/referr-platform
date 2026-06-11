import type { ReactNode } from "react";
import { GradientText } from "@/components/ui/GradientText";

interface PageHeroProps {
  overline?: string;
  title: string;
  accent?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
  heading?: "h1" | "h2";
}

export function PageHero({
  overline,
  title,
  accent,
  subtitle,
  children,
  className = "",
  heading = "h1",
}: PageHeroProps) {
  const Heading = heading;

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-fk-navy via-fk-primary to-fk-secondary text-fk-white shadow-[0_20px_50px_-12px_rgba(0,43,69,0.35)] ${className}`}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-fk-white/[0.07] blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-56 w-56 rounded-full bg-fk-secondary/25 blur-3xl"
        aria-hidden
      />

      <div className="relative px-6 py-14 text-center sm:px-10 sm:py-16">
        {overline && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-fk-white/65 sm:text-sm">
            {overline}
          </p>
        )}
        <Heading className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          {title}
        </Heading>
        {accent && (
          <GradientText
            variant="flame-light"
            as="p"
            className="mt-3 text-2xl font-extrabold sm:text-3xl"
          >
            {accent}
          </GradientText>
        )}
        {subtitle && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-fk-white/90 sm:text-lg">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
