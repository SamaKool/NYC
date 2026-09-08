import { AdditiveBlending } from 'three';
import { COLORS, WORLD } from '../../config/constants.js';
import { useGameStore } from '../../store/gameStore.js';

export default function StreetLevel() {
  const jumpOff = useGameStore((s) => s.jumpOff);

  return (
    <group position={[0, 0, 0]}>
      {/* Dark asphalt base ground */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
        onClick={(e) => {
          if (useGameStore.getState().activeSection) {
            e.stopPropagation();
            jumpOff();
          }
        }}
      >
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
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

