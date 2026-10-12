import { aurelius, practiceHref, practices } from "@/content/aurelius";
import { SmartLink } from "@/components/ui/SmartLink";

/** The eleven practice areas as a typographic index, each linking to its page. */
export function PracticeList() {
  return (
    <ol className="border-t border-line">
      {practices.map((practice, i) => (
        <li key={practice.slug} data-reveal className="border-b border-line">
          <SmartLink
            href={practiceHref(practice.slug)}
            className="group grid gap-x-10 gap-y-2 py-6 md:grid-cols-[3rem_minmax(0,5fr)_minmax(0,6fr)_auto] md:items-baseline"
          >
            <span className="eyebrow text-[0.64rem] text-cream-faint">{String(i + 1).padStart(2, "0")}</span>
            <span className="display text-[clamp(1.7rem,3vw,2.6rem)] leading-none text-cream transition-colors group-hover:text-gold-bright">
              {practice.name}
            </span>
            <span className="text-[0.95rem] leading-relaxed text-cream-muted">
              {practice.descriptor}
              {practice.expansion && <span className="eyebrow ml-3 text-[0.56rem] text-gold">{aurelius.labels.expansion}</span>}
            </span>
            <span className="eyebrow text-[0.62rem] whitespace-nowrap text-cream-faint">{practice.services.length}</span>
          </SmartLink>
        </li>
      ))}
    </ol>
  );
}
