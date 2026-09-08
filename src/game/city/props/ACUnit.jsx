import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide } from 'three';
import { COLORS } from '../../../config/constants.js';

export default function ACUnit({ position = [0, 0, 0] }) {
  const fanGroupRef = useRef();

  useFrame((state) => {
    if (fanGroupRef.current) {
      fanGroupRef.current.rotation.y = state.clock.getElapsedTime() * 2.5;
    }
  });

  return (
    <group position={position}>
      {/* Main Industrial Chiller Housing */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 1.8, 2]} />
        <meshStandardMaterial
          color={COLORS.METAL_DARK}
          roughness={0.85}
          metalness={0.35}
        />
      </mesh>

      {/* Louvered Vent Face Detail */}
      <mesh position={[0, 0.9, 1.01]}>
        <planeGeometry args={[2.1, 1.4]} />
        <meshStandardMaterial
          color={0x111522}
          roughness={0.9}
          metalness={0.2}
        />
      </mesh>

      {/* Circular Top Exhaust Fan Rim */}
      <mesh position={[0, 1.85, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 0.1, 16]} />
        <meshStandardMaterial
          color={0x101420}
          roughness={0.6}
          metalness={0.7}
        />
      </mesh>

      {/* Rotating Fan Blades */}
      <group ref={fanGroupRef} position={[0, 1.88, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.95, 0.14]} />
          <meshBasicMaterial color={0x2b3248} side={DoubleSide} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
          <planeGeometry args={[0.95, 0.14]} />
          <meshBasicMaterial color={0x2b3248} side={DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

