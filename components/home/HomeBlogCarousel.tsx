"use client";

import Image from "next/image";
import Link from "next/link";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { stripHtml } from "@/lib/html/stripHtml";
import type { BlogPostPayload } from "@/lib/cms/types";

import "swiper/css";
import "swiper/css/navigation";

export default function HomeBlogCarousel({
  posts,
}: {
  posts: BlogPostPayload[];
}) {
  return (
    <div className="relative">
      <div className="mb-5 flex justify-end gap-2">
        <button
          type="button"
          className="home-blog-prev inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] text-white transition hover:border-lux-gold/45 hover:text-lux-gold-bright"
          aria-label="Previous blogs"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          className="home-blog-next inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/[0.08] text-white transition hover:border-lux-gold/45 hover:text-lux-gold-bright"
          aria-label="Next blogs"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={{ prevEl: ".home-blog-prev", nextEl: ".home-blog-next" }}
        spaceBetween={20}
        slidesPerView={1.1}
        autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 22 },
          1024: { slidesPerView: 3, spaceBetween: 24 },
        }}
        className="w-full"
      >
        {posts.map((post) => {
          const plainExcerpt = stripHtml(post.excerpt).trim();
          return (
            <SwiperSlide key={post.slug} className="h-auto">
              <Link
                href={post.href}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] transition hover:border-lux-gold/35 hover:bg-white/[0.1]"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/90">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-400">
                    {post.date}
                  </p>
                  <h3 className="mt-2 line-clamp-2 text-lg font-medium text-white group-hover:text-lux-gold-bright">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-stone-300">
                    {plainExcerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-lux-gold-bright">
                    Read
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
