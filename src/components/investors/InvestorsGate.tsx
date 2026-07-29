"use client";

import type { ReactNode } from "react";

/**
 * Access gate for /investors — currently open.
 *
 * Future gating options (swap `checkAccess` implementation):
 * - Password protection via session cookie
 * - Personal invite links with signed tokens
 * - NextAuth role check (e.g. session?.user?.role === "investor")
 * - Disclaimer acceptance stored in localStorage / cookie
 * - Version pinning (redirect if deck version mismatch)
 */
export interface InvestorsGateConfig {
  /** When true, show optional disclaimer modal before content */
  requireDisclaimer?: boolean;
  /** Deck version for cache-busting / access control */
  deckVersion?: string;
  /** Override access check — return false to block */
  checkAccess?: () => boolean | Promise<boolean>;
}

const defaultConfig: InvestorsGateConfig = {
  requireDisclaimer: false,
  deckVersion: "1.0",
};

export function InvestorsGate({
  children,
  config = defaultConfig,
}: {
  children: ReactNode;
  config?: InvestorsGateConfig;
}) {
  // Placeholder: always allow. Replace with async gate UI when auth is ready.
  void config;

  return <>{children}</>;
}
