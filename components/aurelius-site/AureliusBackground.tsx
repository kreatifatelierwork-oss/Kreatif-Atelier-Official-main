"use client";

import { useEffect, useRef, useState } from "react";
import { useLiveScene } from "@/components/design/useLiveScene";

/**
 * The interactive fog behind every Aurelius page (Vanta, components/aurelius-site/vantaFog.ts): fixed,
 * behind all content, never catching the pointer. It loads only where the live 3D does (fine pointer,
 * tablet width up, no reduced motion, after load and idle); everywhere else, and until it has drawn its
 * first frame, the still gradient under it shows (`.au-bg`).
 */
export function AureliusBackground() {
  const live = useLiveScene();
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!live || !el) return;
    let effect: { destroy(): void } | null = null;
    let cancelled = false;
    let frame = 0;
    import("./vantaFog").then(({ createAureliusFog }) => {
      if (cancelled) return;
      try {
        effect = createAureliusFog(el);
        frame = requestAnimationFrame(() => setReady(true));
      } catch {
        // No WebGL: the still gradient stays.
      }
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      effect?.destroy();
    };
  }, [live]);

  return (
    <div aria-hidden="true" className="au-bg">
      <div ref={host} data-ready={ready || undefined} className="au-bg__fog" />
    </div>
  );
}
