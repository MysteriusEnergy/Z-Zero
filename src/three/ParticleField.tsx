import { useMemo, useRef, type ElementRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color } from 'three';
import { useScrollStore } from '../store/useScrollStore';
import { formationGenerators } from './formations';
import particleVertexShader from './shaders/particles.vert.glsl?raw';
import particleFragmentShader from './shaders/particles.frag.glsl?raw';

const DESKTOP_PARTICLE_COUNT = 1400;
const MOBILE_PARTICLE_COUNT = 850;
const MOBILE_BREAKPOINT = 720;

function getParticleCount() {
  if (window.innerWidth < MOBILE_BREAKPOINT) {
    return MOBILE_PARTICLE_COUNT;
  }

  return DESKTOP_PARTICLE_COUNT;
}

type PositionAttribute = {
  array: Float32Array;
  needsUpdate: boolean;
};

type ParticleAttributes = Record<string, PositionAttribute>;

type ParticleFieldProps = {
  reducedMotion: boolean;
};

export function ParticleField({ reducedMotion }: ParticleFieldProps) {
  const pointsRef = useRef<ElementRef<'points'>>(null);
  const targetFormationIndexRef = useRef(0);
  const particleCount = useMemo(() => getParticleCount(), []);
  const particleSize = particleCount === MOBILE_PARTICLE_COUNT ? 34 : 42;

  const formations = useMemo(
    () => formationGenerators.map((createFormation) => createFormation(particleCount)),
    [particleCount],
  );

  const positions = useMemo(() => formations[0].slice(), [formations]);
  const targetPositions = useMemo(() => formations[0].slice(), [formations]);

  const uniforms = useMemo(
    () => ({
      uSize: { value: particleSize },
      uColorA: { value: new Color('#ff6b4a') },
      uColorB: { value: new Color('#4ade9c') },
      uAccentMix: { value: 0 },
      uTime: { value: 0 },
      uDriftStrength: { value: 0.08 },
      uMix: { value: 0 },
    }),
    [particleSize],
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) return;

    uniforms.uTime.value += delta;

    const { activeSectionIndex } = useScrollStore.getState();
    const targetAccentMix = [0.1, 0.45, 0.8, 0.35][activeSectionIndex] ?? 0.1;

    uniforms.uAccentMix.value +=
      (targetAccentMix - uniforms.uAccentMix.value) * Math.min(delta * 2.5, 1);

    const targetDriftStrength = reducedMotion ? 0 : 0.08;

    uniforms.uDriftStrength.value +=
      (targetDriftStrength - uniforms.uDriftStrength.value) * Math.min(delta * 3, 1);

    const attributes = pointsRef.current.geometry.attributes as unknown as ParticleAttributes;
    const fromAttribute = attributes.position;
    const toAttribute = attributes.aTo;
    const fromPositions = fromAttribute.array;
    const toPositions = toAttribute.array;

    if (activeSectionIndex !== targetFormationIndexRef.current) {
      const currentMix = uniforms.uMix.value;
      const nextTargetPositions = formations[activeSectionIndex] ?? formations[0];

      for (let i = 0; i < fromPositions.length; i += 1) {
        fromPositions[i] += (toPositions[i] - fromPositions[i]) * currentMix;
      }

      toPositions.set(nextTargetPositions);
      uniforms.uMix.value = 0;
      targetFormationIndexRef.current = activeSectionIndex;
      fromAttribute.needsUpdate = true;
      toAttribute.needsUpdate = true;
    }

    uniforms.uMix.value = Math.min(uniforms.uMix.value + delta * 1.6, 1);

    if (uniforms.uMix.value === 1) {
      fromPositions.set(toPositions);
      uniforms.uMix.value = 0;
      fromAttribute.needsUpdate = true;
    }

    pointsRef.current.rotation.y += delta * 0.025;
    pointsRef.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aTo"
          args={[targetPositions, 3]}
          count={targetPositions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </points>
  );
}
