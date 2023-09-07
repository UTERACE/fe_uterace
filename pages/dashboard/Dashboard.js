import React, { useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'

const Dashboard = () => {
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  useEffect(() => {
    const data = {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Sales',
          data: [540, 325, 702, 620],
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgb(255, 159, 64)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
          ],
          borderWidth: 1,
        },
      ],
    }
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }

    setChartData(data)
    setChartOptions(options)
  }, [])

  const [chartData1, setChartData1] = useState({})
  const [chartOptions1, setChartOptions1] = useState({})

  useEffect(() => {
    const documentStyle1 = getComputedStyle(document.documentElement)
    const textColor1 = documentStyle1.getPropertyValue('--text-color')
    const textColorSecondary1 = documentStyle1.getPropertyValue(
      '--text-color-secondary'
    )
    const surfaceBorder = documentStyle1.getPropertyValue('--surface-border')
    const data1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'bar',
          label: 'Dataset 1',
          backgroundColor: documentStyle1.getPropertyValue('--blue-500'),
          data: [50, 25, 12, 48, 90, 76, 42],
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: documentStyle1.getPropertyValue('--green-500'),
          data: [21, 84, 24, 75, 37, 65, 34],
        },
        {
          type: 'bar',
          label: 'Dataset 3',
          backgroundColor: documentStyle1.getPropertyValue('--yellow-500'),
          data: [41, 52, 24, 74, 23, 21, 32],
        },
      ],
    }
    const options1 = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        legend: {
          labels: {
            color: textColor1,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary1,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          stacked: true,
          ticks: {
            color: textColorSecondary1,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    }

    setChartData1(data1)
    setChartOptions1(options1)
  }, [])
  const [chartData2, setChartData2] = useState({})
  const [chartOptions2, setChartOptions2] = useState({})

  useEffect(() => {
    const documentStyle2 = getComputedStyle(document.documentElement)
    const textColor2 = documentStyle2.getPropertyValue('--text-color')
    const textColorSecondary2 = documentStyle2.getPropertyValue(
      '--text-color-secondary'
    )
    const surfaceBorder = documentStyle2.getPropertyValue('--surface-border')
    const data2 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: 0.4,
          borderColor: documentStyle2.getPropertyValue('--blue-500'),
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle2.getPropertyValue('--teal-500'),
        },
        {
          label: 'Third Dataset',
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: documentStyle2.getPropertyValue('--orange-500'),
          tension: 0.4,
          backgroundColor: 'rgba(255,167,38,0.2)',
        },
      ],
    }
    const options2 = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor2,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary2,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary2,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    }

    setChartData2(data2)
    setChartOptions2(options2)
  }, [])
  const [chartData3, setChartData3] = useState({})
  const [chartOptions3, setChartOptions3] = useState({})

  useEffect(() => {
    const documentStyle3 = getComputedStyle(document.documentElement)
    const textColor3 = documentStyle3.getPropertyValue('--text-color')
    const surfaceBorder3 = documentStyle3.getPropertyValue('--surface-border')
    const data3 = {
      datasets: [
        {
          data: [11, 16, 7, 3, 14],
          backgroundColor: [
            documentStyle3.getPropertyValue('--red-500'),
            documentStyle3.getPropertyValue('--green-500'),
            documentStyle3.getPropertyValue('--yellow-500'),
            documentStyle3.getPropertyValue('--bluegray-500'),
            documentStyle3.getPropertyValue('--blue-500'),
          ],
          label: 'My dataset',
        },
      ],
      labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'],
    }
    const options3 = {
      plugins: {
        legend: {
          labels: {
            color: textColor3,
          },
        },
      },
      scales: {
        r: {
          grid: {
            color: surfaceBorder3,
          },
        },
      },
    }

    setChartData3(data3)
    setChartOptions3(options3)
  }, [])
  return (
    <div id='dashboard-content-container'>
      <div id='dashboard-content'>
        <div id='dashboard-content-header'>
          <div id='dashboard-content-header-child'>
            <div>
              <span>Tổng số giải chạy</span>
              <p>152</p>
            </div>
            <div
              id='dashboard-content-header-icon'
              style={{ width: '2.5rem', height: '2.5rem' }}
            >
              <i className='pi pi-calendar' />
            </div>
          </div>
          <span id='span-new'>24 new </span>
          <span>since last visit</span>
        </div>
        <div id='dashboard-content-header'>
          <div id='dashboard-content-header-child'>
            <div>
              <span>Tổng số câu lạc bộ</span>
              <p>15</p>
            </div>
            <div
              id='dashboard-content-header-icon'
              style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: 'red',
              }}
            >
              <i className='pi pi-users' />
            </div>
          </div>
          <span id='span-new'>2 new </span>
          <span>since last visit</span>
        </div>
        <div id='dashboard-content-header'>
          <div id='dashboard-content-header-child'>
            <div>
              <span>Tổng số bài viết</span>
              <p>12</p>
            </div>
            <div
              id='dashboard-content-header-icon'
              style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: 'turquoise',
              }}
            >
              <i className='pi pi-book' />
            </div>
          </div>
          <span id='span-new'>4 new </span>
          <span>since last visit</span>
        </div>
        <div id='dashboard-content-header'>
          <div id='dashboard-content-header-child'>
            <div>
              <span>Tổng số người dùng</span>
              <p>1532</p>
            </div>
            <div
              id='dashboard-content-header-icon'
              style={{
                width: '2.5rem',
                height: '2.5rem',
                backgroundColor: 'yellow',
              }}
            >
              <i className='pi pi-user' />
            </div>
          </div>
          <span id='span-new'>242 new </span>
          <span>since last visit</span>
        </div>
      </div>

      <div id='dashboard-content-chart'>
        <div id='dashboard-content-chart-header'>
          <div id='dashboard-content-chart-header-child'>
            <Chart
              type='bar'
              data={chartData}
              options={chartOptions}
              width='100%'
            />
          </div>
          <div id='dashboard-content-chart-header-child'>
            <Chart
              type='line'
              data={chartData2}
              options={chartOptions2}
              width='100%'
              height='30rem'
            />
          </div>
        </div>
        <div id='dashboard-content-chart-header'>
          <div id='dashboard-content-chart-header-child'>
            <Chart
              type='bar'
              data={chartData1}
              options={chartOptions1}
              width='100%'
              height='30rem'
            />
          </div>
          <div id='dashboard-content-chart-header-child'>
            <Chart
              type='polarArea'
              data={chartData3}
              options={chartOptions3}
              style={{ position: 'relative', width: '60%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
