function looksLikeHtml(s: string): boolean {
  return /<[a-z][\s\S]*?>/i.test(s.trim());
}

const PROSE =
  "space-y-2 text-sm leading-relaxed text-stone-700 [&_a]:font-semibold [&_a]:text-lux-gold-dim [&_a]:underline-offset-2 [&_h3]:mb-2 [&_h3]:mt-4 [&_h3]:font-display [&_h3]:text-base [&_h3]:text-lux-navy [&_li]:my-1.5 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:my-2 [&_strong]:font-semibold [&_strong]:uppercase [&_strong]:tracking-[0.15em] [&_strong]:text-lux-gold-dim [&_ul]:my-3 [&_ul]:list-none [&_ul]:space-y-3 [&_ul]:pl-0";

/** Renders CMS HTML for the home location section. */
export default function LocationRichHtml({ html, className = "" }: { html: string; className?: string }) {
  const raw = html.trim();
  if (!raw) return null;

  if (looksLikeHtml(raw)) {
    return (
      <div
        className={`${PROSE} ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: raw }}
      />
    );
  }

  return (
    <p className={`text-sm leading-relaxed text-stone-700 ${className}`.trim()}>{raw}</p>
  );
}
