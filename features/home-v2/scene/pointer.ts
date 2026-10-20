/** Reduced motion, read once where a scene decides whether to animate. (Pointer tracking was removed: artifacts react only to the pointer over them.) */
export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
