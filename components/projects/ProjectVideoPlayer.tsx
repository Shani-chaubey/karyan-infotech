"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";

export default function ProjectVideoPlayer({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
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
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      >
        Your browser does not support the video tag.
      </video>
      <button
        type="button"
        onClick={handleToggle}
        className="absolute inset-0 flex items-center justify-center"
        aria-label={isPlaying ? "Pause project video" : "Play project video"}
      >
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-black/55 text-white shadow-xl ring-1 ring-white/30 transition group-hover:scale-105">
          {isPlaying ? (
            <Pause className="h-7 w-7" />
          ) : (
            <Play className="ml-0.5 h-7 w-7 fill-current" />
          )}
        </span>
      </button>
    </div>
  );
}
