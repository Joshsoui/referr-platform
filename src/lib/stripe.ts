import Stripe from "stripe";

/**
 * Stripe Connect is parked for the pilot: rewards are paid out manually via IBAN.
 * Set STRIPE_PAYOUTS_ENABLED=true (and STRIPE_SECRET_KEY) only when re-enabling.
 */
export function isStripePayoutsEnabled(): boolean {
  return process.env.STRIPE_PAYOUTS_ENABLED === "true";
}

export function getStripeClient(): Stripe | null {
  if (!isStripePayoutsEnabled()) return null;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key);
}

export function getStripeBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || process.env.AUTH_URL || "http://localhost:3000";
}

