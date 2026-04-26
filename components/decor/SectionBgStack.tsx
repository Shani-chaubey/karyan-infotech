import PropertySvgBackdrop from "@/components/decor/PropertySvgBackdrop";
import type { PropertyBackdropVariant } from "@/components/decor/PropertySvgBackdrop";

export type SectionBgLayer = {
  variant: PropertyBackdropVariant;
  /** Position/size — default full bleed `inset-0` */
  wrapClassName?: string;
  /** Opacity / blend on wrapper */
  opacityClassName?: string;
};

type SectionBgStackProps = {
  layers: SectionBgLayer[];
  /** Soft gold highlight from top */
  topGlow?: boolean;
  /** Soft lift from bottom */
  bottomGlow?: boolean;
  edgeFade?: "none" | "light" | "dark";
  /** Wide diagonal wash */
  diagonalSheen?: boolean;
  /** Fine grain (CSS, not SVG) */
  grain?: boolean;
};

/**
 * Stacked decorative backgrounds for sections — multiple SVG layers + CSS washes.
 */
export default function SectionBgStack({
  layers,
  topGlow = false,
  bottomGlow = false,
  edgeFade = "none",
  diagonalSheen = false,
  grain = false,
}: SectionBgStackProps) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
      aria-hidden
    >
      {layers.map((layer, i) => (
        <div
          key={`${layer.variant}-${i}`}
          className={`absolute ${layer.wrapClassName ?? "inset-0"} ${layer.opacityClassName ?? ""}`}
        >
          <PropertySvgBackdrop variant={layer.variant} />
        </div>
      ))}

      {topGlow && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_110%_55%_at_50%_-8%,rgba(228,199,107,0.16),transparent_52%)]" />
      )}
      {bottomGlow && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_45%_at_50%_108%,rgba(198,160,82,0.12),transparent_48%)]" />
      )}
      {diagonalSheen && (
        <div className="absolute -left-[20%] top-[-10%] h-[140%] w-[65%] rotate-[11deg] bg-gradient-to-br from-lux-gold/15 via-transparent to-transparent opacity-70" />
      )}
      {edgeFade === "light" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_88%_72%_at_50%_48%,transparent_32%,rgba(255,255,255,0.55)_100%)]" />
      )}
      {edgeFade === "dark" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_92%_78%_at_50%_50%,transparent_22%,rgba(10,22,40,0.5)_100%)]" />
      )}
      {grain && (
        <div
          className="absolute inset-0 opacity-[0.04] mix-blend-multiply"
          style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(10,22,40,0.06) 3px, rgba(10,22,40,0.06) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(10,22,40,0.05) 3px, rgba(10,22,40,0.05) 4px)`,
          }}
        />
      )}
    </div>
  );
}
