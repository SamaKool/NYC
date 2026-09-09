import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore.js';
import { SWING, COLORS } from '../../config/constants.js';

const COUNT = SWING.TRAIL_PARTICLE_COUNT || 50;
const LIFETIME = SWING.TRAIL_LIFETIME || 0.45;
const DUMMY = new THREE.Object3D();
const ZERO_MATRIX = new THREE.Matrix4().makeScale(0, 0, 0);

export default function SwingTrail() {
  const meshRef = useRef();
  const poolIndexRef = useRef(0);
  const lastSpawnRef = useRef(0);

  // Pre-allocated pool of particles
  const particles = useMemo(() => {
    return Array.from({ length: COUNT }, () => ({
      x: 0,
      y: 0,
      z: 0,
      spawnTime: -1,
      active: false,
    }));
  }, []);

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(0.2, 8, 8), []);
  const trailMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: COLORS.SPIDER_CYAN,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const { isSwinging, playerPosition } = useGameStore.getState();
    const now = state.clock.getElapsedTime();

    // Spawn particle during swing every ~25ms
    if (isSwinging && now - lastSpawnRef.current > 0.025) {
      lastSpawnRef.current = now;
      const p = particles[poolIndexRef.current];
      // Offset slightly to Spider-Man's torso/feet
      p.x = playerPosition[0] + (Math.random() - 0.5) * 0.15;
      p.y = playerPosition[1] + 0.3 + (Math.random() - 0.5) * 0.15;
      p.z = playerPosition[2] + (Math.random() - 0.5) * 0.15;
      p.spawnTime = now;
      p.active = true;

      poolIndexRef.current = (poolIndexRef.current + 1) % COUNT;
    }

    let needsUpdate = false;

    // Update particles in the instanced mesh
    for (let i = 0; i < COUNT; i++) {
      const p = particles[i];
      if (!p.active) continue;

      const age = now - p.spawnTime;
      if (age < LIFETIME) {
        const progress = age / LIFETIME; // 0 -> 1
        const scale = (1 - progress) * 1.2;

        DUMMY.position.set(p.x, p.y, p.z);
        DUMMY.scale.set(scale, scale, scale);
        DUMMY.updateMatrix();

        meshRef.current.setMatrixAt(i, DUMMY.matrix);
        needsUpdate = true;
      } else {
        p.active = false;
        meshRef.current.setMatrixAt(i, ZERO_MATRIX);
        needsUpdate = true;
      }
    }

    if (needsUpdate) {
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[sphereGeo, trailMat, COUNT]}
      frustumCulled={false}
    />
  );
}

