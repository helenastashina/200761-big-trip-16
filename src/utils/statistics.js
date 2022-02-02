import Chart from 'chart.js';
import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getTypesCount, getTypesMoney, getTypesTimeDuration } from './common';
import { getDurationDate } from './date.js';
import { ChartConfigs, BAR_HEIGHT, TYPES } from '../const.js';

export const moneyChartRender = (moneyCtx, points) => {
  moneyCtx.height = BAR_HEIGHT * points.length / 2;
  const data = getTypesMoney(points, TYPES);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: ChartConfigs.TYPE,
    data: {
      labels: TYPES,
      datasets: [{
        data,
        backgroundColor: ChartConfigs.BACKGROUND_COLOR,
        hoverBackgroundColor: ChartConfigs.BACKGROUND_COLOR,
        anchor: ChartConfigs.ANCHOR_DATA,
        barThickness: ChartConfigs.BAR_THICKNESS,
        minBarLength: ChartConfigs.MIN_BAR_LENGTH,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: ChartConfigs.FONT_SIZE,
          },
          color: ChartConfigs.COLOR,
          anchor: ChartConfigs.ANCHOR_DATA_LABELS,
          align: ChartConfigs.ALIGN,
          formatter: (cost) => `€ ${cost}`,
        },
      },
      title: {
        display: true,
        text: ChartConfigs.MONEY_CHART_TITLE,
        fontColor: ChartConfigs.COLOR,
        fontSize: ChartConfigs.TITLE_FONT_SIZE,
        position: ChartConfigs.POSITION,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartConfigs.COLOR,
            padding: ChartConfigs.PADDING,
            fontSize: ChartConfigs.FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export const typeChartRender = (typeCtx, points) => {
  typeCtx.height = BAR_HEIGHT * points.length / 2;
  const data = getTypesCount(points, TYPES);

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: ChartConfigs.TYPE,
    data: {
      labels: TYPES,
      datasets: [{
        data,
        backgroundColor: ChartConfigs.BACKGROUND_COLOR,
        hoverBackgroundColor: ChartConfigs.BACKGROUND_COLOR,
        anchor: ChartConfigs.ANCHOR_DATA,
        barThickness: ChartConfigs.BAR_THICKNESS,
        minBarLength: ChartConfigs.MIN_BAR_LENGTH,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: ChartConfigs.FONT_SIZE,
          },
          color: ChartConfigs.COLOR,
          anchor: ChartConfigs.ANCHOR_DATA_LABELS,
          align: ChartConfigs.ALIGN,
          formatter: (count) => `${count}x`,
        },
      },
      title: {
        display: true,
        text: ChartConfigs.TRANSPORT_CHART_TITLE,
        fontColor: ChartConfigs.COLOR,
        fontSize: ChartConfigs.TITLE_FONT_SIZE,
        position: ChartConfigs.POSITION,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartConfigs.COLOR,
            padding: ChartConfigs.PADDING,
            fontSize: ChartConfigs.FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};


export const timeChartRender = (typeCtx, points) => {
  typeCtx.height = BAR_HEIGHT * points.length / 2;
  const data = getTypesTimeDuration(points, TYPES);

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: ChartConfigs.TYPE,
    data: {
      labels: TYPES,
      datasets: [{
        data,
        backgroundColor: ChartConfigs.BACKGROUND_COLOR,
        hoverBackgroundColor: ChartConfigs.BACKGROUND_COLOR,
        anchor: ChartConfigs.ANCHOR_DATA,
        barThickness: ChartConfigs.BAR_THICKNESS,
        minBarLength: ChartConfigs.MIN_BAR_LENGTH,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: ChartConfigs.FONT_SIZE,
          },
          color: ChartConfigs.COLOR,
          anchor: ChartConfigs.ANCHOR_DATA_LABELS,
          align: ChartConfigs.ALIGN,
          formatter: (duration) => `${getDurationDate(duration)}`,
        },
      },
      title: {
        display: true,
        text: ChartConfigs.TIME_SPEND_CHART_TITLE,
        fontColor: ChartConfigs.COLOR,
        fontSize: ChartConfigs.TITLE_FONT_SIZE,
        position: ChartConfigs.POSITION,
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: ChartConfigs.COLOR,
            padding: ChartConfigs.PADDING,
            fontSize: ChartConfigs.FONT_SIZE,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
