import { site } from "@/content/site";

/**
 * The Kreatif Atelier marks from the owner's visiting card, drawn as masks so they take the colour
 * of the text around them (`color` / `text-*`). Decorative: callers supply the accessible name.
 */
export function KaMonogram({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`brand-mask brand-mask--monogram ${className}`} />;
}

export function KaWordmark({ className = "", label = false }: { className?: string; label?: boolean }) {
  return (
    <>
      <span aria-hidden="true" className={`brand-mask brand-mask--wordmark ${className}`} />
      {label && <span className="sr-only">{site.name}</span>}
    </>
  );
}

/**
 * The visiting card as a band: the KA monogram faint in the middle, the script name across it in
 * gold, on the card's dark mahogany. `children` sit underneath, on the same ground.
 */
export function KaCard({ children, as: Tag = "div", className = "" }: { children?: React.ReactNode; as?: "div" | "section"; className?: string }) {
  return (
    <Tag className={`ka-card ${className}`}>
      <div className="ka-card__mark">
        <KaMonogram className="ka-card__monogram" />
        <KaWordmark className="ka-card__wordmark" label />
      </div>
      {children}
    </Tag>
  );
}
