"use client";

import { useSession } from "next-auth/react";
import { getGreeting, PORTAL_USER } from "@/lib/recruitment/portalMockData";

export function GreetingCard() {
  const { data: session } = useSession();
  const firstName = session?.user?.firstName || PORTAL_USER.firstName;
  const greeting = getGreeting();

  return (
    <div className="border-b border-fk-navy/[0.06] pb-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-fk-navy/40">
        Welkom terug
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-fk-navy sm:text-3xl">
        {greeting}, {firstName}
      </h2>
      <p className="mt-2 max-w-xl text-sm text-fk-navy/50">
        Vandaag wachten er een aantal acties op je.
      </p>
    </div>
  );
}
