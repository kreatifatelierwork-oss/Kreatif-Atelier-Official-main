type Props = { id: string; label?: string; headline: { lead: string; emphasis: string }; as?: "h1" | "h2"; align?: "start" | "center"; className?: string };

/** A section's label and two-part headline: Anton capitals, then the emphasised half in Cormorant italic. */
export function SectionHeader({ id, label, headline, as: Tag = "h2", align = "start", className = "" }: Props) {
  return (
    <header data-reveal className={`${align === "center" ? "text-center" : ""} ${className}`}>
      {label && <p className="ds-label">{label}</p>}
      <Tag id={id} className="ds-heading mt-[var(--ds-space-3)] text-balance">
        {headline.lead} <span className="ds-emphasis block text-ds-muted">{headline.emphasis}</span>
      </Tag>
    </header>
  );
}
