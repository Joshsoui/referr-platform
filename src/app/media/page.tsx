import type { Metadata } from "next";
import { PublicHeader } from "@/components/landing/PublicHeader";
import { PublicFooter } from "@/components/landing/PublicFooter";
import { MediaHero } from "@/components/media/MediaHero";
import { MediaGrid } from "@/components/media/MediaGrid";
import { AboutReferr } from "@/components/media/AboutReferr";
import { MediaCTA } from "@/components/media/MediaCTA";

export const metadata: Metadata = {
  title: "Media – referr",
  description:
    "Explore the Referr story, product, campaigns and creative work. Recruitment is a challenge.",
  alternates: { canonical: "https://www.referr.nl/media" },
};

export default function MediaPage() {
  return (
    <div className="landing-surface min-h-screen overflow-x-hidden">
      <PublicHeader />
      <main id="featured">
        <MediaHero />
        <MediaGrid />
        <AboutReferr />
        <MediaCTA />
      </main>
      <PublicFooter />
    </div>
  );
}
