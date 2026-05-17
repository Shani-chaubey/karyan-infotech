"use client";

import { useMemo, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { resolveProjectVideoUrl } from "@/lib/video/resolveVideoEmbed";

function NativeVideoPlayer({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = async () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      try {
        el.muted = false;
        await el.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      el.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="group relative">
      <video
        ref={videoRef}
        preload="metadata"
        poster={poster}
        className="h-auto w-full"
        src={src}
        playsInline
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        Your browser does not support the video tag.
      </video>
      <button
        type="button"
        onClick={handleToggle}
        className="absolute inset-0 flex items-center justify-center bg-black/0 transition group-hover:bg-black/10"
        aria-label={isPlaying ? "Pause project video" : "Play project video"}
      >
        {!isPlaying ? (
          <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-black/55 text-white shadow-xl ring-1 ring-white/30 transition group-hover:scale-105">
            <Play className="ml-0.5 h-7 w-7 fill-current" />
          </span>
        ) : null}
      </button>
    </div>
  );
}

function EmbedVideoPlayer({ embedUrl, title }: { embedUrl: string; title: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      <iframe
        src={embedUrl}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}

export default function ProjectVideoPlayer({
  src,
  poster,
  title = "Project video",
}: {
  src: string;
  poster?: string;
  title?: string;
}) {
  const resolved = useMemo(() => resolveProjectVideoUrl(src), [src]);

  if (!resolved) return null;

  if (resolved.kind === "embed") {
    return <EmbedVideoPlayer embedUrl={resolved.embedUrl} title={title} />;
  }

  return <NativeVideoPlayer src={resolved.src} poster={poster} />;
}
