"use client";

import { Briefcase } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { AdminSubNav } from "@/components/admin/AdminSubNav";
import { VacancyManager } from "@/components/admin/VacancyManager";

export default function AdminChallengesPage() {
  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,_rgba(255,77,89,0.08),_transparent_60%)]"
      />
      <div className="relative mx-auto max-w-[1400px]">
        <FadeIn>
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-fk-navy text-fk-white shadow-md">
              <Briefcase size={22} />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-[-0.03em] text-fk-navy">
                Challenges
              </h1>
              <p className="text-fk-navy/60">
                Maak en beheer challenges voor referrers
              </p>
            </div>
          </div>
        </FadeIn>

        <AdminSubNav />

        <FadeIn delay={80}>
          <VacancyManager />
        </FadeIn>
      </div>
    </div>
  );
}
