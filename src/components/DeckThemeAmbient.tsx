"use client";

import { FloatingOrbs } from "@/components/animations/FloatingOrbs";
import { useDeckTheme } from "@/context/DeckThemeContext";

export function DeckThemeAmbient() {
  const { enabled } = useDeckTheme();

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      <FloatingOrbs />
      <div className="absolute -left-32 top-24 h-96 w-96 rounded-full bg-gradient-to-br from-fk-primary/10 to-blue-400/5 blur-3xl" />
      <div className="absolute -right-24 top-1/3 h-80 w-80 rounded-full bg-gradient-to-bl from-amber-400/10 to-orange-300/5 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-gradient-to-tr from-violet-400/8 to-fk-secondary/10 blur-3xl" />
    </div>
  );
}
