"use client";

import { useEffect, useRef, useState } from "react";
import { NeuButton } from "@/components/design/NeuButton";
import { cart } from "@/content/cart";
import { useCart } from "@/lib/cart/store";

/** The bag button in the header (a round NeuButton): opens the cart; a gold badge shows the count and pops when it rises. */
export function CartButton() {
  const count = useCart((s) => s.items.length);
  const setOpen = useCart((s) => s.setOpen);
  const open = useCart((s) => s.open);
  const [bump, setBump] = useState(0);
  const last = useRef(count);

  useEffect(() => {
    if (count > last.current) setBump((b) => b + 1);
    last.current = count;
  }, [count]);

  return (
    <NeuButton variant="icon" size="sm" data-cart-button aria-label={cart.open(count)} aria-haspopup="dialog" aria-expanded={open} onClick={() => setOpen(true)}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
        <path d="M9 10V6.5a3 3 0 0 1 6 0V10" />
      </svg>
      {count > 0 && (
        // Re-keyed on each increase so the pop replays.
        <span key={bump} data-bump={bump > 0 || undefined} aria-hidden="true" className="nb__badge">
          {count}
        </span>
      )}
    </NeuButton>
  );
}
