import { Play as StoryPlay } from "@/components/story/Play";
import { ui } from "@/content/asraya";

/** The shared playable drawing, with Asraya's hint wording. */
export function Play(props: { label: string; children: React.ReactNode; className?: string }) {
  return <StoryPlay hints={ui} {...props} />;
}
