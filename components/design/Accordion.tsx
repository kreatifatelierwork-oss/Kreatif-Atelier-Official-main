import type { ReactNode } from "react";

/** One accordion row in an inset well; native <details>, so it works without script and from the keyboard. */
export function Accordion({ title, children, defaultOpen }: { title: string; children: ReactNode; defaultOpen?: boolean }) {
  return (
    <details className="neu-accordion" open={defaultOpen}>
      <summary>{title}</summary>
      <div className="neu-accordion__body ds-body">{children}</div>
    </details>
  );
}
