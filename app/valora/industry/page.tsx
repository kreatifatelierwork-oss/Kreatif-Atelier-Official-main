import type { Metadata } from "next";
import { Journey } from "@/components/story/Journey";
import { Button } from "@/components/ui/Button";
import { Bridge, Constellation, Evidence, FieldGlyph, valoraArt, type FieldIcon } from "@/components/valora/art";
import { Band, Heading, PageHead, Play, WithArt } from "@/components/valora/kit";
import { ValoraShell } from "@/components/valora/ValoraShell";
import { industry, valora } from "@/content/valora";

export const metadata: Metadata = {
  title: `Industry & campuses — ${valora.name} | Kreatif Atelier`,
  description: `${industry.flow.title.join(" ")} ${industry.outputs.intro}`,
  alternates: { canonical: "/valora/industry/" },
};

const { flow, outputs, project, connected, chapters } = industry;

/** Valora, part three: from industry problem to student solution, the fields, every project as evidence, the chapters. */
export default function Page() {
  return (
    <ValoraShell next={valora.nav[3]}>
      <PageHead
        title={industry.head.title}
        lead={industry.head.lead}
        art={
          <Play>
            <Bridge />
          </Play>
        }
      />

      {/* From industry problem to student solution, step by step. */}
      <Journey
        id="flow"
        label={flow.label}
        title={flow.title}
        steps={flow.steps.map((step) => {
          const Art = valoraArt[step.art];
          return { ...step, art: <Art /> };
        })}
      />

      <Band panel labelledBy="outputs-heading">
        <Heading id="outputs-heading" label={outputs.label} title={outputs.title} lead={outputs.intro} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {outputs.items.map((item) => (
            <li key={item.title} data-reveal className="a-card a-card--lift">
              <FieldGlyph name={item.icon as FieldIcon} />
              <h3 className="a-display mt-5 text-[clamp(1.6rem,2.2vw,1.9rem)]">{item.title}</h3>
              <p className="a-body mt-2 !text-[1rem]">{item.body}</p>
            </li>
          ))}
        </ul>
      </Band>

      <Band labelledBy="project-heading">
        <WithArt
          art={
            <Play>
              <Evidence />
            </Play>
          }
        >
          <Heading id="project-heading" label={project.label} title={project.title} />
          <ol className="v-flow mt-10">
            {project.items.map((item, i) => (
              <li key={item} data-reveal>
                <span className="v-flow__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="v-flow__title">{item}</span>
              </li>
            ))}
          </ol>
        </WithArt>
      </Band>

      <Band panel labelledBy="connected-heading">
        <p className="a-wide a-red">{connected.label}</p>
        <h2 id="connected-heading" data-a-words className="a-display a-h2 mt-5 max-w-4xl">
          {connected.lead} <span className="a-em block">{connected.emphasis}</span>
        </h2>
      </Band>

      <Band labelledBy="chapters-heading">
        <WithArt
          art={
            <Play>
              <Constellation />
            </Play>
          }
        >
          <Heading id="chapters-heading" label={chapters.label} title={chapters.title} />
          <p data-reveal className="a-body mt-6 max-w-xl">
            {chapters.body}
          </p>
          <div data-reveal className="mt-8">
            <Button href="/valora/chapters" variant="primary">
              {valora.radarCta}
            </Button>
          </div>
        </WithArt>
      </Band>
    </ValoraShell>
  );
}
