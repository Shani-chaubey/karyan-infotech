/** Trim and drop empty slots; preserves order and duplicate ids. */
export function normalizePresenceCityIds(ids: unknown[] | string[]): string[] {
  return ids
    .map((id) => (typeof id === "string" ? id.trim() : ""))
    .filter((id) => id.length > 0);
}
