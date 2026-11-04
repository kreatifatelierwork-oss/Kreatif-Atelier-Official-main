"use client";

import { useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The Valora ladder, from Participant to Network leader. Choosing a rung sends the climber up (or down) to it and lights
 * every rung on the way. The rungs are buttons, read bottom to top.
 */
export function Ladder({ items, hint }: { items: readonly string[]; hint: string }) {
  const [rung, setRung] = useState(0);

  return (
    <div className="v-ladder" style={{ "--rung": rung, "--rungs": items.length } as React.CSSProperties}>
      <div aria-hidden="true" className="v-ladder__rail">
        <span className="v-ladder__lit" />
        <span className="v-ladder__climber" />
      </div>
      <ol className="v-ladder__rungs" aria-label={hint}>
        {items.map((title, i) => (
          <li key={title}>
            <button
              type="button"
              aria-pressed={i === rung}
              data-reached={i <= rung || undefined}
              onClick={() => setRung(i)}
              onPointerEnter={(e) => e.pointerType === "mouse" && setRung(i)}
            >
              <span className="v-ladder__num">{pad(i + 1)}</span>
              <span className="v-ladder__title">{title}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
