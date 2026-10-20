import { AU, alpha } from "@/lib/design/aurelius";
import * as THREE from "three";

/** One frame of film on the texture, in pixels. Eight frames fit a 4096px texture, the safe maximum on phones. */
export const FRAME_PX = { w: 512, h: 368 };
const SPROCKET = { band: 52, w: 22, h: 28, pitch: 42 };
const PANEL = { inset: 18, top: 70, radius: 10 };

const cssVar = (name: string, fallback: string) =>
  (typeof document !== "undefined" && getComputedStyle(document.documentElement).getPropertyValue(name).trim()) || fallback;

/**
 * Draws the reel: for every service one frame, a charcoal film body with rectangular sprocket holes
 * cut right through (transparent, so the material's alphaTest makes them real openings), and an
 * ivory panel holding only the service name, in uppercase serif with a thin burgundy rule beneath.
 * `redraw()` repaints it, e.g. once the web fonts have loaded.
 */
export function createFilmTexture(services: readonly { lines: readonly string[] }[]) {
  const W = FRAME_PX.w * services.length;
  const H = FRAME_PX.h;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const g = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.anisotropy = 8;

  const redraw = () => {
    const body = cssVar("--film-body", AU.maroon950);
    const panel = cssVar("--film-panel", AU.cream50);
    const ink = cssVar("--film-ink", AU.maroon950);
    const accent = cssVar("--film-accent", AU.maroon900);
    const serif = cssVar("--font-cormorant", "Georgia");
    g.clearRect(0, 0, W, H);
    g.fillStyle = body;
    g.fillRect(0, 0, W, H);
    // Sprocket holes: cut out of the body along both edges.
    g.globalCompositeOperation = "destination-out";
    for (let x = SPROCKET.pitch / 2 - SPROCKET.w / 2; x < W; x += SPROCKET.pitch) {
      for (const y of [(SPROCKET.band - SPROCKET.h) / 2, H - SPROCKET.band + (SPROCKET.band - SPROCKET.h) / 2]) {
        g.beginPath();
        g.roundRect(x, y, SPROCKET.w, SPROCKET.h, 4);
        g.fill();
      }
    }
    g.globalCompositeOperation = "source-over";
    services.forEach((service, i) => {
      const x0 = i * FRAME_PX.w + PANEL.inset;
      const pw = FRAME_PX.w - PANEL.inset * 2;
      const ph = H - PANEL.top * 2;
      // Ivory panel with a thin border and a soft inner shade toward its edges.
      g.fillStyle = panel;
      g.beginPath();
      g.roundRect(x0, PANEL.top, pw, ph, PANEL.radius);
      g.fill();
      const shade = g.createRadialGradient(x0 + pw / 2, PANEL.top + ph / 2, ph * 0.2, x0 + pw / 2, PANEL.top + ph / 2, pw * 0.75);
      shade.addColorStop(0, alpha(AU.maroon950, 0));
      shade.addColorStop(1, alpha(AU.maroon950, 0.10));
      g.fillStyle = shade;
      g.fill();
      g.strokeStyle = alpha(AU.maroon950, 0.22);
      g.lineWidth = 2;
      g.stroke();
      // The name, sized so the longest line fits with room to spare.
      const lines = service.lines.map((l) => l.toUpperCase());
      let size = 46;
      const font = () => `600 ${size}px ${serif}, Georgia, serif`;
      g.font = font();
      g.letterSpacing = `${Math.round(size * 0.12)}px`;
      while (Math.max(...lines.map((l) => g.measureText(l).width)) > pw * 0.8 && size > 22) {
        size -= 1;
        g.font = font();
        g.letterSpacing = `${Math.round(size * 0.12)}px`;
      }
      const lh = size * 1.12;
      const cx = x0 + pw / 2;
      const top = PANEL.top + ph / 2 - (lh * lines.length) / 2 - size * 0.18;
      g.fillStyle = ink;
      g.textAlign = "center";
      g.textBaseline = "top";
      lines.forEach((line, k) => g.fillText(line, cx + size * 0.06, top + k * lh));
      // A thin burgundy rule under the name.
      g.fillStyle = accent;
      g.fillRect(cx - 22, top + lh * lines.length + size * 0.35, 44, 3);
    });
    g.letterSpacing = "0px";
    texture.needsUpdate = true;
  };
  redraw();
  return { texture, redraw };
}
