"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-extrabold text-fk-navy">
          Er ging iets mis
        </h1>
        <p className="mt-3 text-fk-navy/60">
          Probeer de pagina te verversen. Draait de dev server al lang? Herstart
          hem met{" "}
          <code className="rounded bg-fk-light px-1.5 py-0.5 text-sm">
            npm run dev
          </code>
          .
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset}>Opnieuw proberen</Button>
          <Button href="/" variant="outline">
            Naar home
          </Button>
        </div>
      </div>
    </div>
  );
}
