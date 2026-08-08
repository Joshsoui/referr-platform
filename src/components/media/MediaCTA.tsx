import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function MediaCTA() {
  return (
    <section className="relative overflow-hidden bg-fk-navy px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
      <div className="landing-dark-glow landing-dark-glow--cta" aria-hidden />
      <div className="relative mx-auto max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">
          Ready for the next challenge?
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-[-0.04em] text-fk-white sm:text-5xl">
          Discover Referr.
        </h2>
        <div className="mt-8">
          <Link href="/vacatures" className="landing-btn-on-dark group inline-flex">
            Explore Referr
            <ArrowRight
              size={16}
              className="ml-1 transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
