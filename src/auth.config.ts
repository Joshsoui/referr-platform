import type { NextAuthConfig } from "next-auth";

function isStaffRole(role: string | undefined | null): boolean {
  return role === "admin" || role === "recruiter";
}

function isComingSoonHost(hostHeader: string | null): boolean {
  const host = (hostHeader ?? "").split(":")[0].toLowerCase();
  const fromEnv = process.env.COMING_SOON_HOSTS?.split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  const hosts = fromEnv?.length ? fromEnv : ["referr.nl", "www.referr.nl"];
  return hosts.includes(host);
}

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: "/inloggen",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 7,
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      // Marketing domain always serves coming-soon — skip app auth gates
      if (isComingSoonHost(request.headers.get("host"))) {
        return true;
      }

      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      const isStaff = isStaffRole(auth?.user?.role);

      const isAuthPage =
        pathname.startsWith("/inloggen") ||
        pathname.startsWith("/account-aanmaken") ||
        pathname.startsWith("/wachtwoord-vergeten") ||
        pathname.startsWith("/wachtwoord-herstellen") ||
        pathname.startsWith("/email-bevestigen");

      const isReferrerApp =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/aandragen") ||
        pathname.startsWith("/levels") ||
        pathname.startsWith("/challenges") ||
        pathname.startsWith("/rewards") ||
        pathname.startsWith("/leaderboard") ||
        pathname.startsWith("/hall-of-fame");

      const isPrivate =
        isReferrerApp ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/recruitment") ||
        pathname === "/account" ||
        pathname.startsWith("/account/");

      if (isAuthPage && isLoggedIn) {
        const home = isStaff ? "/recruitment" : "/dashboard";
        return Response.redirect(new URL(home, request.nextUrl));
      }

      if (isPrivate && !isLoggedIn) {
        const login = new URL("/inloggen", request.nextUrl);
        login.searchParams.set("next", pathname);
        return Response.redirect(login);
      }

      // Staff stays in beheeromgeving — no access to referrer dashboard app
      if (isLoggedIn && isStaff && isReferrerApp) {
        return Response.redirect(new URL("/recruitment", request.nextUrl));
      }

      if (pathname.startsWith("/admin") && !isStaff) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      if (pathname.startsWith("/recruitment") && !isStaff) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.emailVerifiedAt = user.emailVerifiedAt ?? null;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "admin" | "recruiter";
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.emailVerifiedAt =
          (token.emailVerifiedAt as string | null) ?? null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
