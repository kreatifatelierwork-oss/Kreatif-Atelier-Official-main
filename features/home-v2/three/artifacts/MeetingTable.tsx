"use client";

import { clay } from "../materials/materials";
import { palette } from "../materials/palette";
import { extrude, memo, roundedRect } from "./geometry";
import { Ball, Box, Limb, Mesh, Tube } from "./parts";
import { Person, type Pose } from "./Person";

type V3 = [number, number, number];
const p = palette.meeting;

/**
 * A seated person facing +x at the origin. Forearms rest on the table top and hands lie on it:
 * with the figure placed at TABLE_GAP from the table edge (scale 1.12, y -0.18), the elbows sit just
 * inside the edge and every arm part clears the top surface (y 0.05).
 */
function seated(reach: number): Pose {
  return {
    head: [0, 0.8, 0],
    neck: [0, 0.52, 0],
    hip: [0, 0.08, 0],
    armL: [[0.03, 0.44, 0.2], [0.34, 0.3, 0.24], [reach, 0.33, 0.13]],
    armR: [[0.03, 0.44, -0.2], [0.34, 0.3, -0.24], [reach, 0.33, -0.13]],
    legL: [[0.04, 0.0, 0.1], [0.38, 0.0, 0.1], [0.4, -0.4, 0.1]],
    legR: [[0.04, 0.0, -0.1], [0.38, 0.0, -0.1], [0.4, -0.4, -0.1]],
  };
}

/** Table top is 1.7 × 1.05 at y 0..0.1 (group space); people sit this far out from its edges. */
const TABLE_GAP = 0.3;
const SIDE = 0.85 + TABLE_GAP;
const FRONT = 0.525 + TABLE_GAP;

function Chair({ position, rotationY }: { position: V3; rotationY: number }) {
  const seat = clay(p.chair);
  const leg = clay(p.chairLeg);
  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <Box size={[0.5, 0.1, 0.5]} radius={0.05} material={seat} position={[0.05, 0, 0]} />
      <Box size={[0.08, 0.55, 0.5]} radius={0.04} material={seat} position={[-0.22, 0.3, 0]} rotation={[0, 0, 0.08]} />
      {([[-0.15, -0.18], [-0.15, 0.18], [0.24, -0.18], [0.24, 0.18]] as const).map(([x, z]) => (
        <Limb key={`${x}${z}`} a={[x, -0.04, z]} b={[x * 1.15, -0.5, z * 1.15]} r={0.025} material={leg} />
      ))}
    </group>
  );
}

function Seated({ position, rotationY, shirt }: { position: V3; rotationY: number; shirt: string }) {
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={1.12}>
      <Person pose={seated(0.64)} body={clay(shirt)} skin={clay(p.skin)} legs={clay(p.trousers)} hair={clay(p.hair)} headR={0.25} torsoR={0.24} limbR={0.09} />
    </group>
  );
}

function Board() {
  const panel = memo("meeting-board", () => extrude(roundedRect(1.05, 1.2, 0.09), 0.05, 0.025, 4));
  const bubble = memo("meeting-bubble", () => {
    const s = roundedRect(0.42, 0.32, 0.06);
    return extrude(s, 0.05, 0.02, 4);
  });
  const grey = clay(p.boardGrey);
  return (
    <group position={[0.3, 1.25, -0.55]} rotation={[0, 0.3, 0]} scale={1.3}>
      <Mesh geometry={panel} material={clay(p.board)} />
      <Box size={[0.42, 0.12, 0.05]} radius={0.03} material={clay(p.boardYellow)} position={[-0.2, 0.4, 0.06]} />
      <Limb a={[-0.38, 0.18, 0.06]} b={[0.02, 0.18, 0.06]} r={0.022} material={grey} />
      <Limb a={[-0.38, 0.08, 0.06]} b={[-0.15, 0.08, 0.06]} r={0.022} material={grey} />
      <Tube points={[[-0.36, -0.28, 0.06], [-0.18, -0.12, 0.06], [-0.04, -0.24, 0.06], [0.18, -0.02, 0.06]]} r={0.022} material={clay(p.boardLine)} />
      <mesh position={[0.22, 0.02, 0.06]} rotation={[0, 0, -0.85]} material={clay(p.boardLine)}>
        <coneGeometry args={[0.055, 0.1, 16]} />
      </mesh>
      <Limb a={[-0.38, -0.46, 0.06]} b={[0.25, -0.46, 0.06]} r={0.024} material={grey} />
      <group position={[0.42, 0.33, 0.1]}>
        <Mesh geometry={bubble} material={clay(p.boardYellow)} />
        <mesh position={[-0.08, -0.2, 0]} rotation={[0, 0, 0.5]} material={clay(p.boardYellow)}>
          <coneGeometry args={[0.06, 0.12, 3]} />
        </mesh>
      </group>
    </group>
  );
}

function Badge() {
  const white = clay(p.badgeWhite);
  return (
    <group position={[-1.05, 1.6, -0.35]} rotation={[0.1, 0.5, 0]} scale={1.3}>
      <mesh rotation={[Math.PI / 2, 0, 0]} material={clay(p.badge, { roughness: 0.45, clearcoat: 0.4 })} castShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.08, 36]} />
      </mesh>
      <Ball r={0.085} material={white} position={[0, 0.07, 0.05]} />
      <mesh position={[0, -0.12, 0.05]} material={white} scale={[1, 0.62, 0.5]}>
        <sphereGeometry args={[0.15, 24, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
      </mesh>
    </group>
  );
}

/** ref-meeting-table.png: three clay figures at an ochre table, a floating chart board and a profile badge. */
export function MeetingTable() {
  const leg = clay(p.chairLeg);
  return (
    <group position={[0, -0.35, 0]}>
      <Box size={[1.7, 0.1, 1.05]} radius={0.05} material={clay(p.table)} position={[0, 0, 0]} />
      {([[-0.7, -0.4], [-0.7, 0.4], [0.7, -0.4], [0.7, 0.4]] as const).map(([x, z]) => (
        <Limb key={`${x}${z}`} a={[x, -0.05, z]} b={[x, -0.8, z]} r={0.035} material={leg} />
      ))}
      <Chair position={[-SIDE - 0.05, -0.3, 0.02]} rotationY={0} />
      <Seated position={[-SIDE, -0.18, 0.02]} rotationY={0} shirt={p.blueShirt} />
      <Chair position={[SIDE + 0.05, -0.3, 0.05]} rotationY={Math.PI} />
      <Seated position={[SIDE, -0.18, 0.05]} rotationY={Math.PI} shirt={p.greenShirt} />
      <Chair position={[0.05, -0.3, FRONT + 0.05]} rotationY={Math.PI / 2} />
      <Seated position={[0.05, -0.18, FRONT]} rotationY={Math.PI / 2} shirt={p.yellowShirt} />
      <Board />
      <Badge />
    </group>
  );
}
