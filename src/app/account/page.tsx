import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { findUserById } from "@/lib/auth/users";
import { isStaffRole } from "@/lib/auth/roles";
import { getNotificationPreferences } from "@/lib/notificationPreferencesStore";
import { PrivacyCenter } from "@/components/account/PrivacyCenter";
import { StaffProfileCenter } from "@/components/account/StaffProfileCenter";

export const metadata: Metadata = {
  title: "Profiel",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/inloggen?next=/account");

  const isStaff = isStaffRole(session.user.role);

  let user = null;
  try {
    user = await findUserById(session.user.id);
  } catch (error) {
    console.error("[account] findUserById failed", error);
  }

  let notificationPreferences;
  try {
    notificationPreferences = await getNotificationPreferences(session.user.id);
  } catch (error) {
    console.error("[account] getNotificationPreferences failed", error);
    notificationPreferences = {
      nearbyChallengesEnabled: true,
      referralUpdatesEnabled: true,
      rewardUpdatesEnabled: true,
      closingSoonEnabled: true,
      emailEnabled: true,
      pushEnabled: false,
      radiusKm: 25 as const,
      city: "",
      postalCode: "",
      locationConsent: false,
    };
  }

  const safeUser = user ?? {
    email: session.user.email ?? "",
    firstName: session.user.firstName ?? "",
    lastName: session.user.lastName ?? "",
    role: session.user.role ?? "user",
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
    companyName: "",
    jobTitle: "",
    companyCity: "",
    companyKvK: "",
  };

  if (isStaff) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="text-2xl font-extrabold text-fk-navy">Beheerderprofiel</h1>
          <p className="mt-2 text-sm text-fk-navy/65">
            Bedrijfsgegevens en jouw rol binnen de organisatie.
          </p>
          <StaffProfileCenter
            user={{
              email: safeUser.email,
              firstName: safeUser.firstName,
              lastName: safeUser.lastName,
              role: (user?.role ?? session.user.role) as string,
              emailVerifiedAt: safeUser.emailVerifiedAt,
              phone: safeUser.phone ?? "",
              companyName: safeUser.companyName ?? "",
              jobTitle: safeUser.jobTitle ?? "",
              companyCity: safeUser.companyCity ?? "",
              companyKvK: safeUser.companyKvK ?? "",
            }}
          />
        </div>
      </div>
    );
  }

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
          }}
          notificationPreferences={notificationPreferences}
        />
      </div>
    </div>
  );
}
