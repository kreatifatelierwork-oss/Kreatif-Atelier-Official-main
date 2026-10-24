import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import { site } from "@/content/site";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

const fontFile = (name: string) => readFile(path.join(process.cwd(), "node_modules/@fontsource/cormorant-garamond/files", name));

/** The KA monogram (the header's mark) filled with gold, as a PNG data URL for the card. */
async function goldMonogram(px: number) {
  const src = path.join(process.cwd(), "public/images/logos/ka-monogram.webp");
  const shape = await sharp(src).resize(px, px, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).ensureAlpha().png().toBuffer();
  const gold = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${px}" height="${px}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f7e3a1"/><stop offset="0.45" stop-color="#e6b93a"/><stop offset="1" stop-color="#b07f0c"/></linearGradient></defs><rect width="${px}" height="${px}" fill="url(#g)"/></svg>`,
  );
  // "in": the gold is kept only where the mark is opaque.
  const png = await sharp(shape).composite([{ input: gold, blend: "in" }]).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

/**
 * The link preview card (Open Graph / Twitter; WhatsApp, iMessage, LinkedIn, Slack use it): the gold KA monogram on
 * deep maroon, the name and "Ideas. People. Impact." in Cormorant, and the domain. Built at export time as /og.png
 * (a real .png path, so static hosts send it as image/png; WhatsApp ignores a card served as octet-stream).
 * Linked from the metadata in app/layout.tsx.
 */
export async function GET() {
  const [medium, italic, logo] = await Promise.all([fontFile("cormorant-garamond-latin-500-normal.woff"), fontFile("cormorant-garamond-latin-400-italic.woff"), goldMonogram(300)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 96px",
          background: "radial-gradient(circle at 28% 45%, #7a1c1e 0%, #3a0c10 55%, #24070a 100%)",
          color: "#fdf9f5",
          fontFamily: "Cormorant",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain img only */}
        <img src={logo} width={300} height={300} alt="" />
        <div style={{ display: "flex", flexDirection: "column", marginLeft: 72, borderLeft: "2px solid rgba(230,185,58,0.55)", paddingLeft: 56 }}>
          <div style={{ fontSize: 84, fontWeight: 500, lineHeight: 1, color: "#f7e3a1" }}>{site.name}</div>
          <div style={{ marginTop: 22, fontSize: 46, fontStyle: "italic", color: "#fdf9f5" }}>Ideas. People. Impact.</div>
          <div style={{ marginTop: 40, fontSize: 26, letterSpacing: 6, color: "#e6b93a" }}>{site.url.replace("https://", "").toUpperCase()}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cormorant", data: medium, weight: 500, style: "normal" },
        { name: "Cormorant", data: italic, weight: 400, style: "italic" },
      ],
    },
  );
}
