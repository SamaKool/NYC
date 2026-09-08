import { DoubleSide } from 'three';
import { COLORS } from '../../../config/constants.js';

export default function SatelliteDish({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Heavy Tripod / Mounting Base */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.8, 8]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.7} metalness={0.6} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.1, 8]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.8} metalness={0.5} />
      </mesh>

      {/* Tilted Swivel Assembly */}
      <group position={[0, 0.8, 0]} rotation={[-0.55, 0.2, 0]}>
        {/* Parabolic Reflector Dish */}
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.2, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial
            color={COLORS.METAL_DARK}
            metalness={0.7}
            roughness={0.3}
            side={DoubleSide}
          />
        </mesh>

        {/* Central Feedhorn / LNB Receiver Arm */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 6]} />
          <meshStandardMaterial color={0x1a2030} metalness={0.8} roughness={0.3} />
        </mesh>

        {/* LNB Receiver Head Sensor */}
        <mesh position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.12, 12, 12]} />
          <meshStandardMaterial color={COLORS.SPIDER_CYAN} roughness={0.2} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

