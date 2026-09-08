import { COLORS } from '../../../config/constants.js';

export default function SecurityBulkhead({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Concrete Rooftop Access Stairwell Enclosure */}
      <mesh position={[0, 1.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 2.8, 2.5]} />
        <meshStandardMaterial
          color={COLORS.ROOF_CONCRETE}
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Heavy Industrial Steel Door */}
      <mesh position={[0, 1.0, 1.26]}>
        <boxGeometry args={[1.2, 2.0, 0.08]} />
        <meshStandardMaterial
          color={0x1e2738}
          roughness={0.6}
          metalness={0.6}
        />
      </mesh>

      {/* Door Handle Bar */}
      <mesh position={[0.4, 1.0, 1.32]}>
        <boxGeometry args={[0.06, 0.3, 0.04]} />
        <meshStandardMaterial color={0x94a3b8} metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Overhead Lamp Fixture */}
      <mesh position={[0, 2.3, 1.35]}>
        <boxGeometry args={[0.4, 0.12, 0.2]} />
        <meshStandardMaterial color={0x0b0e14} roughness={0.7} />
      </mesh>

      {/* Glowing Sodium Amber Security Bulb */}
      <mesh position={[0, 2.2, 1.35]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial color={COLORS.SODIUM_AMBER} toneMapped={false} />
      </mesh>

      {/* Local Ambient Cast Light */}
      <pointLight
        position={[0, 2.1, 1.6]}
        color={COLORS.SODIUM_AMBER}
        intensity={0.6}
        distance={6}
        decay={2}
      />
    </group>
  );
}

