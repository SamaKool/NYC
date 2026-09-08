import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BACKGROUND_BUILDINGS } from '../../config/buildings.js';
import { COLORS } from '../../config/constants.js';

import vertexShader from './shaders/building.vert.glsl?raw';
import fragmentShader from './shaders/building.frag.glsl?raw';

export default function CityGrid() {
  const meshRef = useRef();
  const buildings = BACKGROUND_BUILDINGS;

  const { geometry, material } = useMemo(() => {
    const geo = new THREE.BoxGeometry(1, 1, 1);
    geo.translate(0, 0.5, 0); // Pivot at ground level

    const count = buildings.length;
    const instanceSeeds = new Float32Array(count);
    const instanceScales = new Float32Array(count * 3);

    buildings.forEach((b, i) => {
      instanceSeeds[i] = b.seed;
      instanceScales[i * 3 + 0] = b.scale[0];
      instanceScales[i * 3 + 1] = b.scale[1];
      instanceScales[i * 3 + 2] = b.scale[2];
    });

    geo.setAttribute('aInstanceSeed', new THREE.InstancedBufferAttribute(instanceSeeds, 1));
    geo.setAttribute('aInstanceScale', new THREE.InstancedBufferAttribute(instanceScales, 3));

    const mat = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uWallColor: { value: new THREE.Color(COLORS.WALL_DARK) },
        uNeonColor1: { value: new THREE.Color(COLORS.SPIDER_CYAN) },
        uNeonColor2: { value: new THREE.Color(COLORS.SPIDER_RED_NEON) },
        uWarmWindow: { value: new THREE.Color(COLORS.WARM_WINDOW).multiplyScalar(2.0) },
        uCoolWindow: { value: new THREE.Color(COLORS.COOL_WINDOW).multiplyScalar(1.8) },
      },
    });

    return { geometry: geo, material: mat };
  }, [buildings]);

  useEffect(() => {
    if (!meshRef.current) return;
    const dummy = new THREE.Object3D();
    buildings.forEach((b, i) => {
      dummy.position.set(b.position[0], 0, b.position[2]);
      dummy.scale.set(b.scale[0], b.scale[1], b.scale[2]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [buildings]);

  useFrame((state) => {
    if (meshRef.current?.material?.uniforms?.uTime) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, buildings.length]}
      receiveShadow
    />
  );
}
