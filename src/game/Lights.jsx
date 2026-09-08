import { LIGHTING } from '../config/constants.js';

export default function Lights() {
  return (
    <>
      <ambientLight intensity={LIGHTING.AMBIENT_INTENSITY} color={LIGHTING.AMBIENT_COLOR} />
      <hemisphereLight
        args={[LIGHTING.HEMISPHERE_SKY, LIGHTING.HEMISPHERE_GROUND, LIGHTING.HEMISPHERE_INTENSITY]}
      />
      <directionalLight
        position={LIGHTING.MOON_POSITION}
        intensity={LIGHTING.MOON_INTENSITY}
        color={LIGHTING.MOON_COLOR}
        castShadow
        shadow-mapSize-width={LIGHTING.MOON_SHADOW_MAP_SIZE}
        shadow-mapSize-height={LIGHTING.MOON_SHADOW_MAP_SIZE}
        shadow-camera-near={10}
        shadow-camera-far={400}
        shadow-camera-top={120}
        shadow-camera-bottom={-120}
        shadow-camera-left={-120}
        shadow-camera-right={120}
      />
    </>
  );
}
