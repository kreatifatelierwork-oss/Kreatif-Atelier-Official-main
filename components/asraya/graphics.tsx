/**
 * Diagram drawings for the Asraya pages, in the page's own colours. All decorative. The network's links carry
 * `data-a-link`, so AsrayaMotion can draw them in as the page scrolls.
 */

const W = 1200;
const H = 380;

/** Organisations scattered across a region; fixed positions, so server and client draw the same. */
const NODES: readonly [number, number][] = [
  [70, 220], [150, 90], [215, 290], [300, 170], [370, 60], [420, 300], [500, 200], [560, 95],
  [610, 320], [690, 230], [740, 70], [800, 160], [860, 300], [930, 110], [990, 230], [1060, 70],
  [1120, 280], [1150, 160], [260, 40], [470, 350], [880, 30], [40, 330],
];

/** One connected web: the shortest tree through every node, plus a link to each node's second-nearest neighbour so it closes into loops. */
const LINKS = (() => {
  const dist = (i: number, j: number) => (NODES[i][0] - NODES[j][0]) ** 2 + (NODES[i][1] - NODES[j][1]) ** 2;
  const seen = new Set<string>();
  const links: [number, number][] = [];
  const add = (i: number, j: number) => {
    const key = i < j ? `${i}-${j}` : `${j}-${i}`;
    if (!seen.has(key)) {
      seen.add(key);
      links.push([i, j]);
    }
  };
  // Prim's tree, so no organisation is left on an island.
  const inTree = new Set([0]);
  while (inTree.size < NODES.length) {
    let best: [number, number] = [0, 0];
    let bestD = Infinity;
    for (const i of inTree)
      NODES.forEach((_, j) => {
        if (!inTree.has(j) && dist(i, j) < bestD) {
          bestD = dist(i, j);
          best = [i, j];
        }
      });
    inTree.add(best[1]);
    add(...best);
  }
  NODES.forEach((_, i) => {
    const nearest = NODES.map((__, j) => j).filter((j) => j !== i).sort((a, b) => dist(i, a) - dist(i, b));
    add(i, nearest[1]);
  });
  return links;
})();

type NetworkProps = {
  /** `apart`: every organisation on its own. `joined`: the same organisations, linked. */
  state: "apart" | "joined";
  /** Two nodes to name in the `apart` state (the places the copy mentions). */
  places?: readonly [string, string];
  className?: string;
};

export function Network({ state, places, className = "" }: NetworkProps) {
  const joined = state === "joined";
  const named = [3, 9];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false" className={`a-network block h-auto w-full ${className}`} data-state={state}>
      {joined &&
        LINKS.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} className="a-network__link" pathLength={1} data-a-link />
        ))}
      {NODES.map(([x, y], i) => (
        <g key={i}>
          {!joined && <circle cx={x} cy={y} r={26} className="a-network__halo" />}
          <circle cx={x} cy={y} r={joined && i % 4 === 0 ? 10 : 7} className={joined && i % 4 === 0 ? "a-network__node a-network__node--accent" : "a-network__node"} />
        </g>
      ))}
      {!joined &&
        places?.map((place, k) => {
          const [x, y] = NODES[named[k]];
          return (
            <text key={place} x={x} y={y - 34} textAnchor="middle" className="a-network__label">
              {place}
            </text>
          );
        })}
    </svg>
  );
}

/** A search for "your ngo..": the bar, then results as grey lines with one found and marked in red. */
export function SearchSketch({ query, className = "" }: { query: string; className?: string }) {
  const rows = [0.72, 0.58, 0.66];
  return (
    <div aria-hidden="true" className={`a-search ${className}`}>
      <p className="a-search__bar">
        <span>{query}</span>
        <span>⌕</span>
      </p>
      <ol className="a-search__results">
        {rows.map((width, i) => (
          <li key={i} data-found={i === 0 || undefined}>
            <span style={{ width: `${width * 100}%` }} />
            <span style={{ width: `${(width + 0.2) * 100}%` }} />
            <span style={{ width: `${(width - 0.05) * 100}%` }} />
          </li>
        ))}
      </ol>
    </div>
  );
}
