"use client";

import { useRef } from "react";
import { journeyArt } from "@/components/asraya/journey-art";
import { Tags } from "@/components/asraya/kit";
import { Play } from "@/components/asraya/Play";
import { home } from "@/content/asraya";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/scroll/gsap";

const { journey } = home;
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * The supporter's story: how a stranger becomes someone who stays, one step at a time, each with its drawing.
 * On a wide screen with motion welcome, the section pins and the steps slide past as you scroll (`data-mode="slide"`);
 * elsewhere they stack. Either way, the step being read gets `data-on`, which plays its drawing.
 */
export function Journey() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      // The inner frame is what pins: the section's full-bleed margins would be measured wrong once it is fixed.
      const frame = section.querySelector<HTMLElement>(".a-journey__frame")!;
      const track = section.querySelector<HTMLElement>(".a-journey__track")!;
      const road = section.querySelector<HTMLElement>(".a-journey__road span")!;
      const steps = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll(".a-journey__step"),
      );
      const mark = (step: HTMLElement, on: boolean) =>
        on ? step.setAttribute("data-on", "") : step.removeAttribute("data-on");
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
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
          steps.forEach((step) =>
            ScrollTrigger.create({
              trigger: step,
              containerAnimation: slide,
              start: "left 72%",
              end: "right 28%",
              onToggle: (self) => mark(step, self.isActive),
            }),
          );
          return () => {
            delete section.dataset.mode;
            steps.forEach((step) => mark(step, false));
          };
        },
      );

      mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
        steps.forEach((step) =>
          ScrollTrigger.create({
            trigger: step,
            start: "top 68%",
            end: "bottom 32%",
            onToggle: (self) => mark(step, self.isActive),
          }),
        );
        return () => steps.forEach((step) => mark(step, false));
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-labelledby="journey-heading"
      className="a-journey a-bleed"
    >
      <div className="a-journey__frame">
        <div className="a-wrap relative">
          <ol className="a-journey__track">
            <li className="a-journey__intro">
              <p className="a-wide a-red">{journey.label}</p>
              <h2 id="journey-heading" className="a-display a-h2 mt-5">
                {journey.title[0]}{" "}
                <span className="a-em">{journey.title[1]}</span>
              </h2>
              <p className="a-lead mt-6">{journey.lead}</p>
            </li>
            {journey.steps.map((step, i) => {
              const Art = journeyArt[step.art];
              return (
                <li key={step.title} className="a-journey__step">
                  <p aria-hidden="true" className="a-journey__num">
                    {pad(i + 1)}
                  </p>
                  <Play label={step.title} className="a-journey__art">
                    <Art />
                  </Play>
                  <h3 className="a-display mt-4 text-[clamp(1.5rem,1.9vw,1.85rem)]">
                    {step.title}
                  </h3>
                  <p className="a-body mt-3 !text-[1rem] !leading-relaxed">
                    {step.body}
                  </p>
                  <p className="a-wide a-faint mt-5 !text-[0.66rem]">
                    {journey.behindLabel}
                  </p>
                  <Tags items={step.behind} className="mt-2" />
                </li>
              );
            })}
            <li className="a-journey__outro">
              <p className="a-quote">{journey.close}</p>
            </li>
          </ol>
          <div aria-hidden="true" className="a-journey__road">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
}
