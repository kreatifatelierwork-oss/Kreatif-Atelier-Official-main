import type { ComponentType } from "react";
import { AdCardArtifact } from "./AdCardArtifact";
import { BrowserChartArtifact } from "./BrowserChartArtifact";
import { DevLaptopArtifact } from "./DevLaptopArtifact";
import { GrowthBarsArtifact } from "./GrowthBarsArtifact";
import { LightbulbArtifact } from "./LightbulbArtifact";
import { MegaphoneArtifact } from "./MegaphoneArtifact";
import { NewsMicArtifact } from "./NewsMicArtifact";
import { PaletteCardArtifact } from "./PaletteCardArtifact";
import { PenToolArtifact } from "./PenToolArtifact";
import { ReactionsArtifact } from "./ReactionsArtifact";
import { SeoMagnifierArtifact } from "./SeoMagnifierArtifact";
import { SocialPhoneArtifact } from "./SocialPhoneArtifact";
import { TargetArtifact } from "./TargetArtifact";
import { TypeTileArtifact } from "./TypeTileArtifact";

/**
 * Single objects from Roo's marketing-hub reference (design-refs/singles/), one artifact each.
 * Each stands on y = 0 and is dropped onto the studio shadow plane by the lab.
 */
export const singleArtifacts: Record<string, { name: string; Component: ComponentType }> = {
  megaphone: { name: "Megaphone", Component: MegaphoneArtifact },
  target: { name: "Target", Component: TargetArtifact },
  "seo-magnifier": { name: "SEO magnifier", Component: SeoMagnifierArtifact },
  lightbulb: { name: "Lightbulb", Component: LightbulbArtifact },
  "browser-chart": { name: "Browser with chart", Component: BrowserChartArtifact },
  "social-phone": { name: "Phone with social apps", Component: SocialPhoneArtifact },
  reactions: { name: "Like and chat bubbles", Component: ReactionsArtifact },
  "type-tile": { name: "Typography tile", Component: TypeTileArtifact },
  "pen-tool": { name: "Pen tool card", Component: PenToolArtifact },
  "palette-card": { name: "Colour palette card", Component: PaletteCardArtifact },
  "news-mic": { name: "News and microphone", Component: NewsMicArtifact },
  "dev-laptop": { name: "Developer laptop", Component: DevLaptopArtifact },
  "ad-card": { name: "Ad card", Component: AdCardArtifact },
  "growth-bars": { name: "Growth bars", Component: GrowthBarsArtifact },
};

export const singleCamera = { yaw: 28, pitch: 16, distance: 5.6, fov: 30, target: [0, -0.2, 0] as [number, number, number] };
export const SINGLE_FLOOR = -1.3;
