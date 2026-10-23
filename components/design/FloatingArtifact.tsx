"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { liveCapable, useLive, type LiveKind } from "@/lib/artifacts/live";
import { config } from "@/lib/config";
import { springs } from "@/lib/design/tokens";

/** A small deterministic random sequence, so each artifact's float is its own and stable between renders. */
function seeded(seed: number) {
  let s = (seed * 9301 + 49297) % 233280 || 1;
  return () => (s = (s * 9301 + 49297) % 233280) / 233280;
}

/** Hover response limits (emil-design-eng / apple-design: physical, quick to settle, never a flourish). */
const TILT_DEG = 24;
const LIFT_PX = 34;
const SCALE = 0.07;
/** How far the contact shadow slides against the tilt, as a share of the artifact's width. */
const SHADOW_SHIFT = 0.08;
/** Grid (px) of the alpha probe, and the slack (cells) around painted pixels that still counts as over. */
const PROBE = 96;
const SLACK = 3;

type Props = {
  seed: number;
  /** Positioning classes for the outer box (left/top/width…). */
  className?: string;
  style?: CSSProperties;
  /** A picture child is hit-tested by its alpha, so hovering transparent pixels does nothing. */
  image?: { src: string; alt?: string; width: number; height: number };
  /** The model this poster stands for: under a fine pointer it is swapped for the live 3D model while hovered. */
  live?: { kind: LiveKind; slug: string };
  children?: ReactNode;
};

/** The picture's drawn box inside its element (object-fit: contain), in viewport pixels. */
function drawnRect(box: HTMLElement, img: HTMLImageElement | null) {
  const b = box.getBoundingClientRect();
  if (!img?.naturalWidth) return b;
  const k = Math.min(b.width / img.naturalWidth, b.height / img.naturalHeight);
  const w = img.naturalWidth * k;
  const h = img.naturalHeight * k;
  return { left: b.left + (b.width - w) / 2, top: b.top + (b.height - h) / 2, width: w, height: h };
}

/**
 * Every floating artifact on the Aurelius site goes through this.
 * - Idle float: a CSS animation whose path, amplitude, tilt, period (4–9s) and phase come from `seed`,
 *   so no two artifacts move alike. Transform only; paused off screen.
 * - Hover: while the pointer is over the artifact's painted pixels (with a little slack at the edge), it
 *   tilts toward the pointer (up to 16°), lifts and grows slightly, a soft light follows the pointer
 *   across its surface, and its contact shadow slides the other way. One spring drives it all; it eases
 *   back on leave. No page-wide pointer tracking.
 * - Live 3D (`live`): under a fine pointer the poster is swapped for its real model while hovered
 *   (components/design/LiveArtifactLayer.tsx), which turns toward the pointer for real. Until the model has
 *   drawn, and wherever WebGL is missing, the CSS tilt above carries on as the fallback.
 * - config.artifacts.pointerMode "proximity": nearby artifacts lean toward the pointer too, weaker with distance.
 * - Touch: a tap gives a short wobble. Reduced motion: still, no float, no tilt.
 */
export function FloatingArtifact({ seed, className = "", style, image, live, children }: Props) {
  const outer = useRef<HTMLDivElement>(null);
  const tilt = useRef<HTMLDivElement>(null);

  // Seeded float parameters as custom properties.
  const r = seeded(seed);
  const floatVars = {
    "--fa-period": `${(4 + r() * 5).toFixed(2)}s`,
    "--fa-delay": `${(-r() * 9).toFixed(2)}s`,
    "--fa-dx": `${((r() - 0.5) * 14).toFixed(1)}px`,
    "--fa-dy": `${(-8 - r() * 10).toFixed(1)}px`,
    "--fa-rot": `${(1 + r() * 2.5).toFixed(2)}deg`,
  } as CSSProperties;

  useEffect(() => {
    const el = outer.current;
    const inner = tilt.current;
    if (!el || !inner) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Pause the float while off screen.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) delete el.dataset.paused;
      else el.dataset.paused = "";
    });
    io.observe(el);

    // Alpha hit test for pictures: the hover only counts over painted pixels. Built the first time the
    // pointer comes near, from the picture already in the cache (same origin, so no second download).
    let alpha: ((x: number, y: number) => boolean) | null = null;
    const img = inner.querySelector("img");
    let probing = false;
    const buildProbe = () => {
      if (probing || !img) return;
      probing = true;
      const probe = new Image();
      probe.src = img.currentSrc || img.src;
      probe.onload = () => {
        const c = document.createElement("canvas");
        const w = PROBE;
        const h = Math.max(1, Math.round((PROBE * probe.naturalHeight) / probe.naturalWidth));
        c.width = w;
        c.height = h;
        const g = c.getContext("2d", { willReadFrequently: true });
        if (!g) return;
        g.drawImage(probe, 0, 0, w, h);
        const data = g.getImageData(0, 0, w, h).data;
        // Painted cells, grown by SLACK so the edge of the object does not flicker in and out.
        const hit = new Uint8Array(w * h);
        for (let y = 0; y < h; y++)
          for (let x = 0; x < w; x++) {
            if (data[(y * w + x) * 4 + 3] <= 24) continue;
            for (let j = Math.max(0, y - SLACK); j <= Math.min(h - 1, y + SLACK); j++) hit.fill(1, j * w + Math.max(0, x - SLACK), j * w + Math.min(w, x + SLACK + 1));
          }
        alpha = (x, y) => x >= 0 && x <= 1 && y >= 0 && y <= 1 && hit[Math.min(h - 1, Math.floor(y * h)) * w + Math.min(w - 1, Math.floor(x * w))] === 1;
      };
    };

    // Spring state: rotation about x and y (deg), lift (0–1) and the light's position (0–1 across the box).
    const { stiffness, damping } = springs.parallax;
    const keys = ["x", "y", "z", "u", "v"] as const;
    const pos = { x: 0, y: 0, z: 0, u: 0.5, v: 0.5 };
    const vel = { x: 0, y: 0, z: 0, u: 0, v: 0 };
    const target = { x: 0, y: 0, z: 0, u: 0.5, v: 0.5 };
    let raf = 0;
    let last = 0;
    const step = (t: number) => {
      const dt = Math.min(0.032, last ? (t - last) / 1000 : 0.016);
      last = t;
      let moving = false;
      for (const k of keys) {
        const a = stiffness * (target[k] - pos[k]) - damping * vel[k];
        vel[k] += a * dt;
        pos[k] += vel[k] * dt;
        if (Math.abs(vel[k]) > 0.001 || Math.abs(target[k] - pos[k]) > 0.001) moving = true;
      }
      if (el.dataset.live) {
        // The live model has the stage: the poster rests (it is hidden) and the layer drives the shadow.
        inner.style.transform = "";
        raf = moving ? requestAnimationFrame(step) : 0;
        if (!raf) last = 0;
        return;
      }
      inner.style.transform = `perspective(700px) rotateX(${pos.x.toFixed(2)}deg) rotateY(${pos.y.toFixed(2)}deg) translateZ(${(pos.z * LIFT_PX).toFixed(1)}px) scale(${(1 + pos.z * SCALE).toFixed(4)})`;
      el.style.setProperty("--fa-hover", pos.z.toFixed(3));
      el.style.setProperty("--fa-gx", `${(pos.u * 100).toFixed(1)}%`);
      el.style.setProperty("--fa-gy", `${(pos.v * 100).toFixed(1)}%`);
      el.style.setProperty("--fa-sx", `${((-pos.y / TILT_DEG) * SHADOW_SHIFT * 100).toFixed(1)}%`);
      raf = moving ? requestAnimationFrame(step) : 0;
      if (!raf) last = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(step);
    };
    const rest = () => {
      target.x = target.y = target.z = 0;
      target.u = target.v = 0.5;
      delete el.dataset.hover;
      useLive.getState().leave(el);
      kick();
    };
    const canLive = !!live && !!img && liveCapable();
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      buildProbe();
      // Measured on the outer box's drawn picture, which does not tilt, so the response does not feed back.
      const b = drawnRect(el, img);
      const u = (e.clientX - b.left) / b.width;
      const v = (e.clientY - b.top) / b.height;
      // Artifacts with a live model respond anywhere in their frame: thin shapes (a reel, a mic stand) are
      // mostly empty space, and dropping the hover over every gap stopped and restarted the turn.
      if (alpha && !alpha(u, v) && !canLive) return rest();
      if (canLive && img && live) {
        const store = useLive.getState();
        if (store.target?.el !== el || !store.hovering) store.enter({ el, img, kind: live.kind, slug: live.slug });
        store.move(u, v);
        // The live model does all the moving: the poster stays at rest, so the swap is rest to rest (no jump).
        return;
      }
      target.y = (u - 0.5) * 2 * TILT_DEG;
      target.x = -(v - 0.5) * 2 * TILT_DEG;
      target.z = 1;
      target.u = u;
      target.v = v;
      el.dataset.hover = "";
      kick();
    };
    // Touch: a short wobble.
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "touch") return;
      vel.y += 160;
      vel.x -= 80;
      kick();
    };
    // Proximity mode: the artifact starts to respond before the pointer reaches it, within
    // config.artifacts.proximityPad of its drawn edge, more strongly the closer the pointer is. The nearest
    // artifact also goes live in 3D (one at a time).
    const PAD = config.artifacts.proximityPad;
    let near = false;
    const onNear = (e: PointerEvent) => {
      if (e.pointerType === "touch" || el.dataset.hover || el.dataset.paused) return;
      const b = drawnRect(el, img);
      const dx = Math.max(b.left - e.clientX, 0, e.clientX - (b.left + b.width));
      const dy = Math.max(b.top - e.clientY, 0, e.clientY - (b.top + b.height));
      const d = Math.hypot(dx, dy);
      if (d < PAD) {
        buildProbe();
        const s = 1 - d / PAD;
        const u = (e.clientX - b.left) / b.width;
        const v = (e.clientY - b.top) / b.height;
        if (canLive && img && live) {
          const store = useLive.getState();
          store.enter({ el, img, kind: live.kind, slug: live.slug }, d);
          if (store.target?.el === el) store.move(u, v, d);
          near = true;
          return;
        }
        target.y = Math.max(-1.3, Math.min(1.3, (u - 0.5) * 2)) * TILT_DEG * (0.4 + 0.6 * s);
        target.x = -Math.max(-1.3, Math.min(1.3, (v - 0.5) * 2)) * TILT_DEG * (0.4 + 0.6 * s);
        target.z = s * 0.6;
        target.u = Math.max(0, Math.min(1, u));
        target.v = Math.max(0, Math.min(1, v));
        near = true;
        kick();
      } else if (near && d >= PAD) {
        near = false;
        rest();
      }
    };
    const proximity = config.artifacts.pointerMode === "proximity";
    if (proximity) window.addEventListener("pointermove", onNear, { passive: true });
    inner.addEventListener("pointermove", onMove);
    inner.addEventListener("pointerleave", rest);
    inner.addEventListener("pointerdown", onDown);
    return () => {
      if (proximity) window.removeEventListener("pointermove", onNear);
      useLive.getState().leave(el);
      io.disconnect();
      cancelAnimationFrame(raf);
      inner.removeEventListener("pointermove", onMove);
      inner.removeEventListener("pointerleave", rest);
      inner.removeEventListener("pointerdown", onDown);
    };
    // `live` is fixed for the artifact's life.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The light is masked to the picture's own shape.
  const maskVar = image ? ({ "--fa-mask": `url("${image.src}")` } as CSSProperties) : null;

  return (
    <div ref={outer} aria-hidden="true" className={`fa ${className}`} style={{ ...floatVars, ...maskVar, ...style }}>
      <span className="fa__shadow" />
      <div ref={tilt} className="fa__tilt">
        {image ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image.src} alt={image.alt ?? ""} width={image.width} height={image.height} loading="lazy" decoding="async" draggable={false} />
            <span className="fa__glare" />
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
