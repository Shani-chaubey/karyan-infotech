"use client";

import { useEffect, useRef } from "react";
import Swiper from "swiper/bundle";
import CmsImage from "@/components/ui/CmsImage";

export default function SplitContactGallery({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const slides = images.filter((img) => img.src?.trim());

  useEffect(() => {
    if (slides.length < 2) return;
    const el = rootRef.current?.querySelector(".split-contact-swiper");
    if (!el) return;

    const swiper = new Swiper(el as HTMLElement, {
      loop: slides.length > 1,
      speed: 900,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false,
      },
      pagination: {
        el: rootRef.current?.querySelector(".split-contact-pagination") as HTMLElement,
        clickable: true,
      },
    });

    return () => {
      swiper.destroy(true, true);
    };
  }, [slides.length]);

  if (!slides.length) {
    return (
      <div className="flex aspect-[21/9] min-h-[240px] w-full items-center justify-center bg-stone-200 text-sm text-stone-500 sm:min-h-[320px] lg:min-h-[400px]">
        Add gallery images or a video in Admin → Home → Split contact.
      </div>
    );
  }

  if (slides.length === 1) {
    const img = slides[0];
    return (
      <div className="relative aspect-[21/9] min-h-[240px] w-full overflow-hidden sm:min-h-[320px] lg:min-h-[400px]">
        <CmsImage
          src={img.src}
          alt={img.alt || "Sales gallery"}
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
      </div>
    );
  }

  return (
    <div ref={rootRef} className="relative aspect-[21/9] min-h-[240px] w-full overflow-hidden sm:min-h-[320px] lg:min-h-[400px]">
      <div className="split-contact-swiper absolute inset-0 h-full w-full">
        <div className="swiper-wrapper">
          {slides.map((img) => (
            <div
              key={img.src}
              className="swiper-slide relative h-full min-h-[240px] sm:min-h-[320px] lg:min-h-[400px]"
            >
              <CmsImage
                src={img.src}
                alt={img.alt || "Sales gallery"}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="split-contact-pagination absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet-active]:bg-white" />
    </div>
  );
}
