/** Shared left-aligned section title block for the luxury homepage. */
const EYEBROW_CLASS =
  "text-xs font-semibold uppercase tracking-[0.25em]";

const TITLE_CLASS =
  "font-display mt-3 text-2xl font-medium leading-snug tracking-normal";

type Props = {
  title: string;
  eyebrow?: string;
  /** Pill-style label (e.g. philosophy badge) — shown instead of eyebrow when set. */
  badge?: string;
  description?: string;
  variant?: "light" | "dark";
  className?: string;
};

export default function HomeSectionHeading({
  title,
  eyebrow,
  badge,
  description,
  variant = "light",
  className = "",
}: Props) {
  const eyebrowTone =
    variant === "dark" ? "text-lux-gold-bright" : "text-lux-gold-dim";
  const titleTone = variant === "dark" ? "text-white" : "text-lux-navy";
  const descriptionTone =
    variant === "dark" ? "text-stone-400" : "text-stone-600";

  const showBadge = Boolean(badge?.trim());
  const showEyebrow = Boolean(eyebrow?.trim()) && !showBadge;

  return (
    <div className={`max-w-2xl text-left ${className}`.trim()}>
      {showBadge ? (
        <span className="inline-flex items-center rounded-full border border-lux-gold/30 bg-lux-ivory/90 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.25em] text-lux-gold-dim shadow-sm backdrop-blur">
          {badge}
        </span>
      ) : null}
      {showEyebrow ? (
        <p className={`${EYEBROW_CLASS} ${eyebrowTone}`}>{eyebrow}</p>
      ) : null}
      <h2
        className={`${TITLE_CLASS} ${titleTone} ${showBadge ? "mt-4" : ""}`.trim()}
      >
        {title}
      </h2>
      {description?.trim() ? (
        <p className={`mt-4 text-sm leading-relaxed sm:text-base ${descriptionTone}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
