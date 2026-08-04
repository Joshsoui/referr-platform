"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { PublicHeader } from "@/components/landing/PublicHeader";
import { PublicFooter } from "@/components/landing/PublicFooter";
import { Header } from "@/components/Header";

function isAuthOrLegalPath(pathname: string): boolean {
  return (
    pathname.startsWith("/inloggen") ||
    pathname.startsWith("/account-aanmaken") ||
    pathname.startsWith("/wachtwoord") ||
    pathname.startsWith("/email-bevestigen") ||
    pathname.startsWith("/privacy") ||
    pathname.startsWith("/cookies") ||
    pathname.startsWith("/voorwaarden") ||
    pathname.startsWith("/beveiliging") ||
    pathname.startsWith("/toegankelijkheid")
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  if (pathname === "/founders-deck" || pathname === "/coming-soon") {
    return <>{children}</>;
  }

  // Landing: no chrome — full-bleed page
  if (pathname === "/") {
    return <main className="relative z-[1] min-h-screen">{children}</main>;
  }

  const publicMarketing =
    isAuthOrLegalPath(pathname) ||
    (!session &&
      (pathname.startsWith("/vacatures") ||
        pathname.startsWith("/why-finder") ||
        pathname.startsWith("/ref/")));

  if (publicMarketing && !session) {
    return (
      <>
        <PublicHeader />
        <main className="relative z-[1] min-h-screen pt-14">{children}</main>
        <PublicFooter />
      </>
    );
  }

  if (isAuthOrLegalPath(pathname)) {
    return (
      <>
        {session ? <Header /> : <PublicHeader />}
        <main
          className={`relative z-[1] min-h-screen ${session ? "" : "pt-14"}`}
        >
          {children}
        </main>
        <PublicFooter />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="relative z-[1] min-h-[calc(100vh-4rem)]">{children}</main>
    </>
  );
}
