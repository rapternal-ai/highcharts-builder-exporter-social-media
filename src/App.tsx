import { useBuilderStore } from './store/builderStore';
import ControlPanel from './components/builder/ControlPanel';
import CSVPreview from './features/csv/CSVPreview';
import ChartPreview from './components/preview/ChartPreview';
import { useRef } from 'react';

function App() {
  const { mode, setMode, dataset, mapping, preset } = useBuilderStore();
  const chartRef = useRef<any>(null);
  
  const canShowChart = dataset && mapping.yFields && mapping.yFields.length > 0 && preset;
  
  // Debug logging to help identify the issue
  console.log('App state debug:', {
    hasDataset: !!dataset,
    hasYFields: !!(mapping.yFields && mapping.yFields.length > 0),
    hasPreset: !!preset,
    canShowChart,
    mapping,
    preset
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Highcharts Builder Exporter
          </h1>
          
          {/* Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMode('standard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'standard'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Standard Charts
            </button>
            <button
              onClick={() => setMode('stock')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'stock'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Stock Charts
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="relative" style={{height: 'calc(100vh - 80px)'}}>
        {/* Left Control Panel - Fixed width, overlays on narrow screens */}
        <div className="absolute left-0 top-0 w-80 bg-white border-r border-gray-200 overflow-y-auto z-10" style={{height: 'calc(100vh - 80px)'}}>
          <ControlPanel chartRef={chartRef} />
        </div>

        {/* Right Preview Area - Has padding to account for left panel */}
        <div className="pl-80 p-6 flex items-center justify-center h-full">
          {canShowChart ? (
            <ChartPreview chartRef={chartRef} />
          ) : dataset ? (
            <div className="h-full bg-white rounded-lg border border-gray-200 p-6 w-full max-w-5xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Preview</h2>
              
              {/* Debug info to help user see what's missing */}
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="text-sm font-medium text-yellow-800 mb-2">Chart Status</h4>
                <div className="text-sm text-yellow-700 space-y-1">
                  <div>✅ Data uploaded: {dataset.sourceFileName}</div>
                  <div className={mapping.yFields && mapping.yFields.length > 0 ? "text-green-700" : "text-red-700"}>
                    {mapping.yFields && mapping.yFields.length > 0 ? "✅" : "❌"} Y-axis mapped: {mapping.yFields?.length || 0} field(s)
                  </div>
                  <div className={preset ? "text-green-700" : "text-red-700"}>
                    {preset ? "✅" : "❌"} Chart type selected: {preset || "None"}
                  </div>
                  {!canShowChart && (
                    <div className="mt-2 text-yellow-800 font-medium">
                      → Complete mapping and select a chart type to see your chart
                    </div>
                  )}
                </div>
              </div>
              
              <CSVPreview />
            </div>
          ) : (
            <div className="h-full bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-4xl text-gray-400 mb-4">📊</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Upload CSV to Get Started</h3>
                  <p className="text-gray-600">Upload a CSV file to see data preview and create {mode} charts</p>
                  <p className="text-sm text-gray-500 mt-2">Charts will render here after data mapping</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Stages 4 & 5 Progress:</strong> Chart presets and theme system ready. 
                  Upload a file and configure mapping to see live charts.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
