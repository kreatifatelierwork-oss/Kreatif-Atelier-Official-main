"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart/store";
import { useCartHydration } from "@/lib/cart/useCartHydration";

// Both load after the page, so the drawer (base-ui, zod) and the toasts (Sonner) never weigh on first paint.
const CartDrawer = dynamic(() => import("./CartDrawer").then((m) => m.CartDrawer), { ssr: false });
const CartToaster = dynamic(() => import("./CartToaster").then((m) => m.CartToaster), { ssr: false });

/**
 * Mounted once per Aurelius page (PageShell): loads the saved cart at once; the toasts once the page is
 * idle; the drawer the first time the cart is opened.
 */
export function CartRoot() {
  useCartHydration();
  const open = useCart((s) => s.open);
  const [drawer, setDrawer] = useState(false);
  const [toasts, setToasts] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-way latch on first open
    if (open) setDrawer(true);
  }, [open]);
  useEffect(() => {
    const show = () => setToasts(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(show, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(show, 1500);
    return () => clearTimeout(t);
  }, []);
  return (
    <>
      {drawer && <CartDrawer />}
      {toasts && <CartToaster />}
    </>
  );
}
