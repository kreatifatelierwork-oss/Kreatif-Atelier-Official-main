import type { ReactNode } from "react";

/** One section on the shared grid: the single max width, the gutter, and the vertical rhythm. */
export function Section({ id, labelledBy, children, className = "" }: { id: string; labelledBy: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`px-[var(--ds-gutter)] py-[var(--ds-section-y)] ${className}`}>
      <div className="mx-auto w-full max-w-[var(--ds-max-width)]">{children}</div>
    </section>
  );
}
