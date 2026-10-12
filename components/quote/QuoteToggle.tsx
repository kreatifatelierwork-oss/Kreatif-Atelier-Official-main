"use client";

import type { PracticeSlug } from "@/content/aurelius-services";
import { useQuoteStore } from "@/stores/quoteStore";

type Props = { slug: PracticeSlug; name: string };

/** Adds or removes one practice area from the quote. Separate from the row's link. */
export function QuoteToggle({ slug, name }: Props) {
  const selected = useQuoteStore((s) => s.items.includes(slug));
  const toggle = useQuoteStore((s) => s.toggle);

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={`${selected ? "Remove" : "Add"} ${name} ${selected ? "from" : "to"} your quote`}
      onClick={() => toggle(slug)}
      className={`eyebrow inline-flex items-center gap-2 border px-3 py-2 text-[0.6rem] whitespace-nowrap transition-colors duration-200 focus-visible:outline-offset-2 ${
        selected ? "border-ember bg-ember text-cream" : "border-ink/30 text-ink hover:border-ember hover:text-ember"
      }`}
    >
      <span aria-hidden="true">{selected ? "✓" : "+"}</span>
      {selected ? "Added" : "Add"}
    </button>
  );
}
