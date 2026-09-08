import { useRef } from 'react';
import { Text } from '@react-three/drei';
import { AdditiveBlending } from 'three';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { HERO, COLORS } from '../../config/constants.js';
import { useGameStore } from '../../store/gameStore.js';

export default function HeroGround() {
  const jumpOff = useGameStore((s) => s.jumpOff);
  const landingImpact = useGameStore((s) => s.landingImpact);

  const shockwaveRef = useRef();
  const materialRef = useRef();

  useGSAP(() => {
    if (!landingImpact || !shockwaveRef.current || !materialRef.current) return;

    gsap.fromTo(
      shockwaveRef.current.scale,
      { x: 0.2, y: 0.2, z: 0.2 },
      { x: 8.5, y: 8.5, z: 8.5, duration: 0.75, ease: 'power2.out' }
    );

    gsap.fromTo(
      materialRef.current,
      { opacity: 0.95 },
      { opacity: 0, duration: 0.75, ease: 'power2.out' }
    );
  }, [landingImpact]);

  return (
    <group position={HERO.position}>
      {/* Central circular plaza platform - clickable to return to ground */}
      <mesh
        position={[0, HERO.platformHeight / 2, 0]}
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          jumpOff();
        }}
        onPointerOver={(e) => {
          if (useGameStore.getState().activeSection) {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <cylinderGeometry args={[HERO.radius, HERO.radius, HERO.platformHeight, 48]} />
        <meshStandardMaterial color={COLORS.PLAZA_FLOOR} roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Cyberpunk neon ring around hero platform */}
      <mesh position={[0, HERO.platformHeight + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[HERO.radius - 0.4, HERO.radius, 48]} />
        <meshBasicMaterial color={COLORS.SPIDER_CYAN} toneMapped={false} />
      </mesh>

      {/* Spider-red inner accent ring */}
      <mesh position={[0, HERO.platformHeight + 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[HERO.radius - 3.2, HERO.radius - 3.0, 48]} />
        <meshBasicMaterial color={COLORS.SPIDER_RED_NEON} toneMapped={false} />
      </mesh>

      {/* Superhero Landing Expanding Shockwave Ring */}
      <mesh
        ref={shockwaveRef}
        position={[HERO.spawnPoint[0], HERO.platformHeight + 0.04, HERO.spawnPoint[2]]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[0.001, 0.001, 0.001]}
      >
        <ringGeometry args={[1.2, 1.45, 48]} />
        <meshBasicMaterial
          ref={materialRef}
          color={COLORS.SPIDER_CYAN}
          transparent
          opacity={0}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* 3D Welcome Typography above plaza */}
      <group position={[0, 4.5, -4]}>
        <Text
          fontSize={1.4}
          color="#00f0ff"
          anchorX="center"
          anchorY="middle"
        >
          SPIDER-MAN // OPEN-WORLD
        </Text>
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          SELECT A SKYSCRAPER BEACON TO SWING
        </Text>
      </group>
    </group>
  );
}
