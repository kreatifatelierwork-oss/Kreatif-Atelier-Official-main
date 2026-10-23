"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLive, type LiveTarget } from "@/lib/artifacts/live";
import { config } from "@/lib/config";
import frames from "@/features/home-v2/data/posterFrames.json";

const Scene = dynamic(() => import("@/features/home-v2/scene/LiveArtifactScene"), { ssr: false });

type Frame = { frame: number; left: number; top: number; width: number; height: number };

/**
 * Where the live canvas must sit so the model lands exactly on the poster: the poster's drawn picture
 * (object-fit contain inside its box), then, for fitted posters, the square render it was cut from.
 * Uses untransformed sizes plus the box's centre, so the CSS float carries the canvas but the hover
 * tilt does not make it jitter.
 */
function placeFrame(t: LiveTarget) {
  const r = t.el.getBoundingClientRect();
  const bw = t.el.offsetWidth;
  const bh = t.el.offsetHeight;
  const nw = t.img.naturalWidth || bw;
  const nh = t.img.naturalHeight || bh;
  const k = Math.min(bw / nw, bh / nh);
  const w = nw * k;
  const h = nh * k;
  const left = r.left + r.width / 2 - w / 2;
  const top = r.top + r.height / 2 - h / 2;
  if (t.kind === "svc") return { left, top, size: w };
  const f = (frames as Record<string, Frame>)[`${t.kind}:${t.slug}`];
  if (!f) return { left, top, size: w };
  const s = w / f.width;
  return { left: left - f.left * s, top: top - f.top * s, size: f.frame * s };
}

/** The frame, grown by config.artifacts.live.pad around the same centre. */
function place(t: LiveTarget) {
  const f = placeFrame(t);
  const P = config.artifacts.live.pad;
  const grow = (f.size * (P - 1)) / 2;
  return { left: f.left - grow, top: f.top - grow, size: f.size * P };
}

/**
 * The one live 3D view on an Aurelius page (Phase 5). When the pointer is over a poster that has a model,
 * this fixed, click-through box follows that poster every frame and draws the model in its place; the
 * poster hides once the model has drawn. On leave the model eases back, the poster returns after
 * config.artifacts.live.settleMs, and the model is disposed after disposeAfterMs.
 */
export function LiveArtifactLayer() {
  const box = useRef<HTMLDivElement>(null);
  const target = useLive((s) => s.target);
  const hovering = useLive((s) => s.hovering);
  const ready = useLive((s) => s.ready);
  // The canvas is created on the first hover and then kept for the visit.
  const [used, setUsed] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-way latch on first hover
    if (target) setUsed(true);
  }, [target]);

  // Follow the poster every frame while there is a target.
  useEffect(() => {
    const el = box.current;
    if (!el || !target) return;
    let raf = 0;
    let size = 0;
    const tick = () => {
      const p = place(target);
      if (Math.abs(p.size - size) > 0.5) {
        size = p.size;
        el.style.width = el.style.height = `${size}px`;
      }
      el.style.transform = `translate3d(${p.left.toFixed(1)}px, ${p.top.toFixed(1)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [target]);

  // After the pointer leaves: poster back once the model has eased home, then let the model go.
  useEffect(() => {
    if (hovering || !target) return;
    const { settleMs, disposeAfterMs } = config.artifacts.live;
    const back = setTimeout(() => useLive.getState().setReady(false), settleMs);
    const gone = setTimeout(() => useLive.getState().clear(), disposeAfterMs);
    return () => {
      clearTimeout(back);
      clearTimeout(gone);
    };
  }, [hovering, target]);

  return (
    <div ref={box} aria-hidden="true" data-ready={ready || undefined} className="live-artifact">
      {used && <Scene kind={target?.kind} slug={target?.slug} onReady={() => useLive.getState().hovering && useLive.getState().setReady(true)} />}
    </div>
  );
}
