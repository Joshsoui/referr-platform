import { REFERRAL_BASE_URL, REFERRAL_SCOUTS } from "@/lib/mockReferrals";

export function getScoutBySlug(slug: string) {
  return REFERRAL_SCOUTS[slug] ?? null;
}

export function getReferralPath(slug: string) {
  return `/ref/${slug}`;
}

export function getReferralLink(slug: string, origin?: string) {
  const base =
    origin ??
    (typeof window !== "undefined"
      ? window.location.origin
      : REFERRAL_BASE_URL);
  return `${base}${getReferralPath(slug)}`;
}
