"use client";

import { Toaster } from "sonner";

/** The cart's toasts: small glass pills at the bottom centre (styles: .au-toast in styles/design/cart.css). */
export function CartToaster() {
  return (
    <Toaster
      position="bottom-center"
      className="theme-aurelius !bg-transparent"
      toastOptions={{ unstyled: true, classNames: { toast: "au-toast", title: "au-toast__title", actionButton: "au-toast__action" } }}
    />
  );
}
