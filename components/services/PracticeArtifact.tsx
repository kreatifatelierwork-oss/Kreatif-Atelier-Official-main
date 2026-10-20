"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { FloatingArtifact } from "@/components/design/FloatingArtifact";
import { useLiveScene } from "@/components/design/useLiveScene";
import { domainArtifact } from "@/content/services";

const ServiceStage = dynamic(() => import("@/features/home-v2/scene/ServiceStage"), { ssr: false });

/**
 * A practice's (domain's) artifact in a square that holds its space (no layout shift): its rendered
 * picture floating first (and on phones), then on desktop the live 3D scene fades in over it once the
 * page is idle. Both float; both tilt only while the pointer is over them.
 */
export function PracticeArtifact({ slug, className = "" }: { slug: string; className?: string }) {
  const live = useLiveScene();
  const [ready, setReady] = useState(false);
  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <div data-hidden={ready || undefined} className="absolute inset-0 transition-opacity duration-[var(--ds-dur-slow)] ease-[var(--ds-ease-out)] data-[hidden]:pointer-events-none data-[hidden]:opacity-0">
        <FloatingArtifact seed={slug.length * 31} className="inset-0" image={domainArtifact(slug)} />
      </div>
      {live && <ServiceStage slug={slug} onReady={() => setReady(true)} />}
    </div>
  );
}
