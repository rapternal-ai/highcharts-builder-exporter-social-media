import { create } from 'zustand';
import type { BuilderState, ChartMode, ParsedDataset, SeriesMapping, ChartPreset } from '../types';

interface BuilderStore extends BuilderState {
  setMode: (mode: ChartMode) => void;
  setDataset: (dataset: ParsedDataset | undefined) => void;
  setMapping: (mapping: SeriesMapping) => void;
  setPreset: (preset: ChartPreset) => void;
  setThemeId: (themeId: string) => void;
  setGeneratedOptions: (options: Record<string, unknown>) => void;
  setChartDimensions: (dimensions: { width: number; height: number }) => void;
  setSubtitle: (subtitle: string) => void;
  setSource: (source: string) => void;
  clearDataset: () => void;
  reset: () => void;
}

const initialState: BuilderState = {
  mode: 'standard',
  mapping: {},
  chartDimensions: { width: 1000, height: 600 },
};

export const useBuilderStore = create<BuilderStore>((set) => ({
  ...initialState,

  setMode: (mode) => set({ mode }),
  setDataset: (dataset) => set({ dataset }),
  setMapping: (mapping) => set({ mapping }),
  setPreset: (preset) => set({ preset }),
  setThemeId: (themeId) => set({ themeId }),
  setGeneratedOptions: (generatedOptions) => set({ generatedOptions }),
  setChartDimensions: (chartDimensions) => set({ chartDimensions }),
  setSubtitle: (subtitle) => set({ subtitle }),
  setSource: (source) => set({ source }),
  clearDataset: () => set({ dataset: undefined, mapping: {} }),
  reset: () => set(initialState),
}));
