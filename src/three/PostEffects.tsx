import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';

export function PostEffects() {
  return (
    <EffectComposer>
      <Bloom intensity={0.55} luminanceThreshold={0.2} luminanceSmoothing={0.8} mipmapBlur />
      <Vignette darkness={0.45} eskil={false} offset={0.25} />
    </EffectComposer>
  );
}
