import type { ChartPreset, ChartMode } from '../types';

export interface PresetDefinition {
  id: ChartPreset;
  name: string;
  description: string;
  icon: string;
  mode: ChartMode;
  category: 'basic' | 'advanced' | 'financial';
  requiredFields: string[];
  optionalFields: string[];
  supportsMultiSeries: boolean;
  highchartsType: string;
  stockChart?: boolean;
}

export const CHART_PRESETS: PresetDefinition[] = [
  // Standard Chart Presets
  {
    id: 'line',
    name: 'Line Chart',
    description: 'Connect data points with lines to show trends over time',
    icon: '📈',
    mode: 'standard',
    category: 'basic',
    requiredFields: ['yFields'],
    optionalFields: ['xField', 'groupField', 'labelField'],
    supportsMultiSeries: true,
    highchartsType: 'line'
  },
  {
    id: 'area',
    name: 'Area Chart',
    description: 'Filled area under the line to emphasize volume',
    icon: '🏔️',
    mode: 'standard',
    category: 'basic',
    requiredFields: ['yFields'],
    optionalFields: ['xField', 'groupField', 'labelField'],
    supportsMultiSeries: true,
    highchartsType: 'area'
  },
  {
    id: 'column',
    name: 'Column Chart',
    description: 'Vertical bars to compare values across categories',
    icon: '📊',
    mode: 'standard',
    category: 'basic',
    requiredFields: ['yFields'],
    optionalFields: ['xField', 'groupField', 'labelField'],
    supportsMultiSeries: true,
    highchartsType: 'column'
  },
  {
    id: 'bar',
    name: 'Bar Chart',
    description: 'Horizontal bars for comparing categories',
    icon: '📋',
    mode: 'standard',
    category: 'basic',
    requiredFields: ['yFields'],
    optionalFields: ['xField', 'groupField', 'labelField'],
    supportsMultiSeries: true,
    highchartsType: 'bar'
  },
  {
    id: 'pie',
    name: 'Pie Chart',
    description: 'Show proportions of a whole with circular slices',
    icon: '🥧',
    mode: 'standard',
    category: 'basic',
    requiredFields: ['yFields'],
    optionalFields: ['xField', 'labelField'],
    supportsMultiSeries: false,
    highchartsType: 'pie'
  },
  {
    id: 'scatter',
    name: 'Scatter Plot',
    description: 'Plot individual data points to show correlations',
    icon: '🔵',
    mode: 'standard',
    category: 'basic',
    requiredFields: ['yFields'],
    optionalFields: ['xField', 'groupField', 'labelField'],
    supportsMultiSeries: true,
    highchartsType: 'scatter'
  },
  {
    id: 'stackedColumn',
    name: 'Stacked Column',
    description: 'Stack multiple series in vertical columns',
    icon: '📚',
    mode: 'standard',
    category: 'advanced',
    requiredFields: ['yFields'],
    optionalFields: ['xField', 'groupField', 'labelField'],
    supportsMultiSeries: true,
    highchartsType: 'column'
  },
  {
    id: 'groupedColumn',
    name: 'Grouped Column',
    description: 'Group multiple series side by side',
    icon: '📊',
    mode: 'standard',
    category: 'advanced',
    requiredFields: ['yFields'],
    optionalFields: ['xField', 'groupField', 'labelField'],
    supportsMultiSeries: true,
    highchartsType: 'column'
  },

  // Stock Chart Presets
  {
    id: 'stockLine',
    name: 'Stock Line',
    description: 'Simple line chart with stock timeline features',
    icon: '📈',
    mode: 'stock',
    category: 'financial',
    requiredFields: ['dateField', 'yFields'],
    optionalFields: ['groupField', 'labelField'],
    supportsMultiSeries: false,
    highchartsType: 'line',
    stockChart: true
  },
  {
    id: 'stockArea',
    name: 'Stock Area',
    description: 'Area chart with stock timeline and navigation',
    icon: '🏔️',
    mode: 'stock',
    category: 'financial',
    requiredFields: ['dateField', 'yFields'],
    optionalFields: ['groupField', 'labelField'],
    supportsMultiSeries: false,
    highchartsType: 'area',
    stockChart: true
  },
  {
    id: 'ohlc',
    name: 'OHLC Chart',
    description: 'Open-High-Low-Close bars for financial data',
    icon: '📊',
    mode: 'stock',
    category: 'financial',
    requiredFields: ['dateField', 'openField', 'highField', 'lowField', 'closeField'],
    optionalFields: ['volumeField'],
    supportsMultiSeries: false,
    highchartsType: 'ohlc',
    stockChart: true
  },
  {
    id: 'candlestick',
    name: 'Candlestick',
    description: 'Japanese candlestick chart for price analysis',
    icon: '🕯️',
    mode: 'stock',
    category: 'financial',
    requiredFields: ['dateField', 'openField', 'highField', 'lowField', 'closeField'],
    optionalFields: ['volumeField'],
    supportsMultiSeries: false,
    highchartsType: 'candlestick',
    stockChart: true
  },
  {
    id: 'candlestickVolume',
    name: 'Candlestick + Volume',
    description: 'Candlestick chart with volume bars below',
    icon: '🕯️📊',
    mode: 'stock',
    category: 'financial',
    requiredFields: ['dateField', 'openField', 'highField', 'lowField', 'closeField', 'volumeField'],
    optionalFields: [],
    supportsMultiSeries: false,
    highchartsType: 'candlestick',
    stockChart: true
  }
];

export function getPresetsByMode(mode: ChartMode): PresetDefinition[] {
  return CHART_PRESETS.filter(preset => preset.mode === mode);
}

export function getPresetById(id: ChartPreset): PresetDefinition | undefined {
  return CHART_PRESETS.find(preset => preset.id === id);
}

export function getPresetsByCategory(category: 'basic' | 'advanced' | 'financial'): PresetDefinition[] {
  return CHART_PRESETS.filter(preset => preset.category === category);
}
