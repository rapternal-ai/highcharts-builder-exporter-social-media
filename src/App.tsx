import { useState } from 'react';
import { useRef } from 'react';
import { useBuilderStore } from './store/builderStore';
import ControlPanel from './components/builder/ControlPanel';
import CSVPreview from './features/csv/CSVPreview';
import ChartPreview from './components/preview/ChartPreview';
import AdvancedSettings from './components/builder/AdvancedSettings';

function App() {
  const { mode, setMode, dataset, mapping, preset } = useBuilderStore();
  const chartRef = useRef<any>(null);
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);

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

          {/* Advanced Settings Button */}
          {canShowChart && (
            <button
              onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                showAdvancedSettings
                  ? 'bg-blue-50 border-blue-300 text-blue-700'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M19.07 19.07l-1.41-1.41M4.93 19.07l1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2"/>
              </svg>
              <span>Advanced</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-96 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col overflow-hidden">
          <ControlPanel chartRef={chartRef} onOpenAdvanced={() => setShowAdvancedSettings(true)} />
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

          {/* Advanced Settings Slide-over */}
          {showAdvancedSettings && (
            <>
              <div
                className="absolute inset-0 bg-black/20 z-10"
                onClick={() => setShowAdvancedSettings(false)}
              />
              <div className="absolute top-0 right-0 h-full w-[700px] bg-white border-l border-gray-200 z-20 flex flex-col shadow-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
                  <h2 className="text-base font-semibold text-gray-900">Advanced Settings</h2>
                  <button
                    onClick={() => setShowAdvancedSettings(false)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <AdvancedSettings />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
