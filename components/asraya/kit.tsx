import Image from "next/image";
import { Fragment } from "react";
import { art, type ArtName } from "@/content/asraya";

export type Tone = "paper" | "kraft" | "slate" | "oxblood" | "red" | "blue" | "navy";

type PosterProps = {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
  labelledBy?: string;
  /** Sits behind the content and under the grain: a picture, for instance. */
  backdrop?: React.ReactNode;
  /** No padding and no centred column: the children run edge to edge, for a band of pictures. */
  bleed?: boolean;
};

/** One "page" of the profile: a full-width block on one of its grounds, with paper grain. */
export function Poster({ tone = "paper", children, className = "", labelledBy, backdrop, bleed = false }: PosterProps) {
  return (
    <section data-tone={tone} aria-labelledby={labelledBy} className={`a-poster ${bleed ? "a-poster--bleed" : ""} ${className}`}>
      {backdrop}
      {bleed ? children : <div className="a-wrap">{children}</div>}
    </section>
  );
}

type ArtProps = {
  name: ArtName;
  /** `multiply` sinks a light-ground picture into a light poster; `lighten` does the same for a dark one. */
  blend?: "none" | "multiply" | "lighten";
  className?: string;
  sizes?: string;
};

/** A picture from the Asraya profile, set into a poster. */
export function Art({ name, blend = "none", className = "", sizes = "(min-width: 1024px) 50vw, 100vw" }: ArtProps) {
  const picture = art[name];
  return (
    <Image
      data-reveal
      src={picture.src}
      alt={picture.alt}
      width={picture.width}
      height={picture.height}
      sizes={sizes}
      className={`a-art ${blend === "none" ? "" : `a-art--${blend}`} ${className}`}
    />
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
    <div className={`a-body flex flex-col gap-5 ${className}`}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} data-reveal>
          <Rich text={paragraph} />
        </p>
      ))}
    </div>
  );
}

type Block = { x: number; y: number; w: number; d: number; h: number };

const UNIT = 26;
const iso = (x: number, y: number, z: number) => [(x - y) * 0.866 * UNIT, (x + y) * 0.5 * UNIT - z * UNIT] as const;
const points = (corners: (readonly [number, number])[]) => corners.map(([px, py]) => `${px.toFixed(1)},${py.toFixed(1)}`).join(" ");

/**
 * The red isometric steps from the "What we need from you" pages: a path of low slabs climbing to
 * the right, with a pillar for each of the seven asks. Decorative.
 */
export function IsoSteps({ heights, className = "" }: { heights: readonly number[]; className?: string }) {
  const blocks: Block[] = [];
  // The path runs left to right, climbing gently; every other slab steps toward the viewer.
  heights.forEach((h, i) => {
    const near = (i % 2) * 0.9;
    const x = i * 1.5 + near;
    const y = -i * 2.3 + near;
    blocks.push({ x, y, w: 2.2, d: 2.9, h: 0.8 });
    blocks.push({ x: x + 0.6, y: y + 0.95, w: 1, d: 1, h: 0.8 + h });
  });
  // Paint far blocks first.
  blocks.sort((a, b) => a.x + a.y - (b.x + b.y));

  const all = blocks.flatMap((b) => [iso(b.x, b.y, 0), iso(b.x + b.w, b.y + b.d, 0), iso(b.x, b.y + b.d, 0), iso(b.x + b.w, b.y, b.h), iso(b.x, b.y, b.h)]);
  const xs = all.map((p) => p[0]);
  const ys = all.map((p) => p[1]);
  const minX = Math.min(...xs) - 4;
  const minY = Math.min(...ys) - 4;
  const width = Math.max(...xs) - minX + 4;
  const height = Math.max(...ys) - minY + 4;

  return (
    <svg viewBox={`${minX} ${minY} ${width} ${height}`} aria-hidden="true" focusable="false" className={className} preserveAspectRatio="xMaxYMax meet">
      {blocks.map((b, i) => (
        <g key={i}>
          <polygon fill="#b82c1e" points={points([iso(b.x, b.y + b.d, 0), iso(b.x + b.w, b.y + b.d, 0), iso(b.x + b.w, b.y + b.d, b.h), iso(b.x, b.y + b.d, b.h)])} />
          <polygon fill="#7a1b13" points={points([iso(b.x + b.w, b.y, 0), iso(b.x + b.w, b.y + b.d, 0), iso(b.x + b.w, b.y + b.d, b.h), iso(b.x + b.w, b.y, b.h)])} />
          <polygon fill="#d6392a" points={points([iso(b.x, b.y, b.h), iso(b.x + b.w, b.y, b.h), iso(b.x + b.w, b.y + b.d, b.h), iso(b.x, b.y + b.d, b.h)])} />
        </g>
      ))}
    </svg>
  );
}
