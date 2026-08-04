import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  prismaUnavailable?: boolean;
};

export function hasDatabase(): boolean {
  if (globalForPrisma.prismaUnavailable) return false;
  return Boolean(process.env.DATABASE_URL?.trim());
}

export function getPrisma(): PrismaClient {
  if (!hasDatabase()) {
    throw new Error("DATABASE_URL is not configured");
  }
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  }
  return globalForPrisma.prisma;
}

/** Run a Prisma operation; on failure mark DB unavailable and return null. */
export async function tryPrisma<T>(
  operation: (prisma: PrismaClient) => Promise<T>
): Promise<T | null> {
  if (!hasDatabase()) return null;
  try {
    return await operation(getPrisma());
  } catch (error) {
    console.error("[prisma]", error);
    // Temporary outage / bad connection / missing tables → fall back to file store
    // for this process so /account and auth keep working.
    globalForPrisma.prismaUnavailable = true;
    return null;
  }
}

export function resetPrismaAvailability() {
  globalForPrisma.prismaUnavailable = false;
}
