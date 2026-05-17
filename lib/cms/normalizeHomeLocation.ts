import type { HomePayload } from "./types";

type LegacyLocation = HomePayload["location"] & {
  bullets?: { icon: string; text: string }[];
  corridorsTitle?: string;
  corridors?: { corridor: string; projects: string }[];
};

export type NormalizedHomeLocation = HomePayload["location"];

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function legacyBulletsToHtml(bullets: { icon: string; text: string }[]): string {
  if (!bullets.length) return "";
  const items = bullets
    .filter((b) => b.text?.trim())
    .map((b) => `<li>${escapeHtml(b.text.trim())}</li>`)
    .join("");
  return items ? `<ul>${items}</ul>` : "";
}

function legacyCorridorsToHtml(
  title: string,
  rows: { corridor: string; projects: string }[]
): string {
  if (!rows.length && !title.trim()) return "";
  const heading = title.trim()
    ? `<p><strong>${escapeHtml(title.trim())}</strong></p>`
    : "";
  const items = rows
    .filter((r) => r.corridor?.trim() || r.projects?.trim())
    .map(
      (r) =>
        `<li><span>${escapeHtml(r.corridor.trim())}</span> — <span>${escapeHtml(r.projects.trim())}</span></li>`
    )
    .join("");
  const list = items ? `<ul>${items}</ul>` : "";
  return `${heading}${list}`.trim();
}

/** Ensures location uses HTML fields; maps legacy bullets/corridors when needed. */
export function normalizeHomeLocation(raw: LegacyLocation): NormalizedHomeLocation {
  const bulletsHtml =
    raw.bulletsHtml?.trim() ||
    legacyBulletsToHtml(raw.bullets ?? []);
  const corridorsHtml =
    raw.corridorsHtml?.trim() ||
    legacyCorridorsToHtml(raw.corridorsTitle ?? "Corridors", raw.corridors ?? []);

  const ctaButtons =
    raw.ctaButtons?.length
      ? raw.ctaButtons.filter((b) => b.label?.trim())
      : [{ label: "Plan a site tour" }];

  return {
    eyebrow: raw.eyebrow ?? "",
    title: raw.title ?? "",
    body: raw.body ?? "",
    bulletsHtml,
    corridorsHtml,
    ctaButtons,
  };
}
