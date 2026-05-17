export type ResolvedProjectVideo =
  | { kind: "embed"; embedUrl: string; provider: "youtube" | "vimeo" }
  | { kind: "file"; src: string };

function parseYouTubeId(raw: string): string | null {
  const input = raw.trim();
  if (!input) return null;

  try {
    const url = new URL(input.startsWith("//") ? `https:${input}` : input);
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();

    if (host === "youtu.be") {
      const id = url.pathname.replace(/^\//, "").split("/")[0];
      return id || null;
    }

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "youtube-nocookie.com"
    ) {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }
      const embed = url.pathname.match(/^\/embed\/([^/?#]+)/);
      if (embed?.[1]) return embed[1];
      const shorts = url.pathname.match(/^\/shorts\/([^/?#]+)/);
      if (shorts?.[1]) return shorts[1];
      const live = url.pathname.match(/^\/live\/([^/?#]+)/);
      if (live?.[1]) return live[1];
    }
  } catch {
    return null;
  }

  return null;
}

function parseVimeoId(raw: string): string | null {
  const input = raw.trim();
  if (!input) return null;

  try {
    const url = new URL(input.startsWith("//") ? `https:${input}` : input);
    const host = url.hostname.replace(/^www\./i, "").toLowerCase();
    if (host === "vimeo.com") {
      const id = url.pathname.replace(/^\//, "").split("/")[0];
      return /^\d+$/.test(id) ? id : null;
    }
    if (host === "player.vimeo.com") {
      const match = url.pathname.match(/^\/video\/(\d+)/);
      return match?.[1] ?? null;
    }
  } catch {
    return null;
  }

  return null;
}

/** Turn a CMS video URL into either an iframe embed or a direct file for `<video>`. */
export function resolveProjectVideoUrl(raw: string | undefined | null): ResolvedProjectVideo | null {
  const src = String(raw ?? "").trim();
  if (!src) return null;

  const youtubeId = parseYouTubeId(src);
  if (youtubeId) {
    return {
      kind: "embed",
      provider: "youtube",
      embedUrl: `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`,
    };
  }

  const vimeoId = parseVimeoId(src);
  if (vimeoId) {
    return {
      kind: "embed",
      provider: "vimeo",
      embedUrl: `https://player.vimeo.com/video/${vimeoId}`,
    };
  }

  return { kind: "file", src };
}
