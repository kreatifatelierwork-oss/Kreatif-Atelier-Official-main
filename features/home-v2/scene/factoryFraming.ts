/** The home factory's fit boxes (see FactoryStage framingFor); shared with the still-picture render spec. */
export const FRAMING = {
  landscape: { fitW: 10.2, fitH: 6.9, targetY: -1.15 },
  portrait: { fitW: 9.3, fitH: 6.9, targetY: -2.1 },
} as const;
