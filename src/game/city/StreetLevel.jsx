import * as THREE from 'three';
import { COLORS, WORLD } from '../../config/constants.js';

export default function StreetLevel() {
  return (
    <group position={[0, 0, 0]}>
      {/* Dark asphalt base ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[WORLD.SIZE, WORLD.SIZE]} />
        <meshStandardMaterial color={COLORS.GROUND} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Atmospheric street-level orange sodium glow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.4, 0]}>
        <planeGeometry args={[WORLD.SIZE * 0.8, WORLD.SIZE * 0.8]} />
        <meshBasicMaterial
          color={COLORS.SODIUM_AMBER}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
