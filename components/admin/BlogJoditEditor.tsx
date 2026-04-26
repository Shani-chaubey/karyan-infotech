"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";

import "jodit/es2021/jodit.min.css";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-stone-200 bg-stone-50 text-sm text-stone-500">
      Loading editor…
    </div>
  ),
});

type Variant = "article" | "excerpt";

export default function BlogJoditEditor({
  value,
  onChange,
  variant = "article",
  id,
}: {
  value: string;
  onChange: (html: string) => void;
  variant?: Variant;
  id?: string;
}) {
  const config = useMemo(() => {
    if (variant === "excerpt") {
      return {
        height: 160,
        toolbarButtonSize: "small" as const,
        toolbarAdaptive: false,
        showCharsCounter: false,
        showWordsCounter: false,
        askBeforePasteFromWord: false,
        buttons:
          "bold,italic,underline,strikethrough,eraser,|,brush,paragraph,|,link,|,ul,ol,|,undo,redo",
        placeholder: "Short summary for cards and search…",
      };
    }
    return {
      height: 420,
      toolbarSticky: false,
      askBeforePasteFromWord: false,
      placeholder: "Write the full article. Images: paste a public image URL or use the link tool.",
    };
  }, [variant]);

  return (
    <div className="jodit-admin-wrap overflow-hidden rounded-xl border border-stone-200 bg-white shadow-inner [&_.jodit-container]:!border-none [&_.jodit-workplace]:!min-h-0">
      <JoditEditor id={id} value={value} config={config} onChange={onChange} />
    </div>
  );
}
