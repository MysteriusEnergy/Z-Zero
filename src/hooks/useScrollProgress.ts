import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScrollStore } from '../store/useScrollStore';
import { clamp } from '../utils/clamp';

export function useScrollProgress() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const sections = gsap.utils.toArray<HTMLElement>('[data-section]');
    if (sections.length === 0) return undefined;

    const updateOverallProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      useScrollStore.getState().setOverallProgress(clamp(progress, 0, 1));
    };

    const triggers = sections.map((section, index) =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => useScrollStore.getState().setActiveSectionIndex(index),
        onEnterBack: () => useScrollStore.getState().setActiveSectionIndex(index),
        onUpdate: (self) => {
          useScrollStore.getState().setSectionProgress(index, self.progress);
          updateOverallProgress();
        },
      }),
    );

    updateOverallProgress();
    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);
}
