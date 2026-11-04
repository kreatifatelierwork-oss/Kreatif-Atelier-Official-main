import type { Metadata } from "next";
import { Hub, Orbit, ProfileCard } from "@/components/valora/art";
import { EcosystemWheel } from "@/components/valora/EcosystemWheel";
import { Band, Heading, PageHead, Play, Tags, WithArt } from "@/components/valora/kit";
import { Ladder } from "@/components/valora/Ladder";
import { ValoraShell } from "@/components/valora/ValoraShell";
import { ecosystem, valora } from "@/content/valora";

export const metadata: Metadata = {
  title: `The ecosystem — ${valora.name} | Kreatif Atelier`,
  description: `${ecosystem.wheel.title.join(" ")} ${ecosystem.head.lead}`,
  alternates: { canonical: "/valora/ecosystem/" },
};

const { wheel, profile, ladder, faculty } = ecosystem;

/** Valora, part two: the ecosystem (a wheel to turn), the Valora profile, the ladder to climb, and the faculty. */
export default function Page() {
  return (
    <ValoraShell next={valora.nav[2]}>
      <PageHead
        title={ecosystem.head.title}
        lead={ecosystem.head.lead}
        art={
          <Play>
            <Orbit />
          </Play>
        }
      />

      <Band panel labelledBy="wheel-heading">
        <Heading id="wheel-heading" label={wheel.label} title={wheel.title} />
        <div className="mt-12">
          <EcosystemWheel items={wheel.items} hint={wheel.hint} />
        </div>
      </Band>

      <Band labelledBy="profile-heading">
        <WithArt
          art={
            <Play>
              <ProfileCard />
            </Play>
          }
        >
          <Heading id="profile-heading" label={profile.label} title={profile.title} />
          <p data-reveal className="a-body mt-6 max-w-xl">
            {profile.intro}
          </p>
          <Tags items={profile.items} className="mt-6" />
        </WithArt>
      </Band>

      <Band panel labelledBy="ladder-heading">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center">
          <div>
            <Heading id="ladder-heading" label={ladder.label} title={ladder.title} />
            <p data-reveal className="a-lead mt-6 max-w-xl">
              {ladder.intro}
            </p>
          </div>
          <Ladder items={ladder.items} hint={ladder.hint} />
        </div>
      </Band>

      <Band labelledBy="faculty-heading">
        <WithArt
          art={
            <Play>
              <Hub />
            </Play>
          }
        >
          <Heading id="faculty-heading" label={faculty.label} title={faculty.title} />
          <p data-reveal className="a-quote mt-6">
            {faculty.intro}
          </p>
          <ol className="v-roles mt-8">
            {faculty.items.map((role, i) => (
              <li key={role} data-reveal>
                <span className="a-red tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                {role}
              </li>
            ))}
          </ol>
        </WithArt>
      </Band>
    </ValoraShell>
  );
}
