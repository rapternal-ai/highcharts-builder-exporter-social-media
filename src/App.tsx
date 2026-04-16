import { useBuilderStore } from './store/builderStore';
import ControlPanel from './components/builder/ControlPanel';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function App() {
  const { mode, setMode } = useBuilderStore();

  // Simple chart options for testing
  const chartOptions: Highcharts.Options = {
    title: {
      text: `Sample ${mode === 'standard' ? 'Standard' : 'Stock'} Chart`
    },
    series: [{
      type: 'line',
      name: 'Sample Data',
      data: [1, 2, 3, 4, 5, 6]
    }],
    credits: {
      enabled: false
    }
  };

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
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Chart Preview</h2>
            <p className="text-sm text-gray-600 mb-4">Current mode: {mode}</p>
            
            <div className="mb-4" style={{height: '400px'}}>
              <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
              />
            </div>
            
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Stage 1 Complete:</strong> Basic layout with mode toggle and sample charts working! 
                CSV upload and data mapping will be added in subsequent stages.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
