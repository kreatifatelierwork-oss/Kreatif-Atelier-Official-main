"use client";

import { useEffect, useRef, useState } from "react";
import { config } from "@/lib/config";

type Ring = { id: number; x: number; y: number };

const W = 400;
const H = 260;
/** People round the water's edge, in the drawings' colours. */
const PEOPLE: [number, number, number, string][] = [
  [52, 112, 11, "a-art-fill"],
  [96, 70, 9, "a-art-fill--clay"],
  [306, 64, 10, "a-art-fill"],
  [356, 110, 12, "a-art-fill--ivory"],
  [370, 214, 9, "a-art-fill--clay"],
  [34, 216, 10, "a-art-fill--ivory"],
];

/**
 * It starts with you: still water with people round its edge and the ✦ at its centre. While it is in view a stone drops
 * somewhere on the water every so often and rings run out from it; a click drops one where it lands. Decorative.
 * Reduced motion: the water stays still.
 */
export function Ripple({ className = "" }: { className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const next = useRef(0);
  const [rings, setRings] = useState<Ring[]>([]);

  const dropAt = (x: number, y: number) => {
    const id = next.current++;
    setRings((all) => [...all.slice(-5), { id, x, y }]);
    window.setTimeout(() => setRings((all) => all.filter((ring) => ring.id !== id)), 2600);
  };

  const drop = (event: React.MouseEvent) => {
    const box = svg.current?.getBoundingClientRect();
    if (!box) return;
    dropAt(((event.clientX - box.left) / box.width) * W, ((event.clientY - box.top) / box.height) * H);
  };

  // On its own: a stone somewhere on the water every `rippleEvery` ms while the pond is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number | undefined;
    let k = 0;
    const spots = [
      [200, 150],
      [130, 168],
      [270, 140],
      [176, 128],
      [242, 172],
    ];
    const tick = () => {
      const [x, y] = spots[k++ % spots.length];
      dropAt(x, y);
      timer = window.setTimeout(tick, config.drawings.rippleEvery);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer);
        if (entry.isIntersecting) timer = window.setTimeout(tick, config.drawings.delay);
      },
      { threshold: config.drawings.threshold },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <div ref={root} onClick={drop} className={`a-play ${className}`}>
      <svg
        ref={svg}
        viewBox={`0 0 ${W} ${H}`}
        aria-hidden="true"
        focusable="false"
        className="a-scene block h-auto w-full"
        fill="none"
        stroke="#1c2526"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <ellipse cx="200" cy="150" rx="176" ry="78" className="a-art-fill--sand" />
        <ellipse cx="200" cy="150" rx="120" ry="48" stroke="#0e3b3a" strokeOpacity="0.18" strokeWidth="2" />
        <ellipse cx="200" cy="150" rx="66" ry="24" stroke="#0e3b3a" strokeOpacity="0.24" strokeWidth="2" />
        {rings.map((ring) => (
          <g key={ring.id}>
            {[0, 1, 2].map((k) => (
              <ellipse
                key={k}
                cx={ring.x}
                cy={ring.y}
                rx={150 - k * 40}
                ry={56 - k * 15}
                stroke="#e9a23b"
                strokeWidth={4 - k}
                className="a-ripple"
                style={{ animationDelay: `${k * 0.18}s` }}
              />
            ))}
          </g>
        ))}
        <path
          className="a-art-fill"
          stroke="none"
          d="M200 122C204 146 204 146 228 150C204 154 204 154 200 178C196 154 196 154 172 150C196 146 196 146 200 122Z"
        />
        {PEOPLE.map(([cx, cy, r, fill]) => (
          <g key={`${cx}-${cy}`}>
            <circle cx={cx} cy={cy} r={r} className={fill} />
            <path d={`M${cx - r * 1.4} ${cy + r * 2.6}q${r * 1.4} -${r * 2.2} ${r * 2.8} 0`} />
          </g>
        ))}
      </svg>
    </div>
  );
}
