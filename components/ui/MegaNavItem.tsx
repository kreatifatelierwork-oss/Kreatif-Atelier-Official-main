"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ServicesMegaMenu } from "@/components/services/ServicesMegaMenu";
import { useCart } from "@/lib/cart/store";
import { config } from "@/lib/config";
import { SmartLink } from "./SmartLink";

type Props = { href: string; label: ReactNode; current: boolean; pathname: string; linkClass: string };

/**
 * The Services item and its mega menu, with one controlled open state (2026-10-21 fix: the menu used to be
 * pure CSS hover + focus-within, so a click on the current page left focus inside and kept it open, and its
 * full-width wrapper meant leaving sideways never left the hover area).
 *
 * - Hover opens; leaving the region (trigger + panel + the bridge between them, all sized to the visible
 *   glass) closes after config.megaMenu.closeDelay, and re-entering cancels.
 * - A click on the trigger or on any link inside closes it, including links to the current page, and hover
 *   cannot reopen it until the pointer has left the region (or config.megaMenu.reopenAfter has passed).
 * - Keyboard: focus-visible on the trigger or ArrowDown opens it (pinned); Escape closes and returns focus;
 *   focus leaving the menu closes it. Pinned menus stay open when the pointer leaves unless
 *   config.megaMenu.pinnedClosesOnLeave.
 * - Outside click, scrolling past config.megaMenu.scrollClose, leaving the window, a route change and the cart
 *   opening all close it. Touch: tap opens, tap again closes.
 */
export function MegaNavItem({ href, label, current, pathname, linkClass }: Props) {
  const [open, setOpen] = useState(false);
  const pinned = useRef(false);
  const suppressed = useRef(0);
  /** Set while Escape hands focus back to the trigger, so that focus does not reopen the menu. */
  const ignoreFocus = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const root = useRef<HTMLLIElement>(null);
  const trigger = useRef<HTMLAnchorElement>(null);
  const panelId = useId();
  const cartOpen = useCart((s) => s.open);
  const { closeDelay, reopenAfter, scrollClose, pinnedClosesOnLeave } = config.megaMenu;

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const close = (suppress = false) => {
    cancelClose();
    pinned.current = false;
    if (suppress) suppressed.current = Date.now() + reopenAfter;
    setOpen(false);
  };
  const show = (pin: boolean) => {
    cancelClose();
    if (Date.now() < suppressed.current) return;
    pinned.current = pin;
    setOpen(true);
  };

  // Route changes and the cart opening close it.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- closing in response to navigation
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- closing when the cart drawer opens
    if (cartOpen) setOpen(false);
  }, [cartOpen]);

  // While open: outside clicks, scrolling away and leaving the window close it.
  useEffect(() => {
    if (!open) return;
    const y0 = window.scrollY;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close();
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - y0) > scrollClose) close();
    };
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) close();
    };
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("mouseout", onOut);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseout", onOut);
    };
    // close is stable in behaviour; re-binding on every render is unnecessary.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <li
      ref={root}
      className="mega"
      data-open={open || undefined}
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") cancelClose();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        // Leaving re-arms hover after a click-close.
        suppressed.current = 0;
        if (pinned.current && !pinnedClosesOnLeave) return;
        cancelClose();
        closeTimer.current = setTimeout(() => close(), closeDelay);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          e.preventDefault();
          close();
          ignoreFocus.current = true;
          trigger.current?.focus();
          ignoreFocus.current = false;
        }
      }}
      onBlur={(e) => {
        if (open && !root.current?.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      <SmartLink
        ref={trigger}
        href={href}
        aria-current={current ? "true" : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={panelId}
        className={linkClass}
        onPointerEnter={(e: React.PointerEvent) => {
          if (e.pointerType === "mouse") show(false);
        }}
        onPointerDown={(e: React.PointerEvent) => {
          // Touch: the first tap opens, a second tap closes; neither navigates.
          if (e.pointerType === "touch") {
            e.preventDefault();
            if (open) close(true);
            else show(true);
          }
        }}
        onClick={(e: React.MouseEvent) => {
          if ((e.nativeEvent as PointerEvent).pointerType === "touch") {
            e.preventDefault();
            return;
          }
          // A click goes where the link goes (or nowhere, on the current page) and always closes the menu.
          close(true);
        }}
        onFocus={(e: React.FocusEvent<HTMLAnchorElement>) => {
          if (!ignoreFocus.current && e.currentTarget.matches(":focus-visible")) show(true);
        }}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            show(true);
            // Only if it is still open by then (a quick Escape must not send focus into a closed menu).
            requestAnimationFrame(() => {
              if (root.current?.hasAttribute("data-open")) document.getElementById(panelId)?.querySelector<HTMLElement>("a")?.focus();
            });
          }
        }}
      >
        {label}
      </SmartLink>
      {/* The positioning wrapper ignores the pointer; only the bridge and the glass count as the menu. */}
      <div
        id={panelId}
        data-mega-panel={open ? "" : undefined}
        className="mega__wrap"
        onClickCapture={(e) => {
          if ((e.target as HTMLElement).closest("a")) close(true);
        }}
      >
        <div aria-hidden="true" className="mega__bridge" />
        <ServicesMegaMenu pathname={pathname} />
      </div>
    </li>
  );
}
