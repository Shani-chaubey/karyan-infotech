"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { stripHtml } from "@/lib/html/stripHtml";

const FALLBACK_IMAGE = "/images/avenue-iv.jpg";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  href: string;
  image: string;
}

export default function BlogCard({ title, excerpt, date, category, href, image }: BlogCardProps) {
  const plainExcerpt = stripHtml(excerpt);
  const [imgSrc, setImgSrc] = useState(image || FALLBACK_IMAGE);

  return (
    <article className="group bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden" style={{ height: "200px" }}>
        <Image
          src={imgSrc}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-bold uppercase px-2.5 py-1 text-white bg-[linear-gradient(135deg,#a07c3a,#c6a96a)]">
            {category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div
          className="flex items-center gap-1.5 text-xs mb-2"
          style={{ color: "#999" }}
        >
          <Calendar className="w-3.5 h-3.5" />
          {date}
        </div>
        <h3
          className="font-bold text-base mb-2 leading-snug line-clamp-2 group-hover:text-[#F7B90F] transition-colors"
          style={{ color: "#292929" }}
        >
          <Link href={href}>{title}</Link>
        </h3>
        <p
          className="text-sm leading-relaxed line-clamp-3 mb-4"
          style={{ color: "#5e646a" }}
        >
          {plainExcerpt}
        </p>
        <Link
          href={href}
          className="text-xs font-bold uppercase tracking-wider hover:opacity-80 transition-opacity"
          style={{ color: "#a88544" }}
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
