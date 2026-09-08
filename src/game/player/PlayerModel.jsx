import { PLAYER } from '../../config/constants.js';

export default function PlayerModel() {
  return (
    <group>
      {/* Stylized Spider-Man capsule silhouette */}
      <mesh castShadow receiveShadow>
        <capsuleGeometry args={[PLAYER.RADIUS, PLAYER.HEIGHT - PLAYER.RADIUS * 2, 8, 16]} />
        <meshStandardMaterial
          color={PLAYER.COLOR}
          roughness={0.4}
          metalness={0.3}
        />
      </mesh>

      {/* Spider eyes mask visor glow */}
      <mesh position={[0, 0.45, 0.28]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.1, 0.1]} />
        <meshBasicMaterial color={0xffffff} toneMapped={false} />
      </mesh>
    </group>
  );
}
