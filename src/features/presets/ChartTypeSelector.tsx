import { useBuilderStore } from '../../store/builderStore';
import { getPresetsByMode, getPresetById, type PresetDefinition } from '../../data/presetLibrary';
import { validateMapping } from '../../lib/validation/mappingValidator';

const PresetCard = ({ preset, isSelected, onSelect, isDisabled }: {
  preset: PresetDefinition;
  isSelected: boolean;
  onSelect: () => void;
  isDisabled: boolean;
}) => {
  return (
    <button
      onClick={onSelect}
      disabled={isDisabled}
      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
        isSelected
          ? 'border-blue-500 bg-blue-50'
          : isDisabled
          ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-start space-x-3">
        <span className="text-2xl">{preset.icon}</span>
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
            {preset.name}
          </h4>
          <p className={`text-sm mt-1 ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
            {preset.description}
          </p>
          {preset.category === 'advanced' && (
            <span className="inline-block mt-2 px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">
              Advanced
            </span>
          )}
          {preset.category === 'financial' && (
            <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
              Financial
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

const ChartTypeSelector = () => {
  const { mode, preset, setPreset, mapping, dataset } = useBuilderStore();

  if (!dataset) {
    return (
      <div className="text-center py-6 text-gray-500">
        <p>Upload a CSV file and configure mapping to select chart types</p>
      </div>
    );
  }

  const availablePresets = getPresetsByMode(mode);
  const mappingValidation = validateMapping(mapping, mode, preset);

  // Check if a preset is compatible with current mapping
  const isPresetCompatible = (presetDef: PresetDefinition): boolean => {
    // Check required fields
    for (const field of presetDef.requiredFields) {
      if (field === 'yFields') {
        if (!mapping.yFields || mapping.yFields.length === 0) return false;
      } else if (field === 'dateField') {
        if (!mapping.dateField) return false;
      } else if (field === 'openField') {
        if (!mapping.openField) return false;
      } else if (field === 'highField') {
        if (!mapping.highField) return false;
      } else if (field === 'lowField') {
        if (!mapping.lowField) return false;
      } else if (field === 'closeField') {
        if (!mapping.closeField) return false;
      } else if (field === 'volumeField') {
        if (!mapping.volumeField) return false;
      }
    }

    // Check multi-series compatibility
    if (!presetDef.supportsMultiSeries && mapping.yFields && mapping.yFields.length > 1) {
      return false;
    }

    return true;
  };

  const basicPresets = availablePresets.filter(p => p.category === 'basic');
  const advancedPresets = availablePresets.filter(p => p.category === 'advanced');
  const financialPresets = availablePresets.filter(p => p.category === 'financial');

  const selectedPreset = preset ? getPresetById(preset) : null;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="font-medium text-gray-900 mb-2">
          {mode === 'stock' ? 'Stock Chart Types' : 'Standard Chart Types'}
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          Choose a chart type that matches your data and visualization goals.
        </p>
      </div>

      {/* Basic Charts */}
      {basicPresets.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-3">Basic Charts</h5>
          <div className="grid grid-cols-1 gap-3">
            {basicPresets.map((presetDef) => (
              <PresetCard
                key={presetDef.id}
                preset={presetDef}
                isSelected={preset === presetDef.id}
                onSelect={() => setPreset(presetDef.id)}
                isDisabled={!isPresetCompatible(presetDef)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Advanced Charts */}
      {advancedPresets.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-3">Advanced Charts</h5>
          <div className="grid grid-cols-1 gap-3">
            {advancedPresets.map((presetDef) => (
              <PresetCard
                key={presetDef.id}
                preset={presetDef}
                isSelected={preset === presetDef.id}
                onSelect={() => setPreset(presetDef.id)}
                isDisabled={!isPresetCompatible(presetDef)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Financial Charts */}
      {financialPresets.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-3">Financial Charts</h5>
          <div className="grid grid-cols-1 gap-3">
            {financialPresets.map((presetDef) => (
              <PresetCard
                key={presetDef.id}
                preset={presetDef}
                isSelected={preset === presetDef.id}
                onSelect={() => setPreset(presetDef.id)}
                isDisabled={!isPresetCompatible(presetDef)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Selected Preset Info */}
      {selectedPreset && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start space-x-3">
            <span className="text-2xl">{selectedPreset.icon}</span>
            <div>
              <h4 className="font-medium text-blue-900">{selectedPreset.name}</h4>
              <p className="text-sm text-blue-700 mt-1">{selectedPreset.description}</p>
              
              <div className="mt-3 space-y-2">
                <div>
                  <span className="text-xs font-medium text-blue-800">Required fields:</span>
                  <div className="text-xs text-blue-700">
                    {selectedPreset.requiredFields.map(field => {
                      const fieldNames: Record<string, string> = {
                        yFields: 'Y-axis values',
                        dateField: 'Date field',
                        openField: 'Open price',
                        highField: 'High price',
                        lowField: 'Low price',
                        closeField: 'Close price',
                        volumeField: 'Volume'
                      };
                      return fieldNames[field] || field;
                    }).join(', ')}
                  </div>
                </div>
                
                {selectedPreset.optionalFields.length > 0 && (
                  <div>
                    <span className="text-xs font-medium text-blue-800">Optional fields:</span>
                    <div className="text-xs text-blue-700">
                      {selectedPreset.optionalFields.map(field => {
                        const fieldNames: Record<string, string> = {
                          xField: 'X-axis categories',
                          groupField: 'Group by',
                          labelField: 'Labels',
                          volumeField: 'Volume'
                        };
                        return fieldNames[field] || field;
                      }).join(', ')}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Validation Messages */}
      {preset && !mappingValidation.isValid && (
        <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <span className="text-yellow-400">⚡</span>
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Chart Type Requirements</h4>
              <p className="text-sm text-yellow-700 mt-1">
                This chart type requires additional field mappings to work properly.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartTypeSelector;
