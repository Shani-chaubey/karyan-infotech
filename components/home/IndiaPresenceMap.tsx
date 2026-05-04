"use client";

import { useEffect, useRef, useState } from "react";
import DottedMap from "dotted-map/without-countries";
import indiaMapData from "@/lib/cms/indiaMapPrecomputed.json";

export type PresenceCity = {
  id: string;
  label: string;
  lat: number;
  lon: number;
};

type Props = {
  cities: PresenceCity[];
  dotColor?: string;
  markerColor?: string;
  width?: number;
  height?: number;
};

export default function IndiaPresenceMap({
  cities,
  dotColor = "#c8c5be",
  markerColor = "#2c2c2c",
  width = 520,
  height = 600,
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [hoveredCity, setHoveredCity] = useState<PresenceCity | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!mapRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = new DottedMap({ map: indiaMapData as any });

    cities.forEach((city) => {
      map.addPin({
        lat: city.lat,
        lng: city.lon,
        svgOptions: { color: markerColor, radius: 0.6 },
        data: city,
      });
    });

    const svgString = map.getSVG({
      radius: 0.3,
      color: dotColor,
      shape: "circle",
      backgroundColor: "transparent",
    });

    mapRef.current.innerHTML = svgString;

    const svg = mapRef.current.querySelector("svg");
    if (!svg) return;

    // Make SVG fill the container
    svg.setAttribute("width", String(width));
    svg.setAttribute("height", String(height));
    svg.style.display = "block";

    const circles = Array.from(svg.querySelectorAll("circle"));
    // Pins are the last N circles added
    const pinCircles = circles.slice(-cities.length);

    pinCircles.forEach((circle, idx) => {
      const city = cities[idx];
      if (!city) return;

      circle.style.cursor = "pointer";
      const originalR = circle.getAttribute("r") ?? "0.6";

      circle.addEventListener("mouseenter", (e) => {
        circle.setAttribute("r", String(parseFloat(originalR) * 2));
        setHoveredCity(city);
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (rect) {
          setTooltipPos({
            x: (e as MouseEvent).clientX - rect.left,
            y: (e as MouseEvent).clientY - rect.top,
          });
        }
      });

      circle.addEventListener("mousemove", (e) => {
        const rect = wrapperRef.current?.getBoundingClientRect();
        if (rect) {
          setTooltipPos({
            x: (e as MouseEvent).clientX - rect.left,
            y: (e as MouseEvent).clientY - rect.top,
          });
        }
      });

      circle.addEventListener("mouseleave", () => {
        circle.setAttribute("r", originalR);
        setHoveredCity(null);
      });
    });
  }, [cities, dotColor, markerColor, width, height]);

  return (
    <div ref={wrapperRef} className="relative" style={{ width, height }}>
      {/* SVG map injected here */}
      <div ref={mapRef} className="h-full w-full" />

      {/* Hover tooltip */}
      {hoveredCity && (
        <div
          className="pointer-events-none absolute z-50 whitespace-nowrap rounded-md bg-stone-900 px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-white shadow-lg"
          style={{
            left: tooltipPos.x + 14,
            top: tooltipPos.y - 36,
          }}
        >
          {hoveredCity.label}
          {/* Arrow */}
          <span
            className="absolute left-3 top-full block h-0 w-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-stone-900"
          />
        </div>
      )}
    </div>
  );
}
