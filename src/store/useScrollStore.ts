import { create } from 'zustand';
import { clamp } from '../utils/clamp';

type ScrollState = {
  activeSectionIndex: number;
  overallProgress: number;
  sectionProgress: Record<number, number>;
  setActiveSectionIndex: (index: number) => void;
  setOverallProgress: (progress: number) => void;
  setSectionProgress: (index: number, progress: number) => void;
};

export const useScrollStore = create<ScrollState>((set) => ({
  activeSectionIndex: 0,
  overallProgress: 0,
  sectionProgress: {},
  setActiveSectionIndex: (index) => set({ activeSectionIndex: index }),
  setOverallProgress: (progress) => set({ overallProgress: clamp(progress, 0, 1) }),
  setSectionProgress: (index, progress) =>
    set((state) => ({
      sectionProgress: {
        ...state.sectionProgress,
        [index]: clamp(progress, 0, 1),
      },
    })),
}));
