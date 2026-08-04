import type { NextAuthConfig } from "next-auth";

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
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;

      const isAuthPage =
        pathname.startsWith("/inloggen") ||
        pathname.startsWith("/account-aanmaken") ||
        pathname.startsWith("/wachtwoord-vergeten") ||
        pathname.startsWith("/wachtwoord-herstellen") ||
        pathname.startsWith("/email-bevestigen");

      const isPrivate =
        pathname.startsWith("/dashboard") ||
        pathname.startsWith("/aandragen") ||
        pathname.startsWith("/levels") ||
        pathname.startsWith("/challenges") ||
        pathname.startsWith("/rewards") ||
        pathname.startsWith("/leaderboard") ||
        pathname.startsWith("/hall-of-fame") ||
        pathname.startsWith("/admin") ||
        pathname.startsWith("/recruitment") ||
        pathname === "/account" ||
        pathname.startsWith("/account/");

      if (isAuthPage && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      if (isPrivate && !isLoggedIn) {
        const login = new URL("/inloggen", request.nextUrl);
        login.searchParams.set("next", pathname);
        return Response.redirect(login);
      }

      if (
        pathname.startsWith("/admin") &&
        auth?.user?.role !== "admin" &&
        auth?.user?.role !== "recruiter"
      ) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }

      if (
        pathname.startsWith("/recruitment") &&
        auth?.user?.role !== "admin" &&
        auth?.user?.role !== "recruiter"
      ) {
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
        session.user.emailVerifiedAt = (token.emailVerifiedAt as string | null) ?? null;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
