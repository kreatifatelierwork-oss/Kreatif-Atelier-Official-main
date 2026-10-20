type Props = {
  eyebrow: string[];
  title: string;
  /** One line under the title, set in italic serif. */
  lead?: string;
  children?: React.ReactNode;
  /** Something shown beside the title on wide screens (a practice's 3D artifact). */
  aside?: React.ReactNode;
};

/** Opening for inner pages, on the neumorphic surface. `id="home"` gives "back to top" a target. */
export function PageHero({ eyebrow, title, lead, children, aside }: Props) {
  return (
    <section id="home" aria-labelledby="home-heading" className="relative px-[var(--ds-gutter)] pt-[calc(var(--nav-h)+var(--ds-space-9))] pb-[var(--ds-space-8)]">
      <div className={`mx-auto grid w-full max-w-[var(--ds-max-width)] gap-[var(--ds-space-7)] ${aside ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center" : ""}`}>
        <div>
          <p className="ds-label flex flex-wrap items-center gap-[var(--ds-space-2)]">
            {eyebrow.map((part, i) => (
              <span key={part} className="flex items-center gap-[var(--ds-space-2)]">
                {i > 0 && (
                  <span aria-hidden="true" className="text-ds-blue">
                    ·
                  </span>
                )}
                {part}
              </span>
            ))}
          </p>
          <h1 id="home-heading" className="ds-display mt-[var(--ds-space-4)] max-w-5xl text-balance">
            {title}
          </h1>
          {lead && <p className="ds-emphasis mt-[var(--ds-space-5)] max-w-3xl text-[length:var(--ds-text-2xl)] leading-[var(--ds-leading-heading)] text-ds-muted">{lead}</p>}
          {children}
        </div>
        {aside}
      </div>
    </section>
  );
}
