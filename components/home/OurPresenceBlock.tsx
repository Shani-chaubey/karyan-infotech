import type { HomePresenceBand } from "@/lib/cms/types";
import {
  getIndiaPresenceCity,
  INDIA_REGION_ELLIPSES,
  projectIndiaPresenceToMapPercent,
  type IndiaMapRegionId,
} from "@/lib/cms/indiaPresenceCities";

function uniqueCityIds(ids: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const id of ids) {
    if (!id || seen.has(id)) continue;
    seen.add(id);
    out.push(id);
  }
  return out;
}

export default function OurPresenceBlock({ band }: { band: HomePresenceBand }) {
  const cityIds = uniqueCityIds(band.cityIds);
  const resolved = cityIds
    .map((id) => {
      const c = getIndiaPresenceCity(id);
      if (!c) return null;
      const pos = projectIndiaPresenceToMapPercent(c.lat, c.lon);
      return { id, label: c.label, region: c.region, ...pos };
    })
    .filter(Boolean) as {
    id: string;
    label: string;
    region: IndiaMapRegionId;
    x: number;
    y: number;
  }[];

  const activeRegions = Array.from(new Set(resolved.map((r) => r.region)));

  const heading = band.heading.trim() || "Our presence";

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
      <div
        className="relative mx-auto aspect-[4/5] w-full max-w-md lg:mx-0"
        aria-label="India presence map"
      >
        <div className="absolute inset-0 rounded-[2rem] border border-stone-200/80 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]" />
        <div
          className="absolute inset-5 rounded-[1.75rem] border border-stone-100 bg-stone-50/80"
          style={{
            backgroundImage: "radial-gradient(circle, #c4c2bc 1.1px, transparent 1.1px)",
            backgroundSize: "9px 9px",
          }}
        />
        <div className="pointer-events-none absolute inset-5 rounded-[1.75rem] shadow-[inset_0_0_80px_rgba(255,255,255,0.65)]" />

        {/* Light golden region highlights (same 0–100 space as markers) */}
        <svg
          className="pointer-events-none absolute inset-5 h-full w-full overflow-visible rounded-[1.75rem]"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <radialGradient id="presenceRegionGold" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#c6a96a" stopOpacity="0.42" />
              <stop offset="55%" stopColor="#d9c49a" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#e8dcc4" stopOpacity="0" />
            </radialGradient>
          </defs>
          {activeRegions.map((rid) => {
            const e = INDIA_REGION_ELLIPSES[rid];
            if (!e) return null;
            return (
              <ellipse
                key={rid}
                cx={e.cx}
                cy={e.cy}
                rx={e.rx}
                ry={e.ry}
                fill="url(#presenceRegionGold)"
              />
            );
          })}
        </svg>

        <div className="absolute inset-5">
          {resolved.map(({ id, label, x, y }) => (
            <div
              key={id}
              className="absolute z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-800 shadow-sm ring-2 ring-stone-800/25 ring-offset-2 ring-offset-white/90"
              style={{ left: `${x}%`, top: `${y}%` }}
              title={label}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-center text-center lg:text-left">
        <h3 className="font-display text-2xl font-medium uppercase tracking-[0.28em] text-lux-navy sm:text-3xl">
          {heading}
        </h3>
        {resolved.length ? (
          <ul className="mt-8 space-y-2.5">
            {resolved.map(({ id, label }) => (
              <li
                key={id}
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-600 sm:text-xs"
              >
                {label}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-stone-500">
            Add cities from the admin home editor to plot them on the map.
          </p>
        )}
      </div>
    </div>
  );
}
