"use client";

import { useEffect, useRef } from "react";
import { config } from "@/lib/config";

type PlayProps = {
  children: React.ReactNode;
  className?: string;
  /** Play on its own when in view. Off where something else decides (a story step being read sets `data-on`). */
  auto?: boolean;
};

/**
 * Brings one of a venture page's drawings (Asraya, Valora, Aurelius) to life:
 * - it plays on its own: once it is in view `data-on` is set and the drawing's CSS moves to its played state; it holds,
 *   rests and plays again while it stays on screen, and resets when it leaves (timings in `config.drawings`);
 * - the pointer leans it: parts marked `data-d` (with a `--d` depth) drift towards the pointer, and `--px`/`--py`
 *   (−1…1 across the drawing) are there for parts that turn or rise with it.
 * Decorative only (the drawings are aria-hidden), so nothing here takes focus. Reduced motion shows the played state,
 * still, without the lean or the loop.
 */
export function Play({ children, className = "", auto = true }: PlayProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !auto) return;
    const set = (on: boolean) => (on ? el.setAttribute("data-on", "") : el.removeAttribute("data-on"));
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      set(true);
      return;
    }
    const { threshold, delay, hold, rest } = config.drawings;
    let timer: number | undefined;
    const cycle = (on: boolean) => {
      set(on);
      timer = window.setTimeout(() => cycle(!on), on ? hold : rest);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timer);
        if (entry.isIntersecting) timer = window.setTimeout(() => cycle(true), delay);
        else set(false);
      },
      { threshold },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [auto]);

  const lean = (event: React.PointerEvent) => {
    const el = ref.current;
    if (!el || event.pointerType === "touch") return;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--px", (((event.clientX - box.left) / box.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--py", (((event.clientY - box.top) / box.height) * 2 - 1).toFixed(3));
  };
  const settle = () => {
    ref.current?.style.setProperty("--px", "0");
    ref.current?.style.setProperty("--py", "0");
  };

  return (
    <div ref={ref} onPointerMove={lean} onPointerLeave={settle} className={`a-play ${className}`}>
      {children}
    </div>
  );
}
