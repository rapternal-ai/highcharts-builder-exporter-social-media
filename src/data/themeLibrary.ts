import type { ChartTheme } from '../types';

export const DEFAULT_THEMES: ChartTheme[] = [
  {
    id: 'default',
    name: 'Default',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#ffffff',
    titleStyle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333333'
    },
    subtitleStyle: {
      fontSize: '14px',
      color: '#666666'
    },
    axisLabelStyle: {
      fontSize: '12px',
      color: '#666666'
    },
    legendStyle: {
      fontSize: '12px',
      color: '#333333'
    },
    tooltipStyle: {
      fontSize: '12px',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      color: '#ffffff'
    },
    palette: ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'],
    gridLineColor: '#e6e6e6',
    lineWidthDefaults: {
      line: 2,
      area: 2,
      stock: 1
    },
    exportDefaults: {
      width: 800,
      height: 400,
      scale: 1
    }
  },
  {
    id: 'dark',
    name: 'Dark Theme',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#2a2a2b',
    titleStyle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#ffffff'
    },
    subtitleStyle: {
      fontSize: '14px',
      color: '#cccccc'
    },
    axisLabelStyle: {
      fontSize: '12px',
      color: '#cccccc'
    },
    legendStyle: {
      fontSize: '12px',
      color: '#ffffff'
    },
    tooltipStyle: {
      fontSize: '12px',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      color: '#ffffff'
    },
    palette: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF'],
    gridLineColor: '#505053',
    lineWidthDefaults: {
      line: 2,
      area: 2,
      stock: 1
    },
    exportDefaults: {
      width: 800,
      height: 400,
      scale: 1
    }
  },
  {
    id: 'corporate',
    name: 'Corporate Blue',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#ffffff',
    titleStyle: {
      fontSize: '20px',
      fontWeight: 'bold',
      color: '#1f4e79'
    },
    subtitleStyle: {
      fontSize: '14px',
      color: '#5b9bd5'
    },
    axisLabelStyle: {
      fontSize: '11px',
      color: '#70ad47'
    },
    legendStyle: {
      fontSize: '12px',
      color: '#1f4e79'
    },
    tooltipStyle: {
      fontSize: '12px',
      backgroundColor: 'rgba(31, 78, 121, 0.9)',
      color: '#ffffff'
    },
    palette: ['#1f4e79', '#5b9bd5', '#70ad47', '#ffc000', '#c55a11', '#843c0c', '#7030a0', '#44546a'],
    gridLineColor: '#d9d9d9',
    lineWidthDefaults: {
      line: 3,
      area: 2,
      stock: 2
    },
    exportDefaults: {
      width: 1000,
      height: 500,
      scale: 1
    }
  },
  {
    id: 'minimal',
    name: 'Minimal',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    backgroundColor: '#fafafa',
    titleStyle: {
      fontSize: '16px',
      fontWeight: '300',
      color: '#2c3e50'
    },
    subtitleStyle: {
      fontSize: '13px',
      color: '#7f8c8d'
    },
    axisLabelStyle: {
      fontSize: '11px',
      color: '#95a5a6'
    },
    legendStyle: {
      fontSize: '11px',
      color: '#2c3e50'
    },
    tooltipStyle: {
      fontSize: '11px',
      backgroundColor: 'rgba(44, 62, 80, 0.8)',
      color: '#ffffff'
    },
    palette: ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#e67e22'],
    gridLineColor: '#ecf0f1',
    lineWidthDefaults: {
      line: 1,
      area: 1,
      stock: 1
    },
    exportDefaults: {
      width: 600,
      height: 300,
      scale: 1
    }
  },
  {
    id: 'vibrant',
    name: 'Vibrant',
    fontFamily: '"Open Sans", sans-serif',
    backgroundColor: '#ffffff',
    titleStyle: {
      fontSize: '22px',
      fontWeight: 'bold',
      color: '#e91e63'
    },
    subtitleStyle: {
      fontSize: '15px',
      color: '#673ab7'
    },
    axisLabelStyle: {
      fontSize: '12px',
      color: '#607d8b'
    },
    legendStyle: {
      fontSize: '13px',
      color: '#e91e63'
    },
    tooltipStyle: {
      fontSize: '12px',
      backgroundColor: 'rgba(233, 30, 99, 0.9)',
      color: '#ffffff'
    },
    palette: ['#e91e63', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b'],
    gridLineColor: '#f5f5f5',
    lineWidthDefaults: {
      line: 3,
      area: 2,
      stock: 2
    },
    exportDefaults: {
      width: 900,
      height: 450,
      scale: 1
    }
  }
];

export function getThemeById(id: string): ChartTheme | undefined {
  return DEFAULT_THEMES.find(theme => theme.id === id);
}

export function getAllThemes(): ChartTheme[] {
  return DEFAULT_THEMES;
}
