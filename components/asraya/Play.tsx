"use client";

import { useRef, useState } from "react";
import { ui } from "@/content/asraya";

type PlayProps = {
  /** What pressing does, said to screen readers ("Open the gift"). */
  label: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Makes one of Asraya's drawings something to play with:
 * - the pointer leans it: parts marked `data-d` (with a `--d` depth) drift towards the pointer, and `--px`/`--py`
 *   (−1…1 across the drawing) are there for parts that turn or rise with it;
 * - pressing (click, tap, Enter, Space) plays it: `data-on` is set and each drawing's own CSS moves to its played
 *   state; pressing again puts it back.
 * Reduced motion keeps the played states but drops the lean (see `.a-play` in app/globals.css).
 */
export function Play({ label, children, className = "" }: PlayProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [on, setOn] = useState(false);

  const lean = (event: React.PointerEvent) => {
    const el = ref.current;
    if (!el || event.pointerType === "touch") return;
    const box = el.getBoundingClientRect();
    el.style.setProperty("--px", (((event.clientX - box.left) / box.width) * 2 - 1).toFixed(3));
    el.style.setProperty("--py", (((event.clientY - box.top) / box.height) * 2 - 1).toFixed(3));
  };
  const rest = () => {
    ref.current?.style.setProperty("--px", "0");
    ref.current?.style.setProperty("--py", "0");
  };

  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      aria-pressed={on}
      data-on={on || undefined}
      onClick={() => setOn((value) => !value)}
      onPointerMove={lean}
      onPointerLeave={rest}
      className={`a-play ${className}`}
    >
      {children}
      <span aria-hidden="true" className="a-play__hint">
        <span className="a-play__star">✦</span> {on ? ui.reset : ui.play}
      </span>
    </button>
  );
}
