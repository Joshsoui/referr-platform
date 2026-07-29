"use client";

import { SessionProvider } from "next-auth/react";
import { NotificationToast } from "@/components/animations/NotificationToast";
import { AppShell } from "@/components/AppShell";
import { DeckThemeAmbient } from "@/components/DeckThemeAmbient";
import { DeckThemeToggle } from "@/components/DeckThemeToggle";
import { DeckThemeProvider } from "@/context/DeckThemeContext";
import { ScoutProvider } from "@/context/ScoutContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <DeckThemeProvider>
        <ScoutProvider>
          <DeckThemeAmbient />
          <AppShell>{children}</AppShell>
          <NotificationToast />
          <DeckThemeToggle />
        </ScoutProvider>
      </DeckThemeProvider>
    </SessionProvider>
  );
}
