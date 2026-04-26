"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { num: 15, label: "years of experience in developing residential, commercial, and township projects" },
  { num: 280, label: "Acre of land bank being transformed into the largest township in Delhi- NCR" },
  { num: 23000, label: "Sq mtr of commercial space including retail, office, restaurant and banquets" },
  { num: 8, label: "Plus Projects delivered to satisfied customers" },
];

function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const step = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold" style={{ color: "#F7B90F" }}>
      {count.toLocaleString()}
    </div>
  );
}

export default function StatsSection() {
  return (
    <section style={{ background: "#ffffff" }} className="py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2
            className="font-bold"
            style={{ color: "#292929", fontSize: "clamp(22px, 3vw, 36px)" }}
          >
            Schedule A Free Site Visit
          </h2>
          <div className="w-10 h-0.5 mx-auto mt-3" style={{ background: "#F7B90F" }} />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6"
              style={{ borderRight: "1px solid #eee" }}
            >
              <AnimatedCounter target={stat.num} />
              <p
                className="text-xs leading-relaxed mt-3 uppercase tracking-wide font-medium"
                style={{ color: "#5e646a" }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
