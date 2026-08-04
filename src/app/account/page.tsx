import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { findUserById } from "@/lib/auth/users";
import { getNotificationPreferences } from "@/lib/notificationPreferencesStore";
import { getStripeConnectionStatusAction } from "@/app/actions/stripe";
import { PrivacyCenter } from "@/components/account/PrivacyCenter";

export const metadata: Metadata = {
  title: "Privacycentrum",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/inloggen?next=/account");

  const user = await findUserById(session.user.id);
  const notificationPreferences = await getNotificationPreferences(session.user.id);
  const stripeStatus = await getStripeConnectionStatusAction();
  const safeUser = user ?? {
    email: session.user.email ?? "",
    firstName: session.user.firstName ?? "",
    lastName: session.user.lastName ?? "",
    emailVerifiedAt: session.user.emailVerifiedAt ?? null,
    marketingConsent: false,
    createdAt: new Date().toISOString(),
    termsAcceptedAt: new Date().toISOString(),
    phone: "",
    street: "",
    houseNumber: "",
    postalCode: "",
    city: "",
    country: "Nederland",
    iban: "",
    ibanAccountName: "",
    stripeAccountId: "",
    stripeOnboardingComplete: false,
    stripeChargesEnabled: false,
    stripePayoutsEnabled: false,
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-extrabold text-fk-navy">Privacycentrum</h1>
        <p className="mt-2 text-sm text-fk-navy/65">
          Beheer je gegevens, voorkeuren en account.
        </p>
        <PrivacyCenter
          user={{
            email: safeUser.email,
            firstName: safeUser.firstName,
            lastName: safeUser.lastName,
            emailVerifiedAt: safeUser.emailVerifiedAt,
            marketingConsent: safeUser.marketingConsent,
            createdAt: safeUser.createdAt,
            termsAcceptedAt: safeUser.termsAcceptedAt,
            phone: safeUser.phone ?? "",
            street: safeUser.street ?? "",
            houseNumber: safeUser.houseNumber ?? "",
            postalCode: safeUser.postalCode ?? "",
            city: safeUser.city ?? "",
            country: safeUser.country ?? "Nederland",
            iban: safeUser.iban ?? "",
            ibanAccountName: safeUser.ibanAccountName ?? "",
            stripeAccountId: safeUser.stripeAccountId ?? "",
            stripeOnboardingComplete: safeUser.stripeOnboardingComplete ?? false,
            stripeChargesEnabled: safeUser.stripeChargesEnabled ?? false,
            stripePayoutsEnabled: safeUser.stripePayoutsEnabled ?? false,
          }}
          notificationPreferences={notificationPreferences}
          stripeStatus={stripeStatus}
        />
      </div>
    </div>
  );
}
