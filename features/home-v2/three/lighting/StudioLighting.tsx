"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { LIGHT } from "../materials/palette";

/**
 * The lighting rig every artifact shares, so they read as one family: a warm key from the upper
 * left, a cream fill, a strip rim on the right, a faint maroon bounce from below (environment light
 * panels, no downloaded HDR), and a soft maroon-tinted contact shadow.
 */
export function StudioLighting({ shadow = true, shadowY = -1.35 }: { shadow?: boolean; shadowY?: number }) {
  return (
    <>
      <Environment resolution={256} frames={1}>
        {/* Warm key, upper left: a warm-white panel with a gold core, so gold metal reflects as gold */}
        <Lightformer form="rect" intensity={3.2} color={LIGHT.key} position={[-4, 5, 4]} scale={[7, 5, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={2.2} color={LIGHT.keyWarm} position={[-2.5, 3.5, 5]} scale={[3, 2, 1]} target={[0, 0, 0]} />
        {/* Warm overhead, for highlights along the top of gold parts */}
        <Lightformer form="rect" intensity={1.6} color={LIGHT.keyWarm} position={[0, 7, 0]} scale={[6, 6, 1]} target={[0, 0, 0]} />
        {/* Rim strip, right */}
        <Lightformer form="rect" intensity={2.0} color={LIGHT.key} position={[5, 1, 2]} scale={[1.2, 7, 1]} target={[0, 0, 0]} />
        {/* Cream fill, front and left, so dark materials keep their detail */}
        <Lightformer form="rect" intensity={1.4} color={LIGHT.fill} position={[1, 1, 7]} scale={[6, 4, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.4} color={LIGHT.fill} position={[-6, -2, 4]} scale={[5, 5, 1]} target={[0, 0, 0]} />
        <Lightformer form="circle" intensity={1.0} color={LIGHT.fill} position={[0, 2, -6]} scale={4} target={[0, 0, 0]} />
        {/* Faint maroon bounce from below */}
        <Lightformer form="rect" intensity={0.7} color={LIGHT.bounce} position={[0, -5, 3]} scale={[8, 3, 1]} target={[0, 0, 0]} />
      </Environment>
      <ambientLight intensity={0.25} color={LIGHT.fill} />
      <directionalLight position={[-3, 5, 4]} intensity={1.1} color={LIGHT.keyWarm} />
      {shadow && <ContactShadows position={[0, shadowY, 0]} opacity={0.36} scale={7} blur={2.6} far={3} resolution={512} color={LIGHT.shadow} />}
    </>
  );
}
