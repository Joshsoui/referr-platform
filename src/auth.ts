import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "@/auth.config";
import { findUserByEmail, verifyPassword } from "@/lib/auth/users";
import { rateLimit } from "@/lib/auth/rate-limit";

declare module "next-auth" {
  interface User {
    role?: "user" | "admin" | "recruiter";
    firstName?: string;
    lastName?: string;
    emailVerifiedAt?: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      role: "user" | "admin" | "recruiter";
      firstName: string;
      lastName: string;
      emailVerifiedAt: string | null;
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    id?: string;
    role?: "user" | "admin" | "recruiter";
    firstName?: string;
    lastName?: string;
    emailVerifiedAt?: string | null;
  }
}

const credentialsSchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(128),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Wachtwoord", type: "password" },
      },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const limited = rateLimit(
          `login:${parsed.data.email.toLowerCase()}`,
          8,
          60_000
        );
        if (!limited.ok) return null;

        const user = await findUserByEmail(parsed.data.email);
        if (!user) return null;

        const valid = await verifyPassword(user, parsed.data.password);
        if (!valid) return null;

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerifiedAt: user.emailVerifiedAt,
        };
      },
    }),
  ],
  trustHost: true,
});
