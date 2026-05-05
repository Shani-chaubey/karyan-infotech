"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { SiteEnquiryFloatPromo } from "@/lib/cms/types";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";

/** When set to the current image URL, the large promo is hidden and the reopen chip is shown. */
const STORAGE_MINIMIZED_KEY = "karyan-enquiry-float-minimized";

/** Fixed frame size (px) — portrait strip, matches typical promo creatives */
const FRAME_W = 160;
const FRAME_H = 260;

type Props = {
  promo: SiteEnquiryFloatPromo;
};

export default function EnquiryFloatPromo({ promo }: Props) {
  const pathname = usePathname();
  const { openEnquiry } = useEnquiry();
  const [mounted, setMounted] = useState(false);
  const [expanded, setExpanded] = useState(true);

  const src = promo.imageSrc?.trim() ?? "";
  const enabled = promo.enabled && src.length > 0;

  useEffect(() => {
    setMounted(true);
    if (!enabled || typeof window === "undefined") return;
    const minimized = window.localStorage.getItem(STORAGE_MINIMIZED_KEY) === src;
    setExpanded(!minimized);
  }, [enabled, src]);

  if (!mounted || pathname.startsWith("/admin") || !enabled) {
    return null;
  }

  function minimize(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    try {
      window.localStorage.setItem(STORAGE_MINIMIZED_KEY, src);
    } catch {
      /* ignore */
    }
    setExpanded(false);
  }

  function expand() {
    try {
      window.localStorage.removeItem(STORAGE_MINIMIZED_KEY);
    } catch {
      /* ignore */
    }
    setExpanded(true);
  }

  return (
    <>
      {expanded ? (
        <div
          className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-[max(1rem,env(safe-area-inset-left,0px))] z-50 sm:bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:left-[max(1.25rem,env(safe-area-inset-left,0px))]"
          role="complementary"
          aria-label="Promotional enquiry"
        >
          <div
            className="pointer-events-auto relative overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.35)] ring-1 ring-black/20"
            style={{ width: FRAME_W, height: FRAME_H }}
          >
            <button
              type="button"
              onClick={() => openEnquiry()}
              className="absolute inset-0 block h-full w-full p-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-lux-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-lux-ivory"
              aria-label={promo.imageAlt || "Open enquiry form"}
            >
              <Image
                src={src}
                alt={promo.imageAlt || ""}
                width={FRAME_W}
                height={FRAME_H}
                unoptimized
                className="h-full w-full object-cover"
                sizes={`${FRAME_W}px`}
              />
            </button>
            <button
              type="button"
              onClick={minimize}
              className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#F7B90F] text-[#0f172a] shadow-md transition hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/90"
              aria-label="Minimize promotional banner"
            >
              <X className="h-4 w-4" strokeWidth={2.5} aria-hidden />
            </button>
          </div>
        </div>
      ) : (
        <div
          className="lux-enquiry-float-chip-outer pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-[max(1rem,env(safe-area-inset-left,0px))] z-50 sm:bottom-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:left-[max(1.25rem,env(safe-area-inset-left,0px))]"
          role="complementary"
          aria-label="Collapsed promotional offer"
        >
          <div className="lux-enquiry-float-chip-inner">
            <button
              type="button"
              onClick={expand}
              className="lux-enquiry-float-chip-btn pointer-events-auto relative h-12 w-12 overflow-hidden rounded-full border-2 border-[#F7B90F] bg-[#0f172a] ring-2 ring-white/25 transition hover:scale-105 hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-lux-gold/90 focus-visible:ring-offset-2"
              aria-label="Show promotional offer again"
            >
              <Image
                src={src}
                alt=""
                width={48}
                height={48}
                unoptimized
                className="h-full w-full object-cover"
                sizes="48px"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
