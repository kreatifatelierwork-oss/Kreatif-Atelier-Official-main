import Image from "next/image";
import { Fragment } from "react";
import { Placeholder } from "@/components/ui/Placeholder";
import { photos, ui, type PhotoId } from "@/content/asraya";

const pad = (n: number) => String(n).padStart(2, "0");

type ChapterProps = {
  /** Anchor id; the chapter's heading carries `${id}-heading`. */
  id: string;
  n: number;
  /** The chapter's name in the margin (decorative: the heading inside says it for screen readers). */
  name: string;
  children: React.ReactNode;
  className?: string;
};

/** A numbered chapter of an Asraya page: a rule across the top, its number and name in the margin. */
export function Chapter({ id, n, name, children, className = "" }: ChapterProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`a-chapter scroll-mt-[calc(var(--a-stick,var(--nav-h))+1rem)] ${className}`}>
      <div aria-hidden="true" className="a-chapter__mark">
        <span className="a-chapter__num">{pad(n)}</span>
        <span className="a-wide a-faint">{name}</span>
      </div>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

/**
 * The page head: a deep teal band across the screen with a small label, the title (its second part in italic
 * marigold), a lead line, and the page's drawing on the right.
 */
export function PageHead({ label, title, lead, art, children }: { label: string; title: readonly [string, string?] | readonly string[]; lead?: React.ReactNode; art?: React.ReactNode; children?: React.ReactNode }) {
  const [first, ...rest] = title;
  return (
    <div className="a-band--deep a-bleed">
      <header className="a-wrap a-head">
        <div>
          <p className="a-wide a-red">{label}</p>
          <h1 id="home-heading" className="a-display a-h1 mt-5">
            {first} {rest.length > 0 && <span className="a-em">{rest.join(" ")}</span>}
          </h1>
          {lead && <p className="a-lead mt-7 max-w-2xl">{lead}</p>}
        </div>
        {art && <div className="a-head__art">{art}</div>}
        {children && <div className="a-head__more">{children}</div>}
      </header>
    </div>
  );
}

/** A full-width band: `deep` is the teal statement ground, otherwise the ivory page. */
export function Band({ deep = false, labelledBy, children, className = "" }: { deep?: boolean; labelledBy?: string; children: React.ReactNode; className?: string }) {
  return (
    <section aria-labelledby={labelledBy} className={`a-band a-bleed ${deep ? "a-band--deep" : ""} ${className}`}>
      <div className="a-wrap">{children}</div>
    </section>
  );
}

type PhotoProps = { id: PhotoId; className?: string; sizes?: string };

/**
 * One of the owner's field photographs (ids from docs/asraya-photo-brief.md), toned to warm black and white.
 * Until it is supplied, an essential photo shows a marked slot and an optional one is left out.
 */
export function Photo({ id, className = "aspect-[3/2]", sizes = "(min-width: 1024px) 60vw, 100vw" }: PhotoProps) {
  const photo = photos[id];
  if (!photo.src) {
    if (!photo.essential) return null;
    return (
      <div data-reveal className="a-photo">
        <Placeholder label={`${ui.photoPending} · ${id} · ${photo.label}`} className={`w-full ${className}`} />
      </div>
    );
  }
  return (
    <div data-reveal className={`a-photo relative overflow-hidden ${className}`}>
      <Image src={photo.src} alt={photo.alt ?? ""} fill sizes={sizes} className="object-cover" />
    </div>
  );
}

/** True when every photograph in a set has been supplied, so a set is shown whole or not at all. */
export const allSupplied = (ids: readonly PhotoId[]) => ids.every((id) => !!photos[id].src);

/** The rest of a chapter, folded away under "Read more" so the story reads first. Still real text on the page. */
export function More({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <details className={`a-more ${className}`}>
      <summary>
        <span className="a-more__closed">{ui.more}</span>
        <span className="a-more__open">{ui.less}</span>
        <span aria-hidden="true" className="a-more__icon" />
      </summary>
      <div className="a-more__body">{children}</div>
    </details>
  );
}

/** Renders `**bold**` spans the way the profile sets its key words. */
export function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}

/** Paragraphs of body copy. */
export function Body({ paragraphs, className = "" }: { paragraphs: readonly string[]; className?: string }) {
  return (
    <div className={`a-body flex max-w-[40rem] flex-col gap-5 ${className}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} data-reveal>
          <Rich text={paragraph} />
        </p>
      ))}
    </div>
  );
}

type Row = { title: string; body?: string; sub?: string; listLabel?: string; list?: readonly string[]; note?: string };

/** A ruled index whose titles read as a list; each one opens to its text (and any tags or note). */
export function Rows({ items, numbered = false, className = "" }: { items: readonly Row[]; numbered?: boolean; className?: string }) {
  return (
    <ol className={`a-rows ${className}`}>
      {items.map((item, i) => (
        <li key={item.title} data-reveal>
          <details>
            <summary>
              <h3 className="a-title flex gap-3">
                {numbered && <span className="a-red tabular-nums">{pad(i + 1)}</span>}
                <span>
                  {item.title}
                  {item.sub && <span className="a-wide a-faint mt-2 block">{item.sub}</span>}
                </span>
              </h3>
              <span aria-hidden="true" className="a-more__icon" />
            </summary>
            <div className="a-rows__body">
              {item.body && (
                <p className="a-body">
                  <Rich text={item.body} />
                </p>
              )}
              {item.listLabel && <p className="a-wide a-faint mt-5">{item.listLabel}</p>}
              {item.list && <Tags items={item.list} className={item.listLabel ? "mt-3" : "mt-4"} />}
              {item.note && <p className="a-serif mt-4 text-[1.35rem] leading-snug italic">{item.note}</p>}
            </div>
          </details>
        </li>
      ))}
    </ol>
  );
}

/** A short list set as small tags. */
export function Tags({ items, className = "" }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={`a-tags ${className}`}>
      {items.map((entry) => (
        <li key={entry}>{entry}</li>
      ))}
    </ul>
  );
}

/** The Asraya wordmark: its capital A set apart in Cormorant's italic, the rest in heavy Fraunces. Reads as one word. */
export function Wordmark({ word }: { word: string }) {
  return (
    <>
      <span className="a-wordmark__cap">{word.charAt(0)}</span>
      {word.slice(1)}
    </>
  );
}

/** A chapter's opening: its heading and lead on the left, its playable drawing on the right (below it on phones). */
export function WithArt({ art, children, className = "" }: { art: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={`grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,19rem)] md:items-center md:gap-14 ${className}`}>
      <div className="min-w-0">{children}</div>
      <div className="mx-auto w-full max-w-[19rem] md:max-w-none">{art}</div>
    </div>
  );
}
