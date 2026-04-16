import type { ExportSettings } from '../../features/export/ExportControls';

export interface ExportResult {
  success: boolean;
  error?: string;
}

export function exportChart(
  chartRef: React.RefObject<any>,
  settings: ExportSettings
): Promise<ExportResult> {
  return new Promise((resolve) => {
    try {
      if (!chartRef.current || !chartRef.current.chart) {
        resolve({ success: false, error: 'Chart not available for export' });
        return;
      }

      const chart = chartRef.current.chart;
      const { format, filename, width, height, scale, backgroundColor } = settings;

      // Prepare export options
      const exportOptions: any = {
        type: format,
        filename: filename,
        width: width * scale,
        height: height * scale,
        scale: scale
      };

      // Add background color for PNG
      if (format === 'png' && backgroundColor && backgroundColor !== 'transparent') {
        exportOptions.backgroundColor = backgroundColor;
      }

      // Use Highcharts built-in export functionality
      if (format === 'svg') {
        chart.exportChart({
          type: 'image/svg+xml',
          filename: filename,
          width: width,
          height: height
        }, {
          chart: {
            backgroundColor: backgroundColor === 'transparent' ? null : backgroundColor
          }
        });
      } else {
        chart.exportChart({
          type: format === 'png' ? 'image/png' : 'image/jpeg',
          filename: filename,
          width: width * scale,
          height: height * scale,
          scale: scale
        }, {
          chart: {
            backgroundColor: backgroundColor === 'transparent' ? null : backgroundColor
          }
        });
      }

      resolve({ success: true });
    } catch (error) {
      resolve({ 
        success: false, 
        error: error instanceof Error ? error.message : 'Export failed' 
      });
    }
  });
}

export function downloadDataURL(dataURL: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataURL;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getExportDimensions(preset: string): { width: number; height: number } {
  const presets: Record<string, { width: number; height: number }> = {
    article: { width: 600, height: 400 },
    slide: { width: 1000, height: 600 },
    'social-square': { width: 800, height: 800 },
    'social-wide': { width: 1200, height: 630 },
    print: { width: 1600, height: 1000 }
  };

  return presets[preset] || { width: 800, height: 400 };
}
