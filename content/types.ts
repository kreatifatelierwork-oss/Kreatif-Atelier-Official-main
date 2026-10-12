/** A headline whose second half is set in italic serif, e.g. "We build brands that *actually move people.*" */
export type SplitHeadline = {
  lead: string;
  emphasis: string;
};

export type SectionIntro = {
  id: string;
  /** "01 · Who We Are" */
  marker: string;
  kicker?: string;
  headline: SplitHeadline;
  intro?: string;
};

/**
 * A hero figure. `cutout` is a transparent figure that sits in front of the title (the title can
 * slide out from behind it); `full` is a full-bleed photograph behind the copy.
 */
export type HeroFigure = {
  src: string;
  alt: string;
  width: number;
  height: number;
  mode: "cutout" | "full";
  /** CSS object-position for `full` heroes, so the subject stays in frame. */
  position?: string;
  /** For `full` heroes: the same picture with only the subject kept (transparent elsewhere), laid over the title. */
  front?: string;
};
