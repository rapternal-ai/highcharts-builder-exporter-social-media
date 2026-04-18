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
  title?: string;
  subtitle?: string;
  source?: string;
  // Advanced settings
  titleAlign?: 'left' | 'center' | 'right';
  subtitleAlign?: 'left' | 'center' | 'right';
  titleUseHTML?: boolean;
  showCaption?: boolean;
  captionText?: string;
  backgroundColor?: string;
  borderRadius?: number;
  spacingPreset?: 'tight' | 'normal' | 'spacious';
  invertedChart?: boolean;
  polar?: boolean;
  zoomType?: 'none' | 'x' | 'y' | 'xy';
  scrollablePlotArea?: boolean;
  showCredits?: boolean;
  xAxisTitle?: string;
  xAxisType?: 'category' | 'linear' | 'datetime' | 'logarithmic';
  xAxisLabelRotation?: number;
  xAxisLabelStep?: number;
  xAxisMin?: number;
  xAxisMax?: number;
  xAxisTickInterval?: number;
  xAxisShowGridlines?: boolean;
  xAxisShowAxisLine?: boolean;
  xAxisReverse?: boolean;
  xAxisStartOnTick?: boolean;
  xAxisEndOnTick?: boolean;
  xAxisDateFormat?: 'auto' | 'MMM YYYY' | 'MMM D, YYYY' | 'YYYY-MM-DD' | 'Q YYYY' | 'custom';
  yAxisTitle?: string;
  yAxisSecondaryEnabled?: boolean;
  yAxisSecondaryTitle?: string;
  yAxisMin?: number;
  yAxisMax?: number;
  yAxisSoftMin?: number;
  yAxisSoftMax?: number;
  yAxisTickInterval?: number;
  yAxisOpposite?: boolean;
  yAxisShowGridlines?: boolean;
  yAxisGridlineStyle?: 'solid' | 'dashed' | 'dotted';
  yAxisAllowDecimals?: boolean;
  yAxisValuePrefix?: string;
  yAxisValueSuffix?: string;
  yAxisNumberFormat?: 'plain' | 'currency' | 'percent' | 'thousands' | 'millions' | 'billions';
  seriesStacking?: 'none' | 'normal' | 'percent';
  seriesLineWidth?: number;
  seriesMarkerEnabled?: boolean;
  seriesMarkerSize?: number;
  seriesDashStyle?: 'Solid' | 'ShortDash' | 'Dot' | 'Dash' | 'LongDash';
  seriesFillOpacity?: number;
  seriesBorderWidth?: number;
  seriesPointPadding?: number;
  seriesGroupPadding?: number;
  seriesConnectNulls?: boolean;
  seriesAnimation?: boolean;
  seriesAnimationDuration?: number;
  seriesShowDataLabels?: boolean;
  seriesShowInLegend?: boolean;
  legendShow?: boolean;
  legendPosition?: 'top' | 'right' | 'bottom' | 'left';
  legendHorizontalAlign?: 'left' | 'center' | 'right';
  legendVerticalAlign?: 'top' | 'middle' | 'bottom';
  legendLayout?: 'horizontal' | 'vertical';
  legendFloating?: boolean;
  legendBackgroundColor?: string;
  legendBorder?: boolean;
  legendItemFontSize?: string;
  tooltipEnabled?: boolean;
  tooltipShared?: boolean;
  tooltipSplit?: boolean;
  tooltipUseHTML?: boolean;
  tooltipValueDecimals?: number;
  tooltipValuePrefix?: string;
  tooltipValueSuffix?: string;
  tooltipDateFormat?: 'auto' | 'MMM YYYY' | 'MMM D, YYYY' | 'YYYY-MM-DD' | 'Q YYYY' | 'custom';
  tooltipTemplateMode?: 'default' | 'compact' | 'detailed' | 'custom';
  tooltipBackgroundColor?: string;
  tooltipBorderRadius?: number;
  dataLabelsEnabled?: boolean;
  dataLabelPosition?: 'auto' | 'inside' | 'outside' | 'above';
  dataLabelFormat?: 'value' | 'percent' | 'category-value' | 'custom';
  axisLabelFontSize?: string;
  axisLabelColor?: string;
  labelOverflow?: 'wrap' | 'truncate' | 'rotate';
  rangeSelectorEnabled?: boolean;
  rangeSelectorButtons?: ('1m' | '3m' | '6m' | 'ytd' | '1y' | 'all')[];
};
