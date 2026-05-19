"use client";

import Image from "next/image";
import Link from "next/link";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import SiteBrandLogo from "@/components/layout/SiteBrandLogo";
import FooterSocialLink from "@/components/layout/FooterSocialLink";
import type { SiteFooterPayload } from "@/lib/cms/types";

export default function FooterClient({
  footer,
  logoSrc,
  logoAlt,
}: {
  footer: SiteFooterPayload;
  logoSrc?: string;
  logoAlt?: string;
}) {
  const { openEnquiry } = useEnquiry();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-theme-bg-soft bg-theme-bg text-theme-on-bg-muted">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-4 sm:px-6 lg:px-8 lg:pt-16 lg:pb-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <SiteBrandLogo
              src={logoSrc}
              alt={logoAlt}
              variant="onDark"
              className="h-10 w-auto max-w-[200px] sm:h-11"
            />
            <p className="mt-6 text-sm leading-relaxed">{footer.tagline}</p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-theme-on-bg-subtle">
              Explore
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {footer.explore.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-theme-on-bg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-theme-on-bg-subtle">
              Residential
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {footer.residential.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-theme-on-bg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-theme-on-bg-subtle">
              Commercial
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {footer.commercial.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition hover:text-theme-on-bg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-theme-on-bg-subtle">
              Contact
            </p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={footer.contactPhoneHref}
                  className="transition hover:text-theme-on-bg"
                >
                  {footer.contactPhone}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openEnquiry()}
                  className="text-left transition hover:text-theme-on-bg"
                >
                  Enquiry form
                </button>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-theme-on-bg"
                >
                  Contact &amp; map
                </Link>
              </li>
            </ul>
            <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.2em] text-theme-on-bg-subtle">
              Social
            </p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {footer.social.map((s) => (
                <li key={s.href}>
                  <FooterSocialLink label={s.label} href={s.href} iconSrc={s.iconSrc} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-6 border-t border-theme-bg-soft pt-8 text-base leading-relaxed text-theme-on-bg-subtle lg:gap-4">
          <div className="flex w-full flex-wrap items-center gap-x-3 gap-y-2 text-xs text-theme-on-bg-subtle">
            <p className="shrink-0">
              © {year} {footer.legalLine}
            </p>
            <span className="inline-flex items-center gap-1.5">
              <span className="whitespace-nowrap">Designed and developed by</span>
              <Image
                src="/images/sysneticindialogo.png"
                alt="Sysnetic India — Serves your purpose better"
                width={72}
                height={18}
                className="h-4 w-auto max-w-[88px] object-contain object-left opacity-90 transition-opacity hover:opacity-100 sm:h-[18px] sm:max-w-[96px]"
              />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
