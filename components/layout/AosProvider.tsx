"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";

function applyAutoAosAttributes() {
  const sections = document.querySelectorAll<HTMLElement>(
    "section, article, [data-aos-auto]"
  );
  const sectionPattern = ["fade-up", "fade-left", "fade-right"] as const;
  const itemPattern = ["fade-up", "fade-left", "fade-right", "zoom-in"] as const;

  sections.forEach((section, sectionIndex) => {
    // Animate section container itself.
    if (!section.dataset.aos) {
      section.dataset.aos = sectionPattern[sectionIndex % sectionPattern.length];
    }
    if (!section.dataset.aosDuration) {
      section.dataset.aosDuration = "700";
    }
    if (!section.dataset.aosEasing) {
      section.dataset.aosEasing = "ease-out-cubic";
    }

    // Animate meaningful children inside same section with mixed styles.
    const items = section.querySelectorAll<HTMLElement>(
      ":scope h1, :scope h2, :scope h3, :scope p, :scope .grid > *, :scope .flex > *, :scope ul > li, :scope article, :scope [data-aos-item]"
    );

    items.forEach((item, itemIndex) => {
      if (!item.dataset.aos) {
        item.dataset.aos = itemPattern[itemIndex % itemPattern.length];
      }
      if (!item.dataset.aosDuration) {
        item.dataset.aosDuration = "650";
      }
      if (!item.dataset.aosDelay) {
        item.dataset.aosDelay = String(Math.min(itemIndex * 70, 350));
      }
      if (!item.dataset.aosEasing) {
        item.dataset.aosEasing = "ease-out-cubic";
      }
    });
  });
}

export default function AosProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 70,
      duration: 700,
      easing: "ease-out-cubic",
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    applyAutoAosAttributes();
    AOS.refreshHard();
  }, [pathname]);

  return <>{children}</>;
}
