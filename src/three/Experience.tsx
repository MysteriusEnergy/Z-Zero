import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { CameraRig } from './CameraRig';
import { ParticleField } from './ParticleField';
import { PostEffects } from './PostEffects';

export function Experience() {
  const reducedMotion = useReducedMotion();

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
      <color attach="background" args={['#0b0e14']} />
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.5} />
      <CameraRig reducedMotion={reducedMotion} />
      <ParticleField reducedMotion={reducedMotion} />
      {!reducedMotion ? <PostEffects /> : null}
    </Canvas>
  );
}
