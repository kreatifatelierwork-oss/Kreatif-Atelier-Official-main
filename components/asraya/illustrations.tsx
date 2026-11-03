/**
 * Asraya's drawings, made for the site in its four colours: ink lines, marigold and clay fills, ivory and sand
 * highlights. Flat shapes with one line weight, so the set reads as one hand. All decorative (aria-hidden).
 * Parts marked `data-a-*` are moved by AsrayaMotion on scroll; without it they sit in their final place.
 */

const INK = "#1c2526";

/** The ✦ brand star, centred on (x, y). */
function Star({ x, y, r, className = "a-art-fill" }: { x: number; y: number; r: number; className?: string }) {
  const k = r * 0.16;
  return (
    <path
      className={className}
      d={`M${x} ${y - r}C${x + k} ${y - k} ${x + k} ${y - k} ${x + r} ${y}C${x + k} ${y + k} ${x + k} ${y + k} ${x} ${y + r}C${x - k} ${y + k} ${x - k} ${y + k} ${x - r} ${y}C${x - k} ${y - k} ${x - k} ${y - k} ${x} ${y - r}Z`}
    />
  );
}

/* ── Service icons ─────────────────────────────────────────── */

export type IconName = "identity" | "website" | "search" | "ads" | "press" | "film" | "campaign" | "network" | "print" | "people";

const ICONS: Record<IconName, React.ReactNode> = {
  identity: (
    <>
      <path d="M25 38l-5 18 7-4 5 6 0-17M39 38l5 18-7-4-5 6" />
      <circle cx="32" cy="26" r="16" />
      <circle cx="32" cy="26" r="8" className="a-art-fill" stroke="none" />
    </>
  ),
  website: (
    <>
      <rect x="8" y="12" width="48" height="40" rx="5" />
      <path d="M8 22h48M15 38h31M15 44h22" />
      <rect x="15" y="27" width="20" height="5" rx="1.5" className="a-art-fill" stroke="none" />
    </>
  ),
  search: (
    <>
      <circle cx="28" cy="28" r="15" />
      <circle cx="28" cy="28" r="6" className="a-art-fill" stroke="none" />
      <path d="M39 39l14 14" strokeWidth="5" />
    </>
  ),
  ads: (
    <>
      <path d="M12 26v12h8l22 12V14L20 26z" />
      <path d="M20 38l4 13h6l-3-13" />
      <path d="M49 24q6 8 0 16" className="a-art-stroke" />
    </>
  ),
  press: (
    <>
      <rect x="10" y="12" width="44" height="40" rx="4" />
      <rect x="16" y="18" width="14" height="12" rx="1.5" className="a-art-fill" stroke="none" />
      <path d="M35 20h13M35 27h13M16 37h32M16 44h24" />
    </>
  ),
  film: (
    <>
      <rect x="8" y="24" width="34" height="24" rx="4" />
      <path d="M42 32l14-8v24l-14-8z" />
      <circle cx="17" cy="16" r="6" />
      <circle cx="32" cy="16" r="6" />
      <circle cx="25" cy="36" r="5" className="a-art-fill" stroke="none" />
    </>
  ),
  campaign: (
    <>
      <path d="M17 8v48" />
      <path d="M17 12h30l-7 9 7 9H17" className="a-art-fill" />
    </>
  ),
  network: (
    <>
      <path d="M16 18L32 34L48 16M32 34L14 48M32 34L50 48M16 18L14 48M48 16L50 48" />
      {[
        [16, 18],
        [48, 16],
        [14, 48],
        [50, 48],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="4.5" className="a-art-fill--ivory" />
      ))}
      <circle cx="32" cy="34" r="7" className="a-art-fill" />
    </>
  ),
  print: (
    <>
      <path d="M16 8h22l10 10v38H16z" />
      <path d="M38 8v10h10" />
      <path d="M23 32h18M23 39h18M23 46h11" />
      <rect x="23" y="20" width="9" height="6" rx="1" className="a-art-fill" stroke="none" />
    </>
  ),
  people: (
    <>
      <circle cx="22" cy="22" r="7" />
      <circle cx="43" cy="22" r="7" className="a-art-fill" />
      <path d="M9 52c0-9 6-15 13-15s13 6 13 15M30 52c0-9 6-15 13-15s13 6 13 15" />
    </>
  ),
};

/** A 64×64 line icon in the text colour, with one marigold accent. */
export function ServiceIcon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false" className={`a-icon ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {ICONS[name]}
    </svg>
  );
}

/* ── Scenes ────────────────────────────────────────────────── */

type SceneProps = { className?: string };
const scene = (className: string) => ({
  "aria-hidden": true as const,
  focusable: "false" as const,
  className: `block h-auto w-full ${className}`,
  fill: "none",
  stroke: INK,
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/** A gift: everything, given. The bow lifts a little as it scrolls in. */
export function Gift({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 320" {...scene(className)}>
      <ellipse cx="200" cy="292" rx="140" ry="14" className="a-art-fill--teal" stroke="none" opacity="0.35" />
      <rect x="112" y="160" width="176" height="124" rx="10" className="a-art-fill" />
      <rect x="98" y="126" width="204" height="42" rx="10" className="a-art-fill" />
      <rect x="188" y="126" width="24" height="158" className="a-art-fill--clay" />
      <g data-a-lift>
        <path d="M200 126C166 70 122 92 160 126Z" className="a-art-fill--clay" />
        <path d="M200 126C234 70 278 92 240 126Z" className="a-art-fill--clay" />
        <circle cx="200" cy="124" r="11" className="a-art-fill--clay" />
      </g>
      <g stroke="none">
        <Star x={84} y={92} r={16} className="a-art-fill--ivory" />
        <Star x={318} y={70} r={22} className="a-art-fill" />
        <Star x={336} y={186} r={10} className="a-art-fill--ivory" />
        <Star x={66} y={214} r={9} className="a-art-fill" />
      </g>
    </svg>
  );
}

function House({ x, y, s, lit = false }: { x: number; y: number; s: number; lit?: boolean }) {
  return (
    <g>
      <path d={`M${x - s} ${y}V${y - s}L${x} ${y - 1.8 * s}L${x + s} ${y - s}V${y}Z`} className={lit ? "a-art-fill" : "a-art-fill--ivory"} />
      <rect x={x - s * 0.28} y={y - s * 0.62} width={s * 0.56} height={s * 0.62} className={lit ? "a-art-fill--ivory" : "a-art-fill--sand"} />
    </g>
  );
}

/** Many small houses in the dark, and one in the light: being seen. The beam sweeps in on scroll. */
export function Spotlight({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="248" rx="180" ry="38" className="a-art-fill--sand" stroke="none" />
      <path data-a-beam d="M182 10H218L268 238H132Z" className="a-art-fill" stroke="none" opacity="0.32" />
      <path d="M176 10h48" strokeWidth="6" />
      <House x={72} y={232} s={16} />
      <House x={118} y={262} s={14} />
      <House x={300} y={226} s={15} />
      <House x={342} y={256} s={13} />
      <House x={258} y={270} s={12} />
      <House x={64} y={276} s={11} />
      <House x={200} y={238} s={28} lit />
      <g stroke="none">
        <Star x={236} y={154} r={9} className="a-art-fill--clay" />
      </g>
    </svg>
  );
}

/** A megaphone and the sound going out to people: amplifying change. The waves pulse. */
export function Amplify({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <path d="M40 128v44h30l84 46V82L70 128z" className="a-art-fill--ivory" />
      <path d="M70 172l14 48h22l-11-48" className="a-art-fill--sand" />
      <rect x="40" y="128" width="30" height="44" className="a-art-fill" />
      <g stroke="#e9a23b" strokeWidth="9">
        <path className="a-wave" d="M188 112q24 38 0 76" />
        <path className="a-wave" d="M216 90q38 60 0 120" />
        <path className="a-wave" d="M244 68q52 82 0 164" />
      </g>
      {[
        [318, 96, 14, "a-art-fill"],
        [352, 150, 12, "a-art-fill--ivory"],
        [320, 206, 15, "a-art-fill--clay"],
        [364, 228, 10, "a-art-fill"],
        [362, 70, 9, "a-art-fill--ivory"],
      ].map(([cx, cy, r, fill]) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx as number} cy={cy as number} r={r as number} className={fill as string} />
          <path d={`M${(cx as number) - (r as number) * 1.4} ${(cy as number) + (r as number) * 2.6}q${(r as number) * 1.4} -${(r as number) * 2.2} ${(r as number) * 2.8} 0`} />
        </g>
      ))}
    </svg>
  );
}

/** Two circles meeting — your organisation and Asraya — with the ✦ where they overlap. They slide together on scroll. */
export function Together({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <defs>
        <clipPath id="a-together-left">
          <circle cx="160" cy="150" r="96" />
        </clipPath>
      </defs>
      <g data-a-slide="left">
        <circle cx="160" cy="150" r="96" className="a-art-fill" />
      </g>
      <g data-a-slide="right">
        <circle cx="240" cy="150" r="96" className="a-art-fill--ivory" />
      </g>
      <circle cx="240" cy="150" r="96" className="a-art-fill--clay" clipPath="url(#a-together-left)" stroke="none" data-a-fade />
      <circle cx="160" cy="150" r="96" />
      <circle cx="240" cy="150" r="96" />
      <g stroke="none" data-a-fade>
        <Star x={200} y={150} r={26} className="a-art-fill--ivory" />
      </g>
    </svg>
  );
}

/** Tomorrow: a sun coming up over the hills. It rises as the page scrolls. */
export function Sunrise({ className = "" }: SceneProps) {
  const rays = Array.from({ length: 9 }, (_, i) => (Math.PI * (i + 1)) / 10);
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <defs>
        <clipPath id="a-sunrise-sky">
          <rect x="0" y="0" width="400" height="214" />
        </clipPath>
      </defs>
      <g clipPath="url(#a-sunrise-sky)">
        <g data-a-rise>
          {rays.map((a) => (
            <path key={a} d={`M${200 + Math.cos(a) * 112} ${214 - Math.sin(a) * 112}L${200 + Math.cos(a) * 150} ${214 - Math.sin(a) * 150}`} stroke="#e9a23b" strokeWidth="6" />
          ))}
          <circle cx="200" cy="214" r="92" className="a-art-fill" />
        </g>
      </g>
      <path d="M0 214C70 182 130 186 200 210C270 186 330 180 400 210V300H0Z" className="a-art-fill--clay" />
      <path d="M0 246C90 222 150 230 220 252C290 232 340 228 400 244V300H0Z" className="a-art-fill--sand" />
      <g stroke="none">
        <Star x={70} y={70} r={12} className="a-art-fill--ivory" />
        <Star x={334} y={52} r={8} className="a-art-fill--ivory" />
      </g>
    </svg>
  );
}

/** What we build: a website, a phone with a social page, and the ✦ — the work, in use. */
export function Toolkit({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <g data-a-slide="left">
        <rect x="24" y="40" width="270" height="190" rx="14" className="a-art-fill--ivory" />
        <path d="M24 72h270" />
        <circle cx="46" cy="56" r="5" className="a-art-fill--clay" stroke="none" />
        <circle cx="64" cy="56" r="5" className="a-art-fill" stroke="none" />
        <rect x="46" y="92" width="122" height="70" rx="6" className="a-art-fill" />
        <path d="M188 100h80M188 118h66M188 136h76M46 186h210M46 204h150" />
      </g>
      <g data-a-slide="right">
        <rect x="252" y="96" width="112" height="190" rx="18" className="a-art-fill--sand" />
        <rect x="268" y="124" width="80" height="80" rx="8" className="a-art-fill--clay" />
        <path d="M268 222h80M268 240h52" />
        <path d="M296 108h24" strokeWidth="4" />
      </g>
      <g stroke="none" data-a-fade>
        <Star x={308} y={164} r={18} className="a-art-fill--ivory" />
        <Star x={360} y={58} r={14} className="a-art-fill" />
      </g>
    </svg>
  );
}
