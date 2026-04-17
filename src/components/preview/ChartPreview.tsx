import { useEffect, useState, useRef } from 'react';
import Highcharts from 'highcharts';
import { useBuilderStore } from '../../store/builderStore';
import { generateHighchartsOptions } from '../../lib/transformers/optionsGenerator';
import { validateMapping } from '../../lib/validation/mappingValidator';

interface ChartPreviewProps {
  chartRef?: React.RefObject<any>;
}

const ChartPreview = ({ chartRef: externalChartRef }: ChartPreviewProps) => {
  const { mode, dataset, mapping, preset, themeId, chartDimensions, subtitle } = useBuilderStore();
  const [chartOptions, setChartOptions] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [HighchartsReact, setHighchartsReact] = useState<any>(null);
  const chartComponentRef = useRef<any>(null);

  // Initialize Highcharts exporting module
  useEffect(() => {
    import('highcharts/modules/exporting').then((module) => {
      if (typeof module.default === 'function') {
        module.default(Highcharts);
        console.log('Highcharts exporting module initialized');
      }
    }).catch((err) => {
      console.error('Failed to load exporting module:', err);
    });
  }, []);

  // Dynamically import HighchartsReact to avoid module resolution issues
  useEffect(() => {
    import('highcharts-react-official').then((module) => {
      console.log('HighchartsReact module:', module);
      console.log('Module default:', module.default);
      console.log('Module keys:', Object.keys(module));
      
      // The actual component is at module.HighchartsReact, not module.default
      if (module.HighchartsReact && typeof module.HighchartsReact === 'object') {
        setHighchartsReact(module.HighchartsReact);
      } else {
        console.error('Could not find valid component in module');
        setError('Failed to load chart component - invalid module structure');
      }
    }).catch((err) => {
      console.error('Failed to load HighchartsReact:', err);
      setError('Failed to load chart component');
    });
  }, []);

  // Sync internal chart ref to external chart ref for export functionality
  useEffect(() => {
    if (externalChartRef && chartComponentRef.current) {
      externalChartRef.current = chartComponentRef.current;
    }
  }, [externalChartRef, chartComponentRef.current]);

  const canShowChart = dataset && mapping.yFields && mapping.yFields.length > 0 && preset;
  const mappingValidation = dataset ? validateMapping(mapping, mode, preset) : null;

  useEffect(() => {
    if (canShowChart && mappingValidation?.isValid) {
      try {
        const options = generateHighchartsOptions(dataset, mapping, preset, themeId, chartDimensions, subtitle);
        setChartOptions(options);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to generate chart');
        setChartOptions(null);
      }
    } else {
      setChartOptions(null);
      setError(null);
    }
  }, [dataset, mapping, preset, themeId, chartDimensions, subtitle, canShowChart, mappingValidation?.isValid]);


  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          {canShowChart ? 'Chart Preview' : 'Configuration Required'}
        </h2>
        <p className="text-sm text-gray-600">
          {canShowChart 
            ? `${mode === 'standard' ? 'Standard' : 'Stock'} chart • Live preview updates as you configure`
            : 'Complete the steps on the left to generate your chart'
          }
        </p>
      </div>

      <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
        {error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl text-red-400 mb-4">⚠️</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Chart Generation Error</h3>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        ) : chartOptions && HighchartsReact ? (
          <div className="h-full">
            <HighchartsReact
              highcharts={Highcharts}
              options={chartOptions}
              ref={chartComponentRef}
            />
          </div>
        ) : chartOptions && !HighchartsReact ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-4xl text-blue-500 mb-4">⏳</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading Chart Component...</h3>
              <p className="text-gray-600">Preparing your chart visualization</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <div className="text-4xl text-gray-400">📊</div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Create Your Chart</h3>
                <div className="text-gray-600 space-y-1">
                  {!dataset && <p>1. Upload a CSV file</p>}
                  {dataset && (!mapping.yFields || mapping.yFields.length === 0) && <p>2. Map your data columns</p>}
                  {dataset && mapping.yFields && mapping.yFields.length > 0 && !preset && <p>3. Choose a chart type</p>}
                  {mappingValidation && !mappingValidation.isValid && <p>4. Fix mapping validation issues</p>}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Messages */}
      <div className="mt-4 space-y-2">
        {canShowChart && mappingValidation?.isValid && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>✅ Chart Ready:</strong> Your {preset} chart is generated and ready for export!
            </p>
          </div>
        )}
        
        {dataset && preset && mappingValidation && !mappingValidation.isValid && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>⚡ Almost Ready:</strong> Fix the mapping issues to generate your chart.
            </p>
          </div>
        )}

        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Stages 4 & 5 Complete:</strong> Chart presets and theme system implemented. 
            Export functionality coming in Stage 6.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChartPreview;
