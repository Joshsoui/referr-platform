import type { Metadata } from "next";
import Link from "next/link";
import { VacancyDetailClient } from "@/components/challenges/VacancyDetailClient";
import { INITIAL_VACANCIES } from "@/lib/mockVacancies";
import { getDifficultyRewards } from "@/lib/vacancyRewards";
import { formatCurrency } from "@/lib/xp";

function getVacancy(id: string) {
  return INITIAL_VACANCIES.find((item) => item.id === id);
}

export async function generateMetadata(
  props: {
    params: Promise<{ id: string }>;
  }
): Promise<Metadata> {
  const { id } = await props.params;
  const vacancy = getVacancy(id);
  if (!vacancy) {
    return {
      title: "Challenge niet gevonden",
      robots: { index: false, follow: false },
    };
  }

  const reward = formatCurrency(getDifficultyRewards(vacancy.difficulty).total);
  const title = `${vacancy.title} in ${vacancy.location} · Challenge`;
  const description = `Ken jij iemand voor ${vacancy.title} in ${vacancy.location}? Tip diegene via Referr. Reward tot ${reward}.`;
  const canonicalPath = `/vacatures/${vacancy.id}`;

  return {
    title,
    description,
    alternates: { canonical: canonicalPath },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonicalPath,
      images: [{ url: "/brand/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/brand/og.png"],
    },
  };
}

export default async function VacatureDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const vacancy = getVacancy(id);

  if (!vacancy) {
    return (
      <div className="px-4 py-16 text-center">
        <p className="text-lg font-semibold text-fk-navy">Challenge niet gevonden.</p>
        <Link href="/vacatures" className="mt-4 inline-block text-fk-primary">
          Terug naar challenges
        </Link>
      </div>
    );
  }

  return <VacancyDetailClient vacancy={vacancy} />;
}
