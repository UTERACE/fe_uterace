import { Chart } from 'primereact/chart'
import React, { useEffect, useState } from 'react'

export const ChartDaily = ({ labels, seriesData }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: labels,
      datasets: [
        {
          label: "km",
          data: seriesData,
          fill: false,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1.5,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [labels, seriesData]);
  return (
    <div id='card-chart'>
      <h4 className="text-center">Biểu đồ theo ngày</h4>
      <Chart type="line" data={chartData} options={chartOptions} />
    </div>
  );
};

export const ChartMonthly = ({ labels, seriesData }) => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: labels,
      datasets: [
        {
          label: "km",
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          data: seriesData,
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1.5,
      plugins: {
        legend: {
          labels: {
            fontColor: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, [labels, seriesData]);

  return (
    <div id='card-chart'>
      <h4 className="text-center">Biểu đồ theo tháng</h4>
      <Chart type="bar" data={chartData} options={chartOptions} />
    </div>
  );
};
const _Chart = () => <></>;
export default _Chart;
