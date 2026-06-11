"use client";

import { XpToast } from "@/components/animations/XpToast";
import { DeckThemeAmbient } from "@/components/DeckThemeAmbient";
import { DeckThemeToggle } from "@/components/DeckThemeToggle";
import { DeckThemeProvider } from "@/context/DeckThemeContext";
import { ScoutProvider } from "@/context/ScoutContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <DeckThemeProvider>
      <ScoutProvider>
        <DeckThemeAmbient />
        {children}
        <XpToast />
        <DeckThemeToggle />
      </ScoutProvider>
    </DeckThemeProvider>
  );
}
