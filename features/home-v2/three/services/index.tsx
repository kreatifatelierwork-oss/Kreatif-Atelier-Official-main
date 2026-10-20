import { AU } from "@/lib/design/aurelius";
import type { ComponentType } from "react";
import { AdvertisingArtifact } from "./Advertising";
import { AdvisoryArtifact } from "./Advisory";
import { AllServicesArtifact } from "./AllServices";
import { AnalyticsArtifact } from "./Analytics";
import { BrandingArtifact } from "./Branding";
import { DigitalMarketingArtifact } from "./DigitalMarketing";
import { FilmArtifact } from "./Film";
import { LeadGenerationArtifact } from "./LeadGeneration";
import { PromotionsArtifact } from "./Promotions";
import { PublicRelationsArtifact } from "./PublicRelations";
import { SeoArtifact } from "./Seo";
import { TechnologyArtifact } from "./Technology";

function floored(Scene: ComponentType): ComponentType {
  function Floored() {
    return (
      <group position={[0, SERVICE_FLOOR, 0]} scale={0.95}>
        {/* Bright, soft studio light so whites read white and colours stay clean. */}
        <hemisphereLight args={[AU.cream50, AU.cream100, 1.0]} />
        <directionalLight position={[3, 6, 5]} intensity={1.1} />
        <Scene />
      </group>
    );
  }
  Floored.displayName = `Floored(${Scene.name})`;
  return Floored;
}

/** The twelve service artifacts, keyed by category id ("all-services" plus the eleven practice slugs). */
const scenes: Record<string, { name: string; Component: ComponentType }> = {
  "all-services": { name: "All Services", Component: AllServicesArtifact },
  "digital-marketing": { name: "Digital Marketing", Component: DigitalMarketingArtifact },
  "public-relations": { name: "Public Relations", Component: PublicRelationsArtifact },
  promotions: { name: "Promotions", Component: PromotionsArtifact },
  seo: { name: "Search Engine Optimization", Component: SeoArtifact },
  "branding-creative-design": { name: "Branding & Creative Design", Component: BrandingArtifact },
  advertising: { name: "Advertising", Component: AdvertisingArtifact },
  "analytics-performance": { name: "Analytics & Performance", Component: AnalyticsArtifact },
  "lead-generation-growth": { name: "Lead Generation & Growth", Component: LeadGenerationArtifact },
  "film-video-photography": { name: "Film, Video & Photography", Component: FilmArtifact },
  "technology-product": { name: "Technology & Product", Component: TechnologyArtifact },
  "advisory-transformation": { name: "Advisory & Transformation", Component: AdvisoryArtifact },
};

export const serviceArtifacts = Object.fromEntries(Object.entries(scenes).map(([id, a]) => [id, { name: a.name, Component: floored(a.Component) }]));

/** One camera for all twelve, so they share perspective and scale. */
export const serviceCamera = { yaw: 28, pitch: 15, distance: 7.9, fov: 30, target: [0, 0.0, 0] as [number, number, number] };

/** Every service scene is built standing on y = 0; this drops it onto the studio's shadow plane. */
export const SERVICE_FLOOR = -1.25;
