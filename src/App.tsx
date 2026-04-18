import { useRef } from 'react';
import { useBuilderStore } from './store/builderStore';
import ControlPanel from './components/builder/ControlPanel';
import CSVPreview from './features/csv/CSVPreview';
import ChartPreview from './components/preview/ChartPreview';

function App() {
  const { mode, setMode, dataset, mapping, preset } = useBuilderStore();
  const chartRef = useRef<any>(null);
  const canShowChart = dataset && mapping.yFields && mapping.yFields.length > 0 && preset;

  return (
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-5 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-bold">HC</span>
          </div>
          <h1 className="text-base font-semibold text-gray-900">Chart Builder</h1>
        </div>

        <div className="flex items-center space-x-2">
          {/* Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setMode('standard')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mode === 'standard' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setMode('stock')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                mode === 'stock' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Stock
            </button>
          </div>

        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-96 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <ControlPanel chartRef={chartRef} />
        </div>

        {/* Right Preview Area */}
        <div className="flex-1 relative overflow-hidden">
          {canShowChart ? (
            <div className="h-full p-6 flex items-center justify-center overflow-auto">
              <ChartPreview chartRef={chartRef} />
            </div>
          ) : dataset ? (
            <div className="h-full p-6 overflow-auto">
              <div className="bg-white rounded-xl border border-gray-200 p-6 max-w-4xl">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Data Preview</h2>
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm font-medium text-amber-800">Complete the setup in the sidebar to view your chart</p>
                  <div className="mt-2 text-sm text-amber-700 space-y-1">
                    {!(mapping.yFields && mapping.yFields.length > 0) && <div>• Select Y-axis values in the Data tab</div>}
                    {!preset && <div>• Choose a chart type in the Chart tab</div>}
                  </div>
                </div>
                <CSVPreview />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center max-w-xs">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Your Chart</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Upload a CSV file from the sidebar to get started. Charts render live as you configure them.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
