"use client";

import { XpToast } from "@/components/animations/XpToast";
import { ScoutProvider } from "@/context/ScoutContext";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ScoutProvider>
      {children}
      <XpToast />
    </ScoutProvider>
  );
}
