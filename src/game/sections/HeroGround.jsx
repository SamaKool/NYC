import { Text } from '@react-three/drei';
import { HERO, COLORS } from '../../config/constants.js';

export default function HeroGround() {
  return (
    <group position={HERO.position}>
      {/* Central circular plaza platform */}
      <mesh position={[0, HERO.platformHeight / 2, 0]} receiveShadow>
        <cylinderGeometry args={[HERO.radius, HERO.radius, HERO.platformHeight, 48]} />
        <meshStandardMaterial color={0x0f172a} roughness={0.6} metalness={0.4} />
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

      {/* 3D Welcome Typography above plaza */}
      <group position={[0, 4.5, -4]}>
        <Text
          fontSize={1.4}
          color="#00f0ff"
          font="https://fonts.gstatic.com/s/orbitron/v31/yMJRMIlzdpvBhQQL_Qq7dy22.woff2"
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
