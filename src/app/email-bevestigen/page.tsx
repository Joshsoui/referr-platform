import type { Metadata } from "next";
import Link from "next/link";
import { verifyEmailAction, resendVerificationAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "E-mail bevestigen",
  robots: { index: false, follow: false },
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const session = await auth();
  let result: Awaited<ReturnType<typeof verifyEmailAction>> | null = null;

  if (params.token) {
    result = await verifyEmailAction(params.token);
  }

  return (
    <div className="px-4 py-12 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-md border-fk-primary/10 p-6 sm:p-8">
        {!params.token && (
          <>
            <h1 className="text-2xl font-extrabold text-fk-navy">
              Controleer je e-mail
            </h1>
            <p className="mt-3 text-sm text-fk-navy/70">
              We hebben een bevestigingslink gestuurd. Open die om je
              e-mailadres te bevestigen.
            </p>
            {session?.user && !session.user.emailVerifiedAt && (
              <form
                action={async () => {
                  "use server";
                  await resendVerificationAction();
                }}
                className="mt-6"
              >
                <Button type="submit" variant="secondary">
                  Nieuwe bevestigingsmail versturen
                </Button>
              </form>
            )}
          </>
        )}

        {params.token && result?.ok && (
          <>
            <h1 className="text-2xl font-extrabold text-fk-navy">
              E-mailadres bevestigd
            </h1>
            <p className="mt-3 text-sm text-fk-navy/70">{result.message}</p>
            <Link href="/inloggen" className="mt-6 inline-block">
              <Button>Doorgaan naar inloggen</Button>
            </Link>
          </>
        )}

        {params.token && result && !result.ok && (
          <>
            <h1 className="text-2xl font-extrabold text-fk-navy">
              {result.message.includes("verlopen")
                ? "Deze link is verlopen"
                : "Bevestiging mislukt"}
            </h1>
            <p className="mt-3 text-sm text-fk-navy/70">{result.message}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/inloggen">
                <Button variant="secondary">Inloggen</Button>
              </Link>
              <Link href="/email-bevestigen">
                <Button>Nieuwe mail aanvragen</Button>
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
