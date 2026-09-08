import * as THREE from 'three';
import Beacon from './Beacon.jsx';
import RooftopProps from './RooftopProps.jsx';
import RooftopHologram from './props/RooftopHologram.jsx';
import { COLORS } from '../../config/constants.js';
import { useGameStore } from '../../store/gameStore.js';

// Shared module-level geometry and materials to eliminate duplicate GPU allocations
const UNIT_BOX = new THREE.BoxGeometry(1, 1, 1);
const WALL_MATERIAL = new THREE.MeshStandardMaterial({
  color: COLORS.WALL_DARK,
  roughness: 0.7,
  metalness: 0.3,
});
const ROOF_MATERIAL = new THREE.MeshStandardMaterial({
  color: COLORS.ROOF_CONCRETE,
  roughness: 0.9,
});

export default function SectionTower({ tower }) {
  const { id, label, position, width, height, depth, beaconColor } = tower;
  const [x, y, z] = position;

  return (
    <group position={[x, y, z]}>
      {/* Main tower structure */}
      <mesh
        position={[0, height / 2, 0]}
        scale={[width, height, depth]}
        geometry={UNIT_BOX}
        material={WALL_MATERIAL}
        castShadow
        receiveShadow
      />

      {/* Rooftop floor platform */}
      <mesh
        position={[0, height + 0.05, 0]}
        scale={[width, 0.1, depth]}
        geometry={UNIT_BOX}
        material={ROOF_MATERIAL}
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          useGameStore.getState().startSwing(id);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      />

      {/* Rooftop glowing parapet rim */}
      <mesh
        position={[0, height + 0.3, 0]}
        scale={[width + 0.2, 0.4, depth + 0.2]}
        geometry={UNIT_BOX}
        onClick={(e) => {
          e.stopPropagation();
          useGameStore.getState().startSwing(id);
        }}
      >
        <meshBasicMaterial color={beaconColor} wireframe toneMapped={false} />
      </mesh>

      {/* Rooftop Architectural Props (Water tanks, AC chillers, Antennas) */}
      <group position={[0, height + 0.1, 0]}>
        <RooftopProps tower={tower} />
      </group>

      {/* Interactive 3D Holographic Display */}
      <RooftopHologram
        towerId={id}
        label={label}
        color={beaconColor}
        position={[0, height + 6.5, 0]}
      />

      {/* Rooftop Navigation Beacon */}
      <Beacon
        towerId={id}
        label={label}
        color={beaconColor}
        position={[0, height + 4, 0]}
      />
    </group>
  );
}

