import { journeyArt } from "@/components/asraya/journey-art";
import { Journey as Story } from "@/components/story/Journey";
import { home, ui } from "@/content/asraya";

/** The supporter's story on /asraya: how a stranger becomes someone who stays, with the drawing for each step. */
export function Journey() {
  const { journey } = home;
  return (
    <Story
      id="journey"
      label={journey.label}
      title={journey.title}
      lead={journey.lead}
      close={journey.close}
      behindLabel={journey.behindLabel}
      hints={ui}
      steps={journey.steps.map((step) => {
        const Art = journeyArt[step.art];
        return { ...step, art: <Art /> };
      })}
    />
  );
}
