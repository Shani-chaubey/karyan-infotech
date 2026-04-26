interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
  centered = false,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      {subtitle && (
        <p
          className={`text-sm font-semibold uppercase tracking-widest mb-2 ${
            light ? "text-[#c9a84c]" : "text-[#c9a84c]"
          }`}
        >
          {subtitle}
        </p>
      )}
      <h2
        className={`text-3xl md:text-4xl font-bold leading-tight ${
          light ? "text-white" : "text-[#1a1a2e]"
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-3 h-[3px] w-14 bg-[#c9a84c] ${
          centered ? "mx-auto" : ""
        }`}
      />
      {description && (
        <p
          className={`mt-5 text-base leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          } ${light ? "text-gray-300" : "text-[#7a7a7a]"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
