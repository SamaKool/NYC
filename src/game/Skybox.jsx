import { Stars } from '@react-three/drei';
import { COLORS, WORLD } from '../config/constants.js';

export default function Skybox() {
  return (
    <>
      <fogExp2 attach="fog" args={[COLORS.FOG, WORLD.FOG_DENSITY]} />
      <Stars
        radius={300}
        depth={60}
        count={2500}
        factor={4}
        saturation={0.5}
        fade
        speed={0.8}
      />
    </>
  );
}
