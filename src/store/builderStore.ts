import { create } from 'zustand';
import type { BuilderState, ChartMode, ParsedDataset, SeriesMapping, ChartPreset } from '../types';

interface BuilderStore extends BuilderState {
  setMode: (mode: ChartMode) => void;
  setDataset: (dataset: ParsedDataset) => void;
  setMapping: (mapping: SeriesMapping) => void;
  setPreset: (preset: ChartPreset) => void;
  setThemeId: (themeId: string) => void;
  setGeneratedOptions: (options: Record<string, unknown>) => void;
  reset: () => void;
}

const initialState: BuilderState = {
  mode: 'standard',
  mapping: {},
};

export const useBuilderStore = create<BuilderStore>((set) => ({
  ...initialState,
  
  setMode: (mode) => set({ mode }),
  setDataset: (dataset) => set({ dataset }),
  setMapping: (mapping) => set({ mapping }),
  setPreset: (preset) => set({ preset }),
  setThemeId: (themeId) => set({ themeId }),
  setGeneratedOptions: (generatedOptions) => set({ generatedOptions }),
  reset: () => set(initialState),
}));
