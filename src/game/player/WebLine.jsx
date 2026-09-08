import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore.js';
import { SWING } from '../../config/constants.js';

export default function WebLine({ anchorPoint }) {
  const lineRef = useRef();
  const pointsRef = useRef([new THREE.Vector3(), new THREE.Vector3()]);

  const isSwinging = useGameStore((s) => s.isSwinging);
  const playerPosition = useGameStore((s) => s.playerPosition);

  useFrame(() => {
    if (!lineRef.current || !isSwinging || !anchorPoint) return;

    pointsRef.current[0].set(...playerPosition);
    pointsRef.current[1].copy(anchorPoint);

    // Line from player hand to skyscraper anchor point
    lineRef.current.geometry.setFromPoints(pointsRef.current);
  });

  if (!isSwinging || !anchorPoint) return null;

  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial
        color={SWING.WEB_COLOR}
        transparent
        opacity={SWING.WEB_OPACITY}
        linewidth={2}
      />
    </line>
  );
}
