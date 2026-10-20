import { site } from "@/content/site";

/** The round call button in the header's top-right corner: dials the main number directly. */
export function CallButton({ className = "" }: { className?: string }) {
  return (
    <a href={site.phoneHref} aria-label={`${site.callLabel}: ${site.phone}`} className={`nb nb--primary nb--icon nb--sm ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
      </svg>
    </a>
  );
}
