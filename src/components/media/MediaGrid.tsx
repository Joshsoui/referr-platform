"use client";

import Link from "next/link";
import { Play } from "lucide-react";

export type MediaItem = {
  id: string;
  type: string;
  title: string;
  description: string;
  duration?: string;
  href?: string;
  featured?: boolean;
  tone: "coral" | "navy" | "warm" | "soft";
};

const DEFAULT_ITEMS: MediaItem[] = [
  {
    id: "challenge-ad",
    type: "Campaigns",
    title: "Referr Challenge Ad",
    description: "The core challenge loop — built for Meta.",
    duration: "15 sec",
    href: "/media#featured",
    featured: true,
    tone: "coral",
  },
  {
    id: "how-it-works",
    type: "Product",
    title: "How Referr Works",
    description: "Spot. Share. Match. Reward — in one glance.",
    duration: "20 sec",
    href: "/#hoe-het-werkt",
    tone: "navy",
  },
  {
    id: "brand-story",
    type: "Brand",
    title: "Referr Brand Story",
    description: "Brand film / animation — coming soon.",
    duration: "—",
    tone: "warm",
  },
  {
    id: "inside-referr",
    type: "Product",
    title: "Inside Referr",
    description: "Product UI preview of the challenge experience.",
    duration: "—",
    href: "/vision",
    tone: "soft",
  },
  {
    id: "social",
    type: "Social",
    title: "Referr Social Campaign",
    description: "Social creative for candidates and referrers.",
    duration: "—",
    tone: "coral",
  },
];

export function MediaCard({ item }: { item: MediaItem }) {
  const inner = (
    <>
      <div className={`media-card-thumb media-card-thumb--${item.tone}`}>
        <span className="media-card-play" aria-hidden>
          <Play size={16} fill="currentColor" />
        </span>
        {item.duration && item.duration !== "—" && (
          <span className="media-card-duration">{item.duration}</span>
        )}
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-fk-primary">
          {item.type}
        </p>
        <h3 className="mt-1.5 text-[1.05rem] font-bold tracking-tight text-fk-navy">
          {item.title}
        </h3>
        <p className="mt-1.5 text-sm font-medium leading-relaxed text-fk-navy/45">
          {item.description}
        </p>
      </div>
    </>
  );

  if (item.href) {
    return (
      <Link href={item.href} className="media-card group">
        {inner}
      </Link>
    );
  }

  return <div className="media-card media-card--static">{inner}</div>;
}

export function MediaGrid({ items = DEFAULT_ITEMS }: { items?: MediaItem[] }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-fk-primary">
          Referr media
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-[-0.03em] text-fk-navy sm:text-4xl">
          Story, product & campaigns
        </h2>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
