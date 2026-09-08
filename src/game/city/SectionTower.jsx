import Beacon from './Beacon.jsx';
import { COLORS } from '../../config/constants.js';

export default function SectionTower({ tower }) {
  const { id, label, position, width, height, depth, beaconColor } = tower;
  const [x, y, z] = position;

  return (
    <group position={[x, y, z]}>
      {/* Main tower structure */}
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={COLORS.WALL_DARK}
          roughness={0.7}
          metalness={0.3}
        />
      </mesh>

      {/* Rooftop floor platform */}
      <mesh position={[0, height + 0.05, 0]} receiveShadow>
        <boxGeometry args={[width, 0.1, depth]} />
        <meshStandardMaterial color={COLORS.ROOF_CONCRETE} roughness={0.9} />
      </mesh>

      {/* Rooftop glowing parapet rim */}
      <mesh position={[0, height + 0.3, 0]}>
        <boxGeometry args={[width + 0.2, 0.4, depth + 0.2]} />
        <meshBasicMaterial color={beaconColor} wireframe toneMapped={false} />
      </mesh>

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
