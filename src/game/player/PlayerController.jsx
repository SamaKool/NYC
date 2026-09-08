import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import PlayerModel from './PlayerModel.jsx';
import WebLine from './WebLine.jsx';
import { useGameStore } from '../../store/gameStore.js';
import { computeSwingPath, getSwingState } from '../swing/swingMath.js';
import { SWING } from '../../config/constants.js';

export default function PlayerController() {
  const groupRef = useRef();
  const [anchorPoint, setAnchorPoint] = useState(null);
  const activePathRef = useRef(null);
  const progressRef = useRef({ t: 0 });

  const playerPosition = useGameStore((s) => s.playerPosition);
  const swingTarget = useGameStore((s) => s.swingTarget);

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
        useGameStore.getState().endSwing();
        setTimeout(() => {
          useGameStore.getState().openPanel();
        }, 300);
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

  useFrame(() => {
    // Keep visual position in sync if not swinging
    if (!useGameStore.getState().isSwinging && groupRef.current) {
      groupRef.current.position.set(...playerPosition);
    }
  });

  return (
    <>
      <group ref={groupRef} position={playerPosition}>
        <PlayerModel />
      </group>
      <WebLine anchorPoint={anchorPoint} />
    </>
  );
}
