import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { MathUtils } from 'three';
import { BEACON } from '../../config/constants.js';
import { useGameStore } from '../../store/gameStore.js';

export default function Beacon({ towerId, label, color, position }) {
  const meshRef = useRef();
  const ringRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scale = MathUtils.lerp(
      BEACON.PULSE_SCALE_MIN,
      BEACON.PULSE_SCALE_MAX,
      (Math.sin(time * BEACON.PULSE_SPEED) + 1) / 2
    );
    if (meshRef.current) {
      meshRef.current.scale.setScalar(scale);
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.8;
    }
  });

  return (
    <group position={position}>
      {/* Clickable pulsing beacon core */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          useGameStore.getState().startSwing(towerId);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <sphereGeometry args={[BEACON.RADIUS, 16, 16]} />
        <meshBasicMaterial color={color} toneMapped={false} />
      </mesh>

      {/* Orbiting indicator ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[BEACON.RING_RADIUS, BEACON.RING_TUBE, 8, 32]} />
        <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.8} />
      </mesh>

      {/* Floating Section Label */}
      <Text
        position={[0, BEACON.LABEL_HEIGHT_OFFSET, 0]}
        fontSize={BEACON.LABEL_FONT_SIZE}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
}

