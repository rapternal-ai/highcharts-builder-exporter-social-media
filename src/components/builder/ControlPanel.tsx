import { useBuilderStore } from '../../store/builderStore';
import CSVUpload from '../../features/csv/CSVUpload';
import ColumnMapping from '../../features/mapping/ColumnMapping';
import { validateMapping } from '../../lib/validation/mappingValidator';

const ControlPanel = () => {
  const { mode, dataset, mapping } = useBuilderStore();
  
  const mappingValidation = dataset ? validateMapping(mapping, mode) : null;

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Chart Builder
        </h2>
        <p className="text-sm text-gray-600">
          Current mode: <span className="font-medium capitalize">{mode}</span>
        </p>
      </div>

      {/* Stage sections */}
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">1. Data Upload</h3>
          <CSVUpload />
          {dataset && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-green-600">✅</span>
                <div>
                  <p className="text-sm font-medium text-green-800">
                    {dataset.sourceFileName}
                  </p>
                  <p className="text-xs text-green-700">
                    {dataset.rows.length} rows, {dataset.headers.length} columns
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-4">2. Column Mapping</h3>
          {dataset ? (
            <div>
              <ColumnMapping />
              {mappingValidation && (
                <div className="mt-4">
                  {mappingValidation.errors.length > 0 && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-2">
                      <div className="flex items-start space-x-2">
                        <span className="text-red-400">⚠️</span>
                        <div>
                          <h4 className="text-sm font-medium text-red-800">Mapping Issues</h4>
                          <ul className="text-sm text-red-700 mt-1 space-y-1">
                            {mappingValidation.errors.map((error, index) => (
                              <li key={index}>• {error}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {mappingValidation.warnings.length > 0 && (
                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-2">
                      <div className="flex items-start space-x-2">
                        <span className="text-yellow-400">⚡</span>
                        <div>
                          <h4 className="text-sm font-medium text-yellow-800">Suggestions</h4>
                          <ul className="text-sm text-yellow-700 mt-1 space-y-1">
                            {mappingValidation.warnings.map((warning, index) => (
                              <li key={index}>• {warning}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {mappingValidation.isValid && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">✅</span>
                        <p className="text-sm font-medium text-green-800">
                          Mapping configuration is valid
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">Upload a CSV file to configure column mapping</p>
          )}
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">3. Chart Type</h3>
          <p className="text-sm text-gray-500">Chart presets coming in Stage 4</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">4. Style & Theme</h3>
          <p className="text-sm text-gray-500">Themes coming in Stage 5</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">5. Export</h3>
          <p className="text-sm text-gray-500">Export options coming in Stage 6</p>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
