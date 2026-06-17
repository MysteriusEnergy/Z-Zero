import type { ReactNode } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { Experience } from '../three/Experience';
import { Nav } from './Nav';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  useScrollProgress();

  return (
    <>
      <div className="canvas-layer" aria-hidden="true">
        <Experience />
      </div>
      <div className="content-layer">
        <Nav />
        <main>{children}</main>
      </div>
    </>
  );
}
