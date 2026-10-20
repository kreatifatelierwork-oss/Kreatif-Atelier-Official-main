"use client";

import { NeuButton } from "@/components/design/NeuButton";
import { cart } from "@/content/cart";
import { serviceById } from "@/content/services";
import { useCart } from "@/lib/cart/store";
import { notifyCart } from "./notify";

/**
 * Add a service to the cart, or take it out again: a compact NeuButton toggle (aria-pressed). The knob
 * holds a plus; once added it presses in and the knob draws a check.
 */
export function AddToCart({ id, className = "" }: { id: string; className?: string }) {
  const inCart = useCart((s) => s.items.includes(id));
  const toggle = useCart((s) => s.toggle);
  const service = serviceById(id);
  if (!service) return null;
  return (
    <NeuButton
      size="sm"
      aria-pressed={inCart}
      aria-label={inCart ? cart.addedLabel(service.name) : cart.addLabel(service.name)}
      onClick={() => notifyCart(toggle(id) ? "added" : "removed", id)}
      className={className}
      knob={
        inCart ? (
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path className="cart-add__check" d="M3 8.5 6.5 12 13 4.5" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M8 3v10M3 8h10" />
          </svg>
        )
      }
    >
      {inCart ? cart.added : cart.add}
    </NeuButton>
  );
}
