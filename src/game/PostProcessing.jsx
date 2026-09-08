import { EffectComposer, Bloom, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { POST_PROCESSING } from '../config/constants.js';

export default function PostProcessing() {
  return (
    <EffectComposer multisampling={4}>
      <Bloom
        luminanceThreshold={POST_PROCESSING.BLOOM_THRESHOLD}
        luminanceSmoothing={POST_PROCESSING.BLOOM_SMOOTHING}
        intensity={POST_PROCESSING.BLOOM_INTENSITY}
        mipmapBlur
      />
      <Vignette
        offset={POST_PROCESSING.VIGNETTE_OFFSET}
        darkness={POST_PROCESSING.VIGNETTE_DARKNESS}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration
        offset={POST_PROCESSING.CHROMATIC_OFFSET}
        radialModulation
        modulationOffset={0.5}
      />
    </EffectComposer>
  );
}
