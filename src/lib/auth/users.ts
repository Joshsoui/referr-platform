import bcrypt from "bcryptjs";
import { hasDatabase, tryPrisma } from "@/lib/db";
import type { User as PrismaUser, UserRole as PrismaUserRole } from "@prisma/client";
import { promises as fs } from "fs";
import path from "path";
import { getDataDir } from "@/lib/dataDir";

export type UserRole = "user" | "admin" | "recruiter";

export interface StoredUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  role: UserRole;
  emailVerifiedAt: string | null;
  marketingConsent: boolean;
  marketingConsentAt: string | null;
  marketingConsentVersion: string | null;
  termsAcceptedAt: string;
  termsVersion: string;
  createdAt: string;
  updatedAt: string;
  phone?: string;
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  iban?: string;
  ibanAccountName?: string;
  stripeAccountId?: string;
  stripeOnboardingComplete?: boolean;
  stripeChargesEnabled?: boolean;
  stripePayoutsEnabled?: boolean;
}

interface UserStore {
  users: StoredUser[];
}

const USERS_FILE = path.join(getDataDir(), "users.json");
const TERMS_VERSION = "2026-07-28";
const MARKETING_VERSION = "2026-07-28";

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function mapPrismaUser(user: PrismaUser): StoredUser {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    passwordHash: user.passwordHash,
    role: user.role as UserRole,
    emailVerifiedAt: user.emailVerifiedAt?.toISOString() ?? null,
    marketingConsent: user.marketingConsent,
    marketingConsentAt: user.marketingConsentAt?.toISOString() ?? null,
    marketingConsentVersion: user.marketingConsentVersion,
    termsAcceptedAt: user.termsAcceptedAt.toISOString(),
    termsVersion: user.termsVersion,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
    phone: user.phone,
    street: user.street,
    houseNumber: user.houseNumber,
    postalCode: user.postalCode,
    city: user.city,
    country: user.country,
    iban: user.iban,
    ibanAccountName: user.ibanAccountName,
    stripeAccountId: user.stripeAccountId,
    stripeOnboardingComplete: user.stripeOnboardingComplete,
    stripeChargesEnabled: user.stripeChargesEnabled,
    stripePayoutsEnabled: user.stripePayoutsEnabled,
  };
}

async function ensureFileStore(): Promise<UserStore> {
  await fs.mkdir(getDataDir(), { recursive: true });
  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(raw) as UserStore;
  } catch {
    const empty: UserStore = { users: [] };
    await fs.writeFile(USERS_FILE, JSON.stringify(empty, null, 2), "utf8");
    return empty;
  }
}

async function saveFileStore(store: UserStore): Promise<void> {
  await fs.mkdir(getDataDir(), { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(store, null, 2), "utf8");
}

export function getPublicUser(user: StoredUser) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    emailVerifiedAt: user.emailVerifiedAt,
    marketingConsent: user.marketingConsent,
    termsAcceptedAt: user.termsAcceptedAt,
    createdAt: user.createdAt,
    phone: user.phone ?? "",
    street: user.street ?? "",
    houseNumber: user.houseNumber ?? "",
    postalCode: user.postalCode ?? "",
    city: user.city ?? "",
    country: user.country ?? "Nederland",
    iban: user.iban ?? "",
    ibanAccountName: user.ibanAccountName ?? "",
    stripeAccountId: user.stripeAccountId ?? "",
    stripeOnboardingComplete: user.stripeOnboardingComplete ?? false,
    stripeChargesEnabled: user.stripeChargesEnabled ?? false,
    stripePayoutsEnabled: user.stripePayoutsEnabled ?? false,
  };
}

export async function findUserByEmail(
  email: string
): Promise<StoredUser | null> {
  const normalized = normalizeEmail(email);
  if (hasDatabase()) {
    const user = await tryPrisma((prisma) =>
      prisma.user.findUnique({ where: { email: normalized } })
    );
    if (user) return mapPrismaUser(user);
    // If Prisma is healthy but user missing, don't fall through to file.
    if (hasDatabase()) return null;
  }
  const store = await ensureFileStore();
  return store.users.find((u) => u.email === normalized) ?? null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  if (hasDatabase()) {
    const user = await tryPrisma((prisma) =>
      prisma.user.findUnique({ where: { id } })
    );
    if (user) return mapPrismaUser(user);
    if (hasDatabase()) return null;
  }
  const store = await ensureFileStore();
  return store.users.find((u) => u.id === id) ?? null;
}

export async function createUser(input: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  marketingConsent: boolean;
  role?: UserRole;
}): Promise<StoredUser> {
  const email = normalizeEmail(input.email);
  const passwordHash = await bcrypt.hash(input.password, 12);
  const now = new Date();
  const role: UserRole =
    input.role === "admin" || input.role === "recruiter" ? input.role : "user";

  if (hasDatabase()) {
    const existing = await tryPrisma((prisma) =>
      prisma.user.findUnique({ where: { email } })
    );
    if (existing) throw new Error("EMAIL_TAKEN");

    const created = await tryPrisma((prisma) =>
      prisma.user.create({
        data: {
          email,
          firstName: input.firstName.trim(),
          lastName: input.lastName.trim(),
          passwordHash,
          role: role as PrismaUserRole,
          marketingConsent: input.marketingConsent,
          marketingConsentAt: input.marketingConsent ? now : null,
          marketingConsentVersion: input.marketingConsent
            ? MARKETING_VERSION
            : null,
          termsAcceptedAt: now,
          termsVersion: TERMS_VERSION,
        },
      })
    );
    if (created) return mapPrismaUser(created);
    // fall through to file store if Prisma unavailable
  }

  const store = await ensureFileStore();
  if (store.users.some((u) => u.email === email)) {
    throw new Error("EMAIL_TAKEN");
  }
  const iso = now.toISOString();
  const user: StoredUser = {
    id: crypto.randomUUID(),
    email,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    passwordHash,
    role,
    emailVerifiedAt: null,
    marketingConsent: input.marketingConsent,
    marketingConsentAt: input.marketingConsent ? iso : null,
    marketingConsentVersion: input.marketingConsent ? MARKETING_VERSION : null,
    termsAcceptedAt: iso,
    termsVersion: TERMS_VERSION,
    createdAt: iso,
    updatedAt: iso,
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
  store.users.push(user);
  await saveFileStore(store);
  return user;
}

export async function verifyPassword(
  user: StoredUser,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}

export async function markEmailVerified(userId: string): Promise<void> {
  if (hasDatabase()) {
    const updated = await tryPrisma((prisma) =>
      prisma.user.update({
        where: { id: userId },
        data: { emailVerifiedAt: new Date() },
      })
    );
    if (updated || hasDatabase()) return;
  }
  const store = await ensureFileStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) return;
  user.emailVerifiedAt = new Date().toISOString();
  user.updatedAt = user.emailVerifiedAt;
  await saveFileStore(store);
}

export async function updatePassword(
  userId: string,
  newPassword: string
): Promise<void> {
  const passwordHash = await bcrypt.hash(newPassword, 12);
  if (hasDatabase()) {
    const updated = await tryPrisma((prisma) =>
      prisma.user.update({
        where: { id: userId },
        data: { passwordHash },
      })
    );
    if (updated) return;
    if (hasDatabase()) throw new Error("USER_NOT_FOUND");
  }
  const store = await ensureFileStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) throw new Error("USER_NOT_FOUND");
  user.passwordHash = passwordHash;
  user.updatedAt = new Date().toISOString();
  await saveFileStore(store);
}

export async function updateMarketingConsent(
  userId: string,
  consent: boolean
): Promise<StoredUser | null> {
  if (hasDatabase()) {
    const user = await tryPrisma((prisma) =>
      prisma.user.update({
        where: { id: userId },
        data: {
          marketingConsent: consent,
          marketingConsentAt: consent ? new Date() : null,
          marketingConsentVersion: consent ? MARKETING_VERSION : null,
        },
      })
    );
    if (user) return mapPrismaUser(user);
    if (hasDatabase()) return null;
  }
  const store = await ensureFileStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) return null;
  const now = new Date().toISOString();
  user.marketingConsent = consent;
  user.marketingConsentAt = consent ? now : null;
  user.marketingConsentVersion = consent ? MARKETING_VERSION : null;
  user.updatedAt = now;
  await saveFileStore(store);
  return user;
}

export async function updateProfile(
  userId: string,
  data: {
    firstName: string;
    lastName: string;
    phone?: string;
    street?: string;
    houseNumber?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    iban?: string;
    ibanAccountName?: string;
  }
): Promise<StoredUser | null> {
  const payload = {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    phone: (data.phone ?? "").trim(),
    street: (data.street ?? "").trim(),
    houseNumber: (data.houseNumber ?? "").trim(),
    postalCode: (data.postalCode ?? "").trim(),
    city: (data.city ?? "").trim(),
    country: (data.country ?? "Nederland").trim(),
    iban: (data.iban ?? "").trim().toUpperCase(),
    ibanAccountName: (data.ibanAccountName ?? "").trim(),
  };

  if (hasDatabase()) {
    const user = await tryPrisma((prisma) =>
      prisma.user.update({
        where: { id: userId },
        data: payload,
      })
    );
    if (user) return mapPrismaUser(user);
    if (hasDatabase()) return null;
  }

  const store = await ensureFileStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) return null;
  Object.assign(user, payload);
  user.updatedAt = new Date().toISOString();
  await saveFileStore(store);
  return user;
}

export async function deleteUser(userId: string): Promise<boolean> {
  if (hasDatabase()) {
    const deleted = await tryPrisma((prisma) =>
      prisma.user.delete({ where: { id: userId } })
    );
    if (deleted) return true;
    if (hasDatabase()) return false;
  }
  const store = await ensureFileStore();
  const before = store.users.length;
  store.users = store.users.filter((u) => u.id !== userId);
  if (store.users.length === before) return false;
  await saveFileStore(store);
  return true;
}

export async function updateUserStripeAccount(
  userId: string,
  input: {
    stripeAccountId: string;
    stripeOnboardingComplete?: boolean;
    stripeChargesEnabled?: boolean;
    stripePayoutsEnabled?: boolean;
  }
): Promise<StoredUser | null> {
  if (hasDatabase()) {
    const user = await tryPrisma((prisma) =>
      prisma.user.update({
        where: { id: userId },
        data: {
          stripeAccountId: input.stripeAccountId,
          ...(typeof input.stripeOnboardingComplete === "boolean"
            ? { stripeOnboardingComplete: input.stripeOnboardingComplete }
            : {}),
          ...(typeof input.stripeChargesEnabled === "boolean"
            ? { stripeChargesEnabled: input.stripeChargesEnabled }
            : {}),
          ...(typeof input.stripePayoutsEnabled === "boolean"
            ? { stripePayoutsEnabled: input.stripePayoutsEnabled }
            : {}),
        },
      })
    );
    if (user) return mapPrismaUser(user);
    if (hasDatabase()) return null;
  }

  const store = await ensureFileStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) return null;
  user.stripeAccountId = input.stripeAccountId;
  if (typeof input.stripeOnboardingComplete === "boolean") {
    user.stripeOnboardingComplete = input.stripeOnboardingComplete;
  }
  if (typeof input.stripeChargesEnabled === "boolean") {
    user.stripeChargesEnabled = input.stripeChargesEnabled;
  }
  if (typeof input.stripePayoutsEnabled === "boolean") {
    user.stripePayoutsEnabled = input.stripePayoutsEnabled;
  }
  user.updatedAt = new Date().toISOString();
  await saveFileStore(store);
  return user;
}

export async function updateUserRoleByEmail(
  email: string,
  role: UserRole
): Promise<StoredUser | null> {
  const normalized = normalizeEmail(email);
  if (hasDatabase()) {
    const user = await tryPrisma((prisma) =>
      prisma.user.update({
        where: { email: normalized },
        data: { role: role as PrismaUserRole },
      })
    );
    if (user) return mapPrismaUser(user);
    if (hasDatabase()) return null;
  }
  const store = await ensureFileStore();
  const user = store.users.find((u) => u.email === normalized);
  if (!user) return null;
  user.role = role;
  user.updatedAt = new Date().toISOString();
  await saveFileStore(store);
  return user;
}

export async function listUsersWithPayoutDetails() {
  if (hasDatabase()) {
    const users = await tryPrisma((prisma) =>
      prisma.user.findMany({
        where: { NOT: { iban: "" } },
        orderBy: { lastName: "asc" },
      })
    );
    if (users) {
      return users.map((user) => ({
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        iban: user.iban,
        ibanAccountName: user.ibanAccountName,
        city: user.city,
        postalCode: user.postalCode,
        country: user.country,
        updatedAt: user.updatedAt.toISOString(),
      }));
    }
  }

  const store = await ensureFileStore();
  return store.users
    .map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone ?? "",
      iban: user.iban ?? "",
      ibanAccountName: user.ibanAccountName ?? "",
      city: user.city ?? "",
      postalCode: user.postalCode ?? "",
      country: user.country ?? "",
      updatedAt: user.updatedAt,
    }))
    .filter((user) => Boolean(user.iban.trim()))
    .sort((a, b) => a.lastName.localeCompare(b.lastName, "nl"));
}

export async function exportUserData(userId: string) {
  const user = await findUserById(userId);
  if (!user) return null;
  return {
    exportedAt: new Date().toISOString(),
    account: getPublicUser(user),
    consents: {
      termsAcceptedAt: user.termsAcceptedAt,
      termsVersion: user.termsVersion,
      marketingConsent: user.marketingConsent,
      marketingConsentAt: user.marketingConsentAt,
      marketingConsentVersion: user.marketingConsentVersion,
    },
    note: hasDatabase()
      ? "Accounts are stored in PostgreSQL."
      : "Accounts are stored under DATA_DIR until DATABASE_URL is configured.",
  };
}

export { TERMS_VERSION, MARKETING_VERSION };
