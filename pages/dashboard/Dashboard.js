import React, { useContext, useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'
import { useToast } from '@/components/contexts/ToastContext'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import apiInstance from '@/api/apiInstance'
import { format, subMonths } from 'date-fns'

const Dashboard = () => {
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  const [data, setData] = useState({})
  const [chartActiveUsers, setChartActiveUsers] = useState([])
  const [chartEvents, setChartEvents] = useState([])
  const [chartClubs, setChartClubs] = useState([])
  const [chartPosts, setChartPosts] = useState([])
  const [chartEventsStatus, setChartEventsStatus] = useState([])

  useEffect(() => {
    const data = {
      labels: getPastMonths(4),
      datasets: [
        {
          label: 'Hoạt động người dùng',
          data: chartActiveUsers,
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
  }, [data])

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
      labels: getPastMonths(7),
      datasets: [
        {
          type: 'bar',
          label: 'Sự kiện',
          backgroundColor: documentStyle1.getPropertyValue('--blue-500'),
          data: chartEvents,
        },
        {
          type: 'bar',
          label: 'Câu lạc bộ',
          backgroundColor: documentStyle1.getPropertyValue('--green-500'),
          data: chartClubs,
        },
        {
          type: 'bar',
          label: 'Bài viết',
          backgroundColor: documentStyle1.getPropertyValue('--yellow-500'),
          data: chartPosts,
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
  }, [data])
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
      labels: getPastMonths(7),
      datasets: [
        {
          label: 'Sự kiện',
          data: chartEvents,
          fill: false,
          tension: 0.4,
          borderColor: documentStyle2.getPropertyValue('--blue-500'),
        },
        {
          label: 'Câu lạc bộ',
          data: chartClubs,
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          borderColor: documentStyle2.getPropertyValue('--teal-500'),
        },
        {
          label: 'Bài viết',
          data: chartPosts,
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
  }, [data])
  const [chartData3, setChartData3] = useState({})
  const [chartOptions3, setChartOptions3] = useState({})

  useEffect(() => {
    const documentStyle3 = getComputedStyle(document.documentElement)
    const textColor3 = documentStyle3.getPropertyValue('--text-color')
    const surfaceBorder3 = documentStyle3.getPropertyValue('--surface-border')
    const data3 = {
      datasets: [
        {
          data: chartEventsStatus,
          backgroundColor: [
            documentStyle3.getPropertyValue('--red-500'),
            documentStyle3.getPropertyValue('--green-500'),
            documentStyle3.getPropertyValue('--yellow-500'),
            documentStyle3.getPropertyValue('--bluegray-500'),
            documentStyle3.getPropertyValue('--blue-500'),
          ],
          label: 'Tổng sự kiện',
        },
      ],
      labels: [
        'Sự kiện đang diễn ra',
        'Sự kiện đã kết thúc',
        'Sự kiện sắp diễn ra',
        'Sự kiện nổi bật',
        'Sự kiện bị khóa',
      ],
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
  }, [data])

  const fetchDashboard = async () => {
    setLoading(true)
    try {
      const response = await apiInstance.get('/dashboard')
      if (response.status === 200) {
        setData(response.data)
        setChartActiveUsers(response.data.chart_active_users)
        setChartEvents(response.data.chart_events)
        setChartClubs(response.data.chart_clubs)
        setChartPosts(response.data.chart_news)
        setChartEventsStatus(response.data.chart_events_status)
        showToast('success', 'Dashboard data fetched successfully')
      }
    } catch (error) {
      showToast('error', 'Failed to fetch dashboard data')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchDashboard()
    const width = window.innerWidth
    if (width <= 1024) {
      const carouselElement = document.getElementsByClassName(
        'dashboard-content-chart'
      )[0]
      const carouselElementStatistic =
        document.getElementsByClassName('dashboard-content')[0]
      if (carouselElement) {
        carouselElement.style.setProperty('--num-columns', 1)
        carouselElementStatistic.style.setProperty('--num-columns', 2)
      }
    }
  }, [])

  // Function lấy danh sách các tháng trước đó
  const getPastMonths = (numMonths) => {
    const currentDate = new Date()
    const months = []

    // Lặp qua từng tháng để tính toán và định dạng ngày tháng
    for (let i = 0; i < numMonths; i++) {
      const month = subMonths(currentDate, i)
      const formattedMonth = format(month, 'MMM yyyy') // Định dạng tháng và năm, ví dụ Jan 2024, Feb 2024, ...
      months.unshift(formattedMonth) // Đưa vào đầu mảng để thứ tự từ gần nhất đến xa nhất
    }

    return months
  }

  return (
    <div id='dashboard-content-container'>
      <div className='dashboard-content'>
        <div id='dashboard-content-header'>
          <div id='dashboard-content-header-child'>
            <div>
              <span>Tổng số giải chạy</span>
              <p>{data.total_events}</p>
            </div>
            <div
              id='dashboard-content-header-icon'
              style={{ backgroundColor: 'green' }}
            >
              <i className='pi pi-calendar' />
            </div>
          </div>
          <div style={{ paddingBottom: '1rem' }}>
            <span id='span-new'>{data.new_events} new </span>
            <span>since last week</span>
          </div>
        </div>
        <div id='dashboard-content-header'>
          <div id='dashboard-content-header-child'>
            <div>
              <span>Tổng số câu lạc bộ</span>
              <p>{data.total_clubs}</p>
            </div>
            <div
              id='dashboard-content-header-icon'
              style={{
                backgroundColor: 'red',
              }}
            >
              <i className='pi pi-users' />
            </div>
          </div>
          <div style={{ paddingBottom: '1rem' }}>
            <span id='span-new'>{data.new_clubs} new </span>
            <span>since last week</span>
          </div>
        </div>
        <div id='dashboard-content-header'>
          <div id='dashboard-content-header-child'>
            <div>
              <span>Tổng số bài viết</span>
              <p>{data.total_news}</p>
            </div>
            <div
              id='dashboard-content-header-icon'
              style={{
                backgroundColor: 'turquoise',
              }}
            >
              <i className='pi pi-book' />
            </div>
          </div>
          <div style={{ paddingBottom: '1rem' }}>
            <span id='span-new'>{data.new_news} new </span>
            <span>since last week</span>
          </div>
        </div>
        <div id='dashboard-content-header'>
          <div id='dashboard-content-header-child'>
            <div>
              <span>Tổng số người dùng</span>
              <p>{data.total_users}</p>
            </div>
            <div
              id='dashboard-content-header-icon'
              style={{
                backgroundColor: 'yellow',
              }}
            >
              <i className='pi pi-user' />
            </div>
          </div>
          <div style={{ paddingBottom: '1rem' }}>
            <span id='span-new'>{data.new_users} new </span>
            <span>since last week</span>
          </div>
        </div>
      </div>

      <div className='dashboard-content-chart'>
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
              data={chartData}
              options={chartOptions}
              width='100%'
            />
          </div>
          <div id='dashboard-content-chart-header-child'>
            <Chart
              type='polarArea'
              data={chartData3}
              options={chartOptions3}
              style={{ position: 'relative', width: '90%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
