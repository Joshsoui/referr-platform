import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/aandragen/:path*",
    "/levels/:path*",
    "/challenges/:path*",
    "/rewards/:path*",
    "/leaderboard/:path*",
    "/hall-of-fame/:path*",
    "/admin/:path*",
    "/account/:path*",
    "/inloggen",
    "/account-aanmaken",
    "/wachtwoord-vergeten",
    "/wachtwoord-herstellen",
    "/email-bevestigen",
  ],
};
