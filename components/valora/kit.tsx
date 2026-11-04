import { valora } from "@/content/valora";

/** The shared drawing that plays on its own (components/story/Play.tsx). */
export { Play } from "@/components/story/Play";

/** A full-width band: `panel` is the raised night panel, otherwise the page's own night. */
export function Band({ panel = false, labelledBy, children, className = "" }: { panel?: boolean; labelledBy?: string; children: React.ReactNode; className?: string }) {
  return (
    <section aria-labelledby={labelledBy} className={`a-band a-bleed ${panel ? "v-band--panel" : ""} ${className}`}>
      <div className="a-wrap">{children}</div>
    </section>
  );
}

/** A section's small label, its headline (second part in gold italic) and an optional lead. */
export function Heading({ id, label, title, lead, className = "" }: { id: string; label: string; title: readonly string[]; lead?: string; className?: string }) {
  const [first, ...rest] = title;
  return (
    <div className={className}>
      <p className="a-wide a-red">{label}</p>
      <h2 id={id} data-reveal className="a-display a-h2 mt-5">
        {first} {rest.length > 0 && <span className="a-em block">{rest.join(" ")}</span>}
      </h2>
      {lead && (
        <p data-reveal className="a-lead mt-6 max-w-2xl">
          {lead}
        </p>
      )}
    </div>
  );
}

/** A section's words beside its drawing (the drawing below on phones). */
export function WithArt({ art, children, className = "" }: { art: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-center md:gap-14 ${className}`}>
      <div className="min-w-0">{children}</div>
      <div className="mx-auto w-full max-w-[20rem] md:max-w-none">{art}</div>
    </div>
  );
}

/** The page head of an inner Valora page: label, title (second part in gold italic), lead and its drawing. */
export function PageHead({ title, lead, art }: { title: readonly string[]; lead?: string; art?: React.ReactNode }) {
  const [first, ...rest] = title;
  return (
    <header className="a-head">
      <div>
        <p className="a-wide a-red">{valora.name}</p>
        <h1 id="home-heading" className="a-display a-h1 mt-5">
          {first} {rest.length > 0 && <span className="a-em">{rest.join(" ")}</span>}
        </h1>
        {lead && <p className="a-lead mt-7 max-w-2xl">{lead}</p>}
      </div>
      {art && <div className="a-head__art">{art}</div>}
    </header>
  );
}

/** Short words as small tags. */
export function Tags({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`a-tags ${className}`}>
      {items.map((entry) => (
        <li key={entry}>{entry}</li>
      ))}
    </ul>
  );
}
