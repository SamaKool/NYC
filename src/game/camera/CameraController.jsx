import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { MathUtils } from 'three';
import { useGameStore } from '../../store/gameStore.js';
import { CAMERA_MODE, HERO, TOWERS, SWING } from '../../config/constants.js';

export default function CameraController() {
  const controlsRef = useRef();
  const initializedRef = useRef(false);
  const lastTargetKeyRef = useRef('ground');

  useEffect(() => {
    // Initial camera placement overlooking hero plaza if already mounted
    if (controlsRef.current && !initializedRef.current) {
      controlsRef.current.setLookAt(
        HERO.cameraStart[0],
        HERO.cameraStart[1],
        HERO.cameraStart[2],
        HERO.cameraLookAt[0],
        HERO.cameraLookAt[1],
        HERO.cameraLookAt[2],
        false
      );
      initializedRef.current = true;
    }
  }, []);

  useFrame((state) => {
    if (!controlsRef.current) return;

    // Guaranteed fallback if controls weren't ready on mount:
    if (!initializedRef.current) {
      controlsRef.current.setLookAt(
        HERO.cameraStart[0],
        HERO.cameraStart[1],
        HERO.cameraStart[2],
        HERO.cameraLookAt[0],
        HERO.cameraLookAt[1],
        HERO.cameraLookAt[2],
        false
      );
      initializedRef.current = true;
    }

    const { cameraMode, activeSection, isSwinging, playerPosition } = useGameStore.getState();

    // ─── 1. DYNAMIC FOV SPEED PULSE ─────────────────────────────
    const targetFov = isSwinging ? SWING.FOV_SWING_MAX : SWING.FOV_REST;
    if (Math.abs(state.camera.fov - targetFov) > 0.05) {
      state.camera.fov = MathUtils.lerp(state.camera.fov, targetFov, 0.08);
      state.camera.updateProjectionMatrix();
    }

    // ─── 2. FREE-FALL CAMERA TRACKING ───────────────────────────
    if (cameraMode === CAMERA_MODE.FALL_CAM) {
      lastTargetKeyRef.current = 'falling';
      controlsRef.current.setLookAt(
        playerPosition[0] * 0.4,
        playerPosition[1] + 8,
        playerPosition[2] + 14,
        playerPosition[0],
        playerPosition[1],
        playerPosition[2],
        true
      );
      return;
    }

    // ─── 3. TARGET-BASED ORBIT CONTROLS ─────────────────────────
    let currentTargetKey = 'ground';
    if (cameraMode === CAMERA_MODE.FOLLOW_ROOFTOP && activeSection) {
      currentTargetKey = `rooftop_${activeSection}`;
    }

    // Only update camera lookAt when target has CHANGED, allowing free user orbit
    if (currentTargetKey !== lastTargetKeyRef.current) {
      lastTargetKeyRef.current = currentTargetKey;

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
      } else {
        // Return to ground overview
        controlsRef.current.setLookAt(
          HERO.cameraStart[0],
          HERO.cameraStart[1],
          HERO.cameraStart[2],
          HERO.cameraLookAt[0],
          HERO.cameraLookAt[1],
          HERO.cameraLookAt[2],
          true
        );
      }
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
