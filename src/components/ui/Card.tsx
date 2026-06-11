"use client";

import type { ReactNode } from "react";
import { useDeckTheme } from "@/context/DeckThemeContext";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "glass" | "highlight";
  hover?: boolean;
}

export function Card({
  children,
  className = "",
  variant = "default",
  hover = false,
}: CardProps) {
  const { enabled: deckTheme } = useDeckTheme();

  const variants = {
    default: deckTheme
      ? "fk-deck-card bg-gradient-to-br from-fk-white via-fk-white to-fk-primary-muted/40 border border-fk-primary/12 shadow-sm"
      : "bg-fk-white border border-fk-primary/10 shadow-sm",
    glass: deckTheme
      ? "fk-deck-card bg-fk-primary/8 border border-fk-primary/20 backdrop-blur-md"
      : "bg-fk-primary/10 border border-fk-primary/20 backdrop-blur-sm",
    highlight:
      "bg-gradient-to-br from-fk-primary via-fk-primary to-fk-secondary text-fk-white shadow-lg animate-gradient",
  };

  return (
    <div
      className={`rounded-2xl p-6 ${variants[variant]} ${hover || deckTheme ? "card-hover" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
