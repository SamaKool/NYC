import { DoubleSide } from 'three';
import { COLORS } from '../../../config/constants.js';

export default function WaterTank({ position = [0, 0, 0], scale = 1 }) {
  const legOffset = 1.4;
  const legHeight = 1.5;
  const tankBodyHeight = 3;

  return (
    <group position={position} scale={scale}>
      {/* 4 Support Legs */}
      <mesh position={[-legOffset, legHeight / 2, -legOffset]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.08, legHeight, 6]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.8} metalness={0.5} />
      </mesh>
      <mesh position={[legOffset, legHeight / 2, -legOffset]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.08, legHeight, 6]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.8} metalness={0.5} />
      </mesh>
      <mesh position={[-legOffset, legHeight / 2, legOffset]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.08, legHeight, 6]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.8} metalness={0.5} />
      </mesh>
      <mesh position={[legOffset, legHeight / 2, legOffset]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.08, legHeight, 6]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.8} metalness={0.5} />
      </mesh>

      {/* Cross Bracing Bars */}
      <mesh position={[0, legHeight / 2, 0]}>
        <boxGeometry args={[legOffset * 2.1, 0.06, 0.06]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.8} metalness={0.6} />
      </mesh>
      <mesh position={[0, legHeight / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[legOffset * 2.1, 0.06, 0.06]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.8} metalness={0.6} />
      </mesh>

      {/* Main Cylindrical Tank Body */}
      <mesh position={[0, legHeight + tankBodyHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2, 2, tankBodyHeight, 16]} />
        <meshStandardMaterial
          color={COLORS.METAL_DARK}
          roughness={0.8}
          metalness={0.5}
        />
      </mesh>

      {/* Metallic Iron Reinforcement Rings */}
      <mesh position={[0, legHeight + 0.6, 0]}>
        <cylinderGeometry args={[2.04, 2.04, 0.1, 16]} />
        <meshStandardMaterial color={0x0b0f19} roughness={0.5} metalness={0.8} />
      </mesh>
      <mesh position={[0, legHeight + tankBodyHeight - 0.6, 0]}>
        <cylinderGeometry args={[2.04, 2.04, 0.1, 16]} />
        <meshStandardMaterial color={0x0b0f19} roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Conical Roof Cap */}
      <mesh position={[0, legHeight + tankBodyHeight + 0.4, 0]} castShadow>
        <coneGeometry args={[2.2, 0.8, 16]} />
        <meshStandardMaterial
          color={0x151a29}
          roughness={0.7}
          metalness={0.4}
          side={DoubleSide}
        />
      </mesh>
    </group>
  );
}

