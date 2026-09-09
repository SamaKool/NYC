import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Vector3, CatmullRomCurve3 } from 'three';
import gsap from 'gsap';
import { useGameStore } from '../../store/gameStore.js';
import { GAME_STATE, HERO } from '../../config/constants.js';

export default function IntroSequence() {
  const { camera } = useThree();
  const gameState = useGameStore((s) => s.gameState);
  const viewMode = useGameStore((s) => s.viewMode);
  const timelineRef = useRef(null);
  const animStateRef = useRef({ t: 0 });

  // Camera flight path curve (High aerial overview -> Mid skyline swoop -> Plaza landing)
  const cameraPath = useRef(
    new CatmullRomCurve3([
      new Vector3(70, 95, 80),   // High aerial start
      new Vector3(35, 50, 45),   // Mid skyline glide
      new Vector3(10, 20, 25),   // Swooping down towards central plaza
      new Vector3(0, 6, 18),     // Ground approach
    ])
  );

  const lookAtPath = useRef(
    new CatmullRomCurve3([
      new Vector3(0, 30, 0),     // Looking at tall tower summits
      new Vector3(0, 15, -10),   // Scanning mid skyline
      new Vector3(0, 4, 0),      // Pitching down to hero plaza
      new Vector3(0, 2, 0),      // Sinking gaze right at Spider-Man
    ])
  );

  useEffect(() => {
    if (gameState !== GAME_STATE.INTRO) return;

    animStateRef.current.t = 0;

    const tl = gsap.timeline({
      onComplete: () => {
        useGameStore.getState().endIntro();
      },
    });

    tl.to(animStateRef.current, {
      t: 1,
      duration: 4.2,
      ease: 'power2.inOut',
    });

    timelineRef.current = tl;

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [gameState]);

  // Clean up if intro is skipped
  useEffect(() => {
    if (gameState !== GAME_STATE.INTRO && timelineRef.current) {
      timelineRef.current.kill();
    }
  }, [gameState]);

  useFrame(() => {
    if (gameState !== GAME_STATE.INTRO) return;

    const t = animStateRef.current.t;
    const camPos = cameraPath.current.getPoint(t);
    const lookPos = lookAtPath.current.getPoint(t);

    camera.position.copy(camPos);
    camera.lookAt(lookPos);
  });

  return null;
}

