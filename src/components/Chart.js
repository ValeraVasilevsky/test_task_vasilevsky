import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import "chart.js/auto";

Chart.register(
  CategoryScale,
  Legend,
  LinearScale,
  BarController,
  BarElement,
  PointElement,
  Title,
  Tooltip
);

let barChart = null;

export const renderChart = (params) => {
  const { ctx, data } = params;
  if (barChart) barChart.destroy();

  barChart = new Chart(ctx, {
    type: "bar",
    data: {
      datasets: data,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      hover: {
        mode: null,
      },
      animation: {
        duration: 200,
        onComplete: (chartInstance) => {
          const { chart } = chartInstance;
          const context = chart.ctx;

          context.font = Chart.helpers?.fontString(
            Chart.defaults.global.defaultFontSize,
            Chart.defaults.global.defaultFontStyle,
            Chart.defaults.global.defaultFontFamily
          );

          context.textAlign = "center";
          context.textBaseline = "bottom";

          chart.data.datasets.forEach((dataset, i) => {
            const meta = chart.getDatasetMeta(i);
            meta.data.forEach((bar, index) => {
              context.fillText(dataset.data[index]?.value, bar.x, bar.y - 5);
            });
          });
        },
      },
      scales: {
        y: {
          display: false,
          min: 0,
          max: 100,
          beginAtZero: true,
        },
        x: {
          stacked: true,
          ticks: {
            autoSkip: false,
            maxRotation: 90,
            minRotation: 90,
          },
        },
      },
      parsing: {
        xAxisKey: "name",
        yAxisKey: "value",
      },
    },
  });
};
