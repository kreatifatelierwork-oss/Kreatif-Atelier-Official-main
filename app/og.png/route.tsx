import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/content/site";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

const fontFile = (name: string) => readFile(path.join(process.cwd(), "node_modules/@fontsource/cormorant-garamond/files", name));

/** One of the visiting-card marks (public/images/logos) filled with gold, as a PNG data URL for the card. */
async function gold(file: string, w: number, h: number, strength = 1) {
  const src = path.join(process.cwd(), "public/images/logos", file);
  const shape = await sharp(src).resize(w, h, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).ensureAlpha()
    // The script's strokes are thin and only partly opaque; `strength` firms them up.
    .linear([1, 1, 1, strength], [0, 0, 0, 0])
    .png()
    .toBuffer();
  const fill = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e3a1"/><stop offset="0.45" stop-color="#e6b93a"/><stop offset="1" stop-color="#b07f0c"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#g)"/></svg>`,
  );
  // "in": the gold is kept only where the mark is opaque.
  const png = await sharp(shape).composite([{ input: fill, blend: "in" }]).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

/**
 * The link preview card (Open Graph / Twitter; WhatsApp, iMessage, LinkedIn, Slack use it), in the visiting card's
 * language: black, the KA monogram large and faint in gold, the gold script "Kreatif Atelier" across it, and the
 * line and domain in spaced gold capitals. Built at export time as /og.png (a real .png
 * path, so static hosts send it as image/png; WhatsApp ignores a card served as octet-stream). Linked from the
 * metadata in app/layout.tsx.
 */
export async function GET() {
  const [medium, monogram, wordmark] = await Promise.all([
    fontFile("cormorant-garamond-latin-500-normal.woff"),
    gold("ka-monogram.webp", 470, 470),
    gold("ka-wordmark.webp", 900, 124, 1.6),
  ]);
  const caps = { fontSize: 24, letterSpacing: 9, color: "#e0b545" };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 50% 44%, #1c1710 0%, #0b0a08 58%, #050505 100%)",
          fontFamily: "Cormorant",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
        <img src={monogram} width={470} height={470} alt="" style={{ position: "absolute", top: 50, left: 365, opacity: 0.11 }} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
          <img src={wordmark} width={900} height={124} alt="" />
          <div style={{ ...caps, marginTop: 56 }}>IDEAS · PEOPLE · IMPACT</div>
          <div style={{ ...caps, marginTop: 14, fontSize: 18, color: "#a8843f" }}>{site.url.replace("https://", "").toUpperCase()}</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Cormorant", data: medium, weight: 500, style: "normal" }] },
  );
}
