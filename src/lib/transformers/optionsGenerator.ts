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
  source?: string
): any {
  const presetDef = getPresetById(preset);
  const theme = themeId ? getThemeById(themeId) : null;
  
  if (!presetDef) {
    throw new Error(`Unknown preset: ${preset}`);
  }

  const { rows } = dataset;
  const isStockChart = presetDef.stockChart || false;

  // Base options
  const options: any = {
    chart: {
      type: presetDef.highchartsType,
      backgroundColor: theme?.backgroundColor || '#ffffff',
      width: chartDimensions?.width || 800,
      height: chartDimensions?.height || 800,
      spacingTop: 20,
      marginBottom: isStockChart ? 180 : 120
    },
    title: {
      text: title || `${presetDef.name} Chart`,
      align: 'left',
      style: {
        fontFamily: 'Georgia, serif',
        fontSize: '1.5rem',
        fontWeight: 'normal',
        color: theme?.titleStyle?.color || '#333333'
      }
    },
    subtitle: {
      text: subtitle || `Generated from ${dataset.sourceFileName}`,
      align: 'left',
      style: theme?.subtitleStyle || { fontSize: '12px', color: '#666666' }
    },
    credits: {
      enabled: true,
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
          type: 'datetime',
          title: { 
            text: mapping.xField,
            style: { fontSize: '14px', fontWeight: 'bold', color: '#333333' }
          },
          labels: {
            style: theme?.axisLabelStyle || { fontSize: '12px', color: '#666666' },
            formatter: function() {
              const date = new Date(this.value);
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const day = String(date.getDate()).padStart(2, '0');
              const year = date.getFullYear();
              return `${month}/${day}/${year}`;
            }
          },
          gridLineColor: '#e6e6e6',
          gridLineWidth: 1,
          tickWidth: 1,
          tickLength: 5,
          lineColor: '#cccccc'
        };
      } else {
        // For non-date fields, use categories
        const xValues = [...new Set(rows.map(row => row[mapping.xField!]))].filter(val => val !== null);
        options.xAxis = {
          categories: xValues,
          title: { 
            text: mapping.xField,
            style: { fontSize: '14px', fontWeight: 'bold', color: '#333333' }
          },
          labels: {
            style: theme?.axisLabelStyle || { fontSize: '12px', color: '#666666' }
          },
          gridLineColor: '#e6e6e6',
          gridLineWidth: 1,
          tickWidth: 1,
          tickLength: 5,
          lineColor: '#cccccc'
        };
      }
    }

    options.yAxis = options.yAxis || {
      title: { 
        text: mapping.yFields?.[0] || 'Values',
        style: { fontSize: '14px', fontWeight: 'bold', color: '#333333' }
      },
      labels: {
        style: theme?.axisLabelStyle || { fontSize: '12px', color: '#666666' }
      },
      gridLineColor: '#e6e6e6',
      gridLineWidth: 1,
      tickWidth: 1,
      tickLength: 5,
      lineColor: '#cccccc'
    };
  }

  // Configure stacking for stacked charts
  if (preset === 'stackedColumn') {
    options.plotOptions = {
      ...options.plotOptions,
      column: {
        stacking: 'normal'
      }
    };
  }

  // Configure legend
  options.legend = {
    enabled: series.length > 1 || preset === 'pie',
    align: 'right',
    verticalAlign: 'top',
    y: 40,
    layout: 'horizontal',
    borderWidth: 0,
    itemStyle: {
      fontSize: '12px',
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
  options.tooltip = {
    enabled: true,
    shared: preset !== 'pie' && preset !== 'scatter', // Enable shared tooltip for most chart types
    crosshairs: preset === 'line' || preset === 'area' || preset === 'scatter',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 4,
    style: theme?.tooltipStyle || { fontSize: '12px', color: '#333333' },
    padding: 8,
    pointFormat: '<span style="color:{point.color}">●</span> {series.name}: <b>{point.y}</b><br/>',
    headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>'
  };

  // Stock chart specific options
  if (isStockChart) {
    options.rangeSelector = {
      selected: 1
    };
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
