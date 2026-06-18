import { lazy, Suspense, type ReactNode } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { Nav } from './Nav';

const Experience = lazy(() =>
  import('../three/Experience').then((module) => ({ default: module.Experience })),
);

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  useScrollProgress();

  return (
    <>
      <div className="canvas-layer" aria-hidden="true">
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </div>
      <div className="content-layer">
        <Nav />
        <main>{children}</main>
      </div>
    </>
  );
}
