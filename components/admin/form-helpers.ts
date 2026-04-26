"use client";

export function parseLines(value: string): string[] {
  return value
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);
}

export function joinLines(values?: string[]): string {
  return (values ?? []).join("\n");
}

export function parsePipeObjects<T>(
  value: string,
  fields: string[],
  map: (obj: Record<string, string>) => T
): T[] {
  return parseLines(value).map((line) => {
    const parts = line.split("|").map((x) => x.trim());
    const obj: Record<string, string> = {};
    fields.forEach((f, i) => {
      obj[f] = parts[i] ?? "";
    });
    return map(obj);
  });
}

export function joinPipeObjects(
  values: Record<string, string>[] | undefined,
  fields: string[]
): string {
  return (values ?? [])
    .map((row) => fields.map((f) => row[f] ?? "").join(" | "))
    .join("\n");
}

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
