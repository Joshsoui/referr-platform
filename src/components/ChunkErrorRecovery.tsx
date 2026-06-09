"use client";

import { useEffect } from "react";

const CHUNK_ERROR_PATTERNS = [
  "reading 'call'",
  "ChunkLoadError",
  "Loading chunk",
  "Failed to fetch dynamically imported module",
];

function isChunkError(message: string): boolean {
  return CHUNK_ERROR_PATTERNS.some((pattern) => message.includes(pattern));
}

/**
 * Auto-reloads once when webpack serves stale/missing chunks —
 * common after dev-server restarts or EMFILE watcher issues.
 */
export function ChunkErrorRecovery() {
  useEffect(() => {
    const storageKey = "fk-chunk-reload";

    function tryReload(reason: string) {
      if (sessionStorage.getItem(storageKey)) return;
      sessionStorage.setItem(storageKey, "1");
      console.warn("[Scout Engine] Stale chunk detected, reloading:", reason);
      window.location.reload();
    }

    function onError(event: ErrorEvent) {
      if (event.message && isChunkError(event.message)) {
        tryReload(event.message);
      }
    }

    function onUnhandledRejection(event: PromiseRejectionEvent) {
      const message =
        event.reason instanceof Error
          ? event.reason.message
          : String(event.reason ?? "");
      if (isChunkError(message)) {
        event.preventDefault();
        tryReload(message);
      }
    }

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onUnhandledRejection);

    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onUnhandledRejection);
    };
  }, []);

  return null;
}
