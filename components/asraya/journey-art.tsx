import { Burst, Star, d, scene, vars, type SceneProps } from "./illustrations";

/**
 * The supporter's story on /asraya (`home.journey` in content/asraya.ts), one drawing per step, in the same hand and
 * colours as illustrations.tsx. Each plays (CSS "Supporter's story drawings" in app/globals.css) when its step is the
 * one being read, or when pressed. At rest each shows the moment before.
 */

/** A head and shoulders. */
function Person({ x, y, r, fill, head = "" }: { x: number; y: number; r: number; fill: string; head?: string }) {
  return (
    <g>
      <path d={`M${x - r * 1.9} ${y + r * 3.6}c0-${r * 1.9} ${r * 0.9}-${r * 2.5} ${r * 1.9}-${r * 2.5}s${r * 1.9} ${r * 0.6} ${r * 1.9} ${r * 2.5}`} className="a-art-fill--sand" />
      <circle cx={x} cy={y} r={r} className={`${fill} ${head}`} />
    </g>
  );
}

/** Someone hears your name: one person tells another, and the word lands. */
export function Word({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="282" rx="160" ry="10" className="a-art-fill--teal" stroke="none" opacity="0.2" />
      <g {...d(4)}>
        <Person x={104} y={176} r={26} fill="a-art-fill" />
      </g>
      <g {...d(7)}>
        <Person x={300} y={176} r={26} fill="a-art-fill--ivory" head="a-word__head" />
      </g>
      <g {...d(12)}>
        <g className="a-word__bubble">
          <path d="M150 60h100a16 16 0 0 1 16 16v44a16 16 0 0 1-16 16h-66l-26 22 4-22h-12a16 16 0 0 1-16-16V76a16 16 0 0 1 16-16z" className="a-art-fill--ivory" />
          <g stroke="none">
            <Star x={200} y={98} r={20} className="a-art-fill--clay" />
          </g>
        </g>
      </g>
      <Burst
        hidden
        stars={[
          [300, 140, 9, -16, -70],
          [300, 140, 7, 22, -86, "a-art-fill--clay"],
          [300, 140, 8, 40, -50],
        ]}
      />
    </svg>
  );
}

/** They look you up: a phone, a search, and a pin dropping on your place. */
export function Lookup({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="288" rx="120" ry="8" className="a-art-fill--teal" stroke="none" opacity="0.2" />
      <g {...d(4)}>
        <rect x="128" y="18" width="144" height="264" rx="22" className="a-art-fill--sand" />
        <rect x="140" y="44" width="120" height="222" rx="8" className="a-art-fill--ivory" />
        <path d="M184 30h32" strokeWidth="4" />
        <rect x="150" y="56" width="100" height="22" rx="11" />
        <path className="a-look__typed" d="M162 67h52" strokeWidth="3" stroke="#a8401f" />
        <g strokeWidth="2.5" stroke="#1c2526" strokeOpacity="0.35">
          <path d="M140 140c40 10 70-20 120 0M140 200c50-30 80 10 120-10M190 92v174M226 92c-10 60 10 120 0 174" />
        </g>
        <ellipse className="a-look__ring" cx="210" cy="190" rx="26" ry="8" stroke="#e9a23b" strokeWidth="3" />
      </g>
      <g {...d(12)}>
        <g className="a-look__pin">
          <path d="M210 190c-22-26-30-38-30-52a30 30 0 0 1 60 0c0 14-8 26-30 52z" className="a-art-fill--clay" />
          <circle cx="210" cy="138" r="11" className="a-art-fill--ivory" />
        </g>
      </g>
      <Burst stars={[[86, 70, 12, -10, -10, "a-art-fill"], [320, 240, 8, 10, 6, "a-art-fill--clay"]]} />
    </svg>
  );
}

/** They understand you in thirty seconds: a muddled page becomes one clear line. */
export function Clarity({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="284" rx="150" ry="10" className="a-art-fill--teal" stroke="none" opacity="0.2" />
      <g {...d(4)}>
        <rect x="90" y="34" width="220" height="236" rx="10" className="a-art-fill--ivory" />
        <g className="a-clar__mess" strokeWidth="2.5">
          <path d="M112 66c20-14 30 14 50 0s30 14 52 0 26 12 44 2" />
          <path d="M112 96c14 10 26-12 44 0s24 14 40-6 32 8 50 2" />
          <path d="M120 128c30 20 60-30 90 0 20 20 40-10 64 6" />
          <path d="M112 168h40M170 160l20 20M196 176c12-16 24 10 40-4M246 160h40" />
          <path d="M116 206c16 12 40 0 60 10s40-14 60 0 30 6 50-6M120 238h70" />
        </g>
        <g className="a-clar__clean">
          <rect x="112" y="60" width="176" height="30" rx="4" className="a-art-fill" stroke="none" />
          <path d="M112 112h150M112 128h120" strokeWidth="3" />
          <rect x="112" y="152" width="80" height="94" rx="4" className="a-art-fill--clay" stroke="none" />
          <path d="M206 160h82M206 176h70M206 192h82M206 232h60" strokeWidth="2.5" />
        </g>
      </g>
      <g {...d(14)}>
        <g className="a-clar__watch">
          <circle cx="318" cy="70" r="30" className="a-art-fill--sand" />
          <path d="M318 32v8M318 70V52" strokeWidth="3.5" />
          <path className="a-clar__hand" d="M318 70l14 10" strokeWidth="3.5" stroke="#a8401f" />
        </g>
      </g>
      <Burst hidden stars={[[200, 75, 12, -96, -50], [200, 75, 9, 104, -40, "a-art-fill--clay"]]} />
    </svg>
  );
}

/** They see the work: a film of the people it has changed. Played, it runs. */
export function Screen({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="286" rx="160" ry="8" className="a-art-fill--teal" stroke="none" opacity="0.2" />
      <g {...d(4)}>
        <rect x="46" y="40" width="308" height="196" rx="14" className="a-art-fill--teal" />
        <rect x="60" y="54" width="280" height="150" rx="6" className="a-art-fill--sand" stroke="none" />
        <circle cx="300" cy="90" r="22" className="a-art-fill" stroke="none" />
        <path d="M60 204c40-50 90-70 130-40s80-30 150-6v46H60z" className="a-art-fill--ivory" stroke="none" opacity="0.7" />
        <Person x={170} y={128} r={22} fill="a-art-fill--clay" />
        <rect x="60" y="216" width="280" height="6" rx="3" className="a-art-fill--ivory" stroke="none" opacity="0.35" />
        <rect className="a-screen__bar a-art-fill" x="60" y="216" width="280" height="6" rx="3" stroke="none" />
        <path d="M150 236l-14 32h128l-14-32" className="a-art-fill--sand" />
      </g>
      <g {...d(12)}>
        <g className="a-screen__play">
          <circle cx="200" cy="128" r="30" className="a-art-fill--ivory" />
          <path d="M192 114l22 14-22 14z" className="a-art-fill--clay" stroke="none" />
        </g>
      </g>
      <g {...d(16)}>
        <g className="a-screen__heart">
          <circle cx="330" cy="56" r="22" className="a-art-fill--clay" />
          <path d="M330 67c-9-6-13-10-13-15a6 6 0 0 1 13-3 6 6 0 0 1 13 3c0 5-4 9-13 15z" className="a-art-fill--ivory" strokeWidth="2.5" />
        </g>
      </g>
    </svg>
  );
}

/** They trust what they see: a door that opens, and the light coming through it. */
export function Door({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <path className="a-door__light a-art-fill" d="M150 270L110 296H330L250 270Z" stroke="none" opacity="0.5" />
      <ellipse cx="200" cy="284" rx="160" ry="8" className="a-art-fill--teal" stroke="none" opacity="0.2" />
      <g {...d(4)}>
        <rect x="132" y="34" width="136" height="238" rx="4" className="a-art-fill--sand" />
        <rect x="148" y="50" width="104" height="222" className="a-art-fill" />
        <g stroke="none">
          <Star x={200} y={150} r={30} className="a-art-fill--ivory" />
        </g>
        <g className="a-door__panel">
          <rect x="148" y="50" width="104" height="222" className="a-art-fill--clay" />
          <rect x="162" y="66" width="76" height="80" rx="3" />
          <rect x="162" y="164" width="76" height="90" rx="3" />
          <circle cx="238" cy="164" r="5" className="a-art-fill" />
        </g>
        <path d="M120 272h160" strokeWidth="4" />
      </g>
      <Burst stars={[[86, 80, 13, -14, -10, "a-art-fill"], [320, 66, 9, 14, -10, "a-art-fill--clay"], [330, 200, 7, 12, 4, "a-art-fill"]]} />
    </svg>
  );
}

/** They give: a heart drops into the jar and it fills. */
export function Jar({ className = "" }: SceneProps) {
  const jar = "M150 96h100v20c20 14 30 34 30 60v80a20 20 0 0 1-20 20H140a20 20 0 0 1-20-20v-80c0-26 10-46 30-60z";
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <defs>
        <clipPath id="a-jar-inside">
          <path d={jar} />
        </clipPath>
      </defs>
      <ellipse cx="200" cy="284" rx="130" ry="8" className="a-art-fill--teal" stroke="none" opacity="0.2" />
      <g {...d(4)}>
        <path d={jar} className="a-art-fill--ivory" />
        <g clipPath="url(#a-jar-inside)">
          <g className="a-jar__level">
            <rect x="110" y="150" width="180" height="140" className="a-art-fill" stroke="none" />
            <path d="M110 150c20-8 40 8 60 0s40 8 60 0 40 8 60 0" stroke="#a8401f" strokeWidth="3" />
          </g>
        </g>
        <path d={jar} />
        <rect x="142" y="80" width="116" height="20" rx="6" className="a-art-fill--clay" />
        <g stroke="none">
          <Star x={200} y={232} r={16} className="a-art-fill--ivory" />
        </g>
      </g>
      <g {...d(14)}>
        <g className="a-jar__heart">
          <path d="M200 64c-16-11-24-18-24-27a11 11 0 0 1 24-5 11 11 0 0 1 24 5c0 9-8 16-24 27z" className="a-art-fill--clay" />
        </g>
      </g>
      <Burst stars={[[96, 110, 11, -12, -8, "a-art-fill"], [308, 90, 9, 12, -10, "a-art-fill--clay"]]} />
    </svg>
  );
}

/** And they hear back: an envelope opens and a letter from the field rises out of it. */
export function Letter({ className = "" }: SceneProps) {
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="284" rx="150" ry="8" className="a-art-fill--teal" stroke="none" opacity="0.2" />
      <g {...d(4)}>
        <rect x="90" y="130" width="220" height="140" rx="8" className="a-art-fill--clay" />
        <g className="a-letter__card">
          <rect x="112" y="110" width="176" height="140" rx="4" className="a-art-fill--ivory" />
          <rect x="126" y="124" width="64" height="54" rx="3" className="a-art-fill" stroke="none" />
          <path d="M202 130h72M202 146h60M202 162h70M126 196h148M126 212h120" strokeWidth="2.5" />
        </g>
        <path d="M90 170l110 64 110-64v92a8 8 0 0 1-8 8H98a8 8 0 0 1-8-8z" className="a-art-fill--sand" />
        <g className="a-letter__flap">
          <path d="M90 138a8 8 0 0 1 8-8h204a8 8 0 0 1 8 8l-110 70z" className="a-art-fill" />
        </g>
      </g>
      <g {...d(12)}>
        <g stroke="none">
          <Star x={316} y={110} r={14} className="a-art-fill" />
        </g>
      </g>
      <Burst hidden stars={[[200, 110, 9, -110, -60], [200, 110, 8, 110, -70, "a-art-fill--clay"], [200, 110, 7, 0, -96]]} />
    </svg>
  );
}

/** Then they bring others: one supporter, and around them, more. */
export function Gather({ className = "" }: SceneProps) {
  const ring = [0, 1, 2, 3, 4, 5].map((k) => {
    const a = -Math.PI / 2 + (k * Math.PI) / 3;
    return [200 + Math.cos(a) * 118, 150 + Math.sin(a) * 92] as const;
  });
  const fills = ["a-art-fill", "a-art-fill--clay", "a-art-fill--ivory", "a-art-fill", "a-art-fill--clay", "a-art-fill--ivory"];
  return (
    <svg viewBox="0 0 400 300" {...scene(className)}>
      <ellipse cx="200" cy="150" rx="150" ry="118" className="a-art-fill--sand" stroke="none" opacity="0.6" />
      <g {...d(4)}>
        {ring.map(([x, y], k) => (
          <path key={k} className="a-gather__link" pathLength={1} d={`M200 150L${x} ${y}`} stroke="#e9a23b" strokeWidth="3" style={vars({ i: k })} />
        ))}
        <circle cx="200" cy="150" r="30" className="a-art-fill--teal" />
        <g stroke="none">
          <Star x={200} y={150} r={17} className="a-art-fill" />
        </g>
      </g>
      {ring.map(([x, y], k) => (
        <g key={k} {...d(8 + (k % 3) * 3)}>
          <g className={k % 3 === 0 ? "" : "a-gather__friend"} style={vars({ i: k })}>
            <circle cx={x} cy={y} r={16} className={fills[k]} />
          </g>
        </g>
      ))}
    </svg>
  );
}

export const journeyArt = { word: Word, lookup: Lookup, clarity: Clarity, screen: Screen, door: Door, jar: Jar, letter: Letter, gather: Gather } as const;
