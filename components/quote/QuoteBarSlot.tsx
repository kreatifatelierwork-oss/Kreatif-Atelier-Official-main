"use client";

import dynamic from "next/dynamic";

const QuoteBar = dynamic(() => import("./QuoteBar").then((m) => m.QuoteBar), { ssr: false });

/** The quote bar, loaded only on the pages that show it (Kreatif Atelier pages), so others never ship its form code. */
export function QuoteBarSlot() {
  return <QuoteBar />;
}
