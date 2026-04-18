import { useBuilderStore } from '../../store/builderStore';

interface FieldSelectorProps {
  label: string;
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  options: string[];
  required?: boolean;
  description?: string;
  icon?: string;
}

const FieldSelector = ({ label, value, onChange, options, required, description }: FieldSelectorProps) => {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-gray-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value || undefined)}
        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Select column...</option>
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      {description && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}
    </div>
  );
};

const ColumnMapping = () => {
  const { dataset, mapping, setMapping, mode } = useBuilderStore();

  if (!dataset) {
    return (
      <div className="py-6 text-center text-sm text-gray-400">
        Upload a CSV file to configure column mapping
      </div>
    );
  }

  const { headers, inferredTypes } = dataset;

  // Get columns by type for smart suggestions
  const getColumnsByType = (type: string) => {
    return headers.filter(header => inferredTypes[header] === type);
  };

  const numericColumns = getColumnsByType('number');
  const dateColumns = getColumnsByType('date');
  const stringColumns = getColumnsByType('string');
  const allColumns = headers;

  const updateMapping = (field: keyof typeof mapping, value: string | string[] | undefined) => {
    setMapping({
      ...mapping,
      [field]: value
    });
  };

  const isStockMode = mode === 'stock';

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-gray-500">
          Map columns to chart fields. Required fields marked with *.
        </p>
      </div>

      <div className="space-y-4">
        {/* X-Axis Field */}
        <FieldSelector
          label="X-Axis"
          icon="📊"
          value={mapping.xField}
          onChange={(value) => updateMapping('xField', value)}
          options={allColumns}
          required={!isStockMode}
          description={isStockMode ? "Optional for stock charts (uses date field if not specified)" : "Categories or values for the horizontal axis"}
        />

        {/* Date Field (for stock charts) */}
        {isStockMode && (
          <FieldSelector
            label="Date Field"
            icon="📅"
            value={mapping.dateField}
            onChange={(value) => updateMapping('dateField', value)}
            options={dateColumns.length > 0 ? dateColumns : allColumns}
            required={true}
            description="Date/time column for stock chart timeline"
          />
        )}

        {/* Y-Axis Fields */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700">
            Y-Axis (Values)<span className="text-red-500 ml-0.5">*</span>
          </label>
          
          <div className="space-y-2">
            {/* Primary Y field */}
            <select
              value={mapping.yFields?.[0] || ''}
              onChange={(e) => {
                const newYFields = [...(mapping.yFields || [])];
                if (e.target.value) {
                  newYFields[0] = e.target.value;
                } else {
                  newYFields.splice(0, 1);
                }
                updateMapping('yFields', newYFields.length > 0 ? newYFields : undefined);
              }}
              className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select primary value column...</option>
              {numericColumns.length > 0 ? numericColumns.map((option) => (
                <option key={option} value={option}>
                  {option} (number)
                </option>
              )) : allColumns.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Additional Y fields for multi-series */}
            {!isStockMode && mapping.yFields && mapping.yFields.length > 0 && (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const newYFields = [...(mapping.yFields || []), ''];
                    updateMapping('yFields', newYFields);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  + Add another series
                </button>
                
                {mapping.yFields.slice(1).map((field, index) => (
                  <div key={index + 1} className="flex space-x-2">
                    <select
                      value={field}
                      onChange={(e) => {
                        const newYFields = [...(mapping.yFields || [])];
                        if (e.target.value) {
                          newYFields[index + 1] = e.target.value;
                        } else {
                          newYFields.splice(index + 1, 1);
                        }
                        updateMapping('yFields', newYFields);
                      }}
                      className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select additional series...</option>
                      {numericColumns.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        const newYFields = [...(mapping.yFields || [])];
                        newYFields.splice(index + 1, 1);
                        updateMapping('yFields', newYFields);
                      }}
                      className="px-2 py-2 text-red-600 hover:text-red-800"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <p className="text-xs text-gray-500">
            {isStockMode ? "Select the main value column (price, close, etc.)" : "Select one or more numeric columns for chart values"}
          </p>
        </div>

        {/* Stock-specific fields */}
        {isStockMode && (
          <>
            <FieldSelector
              label="Open Price"
              icon="📊"
              value={mapping.openField}
              onChange={(value) => updateMapping('openField', value)}
              options={numericColumns.length > 0 ? numericColumns : allColumns}
              description="Opening price for OHLC charts"
            />

            <FieldSelector
              label="High Price"
              icon="📈"
              value={mapping.highField}
              onChange={(value) => updateMapping('highField', value)}
              options={numericColumns.length > 0 ? numericColumns : allColumns}
              description="Highest price for OHLC charts"
            />

            <FieldSelector
              label="Low Price"
              icon="📉"
              value={mapping.lowField}
              onChange={(value) => updateMapping('lowField', value)}
              options={numericColumns.length > 0 ? numericColumns : allColumns}
              description="Lowest price for OHLC charts"
            />

            <FieldSelector
              label="Close Price"
              icon="🎯"
              value={mapping.closeField}
              onChange={(value) => updateMapping('closeField', value)}
              options={numericColumns.length > 0 ? numericColumns : allColumns}
              description="Closing price for OHLC charts"
            />

            <FieldSelector
              label="Volume"
              icon="📊"
              value={mapping.volumeField}
              onChange={(value) => updateMapping('volumeField', value)}
              options={numericColumns.length > 0 ? numericColumns : allColumns}
              description="Trading volume for volume charts"
            />
          </>
        )}

        {/* Common optional fields */}
        <FieldSelector
          label="Group By"
          icon="🏷️"
          value={mapping.groupField}
          onChange={(value) => updateMapping('groupField', value)}
          options={stringColumns.length > 0 ? stringColumns : allColumns}
          description="Column to group data into separate series"
        />

        <FieldSelector
          label="Labels"
          icon="🏷️"
          value={mapping.labelField}
          onChange={(value) => updateMapping('labelField', value)}
          options={allColumns}
          description="Column to use for data point labels"
        />
      </div>

      {/* Mapping Summary */}
      {(mapping.xField || mapping.yFields?.length || mapping.dateField) && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Summary</p>
          <div className="space-y-1 text-sm">
            {mapping.dateField && (
              <div><span className="text-gray-500">Date:</span> {mapping.dateField}</div>
            )}
            {mapping.xField && (
              <div><span className="text-gray-500">X-Axis:</span> {mapping.xField}</div>
            )}
            {mapping.yFields && mapping.yFields.length > 0 && (
              <div><span className="text-gray-500">Y-Axis:</span> {mapping.yFields.join(', ')}</div>
            )}
            {mapping.groupField && (
              <div><span className="text-gray-500">Group By:</span> {mapping.groupField}</div>
            )}
            {isStockMode && mapping.openField && (
              <div><span className="text-gray-500">OHLC:</span> O:{mapping.openField}, H:{mapping.highField}, L:{mapping.lowField}, C:{mapping.closeField}</div>
            )}
            {mapping.volumeField && (
              <div><span className="text-gray-500">Volume:</span> {mapping.volumeField}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnMapping;
