/** Plain-text fallback when a field may contain HTML (e.g. Jodit excerpt). */
export function stripHtml(html: string): string {
  if (!html || typeof html !== "string") return "";
  if (!html.includes("<") && !html.includes(">")) return html.trim();
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
