export interface ReferralStats {
  clicks: number;
  candidatesViaLink: number;
  conversionRate: number;
  xpViaReferralLink: number;
}

export interface ReferralProfile {
  name: string;
  slug: string;
  referralUrl: string;
  stats: ReferralStats;
}

export const REFERRAL_BASE_URL = "https://fk-scout-engine.onrender.com";

export const CURRENT_SCOUT_REFERRAL: ReferralProfile = {
  name: "Joshua Souisay",
  slug: "joshua-souisay",
  referralUrl: `${REFERRAL_BASE_URL}/ref/joshua-souisay`,
  stats: {
    clicks: 128,
    candidatesViaLink: 14,
    conversionRate: 10.9,
    xpViaReferralLink: 820,
  },
};

export const REFERRAL_SCOUTS: Record<string, { name: string; slug: string }> = {
  "joshua-souisay": {
    name: "Joshua Souisay",
    slug: "joshua-souisay",
  },
};
