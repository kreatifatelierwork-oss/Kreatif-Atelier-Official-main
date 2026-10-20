"use client";

import { useEffect, useRef } from "react";
import { getLenis } from "@/lib/scroll/lenis";
import { radarMarkup } from "./radar-markup";
import "./radar.css";

/**
 * Valora's chapter radar: a map of India with the campuses that run Valora, the recruiters they
 * share and their published placement figures. The markup is server-rendered, so every figure and
 * source is real text; the engine loads after paint and wires it up. Dark by design.
 */
export function ValoraRadar() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let stop: (() => void) | undefined;
    let cancelled = false;
    import("./radar-engine").then(({ mountRadar }) => {
      if (!cancelled && root.current) stop = mountRadar(getLenis);
    });
    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return <div ref={root} className="vradar" dangerouslySetInnerHTML={{ __html: radarMarkup }} />;
}
