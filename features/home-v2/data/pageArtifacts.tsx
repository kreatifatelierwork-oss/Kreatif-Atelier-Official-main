import type { ComponentType } from "react";
import { AnalyticsBoard } from "../three/artifacts/AnalyticsBoard";
import { Billboard } from "../three/artifacts/Billboard";
import { Camcorder } from "../three/artifacts/Camcorder";
import { Clapperboard } from "../three/artifacts/Clapperboard";
import { FilmStrip } from "../three/artifacts/FilmStrip";
import { GiftBox } from "../three/artifacts/GiftBox";
import { GoogleCluster } from "../three/artifacts/GoogleCluster";
import { GrowthRunner } from "../three/artifacts/GrowthRunner";
import { MeetingTable } from "../three/artifacts/MeetingTable";
import { PenNib } from "../three/artifacts/PenNib";
import { PressMic } from "../three/artifacts/PressMic";
import { AmazonTile } from "../three/artifacts/socials/AmazonTile";
import { FlipkartTile } from "../three/artifacts/socials/FlipkartTile";
import { FacebookTile } from "../three/artifacts/socials/FacebookTile";
import { InstagramTile } from "../three/artifacts/socials/InstagramTile";
import { TikTokTile } from "../three/artifacts/socials/TikTokTile";
import { XTile } from "../three/artifacts/socials/XTile";
import { LinkedInTile } from "../three/artifacts/socials/LinkedInTile";
import { WhatsAppTile } from "../three/artifacts/socials/WhatsAppTile";
import { YouTubeTile } from "../three/artifacts/socials/YouTubeTile";
import { WebShop } from "../three/artifacts/WebShop";
import { singleArtifacts } from "../three/singles";

/**
 * Every standalone object the site floats on its pages, by slug. Each one is rendered to a poster
 * (tests/visual/render-page-artifacts.spec.ts → public/images/artifacts/<slug>.webp) and can be shown
 * live on hover (components/design/LiveArtifact).
 */
export const objectArtifacts: Record<string, { name: string; Component: ComponentType }> = {
  ...Object.fromEntries(Object.entries(singleArtifacts).map(([slug, a]) => [slug, a])),
  "amazon-tile": { name: "Amazon", Component: AmazonTile },
  "flipkart-tile": { name: "Flipkart", Component: FlipkartTile },
  "gift-box": { name: "Gift box", Component: GiftBox },
  "press-mic": { name: "Press microphone", Component: PressMic },
  billboard: { name: "Billboard", Component: Billboard },
  clapperboard: { name: "Clapperboard", Component: Clapperboard },
  "film-strip": { name: "Film strip", Component: FilmStrip },
  camcorder: { name: "Camcorder", Component: () => <Camcorder /> },
  "google-cluster": { name: "Google marks", Component: GoogleCluster },
  "analytics-board": { name: "Analytics board", Component: AnalyticsBoard },
  "growth-runner": { name: "Growth runner", Component: GrowthRunner },
  "meeting-table": { name: "Meeting table", Component: MeetingTable },
  "web-shop": { name: "Web shop", Component: WebShop },
  "pen-nib": { name: "Pen nib", Component: PenNib },
  "instagram-tile": { name: "Instagram", Component: InstagramTile },
  "facebook-tile": { name: "Facebook", Component: FacebookTile },
  "x-tile": { name: "X", Component: XTile },
  "tiktok-tile": { name: "TikTok", Component: TikTokTile },
  "linkedin-tile": { name: "LinkedIn", Component: LinkedInTile },
  "whatsapp-tile": { name: "WhatsApp", Component: WhatsAppTile },
  "youtube-tile": { name: "YouTube", Component: YouTubeTile },
};

export { practiceArtifacts, sectionArtifacts, usedObjectSlugs } from "./artifactSets";
