import type { Metadata } from "next";
import { IntroductionReview } from "@/components/recruitment/IntroductionReview";
import { PortalIntroProvider } from "@/lib/recruitment/PortalIntroContext";

export const metadata: Metadata = {
  title: "Introductie beoordelen",
  robots: { index: false, follow: false },
};

export default async function IntroductionReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PortalIntroProvider>
      <IntroductionReview id={id} />
    </PortalIntroProvider>
  );
}
