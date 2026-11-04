import { Play as StoryPlay } from "@/components/story/Play";
import { aurelius } from "@/content/aurelius";

/** The shared playable drawing, with Aurelius's hint wording. */
export function Play(props: { label: string; children: React.ReactNode; className?: string }) {
  return <StoryPlay hints={aurelius.play} {...props} />;
}
