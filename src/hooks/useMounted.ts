"use client";

import { useEffect, useState } from "react";

/** Returns true only after the client has mounted — use to gate animations / browser-only UI. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
