import type { ChartTheme } from '../types';

export const DEFAULT_THEMES: ChartTheme[] = [
  {
    id: 'smpl',
    name: 'Simple',
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff',
    titleStyle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#666666'
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
      color: '#666666'
    },
    palette: ['#d35400', '#2980b9', '#2ecc71', '#f1c40f', '#2c3e50', '#7f8c8d'],
    gridLineColor: '#F3F3F3',
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
    id: 'economist',
    name: 'Economist',
    fontFamily: 'Droid Sans',
    backgroundColor: '#d5e4eb',
    titleStyle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#3C3C3C'
    },
    subtitleStyle: {
      fontSize: '14px',
      color: '#3C3C3C'
    },
    axisLabelStyle: {
      fontSize: '12px',
      color: '#3C3C3C'
    },
    legendStyle: {
      fontSize: '12px',
      color: '#3C3C3C'
    },
    tooltipStyle: {
      fontSize: '12px',
      color: '#000000',
      backgroundColor: '#FFFFFF'
    },
    palette: ['#6794a7', '#014d64', '#76c0c1', '#01a2d9', '#7ad2f6', '#00887d', '#adadad', '#7bd3f6', '#7c260b', '#ee8f71', '#76c0c1', '#a18376'],
    gridLineColor: '#FFFFFF',
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
    id: 'flat',
    name: 'Flat',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#ECF0F1',
    titleStyle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#34495e'
    },
    subtitleStyle: {
      fontSize: '14px',
      color: '#34495e'
    },
    axisLabelStyle: {
      fontSize: '12px',
      color: '#34495e'
    },
    legendStyle: {
      fontSize: '12px',
      color: '#34495e'
    },
    tooltipStyle: {
      fontSize: '12px',
      color: '#34495e'
    },
    palette: ['#f1c40f', '#2ecc71', '#9b59b6', '#e74c3c', '#34495e', '#3498db', '#1abc9c', '#f39c12', '#d35400'],
    gridLineColor: '#BDC3C7',
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
    id: 'flatdark',
    name: 'Flat Dark',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    backgroundColor: '#34495e',
    titleStyle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#FFFFFF'
    },
    subtitleStyle: {
      fontSize: '14px',
      color: '#666666'
    },
    axisLabelStyle: {
      fontSize: '12px',
      color: '#FFFFFF'
    },
    legendStyle: {
      fontSize: '12px',
      color: '#C0C0C0'
    },
    tooltipStyle: {
      fontSize: '12px',
      color: '#FFFFFF'
    },
    palette: ['#f1c40f', '#2ecc71', '#9b59b6', '#e74c3c', '#34495e', '#3498db', '#1abc9c', '#f39c12', '#d35400'],
    gridLineColor: '#46627f',
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
    id: 'google',
    name: 'Google',
    fontFamily: 'Roboto',
    backgroundColor: '#ffffff',
    titleStyle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#444444'
    },
    subtitleStyle: {
      fontSize: '14px',
      color: '#444444'
    },
    axisLabelStyle: {
      fontSize: '12px',
      color: '#444444'
    },
    legendStyle: {
      fontSize: '12px',
      color: '#444444'
    },
    tooltipStyle: {
      fontSize: '12px',
      color: '#444444'
    },
    palette: ['#0266C8', '#F90101', '#F2B50F', '#00933B'],
    gridLineColor: '#F3F3F3',
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
    id: '538',
    name: 'FiveThirtyEight',
    fontFamily: 'Roboto',
    backgroundColor: '#F0F0F0',
    titleStyle: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#3C3C3C'
    },
    subtitleStyle: {
      fontSize: '14px',
      color: '#3C3C3C'
    },
    axisLabelStyle: {
      fontSize: '12px',
      color: '#3C3C3C'
    },
    legendStyle: {
      fontSize: '12px',
      color: '#3C3C3C'
    },
    tooltipStyle: {
      fontSize: '12px',
      color: '#F0F0F0',
      backgroundColor: 'rgba(0, 0, 0, 0.85)'
    },
    palette: ['#FF2700', '#008FD5', '#77AB43', '#636464', '#C4C4C4'],
    gridLineColor: '#D7D7D8',
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
  }
];

export function getThemeById(id: string): ChartTheme | undefined {
  return DEFAULT_THEMES.find(theme => theme.id === id);
}

export function getAllThemes(): ChartTheme[] {
  return DEFAULT_THEMES;
}
