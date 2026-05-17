"use client";

import { Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";
import { EnquiryTrigger } from "@/components/enquiry/EnquiryProvider";
import FooterSocialLink from "@/components/layout/FooterSocialLink";
import SplitContactGallery from "@/components/home/SplitContactGallery";
import ProjectVideoPlayer from "@/components/projects/ProjectVideoPlayer";
import type { HomePayload } from "@/lib/cms/types";

const PRIMARY_BTN =
  "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-lux-navy px-5 py-3 text-sm font-semibold text-white transition hover:bg-lux-navy-mid focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lux-gold sm:flex-none sm:min-w-[160px]";
const SECONDARY_BTN =
  "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg border-2 border-lux-navy/25 bg-white px-5 py-3 text-sm font-semibold text-lux-navy transition hover:border-lux-gold/50 hover:bg-lux-cream/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lux-gold sm:flex-none sm:min-w-[160px]";

export default function SplitContactSection({ data }: { data: HomePayload["splitCta"] }) {
  const videoSrc = data.videoSrc?.trim() ?? "";
  const showVideo = Boolean(videoSrc);

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-[0_24px_60px_-36px_rgba(15,23,42,0.2)]">
      <div className="w-full overflow-hidden bg-stone-900">
        {showVideo ? (
          <div className="relative w-full [&_video]:max-h-[min(36vw,320px)] [&_video]:w-full [&_video]:object-cover">
            <ProjectVideoPlayer
              src={videoSrc}
              poster={data.videoPoster}
              title="Sales gallery video"
            />
          </div>
        ) : (
          <SplitContactGallery images={data.galleryImages} />
        )}
      </div>

      <div className="flex flex-col gap-6 border-t border-stone-200/80 px-4 py-6 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8 lg:py-7">
        {data.social.length > 0 ? (
          <ul className="flex flex-wrap items-center gap-2 sm:gap-3">
            {data.social.map((s) => (
              <li key={s.href}>
                <FooterSocialLink
                  label={s.label}
                  href={s.href}
                  iconSrc={s.iconSrc}
                  surface="light"
                />
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center lg:gap-6">
          <a
            href={data.phoneHref}
            className="inline-flex min-h-[44px] items-center gap-3 text-base font-semibold text-lux-navy transition hover:text-lux-gold-dim"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lux-navy text-white">
              <Phone className="h-5 w-5" aria-hidden />
            </span>
            <span>{data.phone}</span>
          </a>

          <a
            href={data.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center gap-3 text-base font-semibold text-lux-navy transition hover:text-[#25D366]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
              <FaWhatsapp className="h-5 w-5" aria-hidden />
            </span>
            <span>{data.whatsapp}</span>
          </a>
        </div>

        {data.ctaButtons.length > 0 ? (
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-end lg:w-auto lg:shrink-0">
            {data.ctaButtons.map((btn, i) => (
              <EnquiryTrigger
                key={`${btn.label}-${i}`}
                project={btn.project?.trim() || undefined}
                className={i === 0 ? PRIMARY_BTN : SECONDARY_BTN}
              >
                {btn.label}
              </EnquiryTrigger>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
