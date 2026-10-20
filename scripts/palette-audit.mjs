// Palette audit: every 3D artifact and scene file must take its colours from the palette module
// (features/home-v2/three/materials/palette.ts → lib/design/aurelius.ts). Fails on any hex or rgb()
// colour written anywhere else. Usage: node scripts/palette-audit.mjs
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["features/home-v2/three", "features/home-v2/scene"];
const ALLOWED = new Set(["features/home-v2/three/materials/palette.ts", "features/home-v2/three/artifacts/glyphPaths.ts"]);
const COLOUR = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b|rgba?\(\s*\d/g;

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(tsx?|mjs)$/.test(name) && !/\.test\.ts$/.test(name)) files.push(p);
  }
};
ROOTS.forEach(walk);

const strip = (src) => src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/\/\/[^\n]*/g, (m) => " ".repeat(m.length));
const findings = [];
for (const file of files) {
  const rel = relative(process.cwd(), file);
  if (ALLOWED.has(rel)) continue;
  strip(readFileSync(file, "utf8"))
    .split("\n")
    .forEach((line, i) => {
      for (const m of line.matchAll(COLOUR)) findings.push(`${rel}:${i + 1}  ${m[0]}`);
    });
}
console.log(`palette audit: ${files.length} files scanned, ${findings.length} hardcoded colour(s)`);
for (const f of findings) console.log("  " + f);
process.exit(findings.length ? 1 : 0);
