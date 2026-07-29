import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { findUserById } from "@/lib/auth/users";
import { PrivacyCenter } from "@/components/account/PrivacyCenter";

export const metadata: Metadata = {
  title: "Privacycentrum",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/inloggen?next=/account");

  const user = await findUserById(session.user.id);
  if (!user) redirect("/inloggen");

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-extrabold text-fk-navy">Privacycentrum</h1>
        <p className="mt-2 text-sm text-fk-navy/65">
          Beheer je gegevens, voorkeuren en account.
        </p>
        <PrivacyCenter
          user={{
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            emailVerifiedAt: user.emailVerifiedAt,
            marketingConsent: user.marketingConsent,
            createdAt: user.createdAt,
            termsAcceptedAt: user.termsAcceptedAt,
          }}
        />
      </div>
    </div>
  );
}
