import { contrast, contrastPairs, palette } from "@/lib/design/tokens";
import { PrimitivesDemo } from "./PrimitivesDemo";

const section = "mx-auto w-full max-w-[var(--ds-max-width)] px-[var(--ds-gutter)] py-[var(--ds-space-8)]";
const tile = "grid aspect-square w-full place-items-center rounded-full";

const SIZES = ["sm", "md", "lg"] as const;
const raised = { sm: "neu-raised-sm", md: "neu-raised-md", lg: "neu-raised-lg" } as const;
const pressed = { sm: "neu-pressed-sm", md: "neu-pressed-md", lg: "neu-pressed-lg" } as const;

const TYPE: [string, string][] = [
  ["ds-display", "Display"],
  ["ds-heading", "Heading"],
  ["ds-body", "Body copy sets the tone for longer reading, comfortable leading, no tracking."],
  ["ds-label", "Label · small caps"],
];

/** Every token and material of the revamp on one page: surfaces, glass, type and contrast. */
export function DesignFoundations() {
  return (
    <main className="theme-aurelius min-h-screen bg-ds-surface font-ds-text text-ds-text">

      <section className={section} aria-labelledby="primitives">
        <p className="ds-label">Phase 1 · Aurelius theme</p>
        <h1 id="primitives" className="sr-only">
          Primitives
        </h1>
        <div className="mt-[var(--ds-space-5)]">
          <PrimitivesDemo />
        </div>
      </section>

      <section className={section} aria-labelledby="surfaces">
        <p className="ds-label">Phase 1 · Foundations</p>
        <h2 id="surfaces" className="ds-heading mt-[var(--ds-space-3)]">
          Surfaces <span className="ds-emphasis">raised and pressed</span>
        </h2>
        <div className="mt-[var(--ds-space-8)] grid grid-cols-3 gap-[var(--ds-space-8)]">
          {SIZES.map((s) => (
            <figure key={s} className="flex flex-col items-center gap-[var(--ds-space-5)]">
              <div className={`${tile} ${raised[s]}`}>
                <span className="ds-label">Raised {s}</span>
              </div>
            </figure>
          ))}
          {SIZES.map((s) => (
            <figure key={`p-${s}`} className="flex flex-col items-center gap-[var(--ds-space-5)]">
              <div className={`${tile} ${pressed[s]}`}>
                <span className="ds-label">Pressed {s}</span>
              </div>
            </figure>
          ))}
        </div>
      </section>

      <section className={section} aria-labelledby="glass">
        <h2 id="glass" className="ds-heading">
          Glass <span className="ds-emphasis">for emphasis</span>
        </h2>
        <div className="relative mt-[var(--ds-space-7)] grid min-h-[420px] place-items-center overflow-hidden rounded-ds-xl neu-pressed-md">
          {/* Colour behind the glass so blur and saturation are visible. */}
          <div aria-hidden="true" className="absolute top-[12%] left-[18%] aspect-square w-[28%] rounded-full bg-[image:var(--ds-accent-gradient)]" />
          <div aria-hidden="true" className="absolute right-[16%] bottom-[10%] aspect-square w-[24%] rounded-full bg-[image:var(--ds-accent-gradient-cool)]" />
          <div className="glass-frost relative w-[min(26rem,80%)] rounded-ds-lg p-[var(--ds-space-6)]">
            <p className="ds-label">Frosted panel</p>
            <p className="ds-body mt-[var(--ds-space-2)] text-ds-text">Translucent white, blur and saturation, a 1px inner border and a bright top edge.</p>
          </div>
        </div>
      </section>

      <section className={section} aria-labelledby="type">
        <h2 id="type" className="ds-heading">
          Type <span className="ds-emphasis">brand faces kept</span>
        </h2>
        <div className="mt-[var(--ds-space-6)] flex flex-col gap-[var(--ds-space-5)]">
          {TYPE.map(([cls, text]) => (
            <p key={cls} className={cls}>
              {text}
            </p>
          ))}
          <p className="ds-heading">
            <span className="ds-gradient-text">Gradient accent</span> for highlights
          </p>
        </div>
      </section>

      <section className={section} aria-labelledby="contrast">
        <h2 id="contrast" className="ds-heading">
          Contrast <span className="ds-emphasis">WCAG AA</span>
        </h2>
        <ul className="mt-[var(--ds-space-6)] grid grid-cols-2 gap-[var(--ds-space-3)] md:grid-cols-3">
          {contrastPairs.map(({ text, on, min }) => {
            const ratio = contrast(palette[text], palette[on]);
            return (
              <li key={`${text}-${on}`} className="ds-body flex items-center justify-between rounded-ds-md px-[var(--ds-space-4)] py-[var(--ds-space-3)] neu-raised-sm">
                <span>
                  {text} on {on}
                </span>
                <span className={ratio >= min ? "font-bold text-ds-text" : "font-bold text-ds-brand"}>{ratio.toFixed(1)}:1</span>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
