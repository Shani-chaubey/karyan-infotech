import { DEFAULT_HOME_PAYLOAD } from "./defaults/homePayload";
import type { HomePayload } from "./types";

type LegacySplitCta = HomePayload["splitCta"] & {
  leftEyebrow?: string;
  leftTitle?: string;
  hours?: string;
  rightTitle?: string;
  rightBody?: string;
  rightCtaLabel?: string;
};

export function normalizeHomeSplitContact(raw: LegacySplitCta): HomePayload["splitCta"] {
  const videoSrc = String(raw.videoSrc ?? "").trim();
  const galleryImages = Array.isArray(raw.galleryImages)
    ? raw.galleryImages.filter((img) => img?.src?.trim())
    : [];

  const socialFromRaw = Array.isArray(raw.social)
    ? raw.social.filter((s) => s.href?.trim())
    : [];
  const social =
    socialFromRaw.length > 0 ? socialFromRaw : DEFAULT_HOME_PAYLOAD.splitCta.social;

  const ctaButtons =
    raw.ctaButtons?.length
      ? raw.ctaButtons.filter((b) => b.label?.trim())
      : raw.rightCtaLabel?.trim()
        ? [{ label: raw.rightCtaLabel }]
        : [{ label: "Meet our experts" }, { label: "Call for Site Visit" }];

  return {
    videoSrc,
    videoPoster: raw.videoPoster?.trim() || undefined,
    galleryImages,
    social,
    phone: raw.phone?.trim() || "+91 920 600 1002",
    phoneHref: raw.phoneHref?.trim() || "tel:+919206001002",
    whatsapp: raw.whatsapp?.trim() || "+91 920 600 1002",
    whatsappHref: raw.whatsappHref?.trim() || "https://wa.me/919206001002",
    ctaButtons,
  };
}
