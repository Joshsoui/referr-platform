"use client";

import { ReferrChallengeAd } from "@/components/media/ReferrChallengeAd";

export function MediaHero() {
  return (
    <section className="media-hero px-4 pb-10 pt-28 sm:px-6 sm:pb-14 sm:pt-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-fk-primary">
          Media
        </p>
        <h1 className="mt-4 text-balance text-4xl font-bold tracking-[-0.04em] text-fk-navy sm:text-6xl">
          Recruitment is a{" "}
          <span className="brand-wordmark">challenge.</span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base font-medium text-fk-navy/45 sm:text-lg">
          Explore the Referr story, product, campaigns and creative work.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-md sm:mt-16">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 px-1">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-fk-primary">
              Featured campaign
            </p>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-fk-navy sm:text-2xl">
              The Referr Challenge
            </h2>
          </div>
          <p className="text-[11px] font-medium text-fk-navy/35">
            Meta Ad · 15 sec
          </p>
        </div>

        <ReferrChallengeAd />
      </div>
    </section>
  );
}
