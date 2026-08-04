import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth(authConfig);

const DEFAULT_COMING_SOON_HOSTS = ["referr.nl", "www.referr.nl"];

function comingSoonHosts(): Set<string> {
  const fromEnv = process.env.COMING_SOON_HOSTS?.split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean);
  return new Set(fromEnv?.length ? fromEnv : DEFAULT_COMING_SOON_HOSTS);
}

function isStaticAsset(pathname: string): boolean {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/brand") ||
    pathname === "/favicon.svg" ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/api/") ||
    /\.[a-zA-Z0-9]+$/.test(pathname)
  );
}

export default auth((req) => {
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const { pathname } = req.nextUrl;

  if (comingSoonHosts().has(host) && !isStaticAsset(pathname)) {
    if (pathname === "/coming-soon") {
      return NextResponse.next();
    }
    const url = req.nextUrl.clone();
    url.pathname = "/coming-soon";
    return NextResponse.rewrite(url);
  }
});

export const config = {
  matcher: [
    /*
     * Run on almost everything so referr.nl can rewrite to coming-soon,
     * while Auth.js still guards private routes via authorized().
     */
    "/((?!_next/static|_next/image|.*\\..*).*)",
  ],
};
