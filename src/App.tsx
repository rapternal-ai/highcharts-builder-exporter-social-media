import { useBuilderStore } from './store/builderStore';
import ControlPanel from './components/builder/ControlPanel';
import CSVPreview from './features/csv/CSVPreview';

function App() {
  const { mode, setMode, dataset } = useBuilderStore();

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
      <div className="flex" style={{height: 'calc(100vh - 80px)'}}>
        {/* Left Control Panel */}
        <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
          <ControlPanel />
        </div>

        {/* Right Preview Area */}
        <div className="flex-1 p-6">
          <div className="h-full bg-white rounded-lg border border-gray-200 p-6">
            {dataset ? (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Preview</h2>
                <CSVPreview />
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Chart Preview</h2>
                <p className="text-sm text-gray-600 mb-4">Current mode: {mode}</p>
                
                <div className="mb-4 p-8 bg-gray-100 rounded-lg" style={{height: '400px'}}>
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload CSV to Get Started</h3>
                      <p className="text-gray-600">Upload a CSV file to see data preview and create {mode} charts</p>
                      <p className="text-sm text-gray-500 mt-2">Charts will render here after data mapping</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Stage 2 Progress:</strong> CSV upload and parsing functionality ready. 
                    Upload a file to see column detection and data preview.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
