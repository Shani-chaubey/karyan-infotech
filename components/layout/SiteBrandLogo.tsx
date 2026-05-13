"use client";

import { useState } from "react";
import Link from "next/link";

/** Local logo is the primary source — always available on any deployment. */
const LOCAL_LOGO = "/images/logo.png";

type Props = {
  src?: string | null;
  alt?: string | null;
  /** onDark: light treatment for navy / hero backgrounds (approx. white mark). */
  variant?: "onLight" | "onDark";
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  /** When false, renders a non-clickable mark (e.g. modal header). */
  asLink?: boolean;
  linkHref?: string;
};

export default function SiteBrandLogo({
  src,
  alt,
  variant = "onLight",
  className = "",
  width = 200,
  height = 56,
  priority = false,
  asLink = true,
  linkHref = "/",
}: Props) {
  const cmsSrc = src?.trim() ?? "";
  const initialSrc = cmsSrc || LOCAL_LOGO;
  const [imgSrc, setImgSrc] = useState(initialSrc);

  const resolvedAlt = alt?.trim() || "Karyan Infratech";
  const variantClass = variant === "onDark" ? "brightness-0 invert saturate-0" : "";

  function handleError() {
    if (imgSrc !== LOCAL_LOGO) setImgSrc(LOCAL_LOGO);
  }

  const img = (
    <img
      src={imgSrc}
      alt={resolvedAlt}
      width={width}
      height={height}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={handleError}
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`h-auto w-auto max-w-full object-contain object-left ${variantClass} ${className}`.trim()}
    />
  );

  if (!asLink) {
    return <span className="inline-flex leading-none">{img}</span>;
  }

  return (
    <Link
      href={linkHref}
      className="inline-flex leading-none transition-opacity hover:opacity-90"
    >
      {img}
    </Link>
  );
}
