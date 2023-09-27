import { Chart } from 'primereact/chart'
import React, { useEffect, useState } from 'react'

const ChartActivity = ({ label = [], dataColumn = [], dataLine = [] }) => {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    )
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    const data = {
      labels: label,
      datasets: [
        {
          type: 'line',
          label: 'Dataset 1',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: dataLine,
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: dataColumn,
          borderColor: 'white',
          borderWidth: 2,
        },
      ],
    }
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1,
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
    }
    setChartData(data)
    setChartOptions(options)
  }, [dataColumn, dataLine])
  return (
    <React.Fragment>
      <Chart
        type='line'
        data={chartData}
        options={chartOptions}
        style={{ width: '100%', height: '100%' }}
      />
    </React.Fragment>
  )
}

export default ChartActivity
