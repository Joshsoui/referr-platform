import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  href?: string | null;
  className?: string;
  /** Display height in px; width follows wordmark aspect */
  height?: number;
  priority?: boolean;
  /** Brighten logo for dark backgrounds */
  invertOnDark?: boolean;
};

export function BrandLogo({
  href = "/",
  className = "",
  height = 28,
  priority = false,
  invertOnDark = false,
}: BrandLogoProps) {
  // Original wordmark asset ~2.93:1 (837x286)
  const width = Math.round(height * (837 / 286));
  const img = (
    <Image
      src="/brand/referr-logo.png"
      alt="referr"
      height={height * 2}
      width={width * 2}
      quality={100}
      className={`brand-logo-mark h-auto w-auto object-contain object-left ${
        invertOnDark ? "brightness-[1.8] contrast-[0.9]" : ""
      } ${className}`}
      style={{ height, width: "auto", maxWidth: "100%" }}
      priority={priority}
    />
  );

  if (href === null) {
    return <span className="inline-flex shrink-0 items-center">{img}</span>;
  }

  return (
    <Link
      href={href}
      className="inline-flex shrink-0 items-center transition-opacity hover:opacity-85"
      aria-label="referr home"
    >
      {img}
    </Link>
  );
}

export function BrandWord({ className = "" }: { className?: string }) {
  return <span className={`brand-wordmark ${className}`.trim()}>referr</span>;
}
