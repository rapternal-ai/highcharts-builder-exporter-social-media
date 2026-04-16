import { useBuilderStore } from '../../store/builderStore';

const ControlPanel = () => {
  const { mode } = useBuilderStore();

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

      {/* Placeholder sections for future stages */}
      <div className="space-y-6">
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">1. Data Upload</h3>
          <p className="text-sm text-gray-500">CSV upload coming in Stage 2</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">2. Column Mapping</h3>
          <p className="text-sm text-gray-500">Data mapping coming in Stage 3</p>
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
