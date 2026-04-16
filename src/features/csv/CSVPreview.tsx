import { useBuilderStore } from '../../store/builderStore';

const CSVPreview = () => {
  const { dataset } = useBuilderStore();

  if (!dataset) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Upload a CSV file to see preview</p>
      </div>
    );
  }

  const { headers, rows, inferredTypes, sourceFileName } = dataset;
  const previewRows = rows.slice(0, 5); // Show first 5 rows

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'number': return 'bg-blue-100 text-blue-800';
      case 'date': return 'bg-green-100 text-green-800';
      case 'boolean': return 'bg-purple-100 text-purple-800';
      case 'string': return 'bg-gray-100 text-gray-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'number': return '🔢';
      case 'date': return '📅';
      case 'boolean': return '✅';
      case 'string': return '📝';
      default: return '❓';
    }
  };

  return (
    <div className="space-y-4">
      {/* File Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <span className="text-blue-600">📄</span>
          <div>
            <h3 className="font-medium text-blue-900">{sourceFileName}</h3>
            <p className="text-sm text-blue-700">
              {rows.length} rows, {headers.length} columns
            </p>
          </div>
        </div>
      </div>

      {/* Column Types */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Detected Column Types</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {headers.map((header) => (
            <div key={header} className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(inferredTypes[header])}`}>
                <span className="mr-1">{getTypeIcon(inferredTypes[header])}</span>
                {inferredTypes[header]}
              </span>
              <span className="text-sm text-gray-700 truncate">{header}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data Preview */}
      <div>
        <h4 className="font-medium text-gray-900 mb-3">Data Preview (first 5 rows)</h4>
        <div className="overflow-x-auto border border-gray-200 rounded-lg max-h-96">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {headers.slice(0, 6).map((header) => (
                  <th
                    key={header}
                    className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ minWidth: '100px', maxWidth: '150px' }}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{getTypeIcon(inferredTypes[header])}</span>
                      <span className="truncate" title={header}>{header}</span>
                    </div>
                  </th>
                ))}
                {headers.length > 6 && (
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500">
                    +{headers.length - 6} more
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {previewRows.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  {headers.slice(0, 6).map((header) => (
                    <td key={header} className="px-3 py-2 text-sm text-gray-900" style={{ maxWidth: '150px' }}>
                      <div className="truncate" title={String(row[header] || '')}>
                        {row[header] === null ? (
                          <span className="text-gray-400 italic">null</span>
                        ) : (
                          String(row[header])
                        )}
                      </div>
                    </td>
                  ))}
                  {headers.length > 6 && (
                    <td className="px-3 py-2 text-sm text-gray-500">
                      ...
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-2 flex justify-between text-sm text-gray-500">
          <span>
            {rows.length > 5 && `... and ${rows.length - 5} more rows`}
          </span>
          <span>
            {headers.length > 6 && `Showing 6 of ${headers.length} columns`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CSVPreview;
