import { useEffect, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsStock from 'highcharts/modules/stock';
import HighchartsReact from 'highcharts-react-official';
import { useBuilderStore } from '../../store/builderStore';

// Initialize Highstock
HighchartsStock(Highcharts);

const ChartPreview = () => {
  const { mode } = useBuilderStore();
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  // Sample data for standard chart
  const standardChartOptions: Highcharts.Options = {
    title: {
      text: 'Sample Line Chart'
    },
    subtitle: {
      text: 'Standard Chart Mode'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yAxis: {
      title: {
        text: 'Values'
      }
    },
    series: [{
      type: 'line',
      name: 'Sample Data',
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0]
    }],
    credits: {
      enabled: false
    }
  };

  // Sample data for stock chart
  const stockChartOptions: Highcharts.Options = {
    title: {
      text: 'Sample Stock Chart'
    },
    subtitle: {
      text: 'Stock Chart Mode'
    },
    rangeSelector: {
      selected: 1
    },
    series: [{
      type: 'line',
      name: 'Sample Stock',
      data: [
        [Date.UTC(2023, 0, 1), 100],
        [Date.UTC(2023, 1, 1), 110],
        [Date.UTC(2023, 2, 1), 105],
        [Date.UTC(2023, 3, 1), 120],
        [Date.UTC(2023, 4, 1), 115],
        [Date.UTC(2023, 5, 1), 130]
      ]
    }],
    credits: {
      enabled: false
    }
  };

  const currentOptions = mode === 'standard' ? standardChartOptions : stockChartOptions;
  const HighchartsComponent = mode === 'standard' ? Highcharts : Highcharts;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Chart Preview</h2>
        <p className="text-sm text-gray-600">
          {mode === 'standard' ? 'Standard Chart' : 'Stock Chart'} • Live preview will update as you configure
        </p>
      </div>

      <div className="flex-1 bg-white rounded-lg border border-gray-200 p-6">
        {mode === 'standard' ? (
          <HighchartsReact
            highcharts={Highcharts}
            options={currentOptions}
            ref={chartComponentRef}
          />
        ) : (
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={currentOptions}
            ref={chartComponentRef}
          />
        )}
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Stage 1 Complete:</strong> Basic layout with mode toggle and sample charts. 
          CSV upload and data mapping will be added in subsequent stages.
        </p>
      </div>
    </div>
  );
};

export default ChartPreview;
