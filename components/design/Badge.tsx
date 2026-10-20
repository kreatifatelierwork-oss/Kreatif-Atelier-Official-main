import type { ReactNode } from "react";

/** A small count or status pill; `gold` for highlights. */
export function Badge({ tone = "plain", children, label }: { tone?: "plain" | "gold"; children: ReactNode; label?: string }) {
  return (
    <span aria-label={label} className={`neu-badge ${tone === "gold" ? "neu-badge--gold" : ""}`}>
      {children}
    </span>
  );
}
