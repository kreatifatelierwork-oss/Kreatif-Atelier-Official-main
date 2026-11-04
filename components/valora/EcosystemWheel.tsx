"use client";

import { useState } from "react";

type Item = { title: string; body: string };
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The eight parts of the Valora ecosystem round a centre. Choosing one (pointer, tap or keyboard) turns the wheel's
 * marker to it and shows what it holds in the middle. Every part's text is on the page; only the chosen one is shown.
 */
export function EcosystemWheel({ items, hint }: { items: readonly Item[]; hint: string }) {
  const [active, setActive] = useState(0);
  const turn = (360 / items.length) * active;

  return (
    <div className="v-wheel" style={{ "--n": items.length, "--turn": `${turn}deg` } as React.CSSProperties}>
      <svg aria-hidden="true" focusable="false" viewBox="0 0 200 200" className="v-wheel__ring">
        <circle cx="100" cy="100" r="80" />
        <circle cx="100" cy="100" r="54" strokeDasharray="2 4" />
        <g className="v-wheel__marker">
          <path d="M100 44V20" />
          <circle cx="100" cy="20" r="4" />
        </g>
      </svg>
      <ul className="v-wheel__items" aria-label={hint}>
        {items.map((item, i) => (
          <li key={item.title} style={{ "--k": i } as React.CSSProperties}>
            <button type="button" aria-pressed={i === active} onClick={() => setActive(i)} onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}>
              <span className="v-wheel__num">{pad(i + 1)}</span>
              {item.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="v-wheel__centre" aria-live="polite">
        {items.map((item, i) => (
          <div key={item.title} className="v-wheel__panel" data-active={i === active || undefined} aria-hidden={i !== active}>
            <p className="v-wheel__title">{item.title}</p>
            <p className="v-wheel__body">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
