"use client";

import { footer } from "@/content/site";
import { config } from "@/lib/config";
import { scrollToHash } from "@/lib/scroll/lenis";
import { useScrollStore } from "@/lib/scroll/store";

/** Back to the top. On Aurelius pages (`themed`) it is a round NeuButton. */
export function BackToTop({ themed = false }: { themed?: boolean }) {
  const visible = useScrollStore((s) => s.scrollY > config.scroll.backToTopAfter);

  return (
    <button
      type="button"
      aria-label={footer.backToTop}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      onClick={() => scrollToHash("#home")}
      className={`fixed right-5 bottom-5 z-30 md:right-8 md:bottom-8 ${
        themed
          ? "nb nb--icon nb--float"
          : "grid h-12 w-12 place-items-center rounded-full border border-gold/40 bg-ink/70 text-gold backdrop-blur-sm transition-[opacity,transform,border-color,color] duration-500 hover:border-gold hover:text-gold-bright"
      } ${visible ? "opacity-100" : "pointer-events-none opacity-0"}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 stroke-current" fill="none" strokeWidth="1.5">
        <path d="M12 19V5M6 11l6-6 6 6" />
      </svg>
    </button>
  );
}
