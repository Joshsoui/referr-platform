"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "fk-deck-theme-preview";

interface DeckThemeContextValue {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (value: boolean) => void;
}

const DeckThemeContext = createContext<DeckThemeContextValue | null>(null);

function readInitialEnabled(): boolean {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);
  if (params.get("deck") === "1") return true;

  return window.localStorage.getItem(STORAGE_KEY) === "true";
}

export function DeckThemeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setEnabledState(readInitialEnabled());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;

    document.documentElement.classList.toggle("fk-deck-theme", enabled);
    window.localStorage.setItem(STORAGE_KEY, enabled ? "true" : "false");
  }, [enabled, ready]);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
  }, []);

  const toggle = useCallback(() => {
    setEnabledState((current) => !current);
  }, []);

  return (
    <DeckThemeContext.Provider value={{ enabled, toggle, setEnabled }}>
      {children}
    </DeckThemeContext.Provider>
  );
}

export function useDeckTheme() {
  const context = useContext(DeckThemeContext);
  if (!context) {
    throw new Error("useDeckTheme must be used within DeckThemeProvider");
  }
  return context;
}
