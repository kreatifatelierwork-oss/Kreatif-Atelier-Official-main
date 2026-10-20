import type { ComponentType } from "react";
import type { PracticeSlug } from "@/content/aurelius-services";
import { Camcorder } from "../three/artifacts/Camcorder";
import { GiftBox } from "../three/artifacts/GiftBox";
import { BrowserChartArtifact } from "../three/singles/BrowserChartArtifact";
import { DevLaptopArtifact } from "../three/singles/DevLaptopArtifact";
import { GrowthBarsArtifact } from "../three/singles/GrowthBarsArtifact";
import { LightbulbArtifact } from "../three/singles/LightbulbArtifact";
import { MegaphoneArtifact } from "../three/singles/MegaphoneArtifact";
import { NewsMicArtifact } from "../three/singles/NewsMicArtifact";
import { PaletteCardArtifact } from "../three/singles/PaletteCardArtifact";
import { SeoMagnifierArtifact } from "../three/singles/SeoMagnifierArtifact";
import { SocialPhoneArtifact } from "../three/singles/SocialPhoneArtifact";

/** The camcorder on its tripod, as a standalone object. */
const CamcorderOnTripod = () => <Camcorder />;

/**
 * The eleven objects around the content factory on the home hero, one per practice area, in catalogue
 * order. They are rendered to pictures (tests/visual/render-hero-objects.spec.ts → public/images/hero/objects)
 * and float in CSS; see features/home-v2/data/heroScene.ts for where they sit.
 */
export const heroArtifacts: { slug: PracticeSlug; Component: ComponentType }[] = [
  { slug: "digital-marketing", Component: SocialPhoneArtifact },
  { slug: "public-relations", Component: NewsMicArtifact },
  { slug: "promotions", Component: GiftBox },
  { slug: "seo", Component: SeoMagnifierArtifact },
  { slug: "branding-creative-design", Component: PaletteCardArtifact },
  { slug: "advertising", Component: MegaphoneArtifact },
  { slug: "analytics-performance", Component: BrowserChartArtifact },
  { slug: "lead-generation-growth", Component: GrowthBarsArtifact },
  { slug: "film-video-photography", Component: CamcorderOnTripod },
  { slug: "technology-product", Component: DevLaptopArtifact },
  { slug: "advisory-transformation", Component: LightbulbArtifact },
];
