import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { useGameStore } from '../../store/gameStore.js';
import { CAMERA_MODE, HERO, TOWERS } from '../../config/constants.js';

export default function CameraController() {
  const controlsRef = useRef();

  useEffect(() => {
    // Initial camera placement overlooking hero plaza
    if (controlsRef.current) {
      controlsRef.current.setLookAt(
        HERO.cameraStart[0],
        HERO.cameraStart[1],
        HERO.cameraStart[2],
        HERO.cameraLookAt[0],
        HERO.cameraLookAt[1],
        HERO.cameraLookAt[2],
        false
      );
    }
  }, []);

  useFrame(() => {
    const { cameraMode, activeSection, playerPosition } = useGameStore.getState();

    if (!controlsRef.current) return;

    if (cameraMode === CAMERA_MODE.FOLLOW_ROOFTOP && activeSection && TOWERS[activeSection]) {
      const tower = TOWERS[activeSection];
      const targetY = tower.height + 2;
      controlsRef.current.setLookAt(
        tower.position[0],
        targetY + tower.cameraOrbitHeight,
        tower.position[2] + tower.cameraOrbitRadius,
        tower.position[0],
        targetY,
        tower.position[2],
        true
      );
    } else if (cameraMode === CAMERA_MODE.FOLLOW_GROUND) {
      controlsRef.current.setLookAt(
        playerPosition[0],
        playerPosition[1] + 5,
        playerPosition[2] + 12,
        playerPosition[0],
        playerPosition[1] + 1.5,
        playerPosition[2],
        true
      );
    }
  });

  return (
    <CameraControls
      ref={controlsRef}
      smoothTime={0.4}
      minDistance={4}
      maxDistance={120}
      maxPolarAngle={Math.PI / 2 - 0.05}
    />
  );
}
