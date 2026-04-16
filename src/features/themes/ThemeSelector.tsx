import { useState } from 'react';
import { useBuilderStore } from '../../store/builderStore';
import { getAllThemes, getThemeById } from '../../data/themeLibrary';

const ColorPalette = ({ colors, size = 'sm' }: { colors: string[]; size?: 'sm' | 'md' }) => {
  const sizeClasses = size === 'md' ? 'w-6 h-6' : 'w-4 h-4';
  
  return (
    <div className="flex space-x-1">
      {colors.slice(0, 5).map((color, index) => (
        <div
          key={index}
          className={`${sizeClasses} rounded-full border border-gray-300`}
          style={{ backgroundColor: color }}
        />
      ))}
      {colors.length > 5 && (
        <div className={`${sizeClasses} rounded-full border border-gray-300 bg-gray-100 flex items-center justify-center`}>
          <span className="text-xs text-gray-600">+{colors.length - 5}</span>
        </div>
      )}
    </div>
  );
};

const ThemeCard = ({ themeId, isSelected, onSelect }: {
  themeId: string;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const theme = getThemeById(themeId);
  if (!theme) return null;

  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="space-y-3">
        {/* Theme Preview */}
        <div 
          className="h-16 rounded-md border border-gray-200 p-2"
          style={{ backgroundColor: theme.backgroundColor }}
        >
          <div className="h-full flex flex-col justify-between">
            <div>
              <div 
                className="text-xs font-medium"
                style={{ color: theme.titleStyle.color as string }}
              >
                {theme.name} Preview
              </div>
              <div 
                className="text-xs"
                style={{ color: theme.subtitleStyle.color as string }}
              >
                Sample subtitle
              </div>
            </div>
            <ColorPalette colors={theme.palette} size="sm" />
          </div>
        </div>

        {/* Theme Info */}
        <div>
          <h4 className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
            {theme.name}
          </h4>
          <div className="flex items-center justify-between mt-2">
            <span className={`text-xs ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
              {theme.fontFamily.split(',')[0].replace(/"/g, '')}
            </span>
            <ColorPalette colors={theme.palette} />
          </div>
        </div>
      </div>
    </button>
  );
};

const CustomThemeEditor = ({ themeId }: { themeId: string }) => {
  const theme = getThemeById(themeId);
  const [customizations, setCustomizations] = useState({
    titleColor: theme?.titleStyle.color as string || '#333333',
    backgroundColor: theme?.backgroundColor || '#ffffff',
    primaryColor: theme?.palette[0] || '#7cb5ec'
  });

  if (!theme) return null;

  return (
    <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
      <h5 className="font-medium text-gray-900">Customize Theme</h5>
      
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Background Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={customizations.backgroundColor}
              onChange={(e) => setCustomizations(prev => ({ ...prev, backgroundColor: e.target.value }))}
              className="w-8 h-8 rounded border border-gray-300"
            />
            <input
              type="text"
              value={customizations.backgroundColor}
              onChange={(e) => setCustomizations(prev => ({ ...prev, backgroundColor: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={customizations.titleColor}
              onChange={(e) => setCustomizations(prev => ({ ...prev, titleColor: e.target.value }))}
              className="w-8 h-8 rounded border border-gray-300"
            />
            <input
              type="text"
              value={customizations.titleColor}
              onChange={(e) => setCustomizations(prev => ({ ...prev, titleColor: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Primary Chart Color
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="color"
              value={customizations.primaryColor}
              onChange={(e) => setCustomizations(prev => ({ ...prev, primaryColor: e.target.value }))}
              className="w-8 h-8 rounded border border-gray-300"
            />
            <input
              type="text"
              value={customizations.primaryColor}
              onChange={(e) => setCustomizations(prev => ({ ...prev, primaryColor: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-2">
        <button className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
          Apply Changes
        </button>
        <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50">
          Reset
        </button>
      </div>
    </div>
  );
};

const ThemeSelector = () => {
  const { themeId, setThemeId } = useBuilderStore();
  const [showCustomEditor, setShowCustomEditor] = useState(false);
  
  const themes = getAllThemes();
  const selectedTheme = themeId ? getThemeById(themeId) : null;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">Chart Theme</h4>
        <p className="text-sm text-gray-600 mb-4">
          Choose a theme to style your chart's colors, fonts, and appearance.
        </p>
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 gap-4">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            themeId={theme.id}
            isSelected={themeId === theme.id}
            onSelect={() => setThemeId(theme.id)}
          />
        ))}
      </div>

      {/* Selected Theme Details */}
      {selectedTheme && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-medium text-blue-900">{selectedTheme.name}</h4>
              <div className="mt-2 space-y-1 text-sm text-blue-700">
                <div>Font: {selectedTheme.fontFamily.split(',')[0].replace(/"/g, '')}</div>
                <div>Background: {selectedTheme.backgroundColor}</div>
                <div className="flex items-center space-x-2">
                  <span>Colors:</span>
                  <ColorPalette colors={selectedTheme.palette} size="md" />
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowCustomEditor(!showCustomEditor)}
              className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800"
            >
              {showCustomEditor ? 'Hide Editor' : 'Customize'}
            </button>
          </div>
        </div>
      )}

      {/* Custom Theme Editor */}
      {showCustomEditor && selectedTheme && (
        <CustomThemeEditor themeId={selectedTheme.id} />
      )}

      {/* Export Settings */}
      {selectedTheme && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <h5 className="font-medium text-gray-900 mb-3">Export Settings</h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">Default Size:</span>
              <div className="font-medium">
                {selectedTheme.exportDefaults?.width} × {selectedTheme.exportDefaults?.height}px
              </div>
            </div>
            <div>
              <span className="text-gray-600">Line Width:</span>
              <div className="font-medium">
                {selectedTheme.lineWidthDefaults?.line}px
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
