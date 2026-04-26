function looksLikeHtml(s: string): boolean {
  return /<[a-z][\s\S]*?>/i.test(s.trim());
}

export default function BlogArticleBody({ html }: { html: string }) {
  const raw = html.trim();
  if (!raw) return null;

  if (looksLikeHtml(raw)) {
    return (
      <div
        className="blog-article-prose space-y-4 text-base leading-relaxed text-[#3d4349] [&_a]:font-semibold [&_a]:text-[#c9a84c] [&_a]:underline-offset-2 [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-[#1a1a2e] [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-[#1a1a2e] [&_li]:my-1 [&_ol]:my-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-3 [&_ul]:my-3 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: raw }}
      />
    );
  }

  const paras = raw
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  return (
    <div className="space-y-5">
      {paras.map((para, i) => (
        <p key={i} className="text-base leading-relaxed" style={{ color: "#3d4349" }}>
          {para}
        </p>
      ))}
    </div>
  );
}
