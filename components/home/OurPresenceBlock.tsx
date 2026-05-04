import type { HomePresenceBand } from "@/lib/cms/types";
import { getIndiaPresenceCity } from "@/lib/cms/indiaPresenceCities";
import IndiaPresenceMap from "./IndiaPresenceMap";

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
      return { id: c.id, label: c.label, lat: c.lat, lon: c.lon };
    })
    .filter(Boolean) as { id: string; label: string; lat: number; lon: number }[];

  const heading = band.heading.trim() || "Our Presence";

  return (
    <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:justify-center">
      {/* Canvas map */}
      <div className="shrink-0">
        <IndiaPresenceMap cities={resolved} width={480} height={560} />
      </div>

      {/* City list */}
      <div className="flex flex-col items-center lg:items-start">
        <h3 className="font-display text-3xl font-light uppercase tracking-[0.3em] text-stone-800 sm:text-4xl">
          {heading}
        </h3>
        {resolved.length ? (
          <ul className="mt-8 space-y-2">
            {resolved.map(({ id, label }) => (
              <li
                key={id}
                className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-stone-500 lg:text-left"
              >
                {label}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-sm text-stone-400">
            Add cities from the admin home editor to plot them on the map.
          </p>
        )}
      </div>
    </div>
  );
}
