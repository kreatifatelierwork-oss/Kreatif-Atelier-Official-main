"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ComponentProps } from "react";
import type { Dialog as DialogImplType } from "./DialogImpl";

export { SITE_ROOT_ID } from "./siteRoot";

const DialogImpl = dynamic(() => import("./DialogImpl").then((m) => m.Dialog), { ssr: false });

/**
 * Every dialog on the site (mobile menu, service notes, the crest, galleries). The real dialog and its
 * animation library (framer-motion) load the first time one opens, not with the page; it stays mounted
 * after that so its exit animation can play. Implementation: ./DialogImpl.tsx.
 */
export function Dialog(props: ComponentProps<typeof DialogImplType>) {
  const [used, setUsed] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-way latch on first open
    if (props.open) setUsed(true);
  }, [props.open]);
  return used || props.open ? <DialogImpl {...props} /> : null;
}
