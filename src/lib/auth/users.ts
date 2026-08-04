import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

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

const DATA_DIR = path.join(process.cwd(), ".data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const TERMS_VERSION = "2026-07-28";
const MARKETING_VERSION = "2026-07-28";

async function ensureStore(): Promise<UserStore> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(USERS_FILE, "utf8");
    return JSON.parse(raw) as UserStore;
  } catch {
    const empty: UserStore = { users: [] };
    await fs.writeFile(USERS_FILE, JSON.stringify(empty, null, 2), "utf8");
    return empty;
  }
}

async function saveStore(store: UserStore): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(USERS_FILE, JSON.stringify(store, null, 2), "utf8");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
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
  const store = await ensureStore();
  const normalized = normalizeEmail(email);
  return store.users.find((u) => u.email === normalized) ?? null;
}

export async function findUserById(id: string): Promise<StoredUser | null> {
  const store = await ensureStore();
  return store.users.find((u) => u.id === id) ?? null;
}

export async function createUser(input: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  marketingConsent: boolean;
}): Promise<StoredUser> {
  const store = await ensureStore();
  const email = normalizeEmail(input.email);

  if (store.users.some((u) => u.email === email)) {
    throw new Error("EMAIL_TAKEN");
  }

  const now = new Date().toISOString();
  const passwordHash = await bcrypt.hash(input.password, 12);
  const user: StoredUser = {
    id: crypto.randomUUID(),
    email,
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    passwordHash,
    role: "user",
    emailVerifiedAt: null,
    marketingConsent: input.marketingConsent,
    marketingConsentAt: input.marketingConsent ? now : null,
    marketingConsentVersion: input.marketingConsent ? MARKETING_VERSION : null,
    termsAcceptedAt: now,
    termsVersion: TERMS_VERSION,
    createdAt: now,
    updatedAt: now,
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
  await saveStore(store);
  return user;
}

export async function verifyPassword(
  user: StoredUser,
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, user.passwordHash);
}

export async function markEmailVerified(userId: string): Promise<void> {
  const store = await ensureStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) return;
  user.emailVerifiedAt = new Date().toISOString();
  user.updatedAt = user.emailVerifiedAt;
  await saveStore(store);
}

export async function updatePassword(
  userId: string,
  newPassword: string
): Promise<void> {
  const store = await ensureStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) throw new Error("USER_NOT_FOUND");
  user.passwordHash = await bcrypt.hash(newPassword, 12);
  user.updatedAt = new Date().toISOString();
  await saveStore(store);
}

export async function updateMarketingConsent(
  userId: string,
  consent: boolean
): Promise<StoredUser | null> {
  const store = await ensureStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) return null;
  const now = new Date().toISOString();
  user.marketingConsent = consent;
  user.marketingConsentAt = consent ? now : null;
  user.marketingConsentVersion = consent ? MARKETING_VERSION : null;
  user.updatedAt = now;
  await saveStore(store);
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
  const store = await ensureStore();
  const user = store.users.find((u) => u.id === userId);
  if (!user) return null;
  user.firstName = data.firstName.trim();
  user.lastName = data.lastName.trim();
  user.phone = (data.phone ?? "").trim();
  user.street = (data.street ?? "").trim();
  user.houseNumber = (data.houseNumber ?? "").trim();
  user.postalCode = (data.postalCode ?? "").trim();
  user.city = (data.city ?? "").trim();
  user.country = (data.country ?? "Nederland").trim();
  user.iban = (data.iban ?? "").trim().toUpperCase();
  user.ibanAccountName = (data.ibanAccountName ?? "").trim();
  user.updatedAt = new Date().toISOString();
  await saveStore(store);
  return user;
}

export async function deleteUser(userId: string): Promise<boolean> {
  const store = await ensureStore();
  const before = store.users.length;
  store.users = store.users.filter((u) => u.id !== userId);
  if (store.users.length === before) return false;
  await saveStore(store);
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
  const store = await ensureStore();
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
  await saveStore(store);
  return user;
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
    note: "Product activity data remains in client demo state until a durable backend exists.",
  };
}

export { TERMS_VERSION, MARKETING_VERSION };
