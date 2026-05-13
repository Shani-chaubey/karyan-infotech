"use client";

import { useState } from "react";
import Image from "next/image";

interface CmsImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Local path shown when the remote URL fails (e.g. CDN hotlink block). */
  fallback?: string;
}

/**
 * Drop-in replacement for next/image in server components that need
 * an onError fallback for CMS / CDN images that may be blocked in production.
 */
export default function CmsImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  priority = false,
  fallback = "/images/our-vision.webp",
}: CmsImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  const sharedProps = {
    src: imgSrc,
    alt,
    sizes,
    className,
    priority,
    referrerPolicy: "no-referrer" as const,
    onError: () => {
      if (imgSrc !== fallback) setImgSrc(fallback);
    },
  };

  if (fill) {
    return <Image {...sharedProps} fill />;
  }

  return <Image {...sharedProps} width={width} height={height} />;
}
