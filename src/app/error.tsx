"use client";

import { useEffect } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
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
        <div className="mb-6 flex justify-center">
          <BrandLogo height={28} href="/" />
        </div>
        <h1 className="text-2xl font-bold text-fk-navy">
          Oeps… dat ging niet helemaal goed.
        </h1>
        <p className="mt-3 font-medium text-fk-navy/55">
          Probeer het nog een keer.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={reset}>Opnieuw</Button>
          <Button href="/" variant="outline">
            Naar home
          </Button>
        </div>
      </div>
    </div>
  );
}
