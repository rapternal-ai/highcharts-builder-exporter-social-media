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
  themeId?: string
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
      backgroundColor: theme?.backgroundColor || '#ffffff'
    },
    title: {
      text: `${presetDef.name} Chart`,
      style: theme?.titleStyle || { fontSize: '18px', fontWeight: 'bold', color: '#333333' }
    },
    subtitle: {
      text: `Generated from ${dataset.sourceFileName}`,
      style: theme?.subtitleStyle || { fontSize: '14px', color: '#666666' }
    },
    credits: {
      enabled: false
    },
    colors: theme?.palette || ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9'],
    plotOptions: {
      series: {
        lineWidth: theme?.lineWidthDefaults?.line || 2
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
          title: { text: mapping.xField },
          labels: {
            style: theme?.axisLabelStyle || { fontSize: '12px', color: '#666666' },
            format: '%m/%d/%Y'
          }
        };
      } else {
        // For non-date fields, use categories
        const xValues = [...new Set(rows.map(row => row[mapping.xField!]))].filter(val => val !== null);
        options.xAxis = {
          categories: xValues,
          title: { text: mapping.xField },
          labels: {
            style: theme?.axisLabelStyle || { fontSize: '12px', color: '#666666' }
          }
        };
      }
    }

    options.yAxis = options.yAxis || {
      title: { text: mapping.yFields?.[0] || 'Values' },
      labels: {
        style: theme?.axisLabelStyle || { fontSize: '12px', color: '#666666' }
      }
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
    itemStyle: theme?.legendStyle || { fontSize: '12px', color: '#333333' }
  };

  // Configure tooltip
  options.tooltip = {
    style: theme?.tooltipStyle || { fontSize: '12px' }
  };

  // Stock chart specific options
  if (isStockChart) {
    options.rangeSelector = {
      selected: 1
    };
    options.navigator = {
      enabled: true
    };
  }

  return options;
}
