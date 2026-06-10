"use client";

import {
  Check,
  Copy,
  ExternalLink,
  Link2,
  Linkedin,
  MessageCircle,
  MousePointerClick,
  Percent,
  UserPlus,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { QrCodePlaceholder } from "@/components/QrCodePlaceholder";
import { Card } from "@/components/ui/Card";
import type { ReferralProfile } from "@/lib/mockReferrals";
import { getReferralLink, getReferralPath } from "@/lib/referrals";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";

interface ReferralLinkCardProps {
  profile: ReferralProfile;
}

export function ReferralLinkCard({ profile }: ReferralLinkCardProps) {
  const [referralLink, setReferralLink] = useState(profile.referralUrl);
  const [copied, setCopied] = useState(false);

  const animatedClicks = useAnimatedNumber(profile.stats.clicks);
  const animatedCandidates = useAnimatedNumber(profile.stats.candidatesViaLink);
  const animatedXp = useAnimatedNumber(profile.stats.xpViaReferralLink);

  useEffect(() => {
    setReferralLink(getReferralLink(profile.slug));
  }, [profile.slug]);

  const shareText =
    "Ken jij talent? Tip talent via mijn Finderz Link en help verborgen talent zichtbaar maken. ";

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const statItems = [
    {
      icon: MousePointerClick,
      label: "Kliks",
      value: animatedClicks.toLocaleString("nl-NL"),
    },
    {
      icon: UserPlus,
      label: "Talenten getipt",
      value: animatedCandidates.toString(),
    },
    {
      icon: Percent,
      label: "Conversie",
      value: `${profile.stats.conversionRate.toLocaleString("nl-NL")}%`,
    },
    {
      icon: Zap,
      label: "XP via Finderz Link",
      value: animatedXp.toLocaleString("nl-NL"),
    },
  ];

  return (
    <div id="finderz-link">
    <Card
      className="mb-8 overflow-hidden border-2 border-fk-primary/25 p-0 shadow-md ring-4 ring-fk-primary/5"
      hover
    >
      <div className="bg-gradient-to-r from-fk-primary via-fk-primary to-fk-secondary px-6 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fk-white/15 text-fk-white backdrop-blur-sm">
            <Link2 size={22} />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-fk-white sm:text-2xl">
              Jouw Finderz Link
            </h2>
            <p className="text-sm text-fk-white/80">
              Deel je netwerk · Verdien XP · Stijg in de Finderz League
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_auto]">
        <div className="p-6 sm:p-8">
          <p className="mb-5 text-sm leading-relaxed text-fk-navy/70">
            Deel je link met je netwerk. Iedere kandidaat die via jouw link
            wordt aangedragen, telt mee voor jouw XP, ranking en beloningen.
          </p>

          <label
            htmlFor="referral-url"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-fk-secondary"
          >
            Jouw Finderz Link
          </label>
          <div className="mb-5 overflow-hidden rounded-xl border-2 border-fk-primary/25 bg-fk-white shadow-inner">
            <div className="flex items-start gap-2 px-4 py-3.5">
              <Link2 size={18} className="mt-0.5 shrink-0 text-fk-primary" />
              <input
                id="referral-url"
                readOnly
                value={referralLink}
                onFocus={(e) => e.target.select()}
                className="min-w-0 flex-1 break-all bg-transparent text-sm font-semibold text-fk-primary outline-none sm:text-base"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="btn-press inline-flex items-center gap-2 rounded-xl bg-fk-primary px-4 py-2.5 text-sm font-semibold text-fk-white shadow-sm"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? "Gekopieerd!" : "Kopieer link"}
            </button>
            <Link
              href={getReferralPath(profile.slug)}
              target="_blank"
              className="btn-press inline-flex items-center gap-2 rounded-xl border border-fk-primary/20 bg-fk-white px-4 py-2.5 text-sm font-semibold text-fk-navy shadow-sm hover:bg-fk-light"
            >
              <ExternalLink size={16} className="text-fk-primary" />
              Open link
            </Link>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareText + referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 rounded-xl border border-fk-primary/20 bg-fk-white px-4 py-2.5 text-sm font-semibold text-fk-navy shadow-sm hover:bg-fk-light"
            >
              <MessageCircle size={16} className="text-emerald-600" />
              Deel via WhatsApp
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press inline-flex items-center gap-2 rounded-xl border border-fk-primary/20 bg-fk-white px-4 py-2.5 text-sm font-semibold text-fk-navy shadow-sm hover:bg-fk-light"
            >
              <Linkedin size={16} className="text-fk-primary" />
              Deel op LinkedIn
            </a>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {statItems.map((item, i) => (
              <div
                key={item.label}
                className="animate-fade-in-up rounded-xl border border-fk-primary/10 bg-fk-primary/5 px-4 py-3"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <item.icon size={16} className="mb-2 text-fk-secondary" />
                <p className="text-xl font-extrabold tabular-nums text-fk-navy">
                  {item.value}
                </p>
                <p className="mt-0.5 text-xs text-fk-navy/55">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center border-t border-fk-primary/10 bg-gradient-to-br from-fk-light to-fk-white px-6 py-8 lg:border-l lg:border-t-0">
          <p className="mb-4 text-center text-sm font-bold text-fk-navy">
            Jouw Finderz QR
          </p>
          <QrCodePlaceholder label="FK" />
          <p className="mt-4 max-w-[200px] text-center text-xs leading-relaxed text-fk-navy/55">
            Gebruik deze QR-code op flyers, events of bij sportclubs.
          </p>
        </div>
      </div>
    </Card>
    </div>
  );
}
