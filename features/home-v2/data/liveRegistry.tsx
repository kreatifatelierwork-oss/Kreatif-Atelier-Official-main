import type { ComponentType } from "react";
import type { LiveKind } from "@/lib/artifacts/live";
import { serviceArtifacts, serviceCamera } from "../three/services";
import { heroArtifacts } from "./heroArtifacts";
import { objectArtifacts } from "./pageArtifacts";
import frames from "./posterFrames.json";

/** How each kind of poster was rendered, so the live model can be framed identically. */
export type LiveEntry = {
  Component: ComponentType;
  /** "fitted": the hero/object framing (tests/visual/render-*-objects); "service": the shared service camera. */
  framing: "fitted" | "service";
  /** Where the poster was cut from its square render (fitted posters only). */
  frame?: { frame: number; left: number; top: number; width: number; height: number };
};

export function liveEntry(kind: LiveKind, slug: string): LiveEntry | null {
  if (kind === "svc") {
    const a = serviceArtifacts[slug];
    return a ? { Component: a.Component, framing: "service" } : null;
  }
  const Component = kind === "hero" ? heroArtifacts.find((a) => a.slug === slug)?.Component : objectArtifacts[slug]?.Component;
  const frame = (frames as Record<string, LiveEntry["frame"]>)[`${kind}:${slug}`];
  return Component && frame ? { Component, framing: "fitted", frame } : null;
}

export { serviceCamera };
