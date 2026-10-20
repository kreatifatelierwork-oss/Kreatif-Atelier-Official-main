"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { StepCopy } from "@/content/approach";
import { stepWireLabels as L } from "@/content/approach";
import { useReducedMotion } from "@/lib/a11y/useReducedMotion";
import { config } from "@/lib/config";
import { ScrollTrigger, gsap } from "@/lib/scroll/gsap";

type Pt = { x: number; y: number };

/** A step's face: its node on the wire, number, title and short line. */
function StepFace({ step, i }: { step: StepCopy; i: number }) {
  return (
    <>
      <span aria-hidden="true" data-sw-node className="sw-step__node" />
      <span className="sw-step__num">{String(i + 1).padStart(2, "0")}</span>
      <span className="sw-step__title">{step.title}</span>
      <span className="sw-step__line">{step.line}</span>
    </>
  );
}

/**
 * The path through every node: gentle alternating curves so it reads as a wire, not a ruler. `loop` adds a
 * return run on the outer side from the last node back up to the first.
 */
function buildPath(pts: Pt[], horizontal: boolean, loop: boolean, sag: number) {
  if (pts.length === 0) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const s = sag * (i % 2 ? 1 : -1);
    if (horizontal) {
      const dx = b.x - a.x;
      d += ` C ${a.x + dx / 3} ${a.y + s} ${b.x - dx / 3} ${b.y + s} ${b.x} ${b.y}`;
    } else {
      const dy = b.y - a.y;
      d += ` C ${a.x + s} ${a.y + dy / 3} ${b.x + s} ${b.y - dy / 3} ${b.x} ${b.y}`;
    }
  }
  if (loop && pts.length > 1) {
    const first = pts[0];
    const last = pts[pts.length - 1];
    // Swing out on the gutter side, but never past the box edge.
    const out = Math.max(10, Math.min(sag * 3.2, (first.x - 6) / 1.2));
    d += ` C ${last.x - out} ${last.y + out * 0.6} ${first.x - out * 1.2} ${last.y} ${first.x - out * 1.2} ${(first.y + last.y) / 2}`;
    d += ` S ${first.x - out} ${first.y - out * 0.7} ${first.x - 2} ${first.y - 10}`;
  }
  return d;
}

/**
 * Steps as separate raised buttons on the page, joined by a wire that draws itself as the section scrolls
 * (GSAP ScrollTrigger, scrubbed in step with Lenis; the page is never hijacked). A gold bead rides the head
 * of the line; each node lights, and its card lifts, as the line reaches it, and stays lit. Choosing a step
 * opens its detail in the inset panel below. `layout="row"`: a row from lg up, a vertical timeline below.
 * `loop`: the wire returns from the last step to the first. Reduced motion: drawn, all lit, no motion.
 * Styles: `.sw*` in styles/design/stepwire.css; timing in config.stepWire.
 */
export function StepWire({ steps, layout = "column", loop = false, label }: { steps: StepCopy[]; layout?: "row" | "column"; loop?: boolean; label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const line = useRef<SVGPathElement>(null);
  const bead = useRef<SVGGElement>(null);
  const arrow = useRef<SVGPathElement>(null);
  const reduced = useReducedMotion();
  const [d, setD] = useState("");
  const [lit, setLit] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const fractions = useRef<number[]>([]);
  const progress = useRef({ p: 0 });
  const uid = useId();
  const detailId = `${uid}-detail`;

  // Measure the nodes and rebuild the wire whenever the layout changes.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const b = el.getBoundingClientRect();
      const nodes = [...el.querySelectorAll<HTMLElement>("[data-sw-node]")];
      const pts = nodes.map((n) => {
        const r = n.getBoundingClientRect();
        return { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top };
      });
      const horizontal = pts.length > 1 && Math.abs(pts[1].y - pts[0].y) < Math.abs(pts[1].x - pts[0].x);
      setD(buildPath(pts, horizontal, loop, config.stepWire.sag));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [loop, steps.length]);

  // Where each node sits along the wire (0–1), and the draw itself.
  useEffect(() => {
    const path = line.current;
    if (!path || !d) return;
    const len = path.getTotalLength();
    const el = box.current!;
    const b = el.getBoundingClientRect();
    const nodes = [...el.querySelectorAll<HTMLElement>("[data-sw-node]")].map((n) => {
      const r = n.getBoundingClientRect();
      return { x: r.left + r.width / 2 - b.left, y: r.top + r.height / 2 - b.top };
    });
    const samples = 240;
    const pts = Array.from({ length: samples + 1 }, (_, i) => path.getPointAtLength((len * i) / samples));
    fractions.current = nodes.map((n) => {
      let best = 0;
      let bestD = Infinity;
      // The loop passes the first node twice: take its first pass.
      pts.forEach((p, i) => {
        const dd = (p.x - n.x) ** 2 + (p.y - n.y) ** 2;
        if (dd < bestD - 0.5) {
          bestD = dd;
          best = i / samples;
        }
      });
      return best;
    });
    path.style.strokeDasharray = `${len}`;
    // The loop's arrowhead, pointing along the wire's last direction.
    if (loop && arrow.current) {
      const e0 = path.getPointAtLength(len - 8);
      const e1 = path.getPointAtLength(len);
      const ang = Math.atan2(e1.y - e0.y, e1.x - e0.x);
      const k = 7;
      arrow.current.setAttribute("d", `M ${e1.x - k * Math.cos(ang - 0.5)} ${e1.y - k * Math.sin(ang - 0.5)} L ${e1.x} ${e1.y} L ${e1.x - k * Math.cos(ang + 0.5)} ${e1.y - k * Math.sin(ang + 0.5)}`);
    }
    const draw = (p: number) => {
      path.style.strokeDashoffset = `${len * (1 - p)}`;
      const head = path.getPointAtLength(len * p);
      if (bead.current) {
        bead.current.setAttribute("transform", `translate(${head.x} ${head.y})`);
        bead.current.style.opacity = p > 0.002 && p < 0.998 ? "1" : "0";
      }
      if (arrow.current) arrow.current.style.opacity = p > 0.97 ? "1" : "0";
      const count = fractions.current.filter((f) => p >= f - 0.002).length;
      setLit((c) => Math.max(c, count));
    };
    if (reduced) {
      draw(1);
      return;
    }
    draw(progress.current.p);
    const tween = gsap.to(progress.current, {
      p: 1,
      ease: "none",
      onUpdate: () => draw(progress.current.p),
      scrollTrigger: { trigger: el, start: config.stepWire.start, end: config.stepWire.end, scrub: config.stepWire.scrub },
    });
    ScrollTrigger.refresh();
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [d, reduced, loop]);

  const current = open !== null ? steps[open] : null;

  return (
    <div ref={box} className="sw" data-layout={layout} data-loop={loop || undefined} style={{ ["--sw-count" as string]: steps.length }}>
      <svg aria-hidden="true" className="sw__wire">
        <defs>
          <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" className="sw-stop-a" />
            <stop offset="0.5" className="sw-stop-b" />
            <stop offset="1" className="sw-stop-c" />
          </linearGradient>
          <radialGradient id={`${uid}-glow`}>
            <stop offset="0" className="sw-glow-core" />
            <stop offset="1" className="sw-glow-edge" />
          </radialGradient>
        </defs>
        <path d={d} className="sw__track" />
        <path ref={line} d={d} className="sw__line" stroke={`url(#${uid}-gold)`} />
        {loop && <path ref={arrow} className="sw__arrow" />}
        <g ref={bead} className="sw__bead">
          <circle r="10" fill={`url(#${uid}-glow)`} />
          <circle r="3.5" className="sw__bead-core" />
        </g>
      </svg>

      <ol aria-label={label} className="sw__list">
        {steps.map((step, i) => (
          <li key={step.title} className="sw__item">
            {step.detail ? (
              <button
                type="button"
                className="sw-step"
                data-lit={i < lit || undefined}
                aria-expanded={open === i}
                aria-controls={detailId}
                onClick={() => setOpen((o) => (o === i ? null : i))}
              >
                <StepFace step={step} i={i} />
              </button>
            ) : (
              <div className="sw-step" data-lit={i < lit || undefined}>
                <StepFace step={step} i={i} />
              </div>
            )}
          </li>
        ))}
      </ol>
      {loop && <p className="sw__note">{L.loopNote}</p>}

      {steps.some((s) => s.detail) && (
        <div id={detailId} role="region" aria-live="polite" aria-label={current?.title} className="sw__detail" data-open={current ? "" : undefined}>
          {current?.detail && (
            <div key={current.title} className="sw__detail-body">
              <p className="ds-label">{L.outcome}</p>
              <p className="sw__detail-outcome">{current.detail.outcome}</p>
              <p className="ds-label mt-[var(--ds-space-4)]">{L.deliverables}</p>
              <ul className="sw__detail-list">
                {current.detail.deliverables.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
