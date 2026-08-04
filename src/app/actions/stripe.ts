"use server";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import {
  findUserById,
  updateUserStripeAccount,
} from "@/lib/auth/users";
import { getStripeBaseUrl, getStripeClient } from "@/lib/stripe";

export async function createStripeOnboardingLinkAction() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/inloggen?next=/account");
  }

  const stripe = getStripeClient();
  if (!stripe) {
    redirect("/account?stripe=not-configured");
  }

  const user = await findUserById(session.user.id);
  if (!user) {
    redirect("/account?stripe=user-not-found");
  }

  const baseUrl = getStripeBaseUrl();
  let stripeAccountId = user.stripeAccountId || "";

  if (!stripeAccountId) {
    const account = await stripe.accounts.create({
      type: "express",
      country: "NL",
      email: user.email,
      business_type: "individual",
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      metadata: {
        app_user_id: user.id,
      },
    });
    stripeAccountId = account.id;
    await updateUserStripeAccount(user.id, { stripeAccountId });
  }

  const link = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: `${baseUrl}/account?stripe=retry`,
    return_url: `${baseUrl}/account?stripe=return`,
    type: "account_onboarding",
  });

  redirect(link.url);
}

export async function getStripeConnectionStatusAction() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const stripe = getStripeClient();
  if (!stripe) {
    return {
      configured: false,
      connected: false,
      onboardingComplete: false,
      chargesEnabled: false,
      payoutsEnabled: false,
    };
  }

  const user = await findUserById(session.user.id);
  if (!user?.stripeAccountId) {
    return {
      configured: true,
      connected: false,
      onboardingComplete: false,
      chargesEnabled: false,
      payoutsEnabled: false,
    };
  }

  const account = await stripe.accounts.retrieve(user.stripeAccountId);
  const onboardingComplete = Boolean(account.details_submitted);
  const chargesEnabled = Boolean(account.charges_enabled);
  const payoutsEnabled = Boolean(account.payouts_enabled);

  await updateUserStripeAccount(session.user.id, {
    stripeAccountId: user.stripeAccountId,
    stripeOnboardingComplete: onboardingComplete,
    stripeChargesEnabled: chargesEnabled,
    stripePayoutsEnabled: payoutsEnabled,
  });

  return {
    configured: true,
    connected: true,
    onboardingComplete,
    chargesEnabled,
    payoutsEnabled,
  };
}

