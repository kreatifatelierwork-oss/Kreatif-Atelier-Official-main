import { d, vars } from "@/components/story/art";

/**
 * Valora's drawings: gold line work on the night ground, like a draughtsman's plate or a star chart — one stroke weight,
 * night-panel fills, soft gold washes and the odd solid gold point. All decorative (aria-hidden).
 *
 * Each plays inside <Play> (components/story/Play.tsx) or when its story step is being read (`[data-on]`), and the
 * linked cards play theirs on hover: the `v-*` classes move to their played state (app/globals.css, "Valora drawings").
 * Parts marked `data-d` lean towards the pointer. Without JavaScript every part sits at rest.
 */

const GOLD = "#d2ad64";

export type ArtProps = { className?: string };
const plate = (className: string) => ({
  "aria-hidden": true as const,
  focusable: "false" as const,
  className: `a-scene v-plate block h-auto w-full ${className}`,
  fill: "none",
  stroke: GOLD,
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/** A small four-point star, Valora's point of light. */
function Spark({ x, y, r, className = "v-f-gold" }: { x: number; y: number; r: number; className?: string }) {
  const k = r * 0.22;
  return <path className={className} stroke="none" d={`M${x} ${y - r}L${x + k} ${y - k}L${x + r} ${y}L${x + k} ${y + k}L${x} ${y + r}L${x - k} ${y + k}L${x - r} ${y}L${x - k} ${y - k}Z`} />;
}

/** Sparks that sit at rest and fly outward when played (`hidden` ones only appear then). */
function Sparks({ points, hidden = false }: { points: readonly [number, number, number, number, number][]; hidden?: boolean }) {
  return (
    <g>
      {points.map(([x, y, r, bx, by], i) => (
        <g key={i} {...d(10 + (i % 3) * 5)}>
          <g className={`a-burst ${hidden ? "a-burst--hidden" : ""}`} style={vars({ bx, by, i })}>
            <Spark x={x} y={y} r={r} />
          </g>
        </g>
      ))}
    </g>
  );
}

/** A head and shoulders, in line. */
function Figure({ x, y, r, gold = false, className = "" }: { x: number; y: number; r: number; gold?: boolean; className?: string }) {
  return (
    <g className={className}>
      <path d={`M${x - r * 1.8} ${y + r * 3.4}c0-${r * 1.8} ${r * 0.8}-${r * 2.4} ${r * 1.8}-${r * 2.4}s${r * 1.8} ${r * 0.6} ${r * 1.8} ${r * 2.4}`} className="v-f-panel" />
      <circle cx={x} cy={y} r={r} className={gold ? "v-f-gold" : "v-f-panel"} />
    </g>
  );
}

/* ── The cover ─────────────────────────────────────────────── */

const STARS: readonly [number, number, boolean][] = [
  [52, 210, false], [96, 120, true], [150, 60, false], [168, 180, false], [222, 110, true], [248, 236, false],
  [292, 54, false], [312, 160, true], [356, 98, false], [372, 222, false], [128, 262, true], [200, 30, false],
];
const LINKS: readonly [number, number][] = [
  [0, 1], [1, 2], [1, 3], [3, 4], [2, 11], [11, 6], [4, 6], [4, 7], [7, 8], [7, 9], [3, 5], [5, 10], [0, 10], [5, 9],
];

/** A network where every campus becomes a launchpad: points of light joined into one chart. Played, it lights up. */
export function Constellation({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g {...d(4)}>
        {[60, 110, 160].map((r) => (
          <ellipse key={r} cx="200" cy="150" rx={r * 1.25} ry={r * 0.82} stroke={GOLD} strokeOpacity="0.12" strokeWidth="1" />
        ))}
        {LINKS.map(([a, b], i) => (
          <line
            key={i}
            className="v-link"
            pathLength={1}
            x1={STARS[a][0]}
            y1={STARS[a][1]}
            x2={STARS[b][0]}
            y2={STARS[b][1]}
            strokeWidth="1.5"
            style={vars({ i })}
          />
        ))}
      </g>
      {STARS.map(([x, y, campus], i) => (
        <g key={i} {...d(campus ? 12 : 7)}>
          {campus && <circle className="v-halo" cx={x} cy={y} r="16" strokeWidth="1.5" style={vars({ i })} />}
          <circle className={campus ? "v-f-gold v-twinkle" : "v-f-ivory v-twinkle"} stroke="none" cx={x} cy={y} r={campus ? 6 : 3} style={vars({ i })} />
        </g>
      ))}
    </svg>
  );
}

/* ── Overview ─────────────────────────────────────────────── */

/** The gap: a campus on one cliff, industry on the other. Played, the bridge is built plank by plank. */
export function Bridge({ className = "" }: ArtProps) {
  const planks = Array.from({ length: 8 }, (_, i) => i);
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g {...d(4)}>
        {/* Cliffs */}
        <path d="M0 170h126l14 130H0z" className="v-f-panel" />
        <path d="M400 170H274l-14 130h140z" className="v-f-panel" />
        {/* Campus: a hall with columns */}
        <path d="M30 170v-46h76v46M24 124l44-26 44 26z" className="v-f-night" />
        <path d="M44 132v32M60 132v32M76 132v32M92 132v32" strokeWidth="1.5" />
        {/* Industry: towers */}
        <path d="M290 170v-70h26v70M322 170v-100h30v100M358 170v-50h24v50" className="v-f-night" />
        <path d="M298 112h10M298 126h10M330 84h14M330 100h14M330 116h14" strokeWidth="1.5" />
        {/* The span, drawn faint until it is built */}
        <path d="M126 176Q200 230 274 176" strokeDasharray="4 6" strokeOpacity="0.5" />
      </g>
      <g {...d(8)}>
        {planks.map((i) => {
          const x = 132 + i * 17;
          const t = (x + 7 - 126) / 148;
          const y = 176 + 4 * 27 * t * (1 - t) * 1.0;
          return <rect key={i} className="v-plank v-f-gold" x={x} y={y - 4} width="13" height="7" rx="1.5" stroke="none" style={vars({ i })} />;
        })}
      </g>
      <Sparks points={[[200, 120, 9, 0, -30], [68, 72, 6, -10, -12], [338, 46, 7, 10, -12]]} />
    </svg>
  );
}

/** Learn: an open book with light coming off its pages. Played, a page turns and the light rises. */
export function Learn({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g className="v-rays" {...d(10)}>
        {[-60, -30, 0, 30, 60].map((a) => (
          <path key={a} d="M200 140V74" transform={`rotate(${a} 200 150)`} strokeOpacity="0.7" />
        ))}
      </g>
      <g {...d(4)}>
        <path d="M200 160c-36-18-78-20-120-8v108c42-12 84-10 120 8z" className="v-f-panel" />
        <path d="M200 160c36-18 78-20 120-8v108c-42-12-84-10-120 8z" className="v-f-panel" />
        <path d="M100 178c26-6 54-4 82 6M100 200c26-6 54-4 82 6M100 222c26-6 54-4 82 6M218 184c28-10 56-12 82-6M218 206c28-10 56-12 82-6" strokeWidth="1.5" strokeOpacity="0.6" />
        <g className="v-page">
          <path d="M200 160c36-18 78-20 120-8v108c-42-12-84-10-120 8z" className="v-f-night" />
        </g>
        <path d="M200 160v108" />
      </g>
      <g {...d(14)}>
        <g className="v-rise">
          <Spark x={200} y={96} r={16} />
        </g>
      </g>
    </svg>
  );
}

/** Build: blocks on a stack. Played, the last two come down onto it. */
export function Build({ className = "" }: ArtProps) {
  const blocks: [number, number, number, boolean][] = [
    [120, 238, 160, false],
    [140, 196, 120, false],
    [160, 154, 80, false],
    [130, 112, 70, true],
    [210, 112, 60, true],
  ];
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <path d="M70 280h260" strokeOpacity="0.5" />
      {blocks.map(([x, y, w, late], i) => (
        <g key={i} {...d(4 + i * 2)}>
          <g className={late ? "v-drop" : ""} style={vars({ i: i - 3 })}>
            <rect x={x} y={y} width={w} height="40" rx="3" className={i === 2 ? "v-f-soft" : i === 4 ? "v-f-gold" : "v-f-panel"} />
            {!late && <path d={`M${x + 14} ${y + 20}h${w - 28}`} strokeWidth="1.5" strokeOpacity="0.5" />}
          </g>
        </g>
      ))}
      <Sparks points={[[90, 80, 8, -10, -10], [318, 120, 6, 10, -8]]} />
    </svg>
  );
}

/** Showcase: a profile on an easel. Played, a light falls on it and its badges come up. */
export function Showcase({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <path className="v-spot v-f-soft" stroke="none" d="M180 0h40l90 250H90z" />
      <g {...d(4)}>
        <path d="M150 250l30-160M250 250l-30-160M200 84v190" strokeWidth="2" />
        <rect x="118" y="70" width="164" height="132" rx="6" className="v-f-panel" />
        <circle cx="160" cy="112" r="20" className="v-f-night" />
        <path d="M194 104h66M194 120h46M138 150h124M138 166h100M138 182h112" strokeWidth="1.5" strokeOpacity="0.7" />
      </g>
      <g {...d(12)}>
        {[0, 1, 2].map((i) => (
          <g key={i} className="v-badge" style={vars({ i })}>
            <circle cx={150 + i * 50} cy="226" r="12" className="v-f-gold" stroke="none" />
          </g>
        ))}
      </g>
      <Sparks hidden points={[[200, 70, 9, -80, -40], [200, 70, 7, 84, -30]]} />
    </svg>
  );
}

/** Connect: a student and the people who need what they can do. Played, the line between them is drawn and more join. */
export function Connect({ className = "" }: ArtProps) {
  const others: [number, number][] = [[300, 70], [340, 160], [296, 240]];
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g {...d(4)}>
        <path className="v-link v-link--main" pathLength={1} d="M110 150C170 90 230 210 290 150" strokeWidth="2.5" />
        {others.map(([x, y], i) => (
          <path key={i} className="v-link" pathLength={1} d={`M250 158L${x} ${y}`} strokeWidth="1.5" style={vars({ i: i + 3 })} />
        ))}
      </g>
      <g {...d(8)}>
        <Figure x={90} y={128} r={18} gold />
      </g>
      <g {...d(10)}>
        <circle cx="250" cy="158" r="22" className="v-f-panel" />
        <Spark x={250} y={158} r={10} />
      </g>
      {others.map(([x, y], i) => (
        <g key={i} {...d(12 + i * 2)}>
          <g className="v-join" style={vars({ i })}>
            <circle cx={x} cy={y} r="12" className="v-f-ivory" stroke="none" />
          </g>
        </g>
      ))}
    </svg>
  );
}

/** Grow: steps up to the right. Played, the student climbs them to the light at the top. */
export function Grow({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g {...d(4)}>
        <path d="M50 270h60v-40h60v-40h60v-40h60v-40h60V70" className="v-f-panel" />
        <path d="M50 270h60v-40h60v-40h60v-40h60v-40h60V70V270z" className="v-f-panel" stroke="none" opacity="0.6" />
      </g>
      <g {...d(10)}>
        <g className="v-climb">
          <circle cx="80" cy="254" r="12" className="v-f-gold" stroke="none" />
        </g>
      </g>
      <g {...d(14)}>
        <g className="v-rise">
          <Spark x={320} y={44} r={18} />
        </g>
      </g>
    </svg>
  );
}

/* ── Industry & campuses ──────────────────────────────────── */

/** An industry problem: a works with a jammed gear and a question over it. Played, the gear turns. */
export function Problem({ className = "" }: ArtProps) {
  const teeth = Array.from({ length: 8 }, (_, i) => (i * Math.PI) / 4);
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g {...d(4)}>
        <path d="M60 270V150l60-36v36l60-36v36l60-36v156z" className="v-f-panel" />
        <path d="M250 270V70h34v200" className="v-f-panel" />
        <path d="M40 270h320" />
        <path d="M84 196h20M134 196h20M184 196h20" strokeWidth="1.5" strokeOpacity="0.6" />
      </g>
      <g {...d(10)}>
        <g className="v-gear">
          {teeth.map((a) => (
            <rect key={a} x="320" y="186" width="10" height="16" rx="2" className="v-f-night" transform={`rotate(${(a * 180) / Math.PI} 325 224)`} />
          ))}
          <circle cx="325" cy="224" r="26" className="v-f-night" />
          <circle cx="325" cy="224" r="9" />
        </g>
      </g>
      <g {...d(14)}>
        <g className="v-pop">
          <circle cx="310" cy="96" r="26" className="v-f-gold" stroke="none" />
          <path d="M302 90a8 8 0 1 1 10 8v6M310 114v1" stroke="#0c1014" strokeWidth="3.5" />
        </g>
      </g>
    </svg>
  );
}

/** A Valora challenge: the problem framed into a brief with a target. Played, the mark lands in the middle. */
export function Challenge({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g {...d(4)}>
        <rect x="70" y="40" width="160" height="220" rx="6" className="v-f-panel" />
        <path d="M94 74h112M94 94h80M94 130h112M94 146h112M94 162h84M94 198h112M94 214h70" strokeWidth="1.5" strokeOpacity="0.6" />
        <path d="M94 74h112" strokeWidth="3" />
      </g>
      <g {...d(8)}>
        {[46, 32, 18].map((r) => (
          <circle key={r} cx="290" cy="160" r={r} className={r === 18 ? "v-f-soft" : ""} />
        ))}
        <circle cx="290" cy="160" r="5" className="v-f-gold" stroke="none" />
      </g>
      <g {...d(14)}>
        <g className="v-arrow">
          <path d="M290 160l60-60M350 100l14-2-2 14M340 92l16-4M358 110l-4 16" strokeWidth="2.5" />
        </g>
      </g>
    </svg>
  );
}

/** A student team: three people from different fields. Played, they close in and the spark appears between them. */
export function Team({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <path d="M60 280h280" strokeOpacity="0.5" />
      <g {...d(6)}>
        <g className="v-near v-near--l">
          <Figure x={110} y={150} r={24} />
        </g>
      </g>
      <g {...d(8)}>
        <Figure x={200} y={130} r={26} gold />
      </g>
      <g {...d(6)}>
        <g className="v-near v-near--r">
          <Figure x={290} y={150} r={24} />
        </g>
      </g>
      <g {...d(14)}>
        <g className="v-rise v-rise--late">
          <Spark x={200} y={62} r={16} />
        </g>
      </g>
    </svg>
  );
}

/** A solution: a bulb and a working part. Played, the bulb lights. */
export function Solution({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g className="v-glow" {...d(10)}>
        <circle cx="200" cy="120" r="90" className="v-f-soft" stroke="none" />
        {[-70, -35, 0, 35, 70].map((a) => (
          <path key={a} d="M200 30V8" transform={`rotate(${a} 200 120)`} strokeWidth="2.5" />
        ))}
      </g>
      <g {...d(4)}>
        <path d="M200 50a62 62 0 0 1 36 112c-8 6-10 14-10 24h-52c0-10-2-18-10-24a62 62 0 0 1 36-112z" className="v-f-panel v-bulb" />
        <path d="M184 186h32M186 200h28M190 214h20" />
        <path d="M190 186v-40c0-16 20-16 20 0v40M190 146c0 12 20 12 20 0" strokeWidth="1.5" />
      </g>
      <Sparks points={[[90, 220, 9, -12, 8], [320, 230, 7, 12, 8]]} />
    </svg>
  );
}

/** Industry feedback: a word back, with a tick, and the loop that carries it into the next brief. Played, the tick and the loop are drawn. */
export function Feedback({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g {...d(4)}>
        <path className="v-link" pathLength={1} d="M300 230c60-60 20-170-80-180" strokeDasharray="1" strokeWidth="2" />
        <path className="v-join" d="M226 40l-10 10 12 8" style={vars({ i: 1 })} />
      </g>
      <g {...d(8)}>
        <path d="M70 90h170a16 16 0 0 1 16 16v74a16 16 0 0 1-16 16h-110l-34 28 6-28h-32a16 16 0 0 1-16-16v-74a16 16 0 0 1 16-16z" className="v-f-panel" />
        <path className="v-link v-link--main" pathLength={1} d="M120 144l24 24 50-50" strokeWidth="5" />
      </g>
      <Sparks hidden points={[[160, 90, 9, -40, -40], [160, 90, 7, 50, -46]]} />
    </svg>
  );
}

/* ── Explore cards ────────────────────────────────────────── */

/** The ecosystem: a centre and the parts that turn around it. Played (or its card hovered), the ring turns. */
export function Orbit({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <ellipse cx="200" cy="150" rx="150" ry="104" strokeOpacity="0.3" />
      <ellipse cx="200" cy="150" rx="96" ry="66" strokeOpacity="0.5" />
      <g className="v-turn">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => {
          const a = (k * Math.PI) / 4;
          return <circle key={k} cx={200 + Math.cos(a) * 150} cy={150 + Math.sin(a) * 104} r={k % 2 ? 6 : 9} className={k % 2 ? "v-f-ivory" : "v-f-gold"} stroke="none" />;
        })}
      </g>
      <circle cx="200" cy="150" r="30" className="v-f-panel" />
      <Spark x={200} y={150} r={14} />
    </svg>
  );
}

/** A campus that becomes a launchpad: a hall and a light rising from it. Played, the light climbs. */
export function Launch({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g {...d(4)}>
        <path d="M110 270v-80h180v80M96 190l104-56 104 56z" className="v-f-panel" />
        <path d="M134 204v54M166 204v54M234 204v54M266 204v54" strokeWidth="1.5" />
        <rect x="186" y="214" width="28" height="56" className="v-f-night" />
        <path d="M70 270h260" />
      </g>
      <g className="v-launch">
        <path d="M200 128V70" strokeDasharray="3 6" strokeOpacity="0.7" />
        <Spark x={200} y={56} r={16} />
      </g>
      <Sparks points={[[96, 70, 6, -10, -10], [312, 90, 8, 10, -10]]} />
    </svg>
  );
}

/* ── The ecosystem page ───────────────────────────────────── */

/** The Valora profile: a record that fills in. Played, its sections are filled one by one. */
export function ProfileCard({ className = "" }: ArtProps) {
  const tiles = Array.from({ length: 8 }, (_, i) => [130 + (i % 4) * 56, 156 + Math.floor(i / 4) * 52] as const);
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g {...d(4)}>
        <rect x="110" y="30" width="250" height="250" rx="10" className="v-f-panel" />
        <circle cx="158" cy="86" r="28" className="v-f-night" />
        <path d="M200 74h120M200 92h84M200 110h100" strokeWidth="1.5" strokeOpacity="0.7" />
        {tiles.map(([x, y], i) => (
          <rect key={i} x={x} y={y} width="44" height="40" rx="4" className="v-tile" style={vars({ i })} />
        ))}
      </g>
      <g {...d(12)}>
        <g className="v-rise">
          <rect x="40" y="200" width="90" height="62" rx="6" className="v-f-night" />
          <path d="M56 222h58M56 238h40" strokeWidth="1.5" />
        </g>
      </g>
      <Sparks points={[[60, 70, 9, -10, -10]]} />
    </svg>
  );
}

/** Faculty connects the system: a centre with six roles around it. Played, every line is drawn. */
export function Hub({ className = "" }: ArtProps) {
  const roles = Array.from({ length: 6 }, (_, k) => {
    const a = -Math.PI / 2 + (k * Math.PI) / 3;
    return [200 + Math.cos(a) * 130, 150 + Math.sin(a) * 100] as const;
  });
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      <g {...d(4)}>
        {roles.map(([x, y], k) => (
          <line key={k} className="v-link" pathLength={1} x1="200" y1="150" x2={x} y2={y} strokeWidth="1.5" style={vars({ i: k })} />
        ))}
        <circle cx="200" cy="150" r="38" className="v-f-panel" />
        <Figure x={200} y={136} r={12} gold />
      </g>
      {roles.map(([x, y], k) => (
        <g key={k} {...d(8 + (k % 3) * 3)}>
          <circle className="v-node" cx={x} cy={y} r="16" style={vars({ i: k })} />
        </g>
      ))}
    </svg>
  );
}

/** Every project becomes evidence: a folder of five sheets. Played, they fan out. */
export function Evidence({ className = "" }: ArtProps) {
  return (
    <svg viewBox="0 0 400 300" {...plate(className)}>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} {...d(4 + i * 2)}>
          <g className="v-fan" style={vars({ r: (i - 2) * 11, tx: (i - 2) * 26 })}>
            <rect x="140" y="60" width="120" height="170" rx="5" className={i === 4 ? "v-f-panel" : "v-f-night"} />
            <path d="M156 84h88M156 100h60" strokeWidth="1.5" strokeOpacity="0.6" />
            {i === 4 && <Spark x={200} y={170} r={22} />}
          </g>
        </g>
      ))}
      <path d="M80 260h240" strokeOpacity="0.5" />
    </svg>
  );
}

/* ── Field icons ───────────────────────────────────────────── */

export type FieldIcon = "business" | "technology" | "design" | "research" | "impact" | "venture";

const FIELDS: Record<FieldIcon, React.ReactNode> = {
  business: (
    <>
      <rect x="10" y="22" width="44" height="30" rx="4" />
      <path d="M24 22v-6h16v6M10 34h44" />
      <rect x="28" y="30" width="8" height="8" rx="1" className="v-f-gold" stroke="none" />
    </>
  ),
  technology: (
    <>
      <rect x="18" y="18" width="28" height="28" rx="4" />
      <path d="M24 10v8M32 10v8M40 10v8M24 46v8M32 46v8M40 46v8M10 24h8M10 32h8M10 40h8M46 24h8M46 32h8M46 40h8" />
      <rect x="25" y="25" width="14" height="14" rx="2" className="v-f-gold" stroke="none" />
    </>
  ),
  design: (
    <>
      <path d="M32 8l14 22-14 26-14-26z" />
      <path d="M32 30v26" />
      <circle cx="32" cy="30" r="4" className="v-f-gold" stroke="none" />
    </>
  ),
  research: (
    <>
      <path d="M24 8h16M27 8v16L12 50a4 4 0 0 0 4 6h32a4 4 0 0 0 4-6L37 24V8" />
      <path d="M18 40h28l4 8a2 2 0 0 1-2 3H16a2 2 0 0 1-2-3z" className="v-f-gold" stroke="none" />
    </>
  ),
  impact: (
    <>
      <circle cx="32" cy="32" r="22" />
      <path d="M10 32h44M32 10c-8 8-8 36 0 44M32 10c8 8 8 36 0 44" />
      <circle cx="32" cy="32" r="5" className="v-f-gold" stroke="none" />
    </>
  ),
  venture: (
    <>
      <path d="M32 6c10 8 14 20 12 32H20C18 26 22 14 32 6z" />
      <path d="M20 38l-8 10h10M44 38l8 10H42M26 46l6 12 6-12" />
      <circle cx="32" cy="24" r="5" className="v-f-gold" stroke="none" />
    </>
  ),
};

/** A 64×64 line icon in gold, its one solid point turning when its card is hovered. */
export function FieldGlyph({ name }: { name: FieldIcon }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className="v-icon" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {FIELDS[name]}
    </svg>
  );
}

export const valoraArt = {
  learn: Learn,
  build: Build,
  showcase: Showcase,
  connect: Connect,
  grow: Grow,
  problem: Problem,
  challenge: Challenge,
  team: Team,
  solution: Solution,
  feedback: Feedback,
  orbit: Orbit,
  bridge: Bridge,
  launch: Launch,
  constellation: Constellation,
} as const;
