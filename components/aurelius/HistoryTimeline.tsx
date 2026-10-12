"use client";

import { useGSAP } from "@gsap/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Dialog } from "@/components/ui/Dialog";
import { historyPage, type HistoryEra, type HistoryPhoto } from "@/content/history";
import { useReducedMotion } from "@/lib/a11y/useReducedMotion";
import { motion } from "@/lib/motion";
import { gsap, ScrollTrigger } from "@/lib/scroll/gsap";

const { eras, labels } = historyPage;

/**
 * A torn-paper outline as a CSS polygon: straight edges roughened by a seeded wobble, so every piece
 * of the strip tears differently but the server and the browser always agree on the shape.
 */
function torn(seed: number, rough: number): string {
  let state = (seed * 9301 + 49297) % 233280;
  const next = () => {
    state = (state * 9301 + 49297) % 233280;
    return (state / 233280) * rough;
  };
  const points: string[] = [];
  const add = (x: number, y: number) => points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`);
  const steps = 12;
  for (let i = 0; i <= steps; i++) add(next(), (i / steps) * 100); // left edge, downwards
  for (let i = 1; i < 5; i++) add((i / 5) * 100, 100 - next() * 0.5); // foot
  for (let i = steps; i >= 0; i--) add(100 - next(), (i / steps) * 100); // right edge, upwards
  for (let i = 4; i > 0; i--) add((i / 5) * 100, next() * 0.5); // head
  return `polygon(${points.join(",")})`;
}

const NUMERALS = ["XII", "I", "II", "III", "IIII", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

/** A clock face, as on the owner's reference: the timeline runs from one dial to the other. */
function Dial({ at }: { at: "top" | "foot" }) {
  return (
    <div aria-hidden="true" className={`hist-dial hist-dial--${at}`}>
      <svg viewBox="-112 -112 224 224" focusable="false">
        <circle r="110" fill="#1d1712" />
        <circle r="103" fill="#e6d7b8" />
        <circle r="103" fill="none" stroke="#7a5a35" strokeWidth="14" opacity="0.16" />
        <circle r="70" fill="none" stroke="#5b3d24" strokeWidth="0.7" />
        <circle r="96" fill="none" stroke="#5b3d24" strokeWidth="0.7" />
        {Array.from({ length: 60 }, (_, i) => (
          <line key={i} y1={-96} y2={i % 5 === 0 ? -90 : -93} stroke="#3a2718" strokeWidth={i % 5 === 0 ? 1.4 : 0.6} transform={`rotate(${i * 6})`} />
        ))}
        {NUMERALS.map((numeral, i) => (
          <text key={numeral} transform={`rotate(${i * 30}) translate(0 -75)`} textAnchor="middle" className="hist-dial__numeral">
            {numeral}
          </text>
        ))}
        <g data-hand="hour">
          <path d="M-3 10 L0 -48 L3 10 Z" fill="#1d1712" />
        </g>
        <g data-hand="minute">
          <path d="M-1.8 14 L0 -68 L1.8 14 Z" fill="#8a1c22" />
        </g>
        <circle r="4.2" fill="#1d1712" />
        <circle r="1.6" fill="#e6d7b8" />
      </svg>
    </div>
  );
}

type Selection = { era: number; photo: number };

/**
 * The history infographic: a strip of torn pictures down the middle, with each era's story on one
 * side and its dates on the other, swapping sides as it goes. Any picture opens the era's gallery,
 * where every picture has its own note.
 */
export function HistoryTimeline() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [selection, setSelection] = useState<Selection>({ era: 0, photo: 0 });
  const [open, setOpen] = useState(false);

  const show = (era: number, photo: number) => {
    setSelection({ era, photo });
    setOpen(true);
  };

  // The hour hand moves on one numeral per era; the minute hand goes round once for each.
  useGSAP(
    () => {
      if (reduced || !root.current) return;
      const scrollTrigger = { trigger: root.current, start: "top 70%", end: "bottom 60%", scrub: motion.scrub.clock };
      gsap.to("[data-hand='hour']", { rotation: eras.length * 30, svgOrigin: "0 0", ease: motion.ease.scrub, scrollTrigger });
      gsap.to("[data-hand='minute']", { rotation: eras.length * 360, svgOrigin: "0 0", ease: motion.ease.scrub, scrollTrigger });
      ScrollTrigger.refresh();
    },
    { scope: root, dependencies: [reduced] },
  );

  return (
    <section ref={root} aria-label={labels.eras} data-light-block className="hist on-light">
      <Dial at="top" />
      <ol className="hist__eras">
        {eras.map((era, i) => (
          <Era key={era.id} era={era} index={i} onOpen={(photo) => show(i, photo)} />
        ))}
      </ol>
      <Dial at="foot" />

      <Gallery
        era={eras[selection.era]}
        number={selection.era + 1}
        index={selection.photo}
        open={open}
        onClose={() => setOpen(false)}
        onGo={(photo) => setSelection((s) => ({ ...s, photo }))}
      />
    </section>
  );
}

function Era({ era, index, onOpen }: { era: HistoryEra; index: number; onOpen: (photo: number) => void }) {
  const number = String(index + 1).padStart(2, "0");
  return (
    <li id={era.id} className="hist-era" data-flip={index % 2 === 1 ? "" : undefined}>
      <header className="hist-era__head">
        <p data-reveal className="eyebrow hist-era__dates">
          <span>{number}</span> {era.dates}
        </p>
        <h2 data-reveal className="display hist-era__name">
          {era.name}
        </h2>
        <div aria-hidden="true" className="hist-era__rule" />
        <p data-reveal className="eyebrow hist-era__medium">
          {era.medium}
        </p>
        <p data-reveal className="display hist-era__kicker">
          {era.kicker}
        </p>
      </header>

      <div className="hist-era__strip" style={{ "--n": era.strip } as React.CSSProperties}>
        {era.photos.slice(0, era.strip).map((photo, p) => (
          <Shot key={photo.src} photo={photo} seed={index * 10 + p + 1} tilt={(p + index) % 2 === 0 ? -0.7 : 0.6} onOpen={() => onOpen(p)} />
        ))}
      </div>

      <div className="hist-era__body">
        <p data-reveal className="hist-era__lead">
          {era.lead}
        </p>
        {era.body.map((paragraph) => (
          <p key={paragraph} data-reveal>
            {paragraph}
          </p>
        ))}
      </div>

      <aside className="hist-era__side" aria-label={`${era.name}: ${labels.keyDates}`}>
        <h3 data-reveal className="eyebrow hist-era__sidehead">
          {labels.keyDates}
        </h3>
        <dl className="hist-dates">
          {era.milestones.map((milestone) => (
            <div key={milestone.year + milestone.text} data-reveal>
              <dt className="display">{milestone.year}</dt>
              <dd>{milestone.text}</dd>
            </div>
          ))}
        </dl>
        <div data-reveal className="hist-era__legacy">
          <h3 className="eyebrow">{labels.legacy}</h3>
          <p className="display">{era.legacy}</p>
        </div>
        <div data-reveal>
          <button type="button" onClick={() => onOpen(0)} aria-haspopup="dialog" className="btn btn-primary">
            {labels.open}
            <span className="hist-era__count">{labels.pictures(era.photos.length)}</span>
            <span aria-hidden="true" className="btn-arrow">
              →
            </span>
          </button>
        </div>
      </aside>
    </li>
  );
}

type ShotProps = { photo: HistoryPhoto; seed: number; tilt: number; onOpen: () => void };

/** One torn picture in the strip. The white paper it is "printed" on shows as a ragged border. */
function Shot({ photo, seed, tilt, onOpen }: ShotProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={labels.view(photo.title)}
      className="hist-shot"
      style={{ "--tilt": `${tilt}deg` } as React.CSSProperties}
    >
      <span className="hist-shot__paper" style={{ clipPath: torn(seed, 3.4) }}>
        <Image
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          sizes="(min-width: 1024px) 30vw, 70vw"
          loading="eager"
          decoding="sync"
          className="hist-shot__img"
          style={{ clipPath: torn(seed + 57, 2.6) }}
        />
      </span>
      <span aria-hidden="true" className="eyebrow hist-shot__tag">
        {photo.title}
      </span>
    </button>
  );
}

type GalleryProps = { era: HistoryEra; number: number; index: number; open: boolean; onClose: () => void; onGo: (photo: number) => void };

/** The era's pictures, one at a time, each with its note. Arrow keys move between them. */
function Gallery({ era, number, index, open, onClose, onGo }: GalleryProps) {
  const count = era.photos.length;
  const photo = era.photos[Math.min(index, count - 1)];
  const step = useCallback((by: number) => onGo((index + by + count) % count), [count, index, onGo]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, step]);

  const arrow = "hist-gallery__arrow";

  return (
    <Dialog open={open} onClose={onClose} labelledBy="hist-gallery-title">
      <div className="hist-gallery">
        <header className="hist-gallery__head">
          <p className="eyebrow text-[0.6rem] text-gold">
            {String(number).padStart(2, "0")} <span className="text-cream-faint">·</span> {era.dates}
          </p>
          <h2 id="hist-gallery-title" className="display mt-2 text-[clamp(1.6rem,3vw,2.2rem)] text-cream">
            <span className="sr-only">{labels.gallery(era.name)}</span>
            <span aria-hidden="true">{era.name}</span>
          </h2>
        </header>

        <figure className="hist-gallery__figure">
          <div className="hist-gallery__stage">
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 900px) 860px, 100vw"
              loading="eager"
              decoding="sync"
              className="hist-gallery__img"
            />
            <button type="button" onClick={() => step(-1)} aria-label={labels.previous} className={`${arrow} ${arrow}--prev`}>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" onClick={() => step(1)} aria-label={labels.next} className={`${arrow} ${arrow}--next`}>
              <span aria-hidden="true">→</span>
            </button>
          </div>
          <figcaption aria-live="polite" className="hist-gallery__caption">
            <p className="eyebrow text-[0.58rem] text-cream-faint">
              {index + 1} {labels.of} {count}
            </p>
            <h3 className="display mt-3 text-[clamp(1.5rem,2.6vw,2rem)] leading-tight text-cream">{photo.title}</h3>
            <p className="eyebrow mt-3 text-[0.58rem] leading-relaxed text-gold">{photo.meta}</p>
            <p className="mt-4 text-[1rem] leading-[1.75] text-cream-muted">{photo.description}</p>
          </figcaption>
        </figure>

        <ul className="hist-gallery__thumbs">
          {era.photos.map((item, i) => (
            <li key={item.src}>
              <button type="button" onClick={() => onGo(i)} aria-label={labels.view(item.title)} aria-current={i === index ? "true" : undefined}>
                <Image src={item.src} alt="" width={item.width} height={item.height} sizes="96px" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </Dialog>
  );
}
