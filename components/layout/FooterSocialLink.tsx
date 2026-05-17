"use client";

import Image from "next/image";
import type { IconType } from "react-icons";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

function resolveBrandIcon(label: string): IconType | null {
  const n = label.trim().toLowerCase();
  if (n.includes("facebook")) return FaFacebook;
  if (n.includes("instagram")) return FaInstagram;
  if (n.includes("linkedin")) return FaLinkedin;
  if (n.includes("youtube")) return FaYoutube;
  if (n.includes("twitter") || n === "x") return FaXTwitter;
  return null;
}

export default function FooterSocialLink({
  label,
  href,
  iconSrc,
  surface = "dark",
}: {
  label: string;
  href: string;
  iconSrc?: string;
  /** `dark` = footer strip; `light` = white cards (split contact, etc.) */
  surface?: "dark" | "light";
}) {
  const BrandIcon = resolveBrandIcon(label);
  const aria = label.trim() || "Social profile";

  const linkClass =
    surface === "light"
      ? "inline-flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-stone-50 text-stone-700 shadow-sm transition hover:border-lux-gold/50 hover:bg-lux-cream hover:text-lux-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lux-gold"
      : "inline-flex h-11 w-11 items-center justify-center rounded-full border border-theme-bg-soft text-theme-on-bg-muted transition hover:border-theme-on-bg-subtle hover:bg-theme-bg-soft/40 hover:text-theme-on-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme-on-bg";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      title={aria}
      className={linkClass}
    >
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt=""
          width={22}
          height={22}
          className="h-[22px] w-[22px] object-contain"
          unoptimized
        />
      ) : BrandIcon ? (
        <BrandIcon className="h-5 w-5" aria-hidden />
      ) : (
        <span className="text-xs font-semibold uppercase tracking-wide">{label.slice(0, 2)}</span>
      )}
    </a>
  );
}
