import { useState, useCallback } from 'react';
import { useBuilderStore } from '../../store/builderStore';
import { parseCSVFile } from '../../lib/csv/csvParser';

const CSVUpload = () => {
  const { setDataset, setMapping } = useBuilderStore();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.toLowerCase().endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      setError('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const result = await parseCSVFile(file);
      
      if (result.success && result.data) {
        setDataset(result.data);
        
        // Automatically set first column as X-axis field
        if (result.data.headers.length > 0) {
          setMapping({
            xField: result.data.headers[0],
            yFields: [],
            groupField: undefined,
            labelField: undefined,
            tooltipFields: []
          });
        }
        
        setError(null);
      } else {
        setError(result.error || 'Failed to parse CSV file');
      }
    } catch (err) {
      setError('An unexpected error occurred while processing the file');
    } finally {
      setIsUploading(false);
    }
  }, [setDataset, setMapping]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragOver
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        } ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {isUploading ? (
          <div className="space-y-2">
            <div className="text-gray-600">Processing CSV file...</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full animate-pulse w-1/2"></div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-4xl text-gray-400">📄</div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                Drop your CSV file here
              </p>
              <p className="text-sm text-gray-500 mt-1">
                or click to browse files
              </p>
            </div>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
              id="csv-file-input"
            />
            <label
              htmlFor="csv-file-input"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
            >
              Choose File
            </label>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex">
            <div className="text-red-400">⚠️</div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Upload Error</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      <div className="text-xs text-gray-500">
        <p>Supported format: CSV files up to 10MB</p>
        <p>The first row should contain column headers</p>
        <p>First column will be automatically selected as X-axis</p>
      </div>
    </div>
  );
};

export default CSVUpload;
