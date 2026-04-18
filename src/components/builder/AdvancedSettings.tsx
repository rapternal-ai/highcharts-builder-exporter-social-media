import { useState } from 'react';
import { useBuilderStore } from '../../store/builderStore';

const AdvancedSettings = () => {
  const [activePanel, setActivePanel] = useState<string>('titles');
  const {
    // Title settings
    titleAlign, setTitleAlign,
    subtitleAlign, setSubtitleAlign,
    titleUseHTML, setTitleUseHTML,
    showCaption, setShowCaption,
    captionText, setCaptionText,
    // Layout settings
    backgroundColor, setBackgroundColor,
    borderRadius, setBorderRadius,
    spacingPreset, setSpacingPreset,
    invertedChart, setInvertedChart,
    polar, setPolar,
    zoomType, setZoomType,
    scrollablePlotArea, setScrollablePlotArea,
    showCredits, setShowCredits,
    // X-Axis settings
    xAxisTitle, setXAxisTitle,
    xAxisType, setXAxisType,
    xAxisLabelRotation, setXAxisLabelRotation,
    xAxisLabelStep, setXAxisLabelStep,
    xAxisMin, setXAxisMin,
    xAxisMax, setXAxisMax,
    xAxisTickInterval, setXAxisTickInterval,
    xAxisShowGridlines, setXAxisShowGridlines,
    xAxisShowAxisLine, setXAxisShowAxisLine,
    xAxisReverse, setXAxisReverse,
    xAxisStartOnTick, setXAxisStartOnTick,
    xAxisEndOnTick, setXAxisEndOnTick,
    xAxisDateFormat, setXAxisDateFormat,
    // Y-Axis settings
    yAxisTitle, setYAxisTitle,
    yAxisSecondaryEnabled, setYAxisSecondaryEnabled,
    yAxisSecondaryTitle, setYAxisSecondaryTitle,
    yAxisMin, setYAxisMin,
    yAxisMax, setYAxisMax,
    yAxisSoftMin, setYAxisSoftMin,
    yAxisSoftMax, setYAxisSoftMax,
    yAxisTickInterval, setYAxisTickInterval,
    yAxisOpposite, setYAxisOpposite,
    yAxisShowGridlines, setYAxisShowGridlines,
    yAxisGridlineStyle, setYAxisGridlineStyle,
    yAxisAllowDecimals, setYAxisAllowDecimals,
    yAxisValuePrefix, setYAxisValuePrefix,
    yAxisValueSuffix, setYAxisValueSuffix,
    yAxisNumberFormat, setYAxisNumberFormat,
    // Series settings
    seriesStacking, setSeriesStacking,
    seriesLineWidth, setSeriesLineWidth,
    seriesMarkerEnabled, setSeriesMarkerEnabled,
    seriesMarkerSize, setSeriesMarkerSize,
    seriesDashStyle, setSeriesDashStyle,
    seriesFillOpacity, setSeriesFillOpacity,
    seriesBorderWidth, setSeriesBorderWidth,
    seriesPointPadding, setSeriesPointPadding,
    seriesGroupPadding, setSeriesGroupPadding,
    seriesConnectNulls, setSeriesConnectNulls,
    seriesAnimation, setSeriesAnimation,
    seriesAnimationDuration, setSeriesAnimationDuration,
    seriesShowDataLabels, setSeriesShowDataLabels,
    seriesShowInLegend, setSeriesShowInLegend,
    // Legend settings
    legendShow, setLegendShow,
    legendPosition, setLegendPosition,
    legendHorizontalAlign, setLegendHorizontalAlign,
    legendVerticalAlign, setLegendVerticalAlign,
    legendLayout, setLegendLayout,
    legendFloating, setLegendFloating,
    legendBackgroundColor, setLegendBackgroundColor,
    legendBorder, setLegendBorder,
    legendItemFontSize, setLegendItemFontSize,
    // Tooltip settings
    tooltipEnabled, setTooltipEnabled,
    tooltipShared, setTooltipShared,
    tooltipSplit, setTooltipSplit,
    tooltipUseHTML, setTooltipUseHTML,
    tooltipValueDecimals, setTooltipValueDecimals,
    tooltipValuePrefix, setTooltipValuePrefix,
    tooltipValueSuffix, setTooltipValueSuffix,
    tooltipDateFormat, setTooltipDateFormat,
    tooltipTemplateMode, setTooltipTemplateMode,
    tooltipBackgroundColor, setTooltipBackgroundColor,
    tooltipBorderRadius, setTooltipBorderRadius,
    // Labels settings
    dataLabelsEnabled, setDataLabelsEnabled,
    dataLabelPosition, setDataLabelPosition,
    dataLabelFormat, setDataLabelFormat,
    axisLabelFontSize, setAxisLabelFontSize,
    axisLabelColor, setAxisLabelColor,
    labelOverflow, setLabelOverflow,
    // Range selector settings
    rangeSelectorEnabled, setRangeSelectorEnabled,
    rangeSelectorButtons, setRangeSelectorButtons,
  } = useBuilderStore();

  const panels = [
    { id: 'titles', name: 'Titles', icon: '📝' },
    { id: 'layout', name: 'Layout', icon: '📐' },
    { id: 'xaxis', name: 'X-Axis', icon: '↔️' },
    { id: 'yaxis', name: 'Y-Axis', icon: '↕️' },
    { id: 'series', name: 'Series', icon: '📊' },
    { id: 'legend', name: 'Legend', icon: '🔖' },
    { id: 'tooltip', name: 'Tooltip', icon: '💡' },
    { id: 'labels', name: 'Labels', icon: '🏷️' },
    { id: 'zoom', name: 'Zoom', icon: '🔍' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Panel Navigation */}
      <div className="flex border-b border-gray-200 overflow-x-auto flex-shrink-0">
        {panels.map((panel) => (
          <button
            key={panel.id}
            onClick={() => setActivePanel(panel.id)}
            className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              activePanel === panel.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <span>{panel.icon}</span>
            <span>{panel.name}</span>
          </button>
        ))}
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activePanel === 'titles' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Title Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title Align</label>
                  <select
                    value={titleAlign || 'left'}
                    onChange={(e) => setTitleAlign(e.target.value as 'left' | 'center' | 'right')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle Align</label>
                  <select
                    value={subtitleAlign || 'left'}
                    onChange={(e) => setSubtitleAlign(e.target.value as 'left' | 'center' | 'right')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="titleUseHTML"
                    checked={titleUseHTML || false}
                    onChange={(e) => setTitleUseHTML(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="titleUseHTML" className="text-sm text-gray-700">Title use HTML</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="showCaption"
                    checked={showCaption || false}
                    onChange={(e) => setShowCaption(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="showCaption" className="text-sm text-gray-700">Show caption</label>
                </div>
                {showCaption && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Caption Text</label>
                    <textarea
                      value={captionText || ''}
                      onChange={(e) => setCaptionText(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Enter caption text..."
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activePanel === 'layout' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Layout Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                  <input
                    type="color"
                    value={backgroundColor || '#ffffff'}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius (px)</label>
                  <input
                    type="number"
                    value={borderRadius || 0}
                    onChange={(e) => setBorderRadius(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                    max="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Spacing Preset</label>
                  <select
                    value={spacingPreset || 'normal'}
                    onChange={(e) => setSpacingPreset(e.target.value as 'tight' | 'normal' | 'spacious')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="tight">Tight</option>
                    <option value="normal">Normal</option>
                    <option value="spacious">Spacious</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="invertedChart"
                    checked={invertedChart || false}
                    onChange={(e) => setInvertedChart(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="invertedChart" className="text-sm text-gray-700">Inverted chart</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="polar"
                    checked={polar || false}
                    onChange={(e) => setPolar(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="polar" className="text-sm text-gray-700">Polar</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zoom Type</label>
                  <select
                    value={zoomType || 'none'}
                    onChange={(e) => setZoomType(e.target.value as 'none' | 'x' | 'y' | 'xy')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="none">None</option>
                    <option value="x">X</option>
                    <option value="y">Y</option>
                    <option value="xy">XY</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="scrollablePlotArea"
                    checked={scrollablePlotArea || false}
                    onChange={(e) => setScrollablePlotArea(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="scrollablePlotArea" className="text-sm text-gray-700">Scrollable plot area</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="showCredits"
                    checked={showCredits !== false}
                    onChange={(e) => setShowCredits(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="showCredits" className="text-sm text-gray-700">Show credits</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'xaxis' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">X-Axis Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Axis Title</label>
                  <input
                    type="text"
                    value={xAxisTitle || ''}
                    onChange={(e) => setXAxisTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Enter axis title..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Axis Type</label>
                  <select
                    value={xAxisType || 'category'}
                    onChange={(e) => setXAxisType(e.target.value as 'category' | 'linear' | 'datetime' | 'logarithmic')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="category">Category</option>
                    <option value="linear">Linear</option>
                    <option value="datetime">Datetime</option>
                    <option value="logarithmic">Logarithmic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Label Rotation (°)</label>
                  <select
                    value={xAxisLabelRotation !== undefined ? xAxisLabelRotation : 0}
                    onChange={(e) => setXAxisLabelRotation(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value={0}>0°</option>
                    <option value={-45}>-45°</option>
                    <option value={-90}>-90°</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Label Step</label>
                  <input
                    type="number"
                    value={xAxisLabelStep || 1}
                    onChange={(e) => setXAxisLabelStep(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min</label>
                    <input
                      type="number"
                      value={xAxisMin || ''}
                      onChange={(e) => setXAxisMin(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max</label>
                    <input
                      type="number"
                      value={xAxisMax || ''}
                      onChange={(e) => setXAxisMax(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tick Interval</label>
                  <input
                    type="number"
                    value={xAxisTickInterval || ''}
                    onChange={(e) => setXAxisTickInterval(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                  <select
                    value={xAxisDateFormat || 'auto'}
                    onChange={(e) => setXAxisDateFormat(e.target.value as 'auto' | 'MMM YYYY' | 'MMM D, YYYY' | 'YYYY-MM-DD' | 'Q YYYY' | 'custom')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="auto">Auto (MM/DD/YYYY)</option>
                    <option value="MMM YYYY">Jan 2021</option>
                    <option value="MMM D, YYYY">Jan 5, 2021</option>
                    <option value="YYYY-MM-DD">2021-01-05</option>
                    <option value="Q YYYY">Q1 2021</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="xAxisShowGridlines"
                    checked={xAxisShowGridlines !== false}
                    onChange={(e) => setXAxisShowGridlines(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="xAxisShowGridlines" className="text-sm text-gray-700">Show gridlines</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="xAxisShowAxisLine"
                    checked={xAxisShowAxisLine !== false}
                    onChange={(e) => setXAxisShowAxisLine(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="xAxisShowAxisLine" className="text-sm text-gray-700">Show axis line</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="xAxisReverse"
                    checked={xAxisReverse || false}
                    onChange={(e) => setXAxisReverse(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="xAxisReverse" className="text-sm text-gray-700">Reverse axis</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="xAxisStartOnTick"
                    checked={xAxisStartOnTick !== false}
                    onChange={(e) => setXAxisStartOnTick(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="xAxisStartOnTick" className="text-sm text-gray-700">Start on tick</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="xAxisEndOnTick"
                    checked={xAxisEndOnTick !== false}
                    onChange={(e) => setXAxisEndOnTick(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="xAxisEndOnTick" className="text-sm text-gray-700">End on tick</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'yaxis' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Y-Axis Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Axis Title</label>
                  <input
                    type="text"
                    value={yAxisTitle || ''}
                    onChange={(e) => setYAxisTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="Enter axis title..."
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="yAxisSecondaryEnabled"
                    checked={yAxisSecondaryEnabled || false}
                    onChange={(e) => setYAxisSecondaryEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="yAxisSecondaryEnabled" className="text-sm text-gray-700">Secondary axis enabled</label>
                </div>
                {yAxisSecondaryEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Axis Title</label>
                    <input
                      type="text"
                      value={yAxisSecondaryTitle || ''}
                      onChange={(e) => setYAxisSecondaryTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Enter secondary axis title..."
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min</label>
                    <input
                      type="number"
                      value={yAxisMin || ''}
                      onChange={(e) => setYAxisMin(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max</label>
                    <input
                      type="number"
                      value={yAxisMax || ''}
                      onChange={(e) => setYAxisMax(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Soft Min</label>
                    <input
                      type="number"
                      value={yAxisSoftMin || ''}
                      onChange={(e) => setYAxisSoftMin(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Soft Max</label>
                    <input
                      type="number"
                      value={yAxisSoftMax || ''}
                      onChange={(e) => setYAxisSoftMax(Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tick Interval</label>
                  <input
                    type="number"
                    value={yAxisTickInterval || ''}
                    onChange={(e) => setYAxisTickInterval(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="yAxisOpposite"
                    checked={yAxisOpposite || false}
                    onChange={(e) => setYAxisOpposite(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="yAxisOpposite" className="text-sm text-gray-700">Opposite axis</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="yAxisShowGridlines"
                    checked={yAxisShowGridlines !== false}
                    onChange={(e) => setYAxisShowGridlines(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="yAxisShowGridlines" className="text-sm text-gray-700">Show gridlines</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gridline Style</label>
                  <select
                    value={yAxisGridlineStyle || 'solid'}
                    onChange={(e) => setYAxisGridlineStyle(e.target.value as 'solid' | 'dashed' | 'dotted')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="solid">Solid</option>
                    <option value="dashed">Dashed</option>
                    <option value="dotted">Dotted</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="yAxisAllowDecimals"
                    checked={yAxisAllowDecimals !== false}
                    onChange={(e) => setYAxisAllowDecimals(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="yAxisAllowDecimals" className="text-sm text-gray-700">Allow decimals</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value Prefix</label>
                  <input
                    type="text"
                    value={yAxisValuePrefix || ''}
                    onChange={(e) => setYAxisValuePrefix(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="e.g., $"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value Suffix</label>
                  <input
                    type="text"
                    value={yAxisValueSuffix || ''}
                    onChange={(e) => setYAxisValueSuffix(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="e.g., %"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number Format Preset</label>
                  <select
                    value={yAxisNumberFormat || 'plain'}
                    onChange={(e) => setYAxisNumberFormat(e.target.value as 'plain' | 'currency' | 'percent' | 'thousands' | 'millions' | 'billions')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="plain">Plain number</option>
                    <option value="currency">Currency</option>
                    <option value="percent">Percent</option>
                    <option value="thousands">Thousands</option>
                    <option value="millions">Millions</option>
                    <option value="billions">Billions</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'series' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Series Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stacking</label>
                  <select
                    value={seriesStacking || 'none'}
                    onChange={(e) => setSeriesStacking(e.target.value as 'none' | 'normal' | 'percent')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="none">None</option>
                    <option value="normal">Normal</option>
                    <option value="percent">Percent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Line Width</label>
                  <input
                    type="number"
                    value={seriesLineWidth || 2}
                    onChange={(e) => setSeriesLineWidth(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                    max="10"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="seriesMarkerEnabled"
                    checked={seriesMarkerEnabled !== false}
                    onChange={(e) => setSeriesMarkerEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="seriesMarkerEnabled" className="text-sm text-gray-700">Marker enabled</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marker Size</label>
                  <input
                    type="number"
                    value={seriesMarkerSize || 6}
                    onChange={(e) => setSeriesMarkerSize(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                    max="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dash Style</label>
                  <select
                    value={seriesDashStyle || 'Solid'}
                    onChange={(e) => setSeriesDashStyle(e.target.value as 'Solid' | 'ShortDash' | 'Dot' | 'Dash' | 'LongDash')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="Solid">Solid</option>
                    <option value="ShortDash">ShortDash</option>
                    <option value="Dot">Dot</option>
                    <option value="Dash">Dash</option>
                    <option value="LongDash">LongDash</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fill Opacity</label>
                  <input
                    type="range"
                    value={seriesFillOpacity || 0.75}
                    onChange={(e) => setSeriesFillOpacity(Number(e.target.value))}
                    className="w-full"
                    min="0"
                    max="1"
                    step="0.05"
                  />
                  <span className="text-xs text-gray-500">{Math.round((seriesFillOpacity || 0.75) * 100)}%</span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Border Width</label>
                  <input
                    type="number"
                    value={seriesBorderWidth || 0}
                    onChange={(e) => setSeriesBorderWidth(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                    max="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Point Padding</label>
                  <input
                    type="number"
                    value={seriesPointPadding || 0}
                    onChange={(e) => setSeriesPointPadding(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                    max="1"
                    step="0.1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Group Padding</label>
                  <input
                    type="number"
                    value={seriesGroupPadding || 0}
                    onChange={(e) => setSeriesGroupPadding(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                    max="1"
                    step="0.1"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="seriesConnectNulls"
                    checked={seriesConnectNulls !== false}
                    onChange={(e) => setSeriesConnectNulls(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="seriesConnectNulls" className="text-sm text-gray-700">Connect nulls</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="seriesAnimation"
                    checked={seriesAnimation !== false}
                    onChange={(e) => setSeriesAnimation(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="seriesAnimation" className="text-sm text-gray-700">Animation</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Animation Duration (ms)</label>
                  <input
                    type="number"
                    value={seriesAnimationDuration || 1000}
                    onChange={(e) => setSeriesAnimationDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                    max="5000"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="seriesShowDataLabels"
                    checked={seriesShowDataLabels || false}
                    onChange={(e) => setSeriesShowDataLabels(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="seriesShowDataLabels" className="text-sm text-gray-700">Show data labels</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="seriesShowInLegend"
                    checked={seriesShowInLegend !== false}
                    onChange={(e) => setSeriesShowInLegend(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="seriesShowInLegend" className="text-sm text-gray-700">Show in legend</label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'legend' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Legend Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="legendShow"
                    checked={legendShow !== false}
                    onChange={(e) => setLegendShow(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="legendShow" className="text-sm text-gray-700">Show legend</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Legend Position</label>
                  <select
                    value={legendPosition || 'top'}
                    onChange={(e) => setLegendPosition(e.target.value as 'top' | 'right' | 'bottom' | 'left')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="top">Top</option>
                    <option value="right">Right</option>
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Horizontal Align</label>
                  <select
                    value={legendHorizontalAlign || 'center'}
                    onChange={(e) => setLegendHorizontalAlign(e.target.value as 'left' | 'center' | 'right')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Vertical Align</label>
                  <select
                    value={legendVerticalAlign || 'top'}
                    onChange={(e) => setLegendVerticalAlign(e.target.value as 'top' | 'middle' | 'bottom')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="top">Top</option>
                    <option value="middle">Middle</option>
                    <option value="bottom">Bottom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Legend Layout</label>
                  <select
                    value={legendLayout || 'horizontal'}
                    onChange={(e) => setLegendLayout(e.target.value as 'horizontal' | 'vertical')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="horizontal">Horizontal</option>
                    <option value="vertical">Vertical</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="legendFloating"
                    checked={legendFloating || false}
                    onChange={(e) => setLegendFloating(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="legendFloating" className="text-sm text-gray-700">Floating legend</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Legend Background Color</label>
                  <input
                    type="color"
                    value={legendBackgroundColor || '#ffffff'}
                    onChange={(e) => setLegendBackgroundColor(e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="legendBorder"
                    checked={legendBorder || false}
                    onChange={(e) => setLegendBorder(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="legendBorder" className="text-sm text-gray-700">Legend border</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Legend Item Font Size</label>
                  <select
                    value={legendItemFontSize || '12px'}
                    onChange={(e) => setLegendItemFontSize(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="10px">10px</option>
                    <option value="12px">12px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                    <option value="18px">18px</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'tooltip' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Tooltip Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="tooltipEnabled"
                    checked={tooltipEnabled !== false}
                    onChange={(e) => setTooltipEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="tooltipEnabled" className="text-sm text-gray-700">Enable tooltip</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="tooltipShared"
                    checked={tooltipShared !== false}
                    onChange={(e) => setTooltipShared(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="tooltipShared" className="text-sm text-gray-700">Shared tooltip</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="tooltipSplit"
                    checked={tooltipSplit || false}
                    onChange={(e) => setTooltipSplit(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="tooltipSplit" className="text-sm text-gray-700">Split tooltip</label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="tooltipUseHTML"
                    checked={tooltipUseHTML || false}
                    onChange={(e) => setTooltipUseHTML(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="tooltipUseHTML" className="text-sm text-gray-700">Use HTML</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value Decimals</label>
                  <input
                    type="number"
                    value={tooltipValueDecimals !== undefined ? tooltipValueDecimals : 2}
                    onChange={(e) => setTooltipValueDecimals(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                    max="10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value Prefix</label>
                  <input
                    type="text"
                    value={tooltipValuePrefix || ''}
                    onChange={(e) => setTooltipValuePrefix(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="e.g., $"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Value Suffix</label>
                  <input
                    type="text"
                    value={tooltipValueSuffix || ''}
                    onChange={(e) => setTooltipValueSuffix(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    placeholder="e.g., %"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Format Preset</label>
                  <select
                    value={tooltipDateFormat || 'auto'}
                    onChange={(e) => setTooltipDateFormat(e.target.value as 'auto' | 'MMM YYYY' | 'MMM D, YYYY' | 'YYYY-MM-DD' | 'Q YYYY' | 'custom')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="auto">Auto</option>
                    <option value="MMM YYYY">Jan 2021</option>
                    <option value="MMM D, YYYY">Jan 5, 2021</option>
                    <option value="YYYY-MM-DD">2021-01-05</option>
                    <option value="Q YYYY">Q1 2021</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tooltip Template Mode</label>
                  <select
                    value={tooltipTemplateMode || 'default'}
                    onChange={(e) => setTooltipTemplateMode(e.target.value as 'default' | 'compact' | 'detailed' | 'custom')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="default">Default</option>
                    <option value="compact">Compact</option>
                    <option value="detailed">Detailed</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Background Color</label>
                  <input
                    type="color"
                    value={tooltipBackgroundColor || '#ffffff'}
                    onChange={(e) => setTooltipBackgroundColor(e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Border Radius (px)</label>
                  <input
                    type="number"
                    value={tooltipBorderRadius || 3}
                    onChange={(e) => setTooltipBorderRadius(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min="0"
                    max="20"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'labels' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Labels Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="dataLabelsEnabled"
                    checked={dataLabelsEnabled || false}
                    onChange={(e) => setDataLabelsEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="dataLabelsEnabled" className="text-sm text-gray-700">Data labels enabled</label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Label Position</label>
                  <select
                    value={dataLabelPosition || 'auto'}
                    onChange={(e) => setDataLabelPosition(e.target.value as 'auto' | 'inside' | 'outside' | 'above')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="auto">Auto</option>
                    <option value="inside">Inside</option>
                    <option value="outside">Outside</option>
                    <option value="above">Above</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Data Label Format Preset</label>
                  <select
                    value={dataLabelFormat || 'value'}
                    onChange={(e) => setDataLabelFormat(e.target.value as 'value' | 'percent' | 'category-value' | 'custom')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="value">Value</option>
                    <option value="percent">Percent</option>
                    <option value="category-value">Category + value</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Axis Label Font Size</label>
                  <select
                    value={axisLabelFontSize || '12px'}
                    onChange={(e) => setAxisLabelFontSize(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="10px">10px</option>
                    <option value="11px">11px</option>
                    <option value="12px">12px</option>
                    <option value="13px">13px</option>
                    <option value="14px">14px</option>
                    <option value="16px">16px</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Axis Label Color</label>
                  <input
                    type="color"
                    value={axisLabelColor || '#666666'}
                    onChange={(e) => setAxisLabelColor(e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Label Overflow Handling</label>
                  <select
                    value={labelOverflow || 'wrap'}
                    onChange={(e) => setLabelOverflow(e.target.value as 'wrap' | 'truncate' | 'rotate')}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="wrap">Wrap</option>
                    <option value="truncate">Truncate</option>
                    <option value="rotate">Rotate</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePanel === 'zoom' && (
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Date Range Selector</h4>
              <p className="text-sm text-gray-600 mb-4">Add a date range selector to zoom into specific time periods.</p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="rangeSelectorEnabled"
                    checked={rangeSelectorEnabled || false}
                    onChange={(e) => setRangeSelectorEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="rangeSelectorEnabled" className="text-sm text-gray-700">Enable Range Selector</label>
                </div>

                {rangeSelectorEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Range Buttons</label>
                    <div className="space-y-2">
                      {['1m', '3m', '6m', 'ytd', '1y', 'all'].map((button) => (
                        <label key={button} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={rangeSelectorButtons?.includes(button as any) || false}
                            onChange={(e) => {
                              const currentButtons = rangeSelectorButtons || [];
                              if (e.target.checked) {
                                setRangeSelectorButtons([...currentButtons, button as any]);
                              } else {
                                setRangeSelectorButtons(currentButtons.filter(b => b !== button));
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-700">{button.toUpperCase()}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdvancedSettings;
