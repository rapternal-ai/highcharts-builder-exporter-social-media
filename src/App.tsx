import { useBuilderStore } from './store/builderStore';
import ControlPanel from './components/builder/ControlPanel';
import ChartPreview from './components/preview/ChartPreview';

function App() {
  const { mode, setMode } = useBuilderStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
      <div className="flex h-[calc(100vh-80px)]">
        {/* Left Control Panel */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <ControlPanel />
        </div>

        {/* Right Preview Area */}
        <div className="flex-1 p-6">
          <ChartPreview />
        </div>
      </div>
    </div>
  )
}

export default App
