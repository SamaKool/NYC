import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import PlayerModel from './PlayerModel.jsx';
import WebLine from './WebLine.jsx';
import { useGameStore } from '../../store/gameStore.js';
import { computeSwingPath, getSwingState } from '../swing/swingMath.js';
import { SWING, HERO } from '../../config/constants.js';

export default function PlayerController() {
  const groupRef = useRef();
  const [anchorPoint, setAnchorPoint] = useState(null);
  const activePathRef = useRef(null);
  const progressRef = useRef({ t: 0 });

  const playerPosition = useGameStore((s) => s.playerPosition);
  const swingTarget = useGameStore((s) => s.swingTarget);
  const gameState = useGameStore((s) => s.gameState);
  const viewMode = useGameStore((s) => s.viewMode);

  // ─── SWING ANIMATION ──────────────────────────────────────────
  useGSAP(() => {
    if (!swingTarget || !groupRef.current) return;

    const startPos = new Vector3(...useGameStore.getState().playerPosition);
    const pathData = computeSwingPath(startPos, swingTarget);
    if (!pathData) return;

    activePathRef.current = pathData.curve;
    setAnchorPoint(pathData.anchorPoint);
    progressRef.current.t = 0;

    const tl = gsap.timeline({
      onComplete: () => {
        setAnchorPoint(null);
        activePathRef.current = null;
        
        if (pathData.crawlTarget) {
          // Trigger Wall Crawl Animation
          const ledgePos = new Vector3(pathData.landingPos.x, pathData.crawlTarget.y, pathData.landingPos.z);
          const crawlPos = { ...pathData.landingPos };
          
          const crawlTl = gsap.timeline({
            onUpdate: () => {
               useGameStore.getState().updatePlayerPosition([crawlPos.x, crawlPos.y, crawlPos.z]);
               if (groupRef.current) {
                  groupRef.current.position.set(crawlPos.x, crawlPos.y, crawlPos.z);
                  // Look at the center of the tower while crawling up
                  groupRef.current.lookAt(pathData.crawlTarget.x, groupRef.current.position.y, pathData.crawlTarget.z);
                  
                  // Tilt to simulate climbing vertically in 3rd person
                  if (crawlPos.y < pathData.crawlTarget.y - 0.1) {
                      groupRef.current.rotation.x = -Math.PI / 4; 
                  } else {
                      groupRef.current.rotation.x = 0;
                  }
               }
            },
            onComplete: () => {
               useGameStore.getState().endSwing();
               setTimeout(() => {
                 useGameStore.getState().openPanel();
               }, 300);
            }
          });

          // Step 1: crawl up to ledge
          crawlTl.to(crawlPos, {
            x: ledgePos.x,
            y: ledgePos.y,
            z: ledgePos.z,
            duration: 0.5,
            ease: 'power2.out'
          });
          
          // Step 2: hop over ledge to center
          crawlTl.to(crawlPos, {
            x: pathData.crawlTarget.x,
            y: pathData.crawlTarget.y,
            z: pathData.crawlTarget.z,
            duration: 0.3,
            ease: 'power1.out'
          });
          
        } else {
          useGameStore.getState().endSwing();
          setTimeout(() => {
            useGameStore.getState().openPanel();
          }, 300);
        }
      }
    });

    tl.to(progressRef.current, {
      t: 1,
      duration: SWING.DURATION,
      ease: SWING.EASE,
      onUpdate: () => {
        if (!activePathRef.current) return;
        const { position, tangent } = getSwingState(activePathRef.current, progressRef.current.t);
        useGameStore.getState().updatePlayerPosition([position.x, position.y, position.z]);
        
        if (groupRef.current) {
          groupRef.current.position.copy(position);
          // Orient towards swing path tangent
          const lookTarget = position.clone().add(tangent);
          groupRef.current.lookAt(lookTarget);
        }
      }
    });
  }, [swingTarget]);

  // ─── FREE-FALL & LANDING ANIMATION ────────────────────────────
  useGSAP(() => {
    if (gameState !== 'falling' || !groupRef.current) return;

    const currentPos = [...useGameStore.getState().playerPosition];
    const targetPos = [...HERO.spawnPoint];
    const fallProgress = { t: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        // Trigger superhero landing impact
        useGameStore.getState().land();

        // Squash & stretch impact bounce on player model
        if (groupRef.current) {
          gsap.fromTo(
            groupRef.current.scale,
            { x: 1.4, y: 0.55, z: 1.4 },
            { x: 1.0, y: 1.0, z: 1.0, duration: 0.45, ease: 'elastic.out(1, 0.4)' }
          );
        }
      }
    });

    tl.to(fallProgress, {
      t: 1,
      duration: 1.4,
      ease: 'power2.in',
      onUpdate: () => {
        const t = fallProgress.t;
        // Parabolic freefall coordinates
        const x = currentPos[0] + (targetPos[0] - currentPos[0]) * t;
        const z = currentPos[2] + (targetPos[2] - currentPos[2]) * t;
        // Natural gravity drop curve
        const y = currentPos[1] + (targetPos[1] - currentPos[1]) * (t * t);

        useGameStore.getState().updatePlayerPosition([x, y, z]);

        if (groupRef.current) {
          groupRef.current.position.set(x, y, z);
          // Slight dive angle during fall, leveling upright near touchdown
          groupRef.current.rotation.x = Math.sin(t * Math.PI) * 0.35;
          groupRef.current.rotation.y = Math.PI; // Face camera
        }
      }
    });
  }, [gameState]);

  useFrame(() => {
    // Keep visual position in sync if idle
    const isSwinging = useGameStore.getState().isSwinging;
    const currentGameState = useGameStore.getState().gameState;
    if (!isSwinging && currentGameState !== 'falling' && groupRef.current) {
      groupRef.current.position.set(...playerPosition);
      groupRef.current.rotation.set(0, 0, 0);
    }
  });

  return (
    <>
      <group ref={groupRef} position={playerPosition} visible={viewMode === 'third_person'}>
        <PlayerModel />
      </group>
      <WebLine anchorPoint={anchorPoint} />
    </>
  );
}
