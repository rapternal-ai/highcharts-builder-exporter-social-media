export type ChartMode = "standard" | "stock";

export type ParsedDataset = {
  headers: string[];
  rows: Record<string, string | number | null>[];
  inferredTypes: Record<string, "string" | "number" | "date" | "boolean" | "unknown">;
  sourceFileName: string;
};

export type SeriesMapping = {
  xField?: string;
  yFields?: string[];
  groupField?: string;
  labelField?: string;
  tooltipFields?: string[];
  dateField?: string;
  openField?: string;
  highField?: string;
  lowField?: string;
  closeField?: string;
  volumeField?: string;
};

export type ChartPreset =
  | "line"
  | "area"
  | "column"
  | "bar"
  | "pie"
  | "scatter"
  | "stackedColumn"
  | "groupedColumn"
  | "stockLine"
  | "stockArea"
  | "ohlc"
  | "candlestick"
  | "candlestickVolume";

export type ChartTheme = {
  id: string;
  name: string;
  fontFamily: string;
  backgroundColor: string;
  titleStyle: Record<string, unknown>;
  subtitleStyle: Record<string, unknown>;
  axisLabelStyle: Record<string, unknown>;
  legendStyle: Record<string, unknown>;
  tooltipStyle: Record<string, unknown>;
  palette: string[];
  gridLineColor?: string;
  lineWidthDefaults?: {
    line?: number;
    area?: number;
    stock?: number;
  };
  exportDefaults?: {
    width: number;
    height: number;
    scale?: number;
  };
};

export type BuilderState = {
  mode: ChartMode;
  dataset?: ParsedDataset;
  mapping: SeriesMapping;
  preset?: ChartPreset;
  themeId?: string;
  generatedOptions?: Record<string, unknown>;
  chartDimensions?: { width: number; height: number };
  subtitle?: string;
};
