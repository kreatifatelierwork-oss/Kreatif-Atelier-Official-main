/**
 * Asraya's drawings, made for the site in its four colours: ink lines, marigold and clay fills, ivory and sand
 * highlights. Flat shapes with one line weight, so the set reads as one hand. All decorative (aria-hidden).
 *
 * Every scene can be played inside <Play> (components/asraya/Play.tsx): parts marked `data-d` lean towards the
 * pointer, and the classes below (`a-gift__lid`, `a-house__wall`, `a-tick`…) move to their played state when the
 * drawing is pressed, or when a linked card holding it is hovered (app/globals.css, "Playable drawings").
 * Parts marked `data-a-*` are also moved by AsrayaMotion on scroll. Without JavaScript every part sits at rest.
 */

const INK = "#1c2526";

/** A part that leans towards the pointer; deeper parts lean further. */
const d = (depth: number) => ({ "data-d": "", style: { "--d": depth } as React.CSSProperties });
/** CSS variables for one part's played state (an offset, an index for staggering). */
const vars = (values: Record<string, number>) =>
  Object.fromEntries(Object.entries(values).map(([key, value]) => [`--${key}`, value])) as React.CSSProperties;

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

/** Small stars that sit at rest around a point and fly outward when played. `hidden` ones only appear then. */
function Burst({ stars, hidden = false }: { stars: readonly [number, number, number, number, number, string?][]; hidden?: boolean }) {
  return (
    <g stroke="none">
      {stars.map(([x, y, r, bx, by, fill = "a-art-fill"], i) => (
        <g key={i} {...d(10 + (i % 3) * 6)}>
          <g className={`a-burst ${hidden ? "a-burst--hidden" : ""}`} style={vars({ bx, by, i })}>
            <Star x={x} y={y} r={r} className={fill} />
          </g>
        </g>
      ))}
    </g>
  );
}

/* ── Icons ─────────────────────────────────────────────────── */

export type IconName =
  | "identity"
  | "website"
  | "search"
  | "ads"
  | "press"
  | "film"
  | "campaign"
  | "network"
  | "print"
  | "people"
  | "safety"
  | "animal"
  | "elder"
  | "education"
  | "community"
  | "environment";

const ICONS: Record<IconName, React.ReactNode> = {
  identity: (
    <>
      <path d="M25 38l-5 18 7-4 5 6 0-17M39 38l5 18-7-4-5 6" />
      <circle cx="32" cy="26" r="16" />
      <circle cx="32" cy="26" r="8" className="a-art-fill a-icon__accent" stroke="none" />
    </>
  ),
  website: (
    <>
      <rect x="8" y="12" width="48" height="40" rx="5" />
      <path d="M8 22h48M15 38h31M15 44h22" />
      <rect x="15" y="27" width="20" height="5" rx="1.5" className="a-art-fill a-icon__accent" stroke="none" />
    </>
  ),
  search: (
    <>
      <circle cx="28" cy="28" r="15" />
      <circle cx="28" cy="28" r="6" className="a-art-fill a-icon__accent" stroke="none" />
      <path d="M39 39l14 14" strokeWidth="5" />
    </>
  ),
  ads: (
    <>
      <path d="M12 26v12h8l22 12V14L20 26z" />
      <path d="M20 38l4 13h6l-3-13" />
      <path d="M49 24q6 8 0 16" className="a-art-stroke a-icon__accent" />
    </>
  ),
  press: (
    <>
      <rect x="10" y="12" width="44" height="40" rx="4" />
      <rect x="16" y="18" width="14" height="12" rx="1.5" className="a-art-fill a-icon__accent" stroke="none" />
      <path d="M35 20h13M35 27h13M16 37h32M16 44h24" />
    </>
  ),
  film: (
    <>
      <rect x="8" y="24" width="34" height="24" rx="4" />
      <path d="M42 32l14-8v24l-14-8z" />
      <circle cx="17" cy="16" r="6" />
      <circle cx="32" cy="16" r="6" />
      <circle cx="25" cy="36" r="5" className="a-art-fill a-icon__accent" stroke="none" />
    </>
  ),
  campaign: (
    <>
      <path d="M17 8v48" />
      <path d="M17 12h30l-7 9 7 9H17" className="a-art-fill a-icon__accent" />
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
      <circle cx="32" cy="34" r="7" className="a-art-fill a-icon__accent" />
    </>
  ),
  print: (
    <>
      <path d="M16 8h22l10 10v38H16z" />
      <path d="M38 8v10h10" />
      <path d="M23 32h18M23 39h18M23 46h11" />
      <rect x="23" y="20" width="9" height="6" rx="1" className="a-art-fill a-icon__accent" stroke="none" />
    </>
  ),
  people: (
    <>
      <circle cx="22" cy="22" r="7" />
      <circle cx="43" cy="22" r="7" className="a-art-fill a-icon__accent" />
      <path d="M9 52c0-9 6-15 13-15s13 6 13 15M30 52c0-9 6-15 13-15s13 6 13 15" />
    </>
  ),
  safety: (
    <>
      <path d="M32 8l20 7v15c0 13-9 22-20 26-11-4-20-13-20-26V15z" />
      <path d="M32 16l12 4v10c0 8-5 14-12 17z" className="a-art-fill a-icon__accent" stroke="none" />
      <path d="M22 31l7 7 13-15" />
    </>
  ),
  animal: (
    <>
      <path d="M19 46c0-9 6-15 13-15s13 6 13 15c0 6-6 8-13 8s-13-2-13-8z" className="a-art-fill a-icon__accent" />
      <circle cx="14" cy="30" r="5" />
      <circle cx="24" cy="18" r="5" />
      <circle cx="40" cy="18" r="5" />
      <circle cx="50" cy="30" r="5" />
    </>
  ),
  elder: (
    <>
      <path d="M32 34c-4-8-15-6-15 2 0 8 15 15 15 15s15-7 15-15c0-8-11-10-15-2z" className="a-art-fill a-icon__accent" />
      <path d="M6 40h8l9 13h18l9-13h8" />
      <path d="M32 8v8M20 12l3 6M44 12l-3 6" />
    </>
  ),
  education: (
    <>
      <path d="M8 16c8-3 16-3 24 2 8-5 16-5 24-2v34c-8-3-16-3-24 2-8-5-16-5-24-2z" />
      <path d="M32 18v34M14 26h12M14 33h12M14 40h9" />
      <path d="M38 16v16l4-3 4 3V16" className="a-art-fill a-icon__accent" />
    </>
  ),
  community: (
    <>
      <path d="M8 30L32 10l24 20" />
      <path d="M14 26v28h36V26" />
      <rect x="26" y="38" width="12" height="16" rx="1.5" className="a-art-fill a-icon__accent" />
      <circle cx="32" cy="27" r="4" />
    </>
  ),
  environment: (
    <>
      <path d="M12 52C12 26 28 12 54 10c0 26-14 42-42 42z" className="a-art-fill a-icon__accent" />
      <path d="M12 52l28-28M24 40h10M30 34v-8" />
    </>
  ),
};

/** A 64×64 line icon in the text colour, with one marigold accent that turns when its card is hovered. */
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
  className: `a-scene block h-auto w-full ${className}`,
  fill: "none",
  stroke: INK,
  strokeWidth: 3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

/** A gift: everything, given. Played, the lid swings open, light pours out and the stars fly. */
export function Gift({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 320" {...scene(className)}>
      <g {...d(5)}>
        <ellipse cx="200" cy="292" rx="140" ry="14" className="a-art-fill--teal" stroke="none" opacity="0.35" />
        <path className="a-gift__glow a-art-fill--ivory" d="M128 160L70 20H330L272 160Z" stroke="none" />
        <rect x="112" y="160" width="176" height="124" rx="10" className="a-art-fill" />
        <rect x="188" y="160" width="24" height="124" className="a-art-fill--clay" />
        <g className="a-gift__lid">
          <rect x="98" y="126" width="204" height="42" rx="10" className="a-art-fill" />
          <rect x="188" y="126" width="24" height="42" className="a-art-fill--clay" />
          <g data-a-lift>
            <path d="M200 126C166 70 122 92 160 126Z" className="a-art-fill--clay" />
            <path d="M200 126C234 70 278 92 240 126Z" className="a-art-fill--clay" />
            <circle cx="200" cy="124" r="11" className="a-art-fill--clay" />
          </g>
        </g>
      </g>
      <Burst
        stars={[
          [84, 92, 16, -26, -30, "a-art-fill--ivory"],
          [318, 70, 22, 22, -34],
          [336, 186, 10, 30, -10, "a-art-fill--ivory"],
          [66, 214, 9, -24, 4],
        ]}
      />
      <Burst
        hidden
        stars={[
          [200, 120, 12, -60, -86, "a-art-fill--ivory"],
          [200, 120, 9, 52, -96],
          [200, 120, 7, 4, -110, "a-art-fill--ivory"],
        ]}
      />
    </svg>
  );
}

function House({ x, y, s, i, lit = false }: { x: number; y: number; s: number; i: number; lit?: boolean }) {
  return (
    <g {...d(lit ? 7 : 3 + (i % 3))}>
      <path d={`M${x - s} ${y}V${y - s}L${x} ${y - 1.8 * s}L${x + s} ${y - s}V${y}Z`} className={lit ? "a-art-fill" : "a-art-fill--ivory a-house__wall"} style={vars({ i })} />
      <rect x={x - s * 0.28} y={y - s * 0.62} width={s * 0.56} height={s * 0.62} className={lit ? "a-art-fill--ivory" : "a-art-fill--sand a-house__win"} style={vars({ i })} />
    </g>
  );
}

/** Many small houses in the dark, and one in the light: being seen. The beam follows the pointer; played, every house lights. */
export function Spotlight({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="248" rx="180" ry="38" className="a-art-fill--sand" stroke="none" />
      <g className="a-spot__beam">
        <path data-a-beam d="M182 10H218L268 238H132Z" className="a-art-fill" stroke="none" opacity="0.32" />
      </g>
      <path d="M176 10h48" strokeWidth="6" />
      <House i={1} x={72} y={232} s={16} />
      <House i={2} x={118} y={262} s={14} />
      <House i={4} x={300} y={226} s={15} />
      <House i={5} x={342} y={256} s={13} />
      <House i={3} x={258} y={270} s={12} />
      <House i={0} x={64} y={276} s={11} />
      <House i={6} x={200} y={238} s={28} lit />
      <Burst stars={[[236, 154, 9, 8, -12, "a-art-fill--clay"]]} />
    </svg>
  );
}

/** A megaphone and the sound going out to people: amplifying change. It aims with the pointer; played, the crowd jumps. */
export function Amplify({ className = "" }: SceneProps) {
  const people: [number, number, number, string][] = [
    [318, 96, 14, "a-art-fill"],
    [352, 150, 12, "a-art-fill--ivory"],
    [320, 206, 15, "a-art-fill--clay"],
    [364, 228, 10, "a-art-fill"],
    [362, 70, 9, "a-art-fill--ivory"],
  ];
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <g className="a-amp__horn">
        <path d="M40 128v44h30l84 46V82L70 128z" className="a-art-fill--ivory" />
        <path d="M70 172l14 48h22l-11-48" className="a-art-fill--sand" />
        <rect x="40" y="128" width="30" height="44" className="a-art-fill" />
        <g className="a-amp__waves" stroke="#e9a23b" strokeWidth="9">
          <path className="a-wave" d="M188 112q24 38 0 76" />
          <path className="a-wave" d="M216 90q38 60 0 120" />
          <path className="a-wave" d="M244 68q52 82 0 164" />
        </g>
      </g>
      {people.map(([cx, cy, r, fill], i) => (
        <g key={`${cx}-${cy}`} {...d(6 + i * 2)}>
          <g className="a-hop" style={vars({ i })}>
            <circle cx={cx} cy={cy} r={r} className={fill} />
            <path d={`M${cx - r * 1.4} ${cy + r * 2.6}q${r * 1.4} -${r * 2.2} ${r * 2.8} 0`} />
          </g>
        </g>
      ))}
    </svg>
  );
}

/** Two circles meeting — your organisation and Asraya — with the ✦ where they overlap. Played, the ✦ grows and sends out rings. */
export function Together({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <defs>
        <clipPath id="a-together-left">
          <circle cx="160" cy="150" r="96" />
        </clipPath>
      </defs>
      <g {...d(5)}>
        <circle className="a-together__ring" cx="200" cy="150" r="60" stroke="#e9a23b" strokeWidth="4" />
        <circle className="a-together__ring a-together__ring--late" cx="200" cy="150" r="60" stroke="#e9a23b" strokeWidth="4" />
        <g data-a-slide="left">
          <circle cx="160" cy="150" r="96" className="a-art-fill" />
        </g>
        <g data-a-slide="right">
          <circle cx="240" cy="150" r="96" className="a-art-fill--ivory" />
        </g>
        <circle cx="240" cy="150" r="96" className="a-art-fill--clay" clipPath="url(#a-together-left)" stroke="none" data-a-fade />
        <circle cx="160" cy="150" r="96" />
        <circle cx="240" cy="150" r="96" />
      </g>
      <g stroke="none" {...d(14)}>
        <g data-a-fade>
          <g className="a-together__star">
            <Star x={200} y={150} r={26} className="a-art-fill--ivory" />
          </g>
        </g>
      </g>
      <Burst
        hidden
        stars={[
          [200, 150, 9, -70, -104],
          [200, 150, 8, 84, -96, "a-art-fill--clay"],
          [200, 150, 10, 96, 100],
          [200, 150, 7, -92, 92, "a-art-fill--clay"],
        ]}
      />
    </svg>
  );
}

/** Tomorrow: a sun coming up over the hills. It rises on scroll and follows the pointer up; played, the day breaks. */
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
        <g className="a-sun">
          <g data-a-rise>
            <g className="a-sun__rays">
              {rays.map((a) => (
                <path key={a} d={`M${200 + Math.cos(a) * 112} ${214 - Math.sin(a) * 112}L${200 + Math.cos(a) * 150} ${214 - Math.sin(a) * 150}`} stroke="#e9a23b" strokeWidth="6" />
              ))}
            </g>
            <circle cx="200" cy="214" r="92" className="a-art-fill" />
          </g>
        </g>
      </g>
      <g {...d(4)}>
        <path d="M-20 214C70 182 130 186 200 210C270 186 330 180 420 210V320H-20Z" className="a-art-fill--clay" />
      </g>
      <g {...d(9)}>
        <path d="M-20 246C90 222 150 230 220 252C290 232 340 228 420 244V320H-20Z" className="a-art-fill--sand" />
      </g>
      <g stroke="none" className="a-sun__night">
        <g {...d(14)}>
          <Star x={70} y={70} r={12} className="a-art-fill--ivory" />
        </g>
        <g {...d(18)}>
          <Star x={334} y={52} r={8} className="a-art-fill--ivory" />
        </g>
      </g>
    </svg>
  );
}

/** What we build: a website, a phone with a social page, and the ✦ — the work, in use. Played, the page goes live. */
export function Toolkit({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <g {...d(4)}>
        <g data-a-slide="left">
          <rect x="24" y="40" width="270" height="190" rx="14" className="a-art-fill--ivory" />
          <path d="M24 72h270" />
          <circle cx="46" cy="56" r="5" className="a-art-fill--clay" stroke="none" />
          <circle cx="64" cy="56" r="5" className="a-art-fill" stroke="none" />
          <rect x="46" y="92" width="122" height="70" rx="6" className="a-art-fill a-tk__hero" />
          <g className="a-tk__lines">
            <path d="M188 100h80M188 118h66M188 136h76M46 186h210M46 204h150" />
          </g>
        </g>
      </g>
      <g {...d(12)}>
        <g data-a-slide="right">
          <g className="a-tk__phone">
            <rect x="252" y="96" width="112" height="190" rx="18" className="a-art-fill--sand" />
            <rect x="268" y="124" width="80" height="80" rx="8" className="a-art-fill--clay" />
            <path d="M268 222h80M268 240h52" />
            <path d="M296 108h24" strokeWidth="4" />
            <g className="a-tk__like">
              <circle cx="352" cy="118" r="22" className="a-art-fill" />
              <path d="M352 129c-9-6-13-10-13-15a6 6 0 0 1 13-3 6 6 0 0 1 13 3c0 5-4 9-13 15z" className="a-art-fill--ivory" strokeWidth="2.5" />
            </g>
          </g>
        </g>
      </g>
      <g stroke="none" data-a-fade>
        <g {...d(16)}>
          <g className="a-spin">
            <Star x={308} y={164} r={18} className="a-art-fill--ivory" />
          </g>
        </g>
        <g {...d(22)}>
          <g className="a-spin">
            <Star x={360} y={58} r={14} className="a-art-fill" />
          </g>
        </g>
      </g>
    </svg>
  );
}

/** How you look: a stamp over a sheet of letterhead. Played, it comes down and leaves the ✦ mark. */
export function Stamp({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="282" rx="160" ry="10" className="a-art-fill--teal" stroke="none" opacity="0.25" />
      <g {...d(3)}>
        <rect x="70" y="170" width="260" height="104" rx="8" className="a-art-fill--ivory" />
        <path d="M92 192h60M92 252h120M92 262h80" />
        <path d="M270 192h38" stroke="#a8401f" />
        <g className="a-stamp__print">
          <circle cx="200" cy="222" r="30" stroke="#a8401f" strokeWidth="3.5" strokeDasharray="4 5" />
          <Star x={200} y={222} r={18} className="a-art-fill--clay" />
        </g>
      </g>
      <g {...d(12)}>
        <g className="a-stamp__tool">
          <circle cx="200" cy="38" r="20" className="a-art-fill--clay" />
          <rect x="189" y="56" width="22" height="42" rx="4" className="a-art-fill--teal" />
          <rect x="148" y="96" width="104" height="34" rx="8" className="a-art-fill" />
          <rect x="160" y="130" width="80" height="12" rx="3" className="a-art-fill--clay" />
        </g>
      </g>
      <Burst
        stars={[
          [96, 70, 12, -14, -10, "a-art-fill"],
          [318, 104, 9, 16, -8, "a-art-fill--clay"],
        ]}
      />
    </svg>
  );
}

/** Your work is a story: three papers in a stack. Played, they fan out and the front page carries the ✦. */
export function Press({ className = "" }: SceneProps) {
  const sheets = [
    { r: -16, tx: -42, rest: -5, fill: "a-art-fill--sand" },
    { r: 14, tx: 44, rest: 4, fill: "a-art-fill--sand" },
    { r: 0, tx: 0, rest: 0, fill: "a-art-fill--ivory" },
  ];
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="282" rx="150" ry="10" className="a-art-fill--teal" stroke="none" opacity="0.25" />
      {sheets.map((sheet, i) => (
        <g key={i} {...d(4 + i * 4)}>
          <g className="a-press__sheet" style={vars({ r: sheet.r, tx: sheet.tx })}>
            <g transform={`rotate(${sheet.rest} 200 270)`}>
              <rect x="122" y="56" width="156" height="214" rx="6" className={sheet.fill} />
              <path d="M138 80h124" strokeWidth="6" />
              <path d="M138 94h124" strokeWidth="1.5" />
              {i === 2 ? (
                <>
                  <rect x="138" y="106" width="124" height="22" rx="3" className="a-art-fill" stroke="none" />
                  <rect x="138" y="140" width="56" height="62" rx="3" className="a-art-fill--clay" stroke="none" />
                  <path d="M206 146h56M206 160h56M206 174h48M206 188h56M138 218h124M138 232h124M138 246h88" strokeWidth="2.5" />
                </>
              ) : (
                <path d="M138 116h124M138 130h124M138 144h100M138 170h124M138 184h124" strokeWidth="2.5" />
              )}
            </g>
          </g>
        </g>
      ))}
      <Burst stars={[[290, 66, 16, 14, -16, "a-art-fill"]]} />
      <Burst
        hidden
        stars={[
          [200, 60, 8, -40, -40, "a-art-fill--clay"],
          [200, 60, 10, 40, -46],
        ]}
      />
    </svg>
  );
}

/** How it's seen: a clapperboard. Played, it snaps shut and the light flashes. */
export function Clapper({ className = "" }: SceneProps) {
  const stripes = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="284" rx="150" ry="10" className="a-art-fill--teal" stroke="none" opacity="0.25" />
      <g className="a-clap__flash" stroke="#e9a23b" strokeWidth="6">
        <path d="M318 70l22-22M332 104h30M300 46V18M352 132l22 10" />
      </g>
      <g {...d(5)}>
        <rect x="96" y="132" width="210" height="140" rx="10" className="a-art-fill--teal" />
        <rect x="96" y="132" width="210" height="26" className="a-art-fill--ivory" />
        {stripes.map((k) => (
          <path key={k} d={`M${110 + k * 42} 132l20 0-14 26h-20z`} className="a-art-fill--teal" strokeWidth="2" />
        ))}
        <path d="M118 190h70M118 214h44M222 190h60M222 214h40M118 244h164" stroke="#f7f2ea" strokeWidth="3" />
        <g className="a-clap__arm">
          <rect x="96" y="104" width="210" height="26" rx="4" className="a-art-fill--ivory" />
          {stripes.map((k) => (
            <path key={k} d={`M${110 + k * 42} 104l20 0-14 26h-20z`} className="a-art-fill--clay" strokeWidth="2" />
          ))}
        </g>
        <circle cx="102" cy="130" r="7" className="a-art-fill" />
      </g>
      <Burst stars={[[60, 78, 12, -12, -14, "a-art-fill"]]} />
    </svg>
  );
}

/** The moments: bunting over a small stage. The flags sway with the pointer; played, they flutter and confetti falls. */
export function Bunting({ className = "" }: SceneProps) {
  const q = (t: number): [number, number] => [(1 - t) ** 2 * 10 + 2 * (1 - t) * t * 200 + t * t * 390, (1 - t) ** 2 * 50 + 2 * (1 - t) * t * 130 + t * t * 50];
  const fills = ["a-art-fill", "a-art-fill--clay", "a-art-fill--ivory", "a-art-fill--teal"];
  const flags = Array.from({ length: 9 }, (_, i) => q((i + 0.6) / 9.6));
  const confetti = [
    [70, 150, 13, "a-art-fill"],
    [120, 112, 10, "a-art-fill--clay"],
    [168, 146, 12, "a-art-fill--teal"],
    [236, 118, 14, "a-art-fill"],
    [282, 154, 10, "a-art-fill--clay"],
    [330, 120, 12, "a-art-fill--teal"],
    [200, 96, 11, "a-art-fill--clay"],
    [40, 196, 10, "a-art-fill--teal"],
    [360, 196, 12, "a-art-fill"],
  ] as const;
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <g {...d(4)}>
        <ellipse cx="200" cy="286" rx="170" ry="10" className="a-art-fill--teal" stroke="none" opacity="0.25" />
        <rect x="110" y="214" width="180" height="62" rx="6" className="a-art-fill--sand" />
        <path d="M110 232h180" />
        <rect x="150" y="166" width="100" height="40" rx="5" className="a-art-fill" />
        <g stroke="none">
          <Star x={200} y={186} r={13} className="a-art-fill--ivory" />
        </g>
        <path d="M168 206v8M232 206v8" />
      </g>
      <g {...d(10)}>
        <path d="M10 50Q200 210 390 50" strokeWidth="2.5" />
        {flags.map(([x, y], i) => (
          <g key={i} className="a-flag" style={vars({ i })}>
            <path d={`M${x - 15} ${y - 2}L${x + 15} ${y - 2}L${x} ${y + 32}Z`} className={fills[i % fills.length]} strokeWidth="2.5" />
          </g>
        ))}
      </g>
      <g stroke="none">
        {confetti.map(([x, y, r, fill], i) => (
          <g key={i} className="a-confetti" style={vars({ i })}>
            <Star x={x} y={y} r={r} className={fill} />
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Anything else: a brochure, a report, an ID card and a certificate. Played, they spread out and the card swings. */
export function Paperwork({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="284" rx="170" ry="10" className="a-art-fill--teal" stroke="none" opacity="0.25" />
      {/* Annual report */}
      <g {...d(4)}>
        <g className="a-spread" style={vars({ bx: -10, by: -8 })}>
          <rect x="128" y="40" width="140" height="190" rx="6" className="a-art-fill--ivory" />
          <rect x="128" y="40" width="16" height="190" className="a-art-fill--teal" />
          <path d="M160 70h88M160 84h60" />
          <path d="M172 190v-30M196 190v-52M220 190v-40M244 190v-66" strokeWidth="14" stroke="#e9a23b" />
          <path d="M160 200h92" />
        </g>
      </g>
      {/* Tri-fold brochure */}
      <g {...d(8)}>
        <g className="a-spread" style={vars({ bx: -40, by: 6 })}>
          <path d="M34 120l44-10v138l-44 10zM78 110l44 10v138l-44-10z" className="a-art-fill--sand" />
          <rect x="44" y="134" width="24" height="28" rx="2" className="a-art-fill--clay" transform="skewY(-12)" stroke="none" />
          <path d="M88 136l24 5M88 150l24 5M88 164l18 4" strokeWidth="2.5" />
        </g>
      </g>
      {/* ID card on a lanyard */}
      <g {...d(14)}>
        <g className="a-spread" style={vars({ bx: 34, by: -10 })}>
          <g className="a-id">
            <path d="M318 10l-10 128M318 10l28 128" stroke="#a8401f" strokeWidth="4" />
            <rect x="290" y="132" width="76" height="104" rx="8" className="a-art-fill" />
            <circle cx="328" cy="170" r="16" className="a-art-fill--ivory" />
            <path d="M306 204h44M312 218h32" />
          </g>
        </g>
      </g>
      {/* Certificate with its seal */}
      <g {...d(10)}>
        <g className="a-spread" style={vars({ bx: 6, by: 18 })}>
          <rect x="176" y="208" width="132" height="70" rx="4" className="a-art-fill--ivory" />
          <path d="M194 228h70M194 242h96M194 256h50" strokeWidth="2.5" />
          <path d="M282 262l-6 22 10-6 8 8 2-22" className="a-art-fill--clay" strokeWidth="2.5" />
          <circle cx="288" cy="258" r="12" className="a-art-fill--clay" />
        </g>
      </g>
    </svg>
  );
}

/** Personalised, not packaged: two pieces cut to fit each other. Played, they meet and the ✦ shows at the seam. */
export function Puzzle({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="270" rx="150" ry="10" className="a-art-fill--teal" stroke="none" opacity="0.25" />
      <g {...d(6)}>
        <g className="a-puz a-puz--l">
          <path d="M80 90H200V130A22 22 0 1 1 200 170V230H80Z" className="a-art-fill" />
          <path d="M100 206h50" />
        </g>
      </g>
      <g {...d(10)}>
        <g className="a-puz a-puz--r">
          <path d="M200 90H320V230H200V170A22 22 0 1 0 200 130Z" className="a-art-fill--ivory" />
          <path d="M250 206h50" />
          <circle cx="292" cy="114" r="8" className="a-art-fill--clay" stroke="none" />
        </g>
      </g>
      <g stroke="none" className="a-puz__seam">
        <Star x={200} y={150} r={22} className="a-art-fill--clay" />
      </g>
      <Burst stars={[[70, 60, 11, -10, -12, "a-art-fill"], [340, 250, 8, 10, 8, "a-art-fill--clay"]]} />
    </svg>
  );
}

/** What we need from you: a clipboard with seven asks. Played, each one is ticked in turn. */
export function Checklist({ className = "" }: SceneProps) {
  const rows = [0, 1, 2, 3, 4, 5, 6];
  const lengths = [96, 80, 104, 70, 92, 84, 64];
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <g {...d(4)}>
        <rect x="104" y="30" width="192" height="262" rx="14" className="a-art-fill--sand" />
        <rect x="124" y="52" width="152" height="226" rx="4" className="a-art-fill--ivory" />
        <rect x="160" y="18" width="80" height="28" rx="7" className="a-art-fill--teal" />
        {rows.map((i) => {
          const y = 78 + i * 29;
          return (
            <g key={i}>
              <rect x="138" y={y - 9} width="18" height="18" rx="4" />
              <path d={`M168 ${y}h${lengths[i]}`} strokeWidth="2.5" />
              <path className="a-tick" pathLength={1} d={`M140 ${y}l6 7 14-16`} stroke="#a8401f" strokeWidth="4.5" style={vars({ i })} />
            </g>
          );
        })}
      </g>
      <g {...d(14)}>
        <g className="a-pencil">
          <path d="M318 214l40-120 18 6-40 120-14 10z" className="a-art-fill" />
          <path d="M318 214l4 16 14-10" className="a-art-fill--sand" />
          <path d="M352 112l18 6" />
        </g>
      </g>
    </svg>
  );
}

/** The partnership model: a seedling in a pot. It sways with the pointer; played, it grows into a plant with a ✦ flower. */
export function Growth({ className = "" }: SceneProps) {
  const leaves: [number, number, number, boolean][] = [
    // x, y, angle, sprout (shown at rest)
    [200, 206, -1, true],
    [200, 192, 1, true],
    [200, 160, -1, false],
    [200, 140, 1, false],
    [200, 114, -1, false],
  ];
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="290" rx="120" ry="8" className="a-art-fill--teal" stroke="none" opacity="0.25" />
      <g className="a-grow">
        <path className="a-grow__stem" d="M200 232C194 190 206 150 200 82" stroke="#0e3b3a" strokeWidth="5" />
        {leaves.map(([x, y, side, sprout], i) => (
          <g key={i} className={sprout ? "" : "a-leaf"} style={vars({ i })}>
            <path
              d={`M${x} ${y}c${side * 20} -24 ${side * 50} -22 ${side * 58} -10c${side * -14} 18 ${side * -40} 22 ${side * -58} 10z`}
              className={i % 2 ? "a-art-fill" : "a-art-fill--clay"}
              strokeWidth="2.5"
            />
          </g>
        ))}
        <g className="a-leaf" style={vars({ i: 5 })} stroke="none">
          <Star x={200} y={74} r={22} className="a-art-fill" />
        </g>
      </g>
      <g {...d(3)}>
        <path d="M146 226h108l-14 62h-80z" className="a-art-fill--clay" />
        <path d="M140 222h120v14H140z" className="a-art-fill--clay" />
      </g>
      <Burst stars={[[96, 90, 10, -12, -10, "a-art-fill"], [318, 60, 13, 12, -12, "a-art-fill--ivory"]]} />
    </svg>
  );
}
