import { hero, parent } from "@/content/home";

/** A ridge line across a 1440-wide box: a few sine waves with seeded peaks, closed at the bottom. */
function ridge(seed: number, base: number, height: number, roughness: number) {
  let s = seed;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const peaks = Array.from({ length: 5 }, () => ({ x: rnd() * 1440, h: height * (0.4 + rnd() * 0.6), w: 160 + rnd() * 260 }));
  const pts: string[] = [];
  for (let x = 0; x <= 1440; x += 24) {
    let y = base;
    for (const p of peaks) y -= p.h * Math.exp(-(((x - p.x) / p.w) ** 2));
    y += Math.sin(x * 0.04 + seed) * roughness + Math.sin(x * 0.11 + seed * 2) * roughness * 0.5;
    pts.push(`${x},${y.toFixed(1)}`);
  }
  return `M0,400 L${pts.join(" L")} L1440,400 Z`;
}

const RIDGES = [ridge(7, 330, 150, 6), ridge(19, 350, 120, 4), ridge(31, 372, 80, 3)];

/**
 * The hero's graphics, all decorative and drawn from the colour tokens (no photos): misty maroon
 * mountain ridges along the foot, large glossy maroon spheres off the edges, thin gold orbit lines,
 * script words on the right, and the parent's three words set vertically. Styles: `.au-*` in
 * styles/design/aurelius-hero.css.
 */
export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="au-backdrop">
      <svg className="au-orbits" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <ellipse cx="720" cy="560" rx="560" ry="250" />
        <ellipse cx="720" cy="560" rx="640" ry="300" />
        <path d="M120,300 Q520,90 980,140" />
        <path d="M1320,250 Q1100,520 1180,700" />
      </svg>
      <svg className="au-mountains" viewBox="0 0 1440 400" preserveAspectRatio="none">
        {RIDGES.map((d, i) => (
          <path key={i} d={d} className={`au-ridge au-ridge--${i + 1}`} />
        ))}
      </svg>
      <span className="au-mist" />
      <p className="au-script">
        {hero.words.end.map((w) => (
          <span key={w}>{w}</span>
        ))}
      </p>
      <ul className="au-vertical">
        {parent.line.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>
    </div>
  );
}
