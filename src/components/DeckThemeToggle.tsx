"use client";

import { Palette, X } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useDeckTheme } from "@/context/DeckThemeContext";

function isLocalHost() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

export function DeckThemeToggle() {
  const pathname = usePathname();
  const { enabled, toggle } = useDeckTheme();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(isLocalHost());
  }, []);

  if (!show || pathname === "/" || pathname === "/coming-soon") return null;

  return (
    <button
      type="button"
      onClick={toggle}
      className={`fixed bottom-5 right-5 z-[100] flex items-center gap-2 rounded-full border px-4 py-2.5 text-xs font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:text-sm ${
        enabled
          ? "border-fk-primary/30 bg-gradient-to-r from-fk-primary to-fk-secondary text-fk-white"
          : "border-fk-primary/15 bg-fk-white text-fk-navy"
      }`}
      title="Schakel founders-deck stijl aan/uit (alleen lokaal)"
    >
      {enabled ? <X size={14} /> : <Palette size={14} />}
      <span>Deck stijl: {enabled ? "aan" : "uit"}</span>
    </button>
  );
}
