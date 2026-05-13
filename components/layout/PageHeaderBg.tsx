"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Client-side wrapper for the page header background image.
 * Falls back to `undefined` (hides the image) if the external URL fails,
 * letting the parent's gradient fallback show instead.
 */
export default function PageHeaderBg({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-0 min-h-[620px] w-full bg-theme-bg" aria-hidden>
      <Image
        src={src}
        alt=""
        fill
        className="object-cover object-center scale-105"
        sizes="100vw"
        priority
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
