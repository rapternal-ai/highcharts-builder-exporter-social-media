import { useState } from 'react';
import { useBuilderStore } from '../../store/builderStore';

export interface ExportSettings {
  format: 'png' | 'jpeg' | 'svg' | 'pdf';
  filename: string;
  width: number;
  height: number;
  scale: number;
  backgroundColor?: string;
}

export interface ExportPreset {
  id: string;
  name: string;
  description: string;
  width: number;
  height: number;
  icon: string;
}

const EXPORT_PRESETS: ExportPreset[] = [
  {
    id: 'article',
    name: 'Article',
    description: 'Perfect for blog posts and articles',
    width: 600,
    height: 400,
    icon: '📄'
  },
  {
    id: 'slide',
    name: 'Presentation',
    description: 'Optimized for slides and presentations',
    width: 1000,
    height: 600,
    icon: '📊'
  },
  {
    id: 'social-square',
    name: 'Social Square',
    description: 'Square format for social media',
    width: 800,
    height: 800,
    icon: '📱'
  },
  {
    id: 'social-wide',
    name: 'Social Wide',
    description: 'Widescreen for social media',
    width: 1200,
    height: 630,
    icon: '📺'
  },
  {
    id: 'print',
    name: 'Print',
    description: 'High resolution for printing',
    width: 1600,
    height: 1000,
    icon: '🖨️'
  }
];

interface ExportControlsProps {
  onExport: (settings: ExportSettings) => void;
  isExporting?: boolean;
}

const ExportControls = ({ onExport, isExporting = false }: ExportControlsProps) => {
  const { dataset, preset } = useBuilderStore();
  const [settings, setSettings] = useState<ExportSettings>({
    format: 'png',
    filename: `${dataset?.sourceFileName?.replace('.csv', '') || 'chart'}-${preset || 'chart'}`,
    width: 800,
    height: 400,
    scale: 1,
    backgroundColor: '#ffffff'
  });

  const canExport = dataset && preset;

  const handlePresetSelect = (presetDef: ExportPreset) => {
    setSettings(prev => ({
      ...prev,
      width: presetDef.width,
      height: presetDef.height
    }));
  };

  const handleExport = () => {
    if (canExport) {
      onExport(settings);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Export Chart</h4>
        <p className="text-sm text-gray-600 mb-4">
          Download your chart as an image file for use in presentations, reports, or web content.
        </p>
      </div>

      {!canExport ? (
        <div className="text-center py-6 text-gray-500">
          <p>Complete chart configuration to enable export</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(['png', 'jpeg', 'svg'] as const).map((format) => (
                <button
                  key={format}
                  onClick={() => setSettings(prev => ({ ...prev, format }))}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    settings.format === format
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <div className="font-medium uppercase">{format}</div>
                  <div className="text-xs mt-1">
                    {format === 'png' && 'Best quality'}
                    {format === 'jpeg' && 'Smaller size'}
                    {format === 'svg' && 'Vector format'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Size Presets */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Size Presets
            </label>
            <div className="grid grid-cols-1 gap-2">
              {EXPORT_PRESETS.map((presetDef) => (
                <button
                  key={presetDef.id}
                  onClick={() => handlePresetSelect(presetDef)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    settings.width === presetDef.width && settings.height === presetDef.height
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xl">{presetDef.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{presetDef.name}</div>
                      <div className="text-sm text-gray-600">{presetDef.description}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {presetDef.width} × {presetDef.height}px
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Dimensions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Custom Dimensions
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Width (px)</label>
                <input
                  type="number"
                  value={settings.width}
                  onChange={(e) => setSettings(prev => ({ ...prev, width: parseInt(e.target.value) || 800 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  min="100"
                  max="4000"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Height (px)</label>
                <input
                  type="number"
                  value={settings.height}
                  onChange={(e) => setSettings(prev => ({ ...prev, height: parseInt(e.target.value) || 400 }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  min="100"
                  max="4000"
                />
              </div>
            </div>
          </div>

          {/* Filename */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filename
            </label>
            <input
              type="text"
              value={settings.filename}
              onChange={(e) => setSettings(prev => ({ ...prev, filename: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              placeholder="Enter filename (without extension)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Extension will be added automatically based on format
            </p>
          </div>

          {/* Advanced Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Advanced Options
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Scale Factor</label>
                <select
                  value={settings.scale}
                  onChange={(e) => setSettings(prev => ({ ...prev, scale: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value={1}>1x (Standard)</option>
                  <option value={2}>2x (High DPI)</option>
                  <option value={3}>3x (Ultra High DPI)</option>
                </select>
              </div>

              {settings.format === 'png' && (
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Background Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={settings.backgroundColor || '#ffffff'}
                      onChange={(e) => setSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      className="w-8 h-8 rounded border border-gray-300"
                    />
                    <input
                      type="text"
                      value={settings.backgroundColor || '#ffffff'}
                      onChange={(e) => setSettings(prev => ({ ...prev, backgroundColor: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="#ffffff"
                    />
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, backgroundColor: 'transparent' }))}
                      className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800"
                    >
                      Transparent
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Export Button */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={handleExport}
              disabled={!canExport || isExporting}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                canExport && !isExporting
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {isExporting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Exporting...</span>
                </div>
              ) : (
                `Export as ${settings.format.toUpperCase()}`
              )}
            </button>
          </div>

          {/* Export Info */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-700">
              <div><strong>Final size:</strong> {settings.width} × {settings.height}px</div>
              <div><strong>Scale:</strong> {settings.scale}x</div>
              <div><strong>Estimated file size:</strong> {
                settings.format === 'svg' ? '~50KB' :
                settings.format === 'png' ? `~${Math.round((settings.width * settings.height * settings.scale * settings.scale) / 10000)}KB` :
                `~${Math.round((settings.width * settings.height * settings.scale * settings.scale) / 15000)}KB`
              }</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportControls;
