"use client";

import { cart } from "@/content/cart";
import { serviceById } from "@/content/services";
import { useCart } from "@/lib/cart/store";

/**
 * Every cart change is said out loud once: a toast (Sonner's region is aria-live, so screen readers
 * hear it too), with Undo for removals and View for additions.
 */
export function notifyCart(kind: "added" | "removed", id: string) {
  // Sonner loads on first use, not with the page.
  void import("sonner").then(({ toast }) => show(toast, kind, id));
}

function show(toast: typeof import("sonner").toast, kind: "added" | "removed", id: string) {
  const name = serviceById(id)?.name ?? id;
  if (kind === "added") {
    toast(cart.toastAdded(name), { id: `cart-${id}`, action: { label: cart.view, onClick: () => useCart.getState().setOpen(true) } });
  } else {
    toast(cart.toastRemoved(name), { id: `cart-${id}`, action: { label: cart.undo, onClick: () => useCart.getState().add(id) } });
  }
}
