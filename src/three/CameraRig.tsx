import { useFrame, useThree } from '@react-three/fiber';
import { useScrollStore } from '../store/useScrollStore';
import { lerp } from '../utils/lerp';

const SECTION_CAMERA_Z = [6, 5.2, 6.6, 4.8];

type CameraRigProps = {
  reducedMotion: boolean;
};

export function CameraRig({ reducedMotion }: CameraRigProps) {
  const camera = useThree((state) => state.camera);

  useFrame(() => {
    const { activeSectionIndex, overallProgress } = useScrollStore.getState();

    const targetZ = SECTION_CAMERA_Z[activeSectionIndex] ?? 6;
    const targetX = reducedMotion ? 0 : (overallProgress - 0.5) * 0.8;
    const targetY = reducedMotion ? 0 : Math.sin(overallProgress * Math.PI) * 0.35;

    camera.position.x = lerp(camera.position.x, targetX, 0.06);
    camera.position.y = lerp(camera.position.y, targetY, 0.06);
    camera.position.z = lerp(camera.position.z, targetZ, 0.06);

    camera.lookAt(0, 0, 0);
  });

  return null;
}