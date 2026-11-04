"use client";

import { useRef } from "react";
import { Play } from "@/components/story/Play";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/scroll/gsap";

export type StoryStep = { title: string; body: string; art: React.ReactNode; behind?: readonly string[] };

type JourneyProps = {
  /** Anchor id; the heading carries `${id}-heading`. */
  id: string;
  label: string;
  /** The headline; its second part is the emphasised half. */
  title: readonly string[];
  lead?: string;
  steps: readonly StoryStep[];
  /** A closing line after the last step. */
  close?: string;
  /** The small label over each step's `behind` tags. */
  behindLabel?: string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A story told one step at a time, each step with its drawing (Asraya's supporter's story, Valora's student road).
 * On a wide screen with motion welcome, the section pins and the steps slide past as you scroll (`data-mode="slide"`);
 * elsewhere they stack. Either way, the step being read gets `data-on`, which plays its drawing. Colours come from the
 * page's scope (`.asraya`, `.valora`) through the shared role tokens.
 */
export function Journey({ id, label, title, lead, steps, close, behindLabel }: JourneyProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      // The inner frame is what pins: the section's full-bleed margins would be measured wrong once it is fixed.
      const frame = section.querySelector<HTMLElement>(".a-journey__frame")!;
      const track = section.querySelector<HTMLElement>(".a-journey__track")!;
      const road = section.querySelector<HTMLElement>(".a-journey__road span")!;
      const items = gsap.utils.toArray<HTMLElement>(section.querySelectorAll(".a-journey__step"));
      const mark = (step: HTMLElement, on: boolean) => (on ? step.setAttribute("data-on", "") : step.removeAttribute("data-on"));
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        section.dataset.mode = "slide";
        const distance = () => track.scrollWidth - track.clientWidth;
        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            // The road along the foot fills as the story goes on.
            onUpdate: (self) => gsap.set(road, { scaleX: self.progress }),
          },
        });
        items.forEach((step) =>
          ScrollTrigger.create({ trigger: step, containerAnimation: slide, start: "left 60%", end: "right 40%", onToggle: (self) => mark(step, self.isActive) }),
        );
        return () => {
          delete section.dataset.mode;
          items.forEach((step) => mark(step, false));
        };
      });

      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        items.forEach((step) => ScrollTrigger.create({ trigger: step, start: "top 68%", end: "bottom 32%", onToggle: (self) => mark(step, self.isActive) }));
        return () => items.forEach((step) => mark(step, false));
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const [first, ...rest] = title;
  return (
    <section
      ref={root}
      aria-labelledby={`${id}-heading`}
      className={`a-journey a-bleed ${close ? "" : "a-journey--open"}`}
      // Stacked on a wide screen: five or fewer steps sit in one row, more go four to a row.
      style={{ "--cols": steps.length <= 5 ? steps.length : 4 } as React.CSSProperties}
    >
      <div className="a-journey__frame">
        <div className="a-wrap relative">
          <ol className="a-journey__track">
            <li className="a-journey__intro">
              <p className="a-wide a-red">{label}</p>
              <h2 id={`${id}-heading`} className="a-display a-h2 mt-5">
                {first} {rest.length > 0 && <span className="a-em">{rest.join(" ")}</span>}
              </h2>
              {lead && <p className="a-lead mt-6">{lead}</p>}
            </li>
            {steps.map((step, i) => (
              <li key={step.title} className="a-journey__step">
                <p aria-hidden="true" className="a-journey__num">
                  {pad(i + 1)}
                </p>
                <Play auto={false} className="a-journey__art">
                  {step.art}
                </Play>
                <h3 className="a-display mt-4 text-[clamp(1.5rem,1.9vw,1.85rem)]">{step.title}</h3>
                <p className="a-body mt-3 !text-[1rem] !leading-relaxed">{step.body}</p>
                {step.behind && (
                  <>
                    {behindLabel && <p className="a-wide a-faint mt-5 !text-[0.66rem]">{behindLabel}</p>}
                    <ul className="a-tags mt-2">
                      {step.behind.map((entry) => (
                        <li key={entry}>{entry}</li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
            {close && (
              <li className="a-journey__outro">
                <p className="a-quote">{close}</p>
              </li>
            )}
          </ol>
          <div aria-hidden="true" className="a-journey__road">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
