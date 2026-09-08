import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { CameraControls } from '@react-three/drei';
import { MathUtils } from 'three';
import { useGameStore } from '../../store/gameStore.js';
import { CAMERA_MODE, HERO, TOWERS, SWING } from '../../config/constants.js';

export default function CameraController() {
  const controlsRef = useRef();
  const initializedRef = useRef(false);
  const lastTargetKeyRef = useRef('');
  const viewMode = useGameStore((s) => s.viewMode);
  const { gl } = useThree();

  // ─── FIRST-PERSON (POV) INTERACTION STATE ─────────────────────
  const isDraggingRef = useRef(false);
  const prevPointerRef = useRef({ x: 0, y: 0 });
  const yawRef = useRef(0);
  const pitchRef = useRef(0);
  const targetYawRef = useRef(0);
  const targetPitchRef = useRef(0);
  const fovRef = useRef(60);

  // ─── POINTER & WHEEL LISTENERS FOR FPV LOOK-AROUND ────────────
  useEffect(() => {
    const domElement = gl.domElement;
    if (!domElement) return;

    const onPointerDown = (e) => {
      if (useGameStore.getState().viewMode !== 'pov') return;
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDraggingRef.current = true;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (!isDraggingRef.current || useGameStore.getState().viewMode !== 'pov') return;
      const dx = e.clientX - prevPointerRef.current.x;
      const dy = e.clientY - prevPointerRef.current.y;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };

      const sensitivity = 0.003;
      targetYawRef.current -= dx * sensitivity;
      targetPitchRef.current -= dy * sensitivity;

      // Allow looking fully straight up into the sky and straight down at the ground
      targetPitchRef.current = MathUtils.clamp(
        targetPitchRef.current,
        -Math.PI / 2 + 0.02,
        Math.PI / 2 - 0.02
      );
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e) => {
      if (useGameStore.getState().viewMode !== 'pov') return;
      // Wheel up (negative) zooms in, wheel down (positive) zooms out
      // Clamp between 30 (zoomed in) and 60 (average eye view - cannot zoom out past this!)
      fovRef.current = MathUtils.clamp(fovRef.current + e.deltaY * 0.04, 30, 60);
    };

    domElement.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);
    };
  }, [gl]);

  // Initial third-person camera placement
  useEffect(() => {
    if (controlsRef.current && !initializedRef.current && viewMode === 'third_person') {
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
  }, [viewMode]);

  useFrame((state) => {
    const { cameraMode, activeSection, isSwinging, playerPosition, gameState, swingTarget } = useGameStore.getState();

    // ─── 1. DYNAMIC FOV ZOOM & SPEED PULSE ───────────────────────
    const targetFov = isSwinging
      ? SWING.FOV_SWING_MAX
      : viewMode === 'pov'
      ? fovRef.current
      : SWING.FOV_REST;

    if (Math.abs(state.camera.fov - targetFov) > 0.05) {
      state.camera.fov = MathUtils.lerp(state.camera.fov, targetFov, 0.1);
      state.camera.updateProjectionMatrix();
    }

    // ─── 2. ACTIVE SWING CAMERA ─────────────────────────────────
    if (isSwinging) {
      lastTargetKeyRef.current = 'swinging';
      const targetId = swingTarget || activeSection;
      const targetTower = targetId && TOWERS[targetId] ? TOWERS[targetId] : null;

      if (viewMode === 'pov') {
        // First-Person: Camera locked to player's head, looking directly at the destination beacon orb
        state.camera.position.set(
          playerPosition[0],
          playerPosition[1] + 0.4,
          playerPosition[2]
        );
        
        let lookX = playerPosition[0];
        let lookY = playerPosition[1] + 0.3;
        let lookZ = playerPosition[2] - 12;
        
        if (targetTower) {
          lookX = targetTower.position[0];
          lookY = targetTower.height + 4; // Exact beacon orb coordinates
          lookZ = targetTower.position[2];
        }
        
        state.camera.lookAt(lookX, lookY, lookZ);
        
        targetYawRef.current = state.camera.rotation.y;
        targetPitchRef.current = state.camera.rotation.x;
        yawRef.current = state.camera.rotation.y;
        pitchRef.current = state.camera.rotation.x;
      } else if (controlsRef.current) {
        let lookX = playerPosition[0];
        let lookY = playerPosition[1] + 0.5;
        let lookZ = playerPosition[2] - 4;

        if (targetTower) {
          lookX = targetTower.position[0];
          lookY = targetTower.height + 4;
          lookZ = targetTower.position[2];
        }

        controlsRef.current.setLookAt(
          playerPosition[0] * 0.9,
          playerPosition[1] + 1.8,
          playerPosition[2] + 4.5,
          lookX,
          lookY,
          lookZ,
          false
        );
      }
      return;
    }

    // ─── 3. FREE-FALL DIVE CAMERA ───────────────────────────────
    if (cameraMode === CAMERA_MODE.FALL_CAM || gameState === 'falling') {
      lastTargetKeyRef.current = 'falling';
      if (viewMode === 'pov') {
        state.camera.position.set(
          playerPosition[0],
          playerPosition[1] + 0.2,
          playerPosition[2]
        );
        state.camera.lookAt(HERO.spawnPoint[0], 0.5, HERO.spawnPoint[2]);
        targetYawRef.current = state.camera.rotation.y;
        targetPitchRef.current = state.camera.rotation.x;
        yawRef.current = state.camera.rotation.y;
        pitchRef.current = state.camera.rotation.x;
      } else if (controlsRef.current) {
        controlsRef.current.setLookAt(
          playerPosition[0] * 0.8,
          playerPosition[1] + 4.5,
          playerPosition[2] + 5.5,
          playerPosition[0],
          playerPosition[1],
          playerPosition[2],
          false
        );
      }
      return;
    }

    // ─── 4. STATIC / IDLE TARGET TRANSITION ─────────────────────
    let currentTargetKey = `${viewMode}_ground`;
    if (cameraMode === CAMERA_MODE.FOLLOW_ROOFTOP && activeSection) {
      currentTargetKey = `${viewMode}_rooftop_${activeSection}`;
    }

    if (currentTargetKey !== lastTargetKeyRef.current) {
      const cameFromSwing = lastTargetKeyRef.current === 'swinging';
      lastTargetKeyRef.current = currentTargetKey;

      if (cameraMode === CAMERA_MODE.FOLLOW_ROOFTOP && activeSection && TOWERS[activeSection]) {
        const tower = TOWERS[activeSection];
        if (viewMode === 'pov') {
          // Orient inwards towards the center of the map [0, y, 0]
          targetYawRef.current = Math.atan2(tower.position[0], tower.position[2]);
          targetPitchRef.current = -0.05;
          if (!cameFromSwing) {
            yawRef.current = targetYawRef.current;
            pitchRef.current = targetPitchRef.current;
          }
        } else if (controlsRef.current) {
          const dirX = -tower.position[0];
          const dirZ = -tower.position[2];
          const len = Math.hypot(dirX, dirZ) || 1;
          const normX = dirX / len;
          const normZ = dirZ / len;

          controlsRef.current.setLookAt(
            tower.position[0] - normX * 4,
            tower.height + 2.5,
            tower.position[2] - normZ * 4,
            0,
            tower.height * 0.5,
            0,
            true
          );
        }
      } else {
        // Ground Plaza
        if (viewMode === 'pov') {
          targetYawRef.current = 0;
          targetPitchRef.current = 0.05;
          yawRef.current = targetYawRef.current;
          pitchRef.current = targetPitchRef.current;
        } else if (controlsRef.current) {
          controlsRef.current.setLookAt(
            HERO.spawnPoint[0],
            HERO.spawnPoint[1] + 1.8,
            HERO.spawnPoint[2] + 5.0,
            HERO.spawnPoint[0],
            HERO.spawnPoint[1] + 1.0,
            HERO.spawnPoint[2] - 4,
            true
          );
        }
      }
    }

    // ─── 5. FPV PER-FRAME HEAD ORIENTATION ──────────────────────
    if (viewMode === 'pov') {
      // Smooth head rotation lerp with angle wrapping to prevent 360 spins
      let diff = targetYawRef.current - yawRef.current;
      while (diff < -Math.PI) diff += Math.PI * 2;
      while (diff > Math.PI) diff -= Math.PI * 2;
      
      const lerpSpeed = isDraggingRef.current ? 0.3 : 0.12;
      yawRef.current += diff * lerpSpeed;
      pitchRef.current = MathUtils.lerp(pitchRef.current, targetPitchRef.current, lerpSpeed);

      let eyeX = playerPosition[0];
      let eyeY = playerPosition[1] + 0.6;
      let eyeZ = playerPosition[2];

      if (cameraMode === CAMERA_MODE.FOLLOW_ROOFTOP && activeSection && TOWERS[activeSection]) {
        const tower = TOWERS[activeSection];
        eyeX = tower.position[0];
        eyeY = tower.height + 1.8;
        eyeZ = tower.position[2];
      } else if (!activeSection) {
        eyeX = HERO.spawnPoint[0];
        eyeY = HERO.spawnPoint[1] + 0.6;
        eyeZ = HERO.spawnPoint[2];
      }

      // Camera position stays 100% stationary at eye level
      state.camera.position.set(eyeX, eyeY, eyeZ);

      // Rotate around the vertical Y axis (yaw) and horizontal X axis (pitch)
      state.camera.rotation.order = 'YXZ';
      state.camera.rotation.set(pitchRef.current, yawRef.current, 0);
    }
  });

  return (
    <CameraControls
      ref={controlsRef}
      enabled={viewMode === 'third_person'}
      smoothTime={0.25}
      minDistance={1.0}
      maxDistance={80}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
    />
  );
}
