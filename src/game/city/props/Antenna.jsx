import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { COLORS } from '../../../config/constants.js';

export default function Antenna({ position = [0, 0, 0], height = 8 }) {
  const lightRef = useRef();

  useFrame((state) => {
    if (lightRef.current) {
      const time = state.clock.getElapsedTime();
      // Flashing aviation red light: sharper flash
      const pulse = (Math.sin(time * 4) + 1) / 2;
      lightRef.current.opacity = 0.3 + pulse * 0.7;
    }
  });

  const seg1H = height * 0.45;
  const seg2H = height * 0.35;
  const seg3H = height * 0.20;

  return (
    <group position={position}>
      {/* Heavy Base Flange */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.7, 0.4, 8]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.7} metalness={0.6} />
      </mesh>

      {/* Segment 1: Lower Lattice / Thick Pole */}
      <mesh position={[0, 0.4 + seg1H / 2, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.16, seg1H, 8]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.6} metalness={0.7} />
      </mesh>

      {/* Segment 2: Mid Pole */}
      <mesh position={[0, 0.4 + seg1H + seg2H / 2, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.12, seg2H, 8]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.6} metalness={0.7} />
      </mesh>

      {/* Segment 3: Upper Mast Tip */}
      <mesh position={[0, 0.4 + seg1H + seg2H + seg3H / 2, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.07, seg3H, 8]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.5} metalness={0.8} />
      </mesh>

      {/* Cross Spreader Arms */}
      <mesh position={[0, 0.4 + seg1H, 0]}>
        <boxGeometry args={[1.2, 0.04, 0.04]} />
        <meshStandardMaterial color={COLORS.METAL_DARK} roughness={0.7} metalness={0.6} />
      </mesh>

      {/* Red Aviation Warning Strobe Light */}
      <mesh position={[0, 0.4 + height + 0.1, 0]}>
        <sphereGeometry args={[0.16, 12, 12]} />
        <meshBasicMaterial
          ref={lightRef}
          color={0xff2222}
          transparent
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

