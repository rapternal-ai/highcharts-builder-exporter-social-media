import { useState } from 'react';
import { useBuilderStore } from '../../store/builderStore';
import CSVUpload from '../../features/csv/CSVUpload';
import ColumnMapping from '../../features/mapping/ColumnMapping';
import ChartTypeSelector from '../../features/presets/ChartTypeSelector';
import ThemeSelector from '../../features/themes/ThemeSelector';
import ExportControls from '../../features/export/ExportControls';
import AdvancedSettings from './AdvancedSettings';
import { validateMapping } from '../../lib/validation/mappingValidator';
import { exportChart } from '../../lib/export/exportService';
import type { ExportSettings } from '../../features/export/ExportControls';

interface ControlPanelProps {
  chartRef?: React.RefObject<any>;
}


const TABS = [
  { id: 'data',     label: 'Data',     icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg> },
  { id: 'chart',    label: 'Chart',    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg> },
  { id: 'style',    label: 'Style',    icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg> },
  { id: 'advanced', label: 'Settings', icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { id: 'export',   label: 'Export',   icon: <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> },
];

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{children}</h3>
);

const ControlPanel = ({ chartRef }: ControlPanelProps) => {
  const [activeTab, setActiveTab] = useState('data');
  const { mode, dataset, mapping, title, setTitle, subtitle, setSubtitle, source, setSource } = useBuilderStore();

  const mappingValidation = dataset ? validateMapping(mapping, mode) : null;
  const canExport = !!(dataset && mapping.yFields && mapping.yFields.length > 0);

  const handleExport = async (settings: ExportSettings) => {
    if (!chartRef) { alert('Chart not available for export'); return; }
    try {
      const result = await exportChart(chartRef, settings);
      if (!result.success) alert(`Export failed: ${result.error}`);
    } catch (error) {
      alert(`Export error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab Bar */}
      <div className="flex border-b border-gray-200 bg-gray-50 flex-shrink-0">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Advanced Settings Tab — rendered directly, no padding wrapper */}
      {activeTab === 'advanced' && (
        <div className="flex-1 overflow-hidden">
          {canExport ? (
            <AdvancedSettings />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center px-5">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
              </div>
              <p className="text-sm text-gray-400">Set up your chart first to access advanced settings</p>
            </div>
          )}
        </div>
      )}

      {/* All other tabs — padded content wrapper */}
      {activeTab !== 'advanced' && (
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-7">

        {/* ─── DATA TAB ─── */}
        {activeTab === 'data' && (
          <>
            <section>
              <SectionLabel>Upload</SectionLabel>
              <CSVUpload />
              {dataset && (
                <div className="mt-3 flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-emerald-800 truncate">{dataset.sourceFileName}</p>
                    <p className="text-xs text-emerald-600">{dataset.rows.length} rows · {dataset.headers.length} columns</p>
                  </div>
                </div>
              )}
            </section>

            {dataset && (
              <section>
                <SectionLabel>Column Mapping</SectionLabel>
                <ColumnMapping />
                {mappingValidation && (
                  <div className="mt-4 space-y-2">
                    {mappingValidation.errors.map((err, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                        <span className="mt-0.5">⚠</span><span>{err}</span>
                      </div>
                    ))}
                    {mappingValidation.warnings.map((warn, i) => (
                      <div key={i} className="flex items-start gap-2 p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">
                        <span className="mt-0.5">ℹ</span><span>{warn}</span>
                      </div>
                    ))}
                    {mappingValidation.isValid && (
                      <div className="flex items-center gap-2 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>Mapping valid — select a chart type to continue</span>
                      </div>
                    )}
                  </div>
                )}
              </section>
            )}
          </>
        )}

        {/* ─── CHART TAB ─── */}
        {activeTab === 'chart' && (
          <>
            <section>
              <SectionLabel>Chart Type</SectionLabel>
              <ChartTypeSelector />
            </section>

            <section>
              <SectionLabel>Labels</SectionLabel>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Title</label>
                  <input
                    type="text"
                    value={title || ''}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter chart title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Subtitle <span className="text-gray-400 font-normal text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={subtitle || ''}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Enter subtitle..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Source <span className="text-gray-400 font-normal text-xs">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={source || ''}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="e.g., Source: Bloomberg, 2024"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </section>
          </>
        )}

        {/* ─── STYLE TAB ─── */}
        {activeTab === 'style' && (
          <section>
            <SectionLabel>Theme</SectionLabel>
            <ThemeSelector />
          </section>
        )}

        {/* ─── EXPORT TAB ─── */}
        {activeTab === 'export' && (
          <section>
            <SectionLabel>Export Chart</SectionLabel>
            {canExport ? (
              <ExportControls onExport={handleExport} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                </div>
                <p className="text-sm text-gray-400">Set up your chart first to enable export</p>
              </div>
            )}
          </section>
        )}

      </div>
      )}

    </div>
  );
};

export default ControlPanel;
