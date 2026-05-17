/** Slugs that must not be used for CMS content pages (static app routes). */
export const RESERVED_ROUTE_SLUGS = new Set([
  "about",
  "contact",
  "projects",
  "blog",
  "thank-you",
  "admin",
  "api",
]);

export function normalizeContentPageSlug(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}
