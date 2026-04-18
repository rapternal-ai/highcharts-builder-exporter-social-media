import type { ParsedDataset, SeriesMapping, ChartPreset } from '../../types';
import { getPresetById } from '../../data/presetLibrary';
import { getThemeById } from '../../data/themeLibrary';

// Helper function to parse MM/DD/YYYY format
function parseDate(dateString: string): number {
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const month = parseInt(parts[0], 10) - 1; // JS months are 0-indexed
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day).getTime();
  }
  // Fallback to standard parsing
  return new Date(dateString).getTime();
}

export function generateHighchartsOptions(
  dataset: ParsedDataset,
  mapping: SeriesMapping,
  preset: ChartPreset,
  themeId?: string,
  chartDimensions?: { width: number; height: number },
  title?: string,
  subtitle?: string,
  source?: string,
  // Advanced settings
  titleAlign?: 'left' | 'center' | 'right',
  subtitleAlign?: 'left' | 'center' | 'right',
  titleUseHTML?: boolean,
  showCaption?: boolean,
  captionText?: string,
  backgroundColor?: string,
  borderRadius?: number,
  spacingPreset?: 'tight' | 'normal' | 'spacious',
  invertedChart?: boolean,
  polar?: boolean,
  zoomType?: 'none' | 'x' | 'y' | 'xy',
  scrollablePlotArea?: boolean,
  showCredits?: boolean,
  xAxisTitle?: string,
  xAxisType?: 'category' | 'linear' | 'datetime' | 'logarithmic',
  xAxisLabelRotation?: number,
  xAxisLabelStep?: number,
  xAxisMin?: number,
  xAxisMax?: number,
  xAxisTickInterval?: number,
  xAxisShowGridlines?: boolean,
  xAxisShowAxisLine?: boolean,
  xAxisReverse?: boolean,
  xAxisStartOnTick?: boolean,
  xAxisEndOnTick?: boolean,
  yAxisTitle?: string,
  yAxisSecondaryEnabled?: boolean,
  yAxisSecondaryTitle?: string,
  yAxisMin?: number,
  yAxisMax?: number,
  yAxisSoftMin?: number,
  yAxisSoftMax?: number,
  yAxisTickInterval?: number,
  yAxisOpposite?: boolean,
  yAxisShowGridlines?: boolean,
  yAxisGridlineStyle?: 'solid' | 'dashed' | 'dotted',
  yAxisAllowDecimals?: boolean,
  yAxisValuePrefix?: string,
  yAxisValueSuffix?: string,
  yAxisNumberFormat?: 'plain' | 'currency' | 'percent' | 'thousands' | 'millions' | 'billions',
  seriesStacking?: 'none' | 'normal' | 'percent',
  seriesLineWidth?: number,
  seriesMarkerEnabled?: boolean,
  seriesMarkerSize?: number,
  seriesDashStyle?: 'Solid' | 'ShortDash' | 'Dot' | 'Dash' | 'LongDash',
  seriesFillOpacity?: number,
  seriesBorderWidth?: number,
  seriesPointPadding?: number,
  seriesGroupPadding?: number,
  seriesConnectNulls?: boolean,
  seriesAnimation?: boolean,
  seriesAnimationDuration?: number,
  seriesShowDataLabels?: boolean,
  seriesShowInLegend?: boolean,
  legendShow?: boolean,
  legendPosition?: 'top' | 'right' | 'bottom' | 'left',
  legendHorizontalAlign?: 'left' | 'center' | 'right',
  legendVerticalAlign?: 'top' | 'middle' | 'bottom',
  legendLayout?: 'horizontal' | 'vertical',
  legendFloating?: boolean,
  legendBackgroundColor?: string,
  legendBorder?: boolean,
  legendItemFontSize?: string,
  tooltipEnabled?: boolean,
  tooltipShared?: boolean,
  tooltipSplit?: boolean,
  tooltipUseHTML?: boolean,
  tooltipValueDecimals?: number,
  tooltipValuePrefix?: string,
  tooltipValueSuffix?: string,
  tooltipDateFormat?: 'auto' | 'MMM YYYY' | 'MMM D, YYYY' | 'YYYY-MM-DD' | 'custom',
  tooltipTemplateMode?: 'default' | 'compact' | 'detailed' | 'custom',
  tooltipBackgroundColor?: string,
  tooltipBorderRadius?: number,
  dataLabelsEnabled?: boolean,
  dataLabelPosition?: 'auto' | 'inside' | 'outside' | 'above',
  dataLabelFormat?: 'value' | 'percent' | 'category-value' | 'custom',
  axisLabelFontSize?: string,
  axisLabelColor?: string,
  labelOverflow?: 'wrap' | 'truncate' | 'rotate',
  rangeSelectorEnabled?: boolean,
  rangeSelectorButtons?: ('1m' | '3m' | '6m' | 'ytd' | '1y' | 'all')[]
): any {
  const presetDef = getPresetById(preset);
  const theme = themeId ? getThemeById(themeId) : null;
  
  if (!presetDef) {
    throw new Error(`Unknown preset: ${preset}`);
  }

  const { rows } = dataset;
  const isStockChart = presetDef.stockChart || false;

  // Calculate spacing based on preset
  const getSpacing = () => {
    switch (spacingPreset) {
      case 'tight': return { top: 10, right: 10, bottom: 10, left: 10 };
      case 'spacious': return { top: 30, right: 30, bottom: 30, left: 30 };
      default: return { top: 20, right: 20, bottom: 20, left: 20 };
    }
  };

  // Base options
  const options: any = {
    chart: {
      type: presetDef.highchartsType,
      backgroundColor: backgroundColor || theme?.backgroundColor || '#ffffff',
      width: chartDimensions?.width || 800,
      height: chartDimensions?.height || 800,
      spacing: getSpacing(),
      marginBottom: isStockChart ? 180 : 120,
      inverted: invertedChart || false,
      polar: polar || false,
      zoomType: zoomType === 'none' ? undefined : zoomType,
      scrollablePlotArea: scrollablePlotArea ? {
        minWidth: chartDimensions?.width || 800,
        scrollPositionX: 0
      } : undefined,
      style: {
        fontFamily: 'Roboto Condensed, sans-serif',
        borderRadius: `${borderRadius || 0}px`
      }
    },
    title: {
      text: title || `${presetDef.name} Chart`,
      align: titleAlign || 'left',
      useHTML: titleUseHTML || false,
      style: {
        fontFamily: 'Georgia, serif',
        fontSize: '1.5rem',
        fontWeight: 'normal',
        color: theme?.titleStyle?.color || '#333333'
      }
    },
    subtitle: {
      text: subtitle || `Generated from ${dataset.sourceFileName}`,
      align: subtitleAlign || 'left',
      style: {
        fontFamily: 'Roboto Condensed, sans-serif',
        fontSize: '14px',
        color: '#666666'
      }
    },
    caption: showCaption ? {
      text: captionText || '',
      style: {
        fontFamily: 'Roboto Condensed, sans-serif',
        fontSize: '12px',
        color: '#666666'
      }
    } : undefined,
    credits: {
      enabled: showCredits !== false,
      text: source || '',
      href: '',
      style: {
        fontSize: '10px',
        color: '#666666',
        fontFamily: 'Roboto Condensed, sans-serif'
      },
      position: {
        align: 'left',
        verticalAlign: 'bottom',
        x: 10,
        y: -10
      }
    },
    colors: theme?.palette || ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9'],
    plotOptions: {
      series: {
        lineWidth: theme?.lineWidthDefaults?.line || 2,
        marker: {
          enabled: preset === 'line' || preset === 'area' || preset === 'scatter',
          radius: 4,
          states: {
            hover: {
              enabled: true,
              radius: 6
            }
          }
        },
        states: {
          hover: {
            enabled: true,
            lineWidth: 3,
            brightness: 0.1
          },
          select: {
            enabled: true,
            lineWidth: 3
          }
        },
        cursor: 'pointer',
        animation: {
          duration: 1000
        }
      }
    }
  };

  // Generate series data
  const series: any[] = [];

  if (preset === 'ohlc' || preset === 'candlestick' || preset === 'candlestickVolume') {
    // OHLC/Candlestick data
    const ohlcData = rows.map(row => {
      const date = mapping.dateField ? parseDate(row[mapping.dateField] as string) : Date.now();
      return [
        date,
        row[mapping.openField!] as number,
        row[mapping.highField!] as number,
        row[mapping.lowField!] as number,
        row[mapping.closeField!] as number
      ];
    }).filter(point => point.every(val => val !== null && val !== undefined));

    series.push({
      type: presetDef.highchartsType,
      name: 'Price',
      data: ohlcData
    });

    // Add volume series if specified
    if (preset === 'candlestickVolume' && mapping.volumeField) {
      const volumeData = rows.map(row => {
        const date = mapping.dateField ? parseDate(row[mapping.dateField] as string) : Date.now();
        return [date, row[mapping.volumeField!] as number];
      }).filter(point => point.every(val => val !== null && val !== undefined));

      series.push({
        type: 'column',
        name: 'Volume',
        data: volumeData,
        yAxis: 1
      });

      // Add second y-axis for volume
      options.yAxis = [
        {
          title: { text: 'Price' },
          height: '70%'
        },
        {
          title: { text: 'Volume' },
          top: '75%',
          height: '25%',
          offset: 0
        }
      ];
    }
  } else {
    // Standard series data
    if (mapping.yFields) {
      mapping.yFields.forEach((yField) => {
        let seriesData: any[] = [];

        if (preset === 'pie') {
          // Pie chart data format
          seriesData = rows.map(row => ({
            name: mapping.labelField ? row[mapping.labelField] : (mapping.xField ? row[mapping.xField] : `Point ${rows.indexOf(row) + 1}`),
            y: row[yField] as number
          })).filter(point => point.y !== null && point.y !== undefined);
        } else if (isStockChart) {
          // Stock chart data format
          seriesData = rows.map(row => {
            const date = mapping.dateField ? parseDate(row[mapping.dateField] as string) : Date.now();
            return [date, row[yField] as number];
          }).filter(point => point.every(val => val !== null && val !== undefined));
        } else {
          // Standard chart data format
          if (mapping.xField) {
            // Check if xField is a date type
            const xFieldType = dataset.inferredTypes[mapping.xField];
            const isDateField = xFieldType === 'date';
            
            if (isDateField) {
              // For date fields, use [timestamp, value] format
              seriesData = rows.map(row => {
                const date = parseDate(row[mapping.xField!] as string);
                return [date, row[yField] as number];
              }).filter(point => point.every(val => val !== null && val !== undefined));
            } else {
              // For non-date fields, use {x, y} format
              seriesData = rows.map(row => ({
                x: row[mapping.xField!],
                y: row[yField] as number,
                name: mapping.labelField ? row[mapping.labelField] : undefined
              })).filter(point => point.y !== null && point.y !== undefined);
            }
          } else {
            seriesData = rows.map(row => row[yField] as number).filter(val => val !== null && val !== undefined);
          }
        }

        series.push({
          type: presetDef.highchartsType,
          name: yField,
          data: seriesData
        });
      });
    }
  }

  options.series = series;

  // Configure axes
  if (!isStockChart) {
    if (mapping.xField && preset !== 'pie') {
      // Check if xField is a date type
      const xFieldType = dataset.inferredTypes[mapping.xField];
      const isDateField = xFieldType === 'date';

      if (isDateField) {
        // For date fields, use datetime xAxis with timestamp data
        options.xAxis = {
          type: xAxisType || 'datetime',
          title: {
            text: xAxisTitle || mapping.xField,
            style: { fontSize: '14px', fontWeight: 'bold', color: '#333333' }
          },
          labels: {
            style: {
              ...theme?.axisLabelStyle,
              fontSize: axisLabelFontSize || '12px',
              color: axisLabelColor || '#666666'
            },
            rotation: xAxisLabelRotation || 0,
            step: xAxisLabelStep || 1,
            overflow: labelOverflow || 'wrap',
            formatter: function() {
              const date = new Date(this.value);
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const year = date.getFullYear();
              return `${month}/${day}/${year}`;
            }
          },
          min: xAxisMin,
          max: xAxisMax,
          tickInterval: xAxisTickInterval,
          gridLineColor: xAxisShowGridlines !== false ? '#e6e6e6' : 'transparent',
          gridLineWidth: xAxisShowGridlines !== false ? 1 : 0,
          tickWidth: xAxisShowAxisLine !== false ? 1 : 0,
          tickLength: xAxisShowAxisLine !== false ? 5 : 0,
          lineColor: xAxisShowAxisLine !== false ? '#cccccc' : 'transparent',
          reversed: xAxisReverse || false,
          startOnTick: xAxisStartOnTick !== false,
          endOnTick: xAxisEndOnTick !== false
        };
      } else {
        // For non-date fields, use categories
        const xValues = [...new Set(rows.map(row => row[mapping.xField!]))].filter(val => val !== null);
        options.xAxis = {
          categories: xValues,
          type: xAxisType || 'category',
          title: {
            text: xAxisTitle || mapping.xField,
            style: { fontSize: '14px', fontWeight: 'bold', color: '#333333' }
          },
          labels: {
            style: {
              ...theme?.axisLabelStyle,
              fontSize: axisLabelFontSize || '12px',
              color: axisLabelColor || '#666666'
            },
            rotation: xAxisLabelRotation || 0,
            step: xAxisLabelStep || 1,
            overflow: labelOverflow || 'wrap'
          },
          min: xAxisMin,
          max: xAxisMax,
          tickInterval: xAxisTickInterval,
          gridLineColor: xAxisShowGridlines !== false ? '#e6e6e6' : 'transparent',
          gridLineWidth: xAxisShowGridlines !== false ? 1 : 0,
          tickWidth: xAxisShowAxisLine !== false ? 1 : 0,
          tickLength: xAxisShowAxisLine !== false ? 5 : 0,
          lineColor: xAxisShowAxisLine !== false ? '#cccccc' : 'transparent',
          reversed: xAxisReverse || false,
          startOnTick: xAxisStartOnTick !== false,
          endOnTick: xAxisEndOnTick !== false
        };
      }
    }

    options.yAxis = options.yAxis || {
      title: {
        text: yAxisTitle || mapping.yFields?.[0] || 'Values',
        style: { fontSize: '14px', fontWeight: 'bold', color: '#333333' }
      },
      labels: {
        style: {
          ...theme?.axisLabelStyle,
          fontSize: axisLabelFontSize || '12px',
          color: axisLabelColor || '#666666'
        },
        formatter: function() {
          let value = this.value;
          const prefix = yAxisValuePrefix || '';
          const suffix = yAxisValueSuffix || '';
          const format = yAxisNumberFormat || 'plain';

          if (format === 'currency') {
            return `${prefix}$${value.toLocaleString()}${suffix}`;
          } else if (format === 'percent') {
            return `${prefix}${value}%${suffix}`;
          } else if (format === 'thousands') {
            return `${prefix}${(value / 1000).toFixed(1)}K${suffix}`;
          } else if (format === 'millions') {
            return `${prefix}${(value / 1000000).toFixed(1)}M${suffix}`;
          } else if (format === 'billions') {
            return `${prefix}${(value / 1000000000).toFixed(1)}B${suffix}`;
          }
          return `${prefix}${value.toLocaleString()}${suffix}`;
        }
      },
      min: yAxisMin,
      max: yAxisMax,
      softMin: yAxisSoftMin,
      softMax: yAxisSoftMax,
      tickInterval: yAxisTickInterval,
      opposite: yAxisOpposite || false,
      gridLineColor: yAxisShowGridlines !== false ? '#e6e6e6' : 'transparent',
      gridLineWidth: yAxisShowGridlines !== false ? 1 : 0,
      gridLineDashStyle: yAxisGridlineStyle || 'solid',
      tickWidth: 1,
      tickLength: 5,
      lineColor: '#cccccc',
      allowDecimals: yAxisAllowDecimals !== false
    };

    // Secondary y-axis
    if (yAxisSecondaryEnabled) {
      options.yAxis = [options.yAxis, {
        title: {
          text: yAxisSecondaryTitle || 'Secondary',
          style: { fontSize: '14px', fontWeight: 'bold', color: '#333333' }
        },
        opposite: true,
        labels: {
          style: {
            ...theme?.axisLabelStyle,
            fontSize: axisLabelFontSize || '12px',
            color: axisLabelColor || '#666666'
          }
        },
        gridLineColor: 'transparent',
        gridLineWidth: 0
      }];
    }
  }

  // Configure stacking for stacked charts
  if (seriesStacking && seriesStacking !== 'none') {
    options.plotOptions = {
      ...options.plotOptions,
      series: {
        stacking: seriesStacking
      }
    };
  }

  // Configure legend
  options.legend = {
    enabled: legendShow !== false && (series.length > 1 || preset === 'pie'),
    align: legendHorizontalAlign || 'right',
    verticalAlign: legendVerticalAlign || 'top',
    y: 40,
    layout: legendLayout || 'horizontal',
    floating: legendFloating || false,
    backgroundColor: legendBackgroundColor || undefined,
    borderWidth: legendBorder ? 1 : 0,
    borderColor: legendBorder ? '#cccccc' : undefined,
    itemStyle: {
      fontSize: legendItemFontSize || '12px',
      color: '#333333',
      fontWeight: 'normal'
    },
    itemHoverStyle: {
      color: '#000000',
      fontWeight: 'bold'
    },
    itemHiddenStyle: {
      color: '#999999'
    },
    shadow: false,
    itemMarginTop: 12,
    itemMarginBottom: 12,
    itemMarginLeft: 15,
    itemMarginRight: 15,
    padding: 10
  };

  // Configure tooltip
  const decimals = tooltipValueDecimals !== undefined ? tooltipValueDecimals : 2;
  const isDateField = mapping.xField && dataset.inferredTypes[mapping.xField] === 'date';
  const valuePrefix = tooltipValuePrefix || '';
  const valueSuffix = tooltipValueSuffix || '';

  options.tooltip = {
    enabled: tooltipEnabled !== false,
    shared: tooltipShared !== false,
    split: tooltipSplit || false,
    useHTML: tooltipUseHTML || false,
    valueDecimals: decimals,
    valuePrefix: valuePrefix,
    valueSuffix: valueSuffix,
    backgroundColor: tooltipBackgroundColor || '#ffffff',
    borderRadius: tooltipBorderRadius || 3,
    style: {
      fontSize: '12px'
    },
    formatter: function() {
      // Format the x-axis value (date or category)
      let xAxisValue = this.key || this.x;
      if (isDateField && typeof xAxisValue === 'number') {
        const date = new Date(xAxisValue);
        xAxisValue = date.toLocaleDateString();
      }

      let result = '<span style="font-size: 10px">' + xAxisValue + '</span><br/>';
      if (this.points) {
        // Shared tooltip (multiple series)
        this.points.forEach((point: any) => {
          result += `<span style="color:${point.color}">●</span> ${point.series.name}: <b>${valuePrefix}${point.y.toFixed(decimals)}${valueSuffix}</b><br/>`;
        });
      } else {
        // Single point tooltip
        result += `<span style="color:${this.color}">●</span> ${this.series.name}: <b>${valuePrefix}${this.y.toFixed(decimals)}${valueSuffix}</b><br/>`;
      }
      return result;
    }
  };

  // Configure plotOptions.series for series settings
  options.plotOptions = {
    ...options.plotOptions,
    series: {
      lineWidth: seriesLineWidth || 2,
      marker: {
        enabled: seriesMarkerEnabled !== false,
        radius: seriesMarkerSize || 6
      },
      dashStyle: seriesDashStyle || 'Solid',
      fillOpacity: seriesFillOpacity || 0.75,
      borderWidth: seriesBorderWidth || 0,
      pointPadding: seriesPointPadding || 0,
      groupPadding: seriesGroupPadding || 0,
      connectNulls: seriesConnectNulls !== false,
      animation: seriesAnimation !== false,
      animationDuration: seriesAnimationDuration || 1000,
      showInLegend: seriesShowInLegend !== false,
      dataLabels: {
        enabled: dataLabelsEnabled || false,
        allowOverlap: true,
        format: dataLabelFormat === 'percent' ? '{point.percentage:.1f}%' :
                 dataLabelFormat === 'category-value' ? '{point.category}: {point.y}' :
                 dataLabelFormat === 'value' ? '{point.y}' : '{point.y}',
        style: {
          fontSize: '11px',
          fontWeight: 'bold',
          color: '#333333'
        }
      }
    },
    column: {
      pointPadding: seriesPointPadding || 0,
      groupPadding: seriesGroupPadding || 0
    },
    bar: {
      pointPadding: seriesPointPadding || 0,
      groupPadding: seriesGroupPadding || 0
    }
  };

  // Range selector - works for all chart types when enabled
  if (rangeSelectorEnabled || isStockChart) {
    const buttons = rangeSelectorButtons || ['1m', '3m', '6m', 'ytd', '1y', 'all'];
    const buttonConfig = buttons.map(btn => {
      const buttonMap: Record<string, any> = {
        '1m': { type: 'month', count: 1, text: '1m' },
        '3m': { type: 'month', count: 3, text: '3m' },
        '6m': { type: 'month', count: 6, text: '6m' },
        'ytd': { type: 'ytd', text: 'YTD' },
        '1y': { type: 'year', count: 1, text: '1y' },
        'all': { type: 'all', text: 'All' }
      };
      return buttonMap[btn];
    });

    options.rangeSelector = {
      enabled: true,
      buttons: buttonConfig,
      selected: buttonConfig.length - 1 // Select 'All' by default
    };

    // Range selector requires datetime xAxis
    if (options.xAxis && !isStockChart) {
      options.xAxis.type = 'datetime';
    }
  }

  // Stock chart specific navigator
  if (isStockChart) {
    options.navigator = {
      enabled: true,
      height: 60,
      margin: 10,
      series: {
        color: '#4572A7',
        fillOpacity: 0.05
      },
      xAxis: {
        gridLineColor: '#E6E6E6'
      },
      yAxis: {
        gridLineColor: '#E6E6E6'
      }
    };
    options.scrollbar = {
      enabled: true
    };
  }

  return options;
}
