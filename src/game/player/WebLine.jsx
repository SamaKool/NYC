import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore.js';
import { SWING } from '../../config/constants.js';

export default function WebLine({ anchorPoint }) {
  const lineRef = useRef();
  const isSwinging = useGameStore((s) => s.isSwinging);
  const playerPosition = useGameStore((s) => s.playerPosition);

  useFrame(() => {
    if (!lineRef.current || !isSwinging || !anchorPoint) return;

    const pPos = new THREE.Vector3(...playerPosition);
    const aPos = anchorPoint.clone();

    // Line from player hand to skyscraper anchor point
    const points = [pPos, aPos];
    lineRef.current.geometry.setFromPoints(points);
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
