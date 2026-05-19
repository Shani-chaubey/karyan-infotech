"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { SiteCookieConsent } from "@/lib/cms/types";
import {
  readConsentCookie,
  writeConsentCookie,
} from "@/lib/cookie-consent";

type Props = {
  config: SiteCookieConsent;
};

export default function CookieConsentBanner({ config }: Props) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  const heading = config.heading?.trim() ?? "";
  const description = config.description?.trim() ?? "";
  const acceptLabel = config.acceptLabel?.trim() || "Accept";
  const closeLabel = config.closeLabel?.trim() || "Close";
  const enabled = config.enabled && (heading.length > 0 || description.length > 0);

  useEffect(() => {
    setMounted(true);
    if (!enabled) return;
    if (readConsentCookie()) return;
    setVisible(true);
  }, [enabled]);

  if (!mounted || !enabled || !visible || pathname.startsWith("/admin")) {
    return null;
  }

  function dismiss(choice: "accepted" | "dismissed") {
    writeConsentCookie(choice);
    setVisible(false);
  }

  return (
    <div
      className="pointer-events-none fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-[max(1rem,env(safe-area-inset-left,0px))] z-[180] w-[min(100vw-2rem,400px)]"
      role="dialog"
      aria-label={heading || "Disclaimer and cookie notice"}
      aria-labelledby={heading ? "cookie-consent-heading" : undefined}
      aria-describedby={description ? "cookie-consent-description" : undefined}
    >
      <div className="pointer-events-auto rounded-2xl border border-stone-200/90 bg-lux-ivory/95 p-4 shadow-[0_20px_50px_rgba(15,23,42,0.22)] ring-1 ring-lux-gold/15 backdrop-blur-md sm:p-5">
        <div className="flex items-start justify-between gap-3">
          {heading ? (
            <h2
              id="cookie-consent-heading"
              className="font-display pr-6 text-base font-semibold leading-snug text-lux-navy"
            >
              {heading}
            </h2>
          ) : null}
          <button
            type="button"
            onClick={() => dismiss("dismissed")}
            className="shrink-0 rounded-lg border border-stone-200/80 p-1.5 text-stone-500 outline-none transition hover:border-lux-gold/40 hover:bg-lux-cream hover:text-lux-navy focus-visible:ring-2 focus-visible:ring-lux-gold/50 focus-visible:ring-offset-2"
            aria-label={closeLabel}
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        {description ? (
          <p
            id="cookie-consent-description"
            className={`text-sm leading-relaxed text-stone-600 ${heading ? "mt-2" : "mt-0"}`}
          >
            {description}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => dismiss("accepted")}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl bg-theme-bg px-4 py-2.5 text-sm font-semibold text-theme-on-bg transition hover:bg-theme-bg-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lux-gold"
          >
            {acceptLabel}
          </button>
          <button
            type="button"
            onClick={() => dismiss("dismissed")}
            className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-xl border-2 border-lux-navy/20 bg-white px-4 py-2.5 text-sm font-semibold text-lux-navy transition hover:border-lux-gold/50 hover:bg-lux-cream/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lux-gold"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
