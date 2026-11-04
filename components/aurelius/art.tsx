import { d, vars } from "@/components/story/art";

/**
 * Aurelius's drawings: maroon line work with cream and polished-gold fills, to sit beside the rendered 3D objects
 * without copying them. All decorative (aria-hidden).
 *
 * The larger scenes play inside <Play> (components/aurelius/Play.tsx): parts marked `data-d` lean towards the pointer and
 * the `au-*` classes move to their played state on `[data-on]` (app/globals.css, "Aurelius drawings"). The small marks
 * (attention modes, ventures) play when their card is hovered. Without JavaScript every part sits at rest.
 */

const LINE = "#5c0f14";

/** The polished gold used by `.au-f-gold`; each drawing carries it, so any one of them can stand alone. */
function Metal() {
  return (
    <defs>
      <linearGradient id="au-metal" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8a6209" />
        <stop offset="0.25" stopColor="#d4a017" />
        <stop offset="0.5" stopColor="#f7e3a1" />
        <stop offset="0.75" stopColor="#d4a017" />
        <stop offset="1" stopColor="#9a700b" />
      </linearGradient>
    </defs>
  );
}

type ArtProps = { className?: string };
const scene = (className: string, viewBox = "0 0 400 300") => ({
  viewBox,
  "aria-hidden": true as const,
  focusable: "false" as const,
  className: `a-scene au-art block h-auto w-full ${className}`,
  fill: "none",
  stroke: LINE,
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/** The ✦, in gold. */
function Spark({ x, y, r, className = "au-f-gold" }: { x: number; y: number; r: number; className?: string }) {
  const k = r * 0.2;
  return <path className={className} stroke="none" d={`M${x} ${y - r}L${x + k} ${y - k}L${x + r} ${y}L${x + k} ${y + k}L${x} ${y + r}L${x - k} ${y + k}L${x - r} ${y}L${x - k} ${y - k}Z`} />;
}

/* ── Positioning ───────────────────────────────────────────── */

/**
 * Creative on one pan, the business on the other. At rest the scale leans to creative, as most agencies do; played,
 * it comes level. The pointer tips it a little either way.
 */
export function Balance({ className = "" }: ArtProps) {
  return (
    <svg {...scene(`au-balance ${className}`)}>
      <Metal />
      <g {...d(3)}>
        <ellipse cx="200" cy="284" rx="120" ry="8" className="au-f-shadow" stroke="none" />
        <path d="M160 280h80l-12-18h-56z" className="au-f-maroon" />
        <rect x="194" y="92" width="12" height="172" rx="3" className="au-f-cream" />
      </g>
      <g className="au-beam">
        <rect x="66" y="80" width="268" height="10" rx="5" className="au-f-maroon" />
      </g>
      {/* Creative: a palette and a brush. */}
      <g className="au-pan au-pan--l">
        <path d="M70 88L36 168M70 88l34 80" strokeWidth="1.6" />
        <path d="M24 168h92a46 16 0 0 1-92 0z" className="au-f-cream" />
        <path d="M40 152c0-18 22-26 40-20s24 26 6 30c-10 2-8-6-16-6s-6 10-16 8-14-4-14-12z" className="au-f-cream" />
        <circle cx="54" cy="146" r="4" className="au-f-maroon" stroke="none" />
        <circle cx="68" cy="140" r="4" className="au-f-gold" stroke="none" />
        <circle cx="82" cy="146" r="4" className="au-f-maroon" stroke="none" />
        <path d="M96 116l-14 30" strokeWidth="4" />
        <path d="M80 146l4 6" stroke="#d4a017" strokeWidth="6" />
      </g>
      {/* Business: a stack of coins and a rising chart. */}
      <g className="au-pan au-pan--r">
        <path d="M330 88l-34 80M330 88l34 80" strokeWidth="1.6" />
        <path d="M284 168h92a46 16 0 0 1-92 0z" className="au-f-cream" />
        {[0, 1, 2, 3].map((k) => (
          <ellipse key={k} cx="312" cy={160 - k * 8} rx="16" ry="5" className="au-f-gold" />
        ))}
        <path d="M340 166v-16M350 166v-26M360 166v-36" strokeWidth="6" stroke="#7a1c1e" />
      </g>
      <g {...d(10)}>
        <g className="au-pivot">
          <circle cx="200" cy="85" r="15" className="au-f-gold" />
          <Spark x={200} y={85} r={8} className="au-f-maroon" />
        </g>
      </g>
    </svg>
  );
}

/* ── About ─────────────────────────────────────────────────── */

/** A toothed wheel centred on (cx, cy). */
function gear(cx: number, cy: number, r: number, teeth: number, depth = 9) {
  const step = (Math.PI * 2) / teeth;
  const pts: string[] = [];
  for (let k = 0; k < teeth; k++) {
    const a = k * step;
    const at = (angle: number, radius: number) => `${(cx + Math.cos(angle) * radius).toFixed(1)} ${(cy + Math.sin(angle) * radius).toFixed(1)}`;
    pts.push(at(a - step * 0.32, r), at(a - step * 0.18, r + depth), at(a + step * 0.18, r + depth), at(a + step * 0.32, r));
  }
  return `M${pts.join("L")}Z`;
}

const GEARS = [
  { cx: 150, cy: 158, r: 74, teeth: 16, dir: 1, fill: "au-f-cream" },
  { cx: 262, cy: 92, r: 44, teeth: 10, dir: -1, fill: "au-f-gold" },
  { cx: 276, cy: 214, r: 36, teeth: 8, dir: -1, fill: "au-f-maroon" },
  { cx: 46, cy: 262, r: 28, teeth: 7, dir: -1, fill: "au-f-gold" },
] as const;

/** Strategy, creative, media and technology as one machine. Played, the four wheels turn together. */
export function Gears({ className = "" }: ArtProps) {
  return (
    <svg {...scene(className)}>
      <Metal />
      {GEARS.map((g, i) => (
        <g key={i} {...d(4 + i * 3)}>
          <g className={`au-gear ${g.dir < 0 ? "au-gear--rev" : ""}`} style={{ ...vars({ ratio: g.r / 74 }), transformOrigin: `${g.cx}px ${g.cy}px` }}>
            <path d={gear(g.cx, g.cy, g.r, g.teeth)} className={g.fill} />
            <circle cx={g.cx} cy={g.cy} r={g.r * 0.62} strokeWidth="1.4" strokeOpacity="0.5" />
            <circle cx={g.cx} cy={g.cy} r={g.r * 0.22} className={g.fill === "au-f-cream" ? "au-f-gold" : "au-f-cream"} />
            {[0, 1, 2].map((s) => (
              <path key={s} d={`M${g.cx} ${g.cy}l${(Math.cos((s * 2 * Math.PI) / 3) * g.r * 0.6).toFixed(1)} ${(Math.sin((s * 2 * Math.PI) / 3) * g.r * 0.6).toFixed(1)}`} strokeWidth="1.4" />
            ))}
          </g>
        </g>
      ))}
      <g {...d(16)}>
        <g className="au-glint">
          <Spark x={344} y={40} r={14} />
        </g>
      </g>
    </svg>
  );
}

/* ── Measurement ───────────────────────────────────────────── */

/**
 * A spend line that goes nowhere, until someone reads it. Played, the lens slides to the turning point, the old path
 * fades and the line is redirected upward in gold.
 */
export function Redirect({ className = "" }: ArtProps) {
  return (
    <svg {...scene(className)}>
      <Metal />
      <g {...d(3)}>
        <rect x="24" y="24" width="352" height="252" rx="14" className="au-f-cream" />
        <path d="M56 244h296M56 244V52" strokeWidth="1.6" strokeOpacity="0.5" />
        {[0, 1, 2, 3].map((k) => (
          <path key={k} d={`M56 ${92 + k * 38}h296`} strokeWidth="1" strokeOpacity="0.14" />
        ))}
        <path d="M60 206L110 196L160 210L214 200" strokeWidth="3" />
        <path className="au-old" d="M214 200L270 222L346 232" strokeWidth="3" strokeDasharray="6 7" />
        <path className="au-new" pathLength={1} d="M214 200L262 150L300 160L346 82" stroke="#d4a017" strokeWidth="4.5" />
        <circle cx="214" cy="200" r="8" className="au-f-gold au-turn" />
      </g>
      <g {...d(12)}>
        <g className="au-lens">
          <circle cx="110" cy="140" r="30" className="au-f-glass" strokeWidth="3" />
          <path d="M131 161l26 26" strokeWidth="8" stroke="#7a1c1e" />
        </g>
      </g>
      <g {...d(16)}>
        <g className="au-glint">
          <Spark x={350} y={64} r={12} />
        </g>
      </g>
    </svg>
  );
}

/* ── What we believe ───────────────────────────────────────── */

/** A point of view, written by hand. Played, the quill crosses the page and the line is inked behind it. */
export function Quill({ className = "" }: ArtProps) {
  return (
    <svg {...scene(className)}>
      <Metal />
      <g {...d(3)}>
        <path d="M60 60l250-20 30 210-250 20z" className="au-f-cream" />
        <path d="M86 92l214-17M90 128l170-14" strokeWidth="1.2" strokeOpacity="0.3" />
        <path className="au-ink" pathLength={1} d="M92 176c14-16 22 10 34-4s16-18 26-2 18 10 28-6 22-6 30 6 18 4 30-10 18 2 26 0" strokeWidth="3" />
        <path d="M100 214l150-12" strokeWidth="1.2" strokeOpacity="0.3" />
      </g>
      <g {...d(6)}>
        <path d="M24 246h56l-6 30H30z" className="au-f-maroon" />
        <ellipse cx="52" cy="246" rx="28" ry="6" className="au-f-maroon" />
      </g>
      <g {...d(12)}>
        <g className="au-quill">
          <path d="M108 170C150 90 214 40 290 22c-20 52-74 110-170 150z" className="au-f-gold" />
          <path d="M108 170c60-56 120-104 178-144" strokeWidth="1.6" />
          <path d="M100 186l8-16" strokeWidth="3" />
        </g>
      </g>
    </svg>
  );
}

/* ── Contact ───────────────────────────────────────────────── */

/** A brief going out: at rest the letter stands in an open envelope; played, it goes in, the flap closes and the seal is set. */
export function Envelope({ className = "" }: ArtProps) {
  return (
    <svg {...scene(className)}>
      <Metal />
      <ellipse cx="200" cy="284" rx="140" ry="8" className="au-f-shadow" stroke="none" />
      <g {...d(4)}>
        <g className="au-env">
          <rect x="80" y="140" width="240" height="140" rx="10" className="au-f-maroon" />
          {/* The flap sits behind the letter while it is open; once the letter is in (and gone from view), it closes over the front. */}
          <g className="au-flap">
            <path d="M80 150a10 10 0 0 1 10-10h220a10 10 0 0 1 10 10l-120 80z" className="au-f-maroon" />
          </g>
          <g className="au-letter">
            <rect x="104" y="60" width="192" height="150" rx="6" className="au-f-cream" />
            <path d="M126 88h110M126 108h148M126 128h120M126 148h140" strokeWidth="1.6" strokeOpacity="0.55" />
            <path d="M126 176h60" stroke="#d4a017" strokeWidth="4" />
          </g>
          <path d="M80 160l120 76 120-76v110a10 10 0 0 1-10 10H90a10 10 0 0 1-10-10z" className="au-f-sand" />
          <g className="au-seal">
            <circle cx="200" cy="222" r="20" className="au-f-gold" />
            <Spark x={200} y={222} r={10} className="au-f-maroon" />
          </g>
        </g>
      </g>
      <g {...d(14)}>
        <g className="au-glint">
          <Spark x={340} y={70} r={14} />
        </g>
      </g>
    </svg>
  );
}

/* ── Small marks for cards (played by the card's hover) ────── */

const mark = (className: string) => ({
  viewBox: "0 0 96 96",
  "aria-hidden": true as const,
  focusable: "false" as const,
  className: `au-mark ${className}`,
  fill: "none",
  stroke: LINE,
  strokeWidth: 2.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/** Own, buy, keep: a key that turns, a coin that drops, a heart that beats. */
export function ModeMark({ mode }: { mode: "own" | "buy" | "keep" }) {
  if (mode === "own")
    return (
      <svg {...mark("au-mark--own")}>
        <Metal />
        <g className="au-key">
          <circle cx="32" cy="48" r="16" className="au-f-gold" />
          <circle cx="32" cy="48" r="6" className="au-f-cream" />
          <path d="M48 48h34M70 48v12M80 48v8" strokeWidth="4" />
        </g>
      </svg>
    );
  if (mode === "buy")
    return (
      <svg {...mark("au-mark--buy")}>
        <Metal />
        <rect x="16" y="56" width="64" height="28" rx="6" className="au-f-maroon" />
        <path d="M34 62h28" stroke="#f8f1eb" strokeWidth="4" />
        <g className="au-coin">
          <circle cx="48" cy="30" r="16" className="au-f-gold" />
          <path d="M48 22v16M43 26h8a4 4 0 0 1 0 8h-8" strokeWidth="2" />
        </g>
      </svg>
    );
  return (
    <svg {...mark("au-mark--keep")}>
      <Metal />
      <circle cx="48" cy="48" r="34" strokeOpacity="0.3" />
      <g className="au-heart">
        <path d="M48 70C30 58 22 48 22 38a13 13 0 0 1 26-4 13 13 0 0 1 26 4c0 10-8 20-26 32z" className="au-f-gold" />
      </g>
    </svg>
  );
}

export type VentureSlug = "aurelius" | "asraya" | "valora" | "golden-guardian-productions" | "rudra-yugen";

/** One small mark per venture, played when its card is hovered. Drawn for the site; not the ventures' logos. */
export function VentureMark({ slug, className = "" }: { slug: string; className?: string }) {
  switch (slug as VentureSlug) {
    case "aurelius":
      // A laurel, the gold of Aurelius; its leaves open and the star turns.
      return (
        <svg {...mark(`au-mark--laurel ${className}`)}>
          <Metal />
          {[-1, 1].map((side) => (
            <g key={side} className="au-leaves" style={vars({ side })}>
              <path d={`M48 84C${48 + side * -30} 76 ${48 + side * -38} 50 ${48 + side * -30} 22`} />
              {[0, 1, 2, 3].map((k) => (
                <ellipse
                  key={k}
                  cx={48 + side * -(30 - k * 2 + (k === 0 ? 4 : 0))}
                  cy={74 - k * 15}
                  rx="9"
                  ry="4.5"
                  className="au-f-gold"
                  transform={`rotate(${side * (40 + k * 12)} ${48 + side * -(30 - k * 2)} ${74 - k * 15})`}
                />
              ))}
            </g>
          ))}
          <g className="au-star">
            <Spark x={48} y={46} r={13} />
          </g>
        </svg>
      );
    case "asraya":
      // A megaphone, and the word going out.
      return (
        <svg {...mark(className)}>
          <Metal />
          <path d="M14 40v16h10l30 16V24L24 40z" className="au-f-cream" />
          <rect x="14" y="40" width="10" height="16" className="au-f-gold" />
          {[0, 1, 2].map((k) => (
            <path key={k} className="au-wave" style={vars({ i: k })} d={`M${62 + k * 9} ${38 - k * 5}q${7 + k * 2} ${10 + k * 5} 0 ${20 + k * 10}`} stroke="#d4a017" strokeWidth="4" />
          ))}
        </svg>
      );
    case "valora":
      // A mortarboard that goes up.
      return (
        <svg {...mark(className)}>
          <Metal />
          <g className="au-toss">
            <path d="M48 22l38 16-38 16-38-16z" className="au-f-maroon" />
            <path d="M26 46v14c0 6 10 12 22 12s22-6 22-12V46" className="au-f-cream" />
            <path d="M86 38v20" />
            <circle cx="86" cy="62" r="4" className="au-f-gold" />
          </g>
        </svg>
      );
    case "golden-guardian-productions":
      // A film camera whose reels turn.
      return (
        <svg {...mark(className)}>
          <Metal />
          {[30, 56].map((x) => (
            <g key={x} className="au-reel" style={{ transformOrigin: `${x}px 28px` }}>
              <circle cx={x} cy="28" r="12" className="au-f-gold" />
              <path d={`M${x} 18v20M${x - 10} 28h20`} strokeWidth="1.6" />
            </g>
          ))}
          <rect x="14" y="42" width="54" height="34" rx="5" className="au-f-maroon" />
          <path d="M68 52l16-8v28l-16-8z" className="au-f-cream" />
        </svg>
      );
    case "rudra-yugen":
      // Orbits round a spark.
      return (
        <svg {...mark(className)}>
          <Metal />
          <g className="au-orbits">
            {[0, 60, 120].map((a) => (
              <ellipse key={a} cx="48" cy="48" rx="38" ry="14" transform={`rotate(${a} 48 48)`} />
            ))}
          </g>
          <circle cx="48" cy="48" r="9" className="au-f-gold" />
        </svg>
      );
    default:
      return null;
  }
}
