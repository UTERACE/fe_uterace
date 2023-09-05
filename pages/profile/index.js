import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { SlideMenu } from 'primereact/slidemenu'
import { Chart } from 'primereact/chart'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Activity from './Activity'
import { Paginator } from 'primereact/paginator'
import Club from './Club'
import Title from '@/components/landing/Title'

const Profile = () => {
  const dispatch = useDispatch()
  const [chartData, setChartData] = useState({})
  const [chartOptions, setChartOptions] = useState({})

  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(4)
  const [first, setFirst] = useState(1)

  const menu = useRef(null)
  const end_items = [
    {
      label: 'Chỉnh sửa thông tin',
      icon: 'pi pi-fw pi-user-edit',
      command: () => handleClick('/edit-profile'),
    },
    {
      label: 'Đổi hình đại diện',
      icon: 'pi pi-fw pi-image',
      command: () => handleClick('/change-avatar'),
    },
    {
      label: 'Kết nối ứng dụng',
      icon: 'pi pi-fw  pi-link',
      command: () => handleClick('/connect-app'),
    },
    {
      separator: true,
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
      command: () => handleClickLogout(),
    },
  ]
  const data = {
    activities: [
      {
        name: 'Morning Run',
        image: 'https://picsum.photos/200/300',
        day: '23:04, 14/10/2022',
        distance: 2.49,
        pace: 5.0,
        time: '00:12:45',
      },
      {
        name: 'Afternoon Run',
        image: 'https://picsum.photos/200/300',
        day: '23:04, 14/10/2022',
        distance: 2.49,
        pace: 5.0,
        time: '00:12:45',
      },
      {
        name: 'Afternoon Run',
        image: 'https://picsum.photos/200/300',
        day: '23:04, 14/10/2022',
        distance: 2.49,
        pace: 5.0,
        time: '00:12:45',
      },
      {
        name: 'Lunch Run',
        image: 'https://picsum.photos/200/300',
        day: '23:04, 14/10/2022',
        distance: 2.49,
        pace: 5.0,
        time: '00:12:45',
      },
      {
        name: 'Lunch Run',
        image: 'https://picsum.photos/200/300',
        day: '23:04, 14/10/2022',
        distance: 2.49,
        pace: 5.0,
        time: '00:12:45',
      },
      {
        name: 'Morning Run',
        image: 'https://picsum.photos/200/300',
        day: '23:04, 14/10/2022',
        distance: 2.49,
        pace: 5.0,
        time: '00:12:45',
      },
    ],
    total_distance: 107.5,
    pace: 5.52,
    total_runs: 20,
    total_clubs: 2,
    total_events: 3,
    ranking: 112,
  }
  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement)
    const textColor = documentStyle.getPropertyValue('--text-color')
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    )
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border')
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          type: 'line',
          label: 'Dataset 1',
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          borderWidth: 2,
          fill: false,
          tension: 0.4,
          data: [50, 25, 12, 48, 56, 76, 42],
        },
        {
          type: 'bar',
          label: 'Dataset 2',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [21, 84, 24, 75, 37, 65, 34],
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
  }, [])
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  const [activeIndex, setActiveIndex] = useState(2)
  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <div className='centered-content-layout'>
        <div id='profile-container'>
          <div id='statistic-container'>
            <div id='row-statistic'>
              <div id='statistic-card'>
                <h1>{data.total_distance}</h1>
                <h4>Total Distance (km)</h4>
              </div>
              <div id='statistic-card'>
                <h1>{data.pace}</h1>
                <h4>Pace (min/km)</h4>
              </div>
              <div id='statistic-card'>
                <h1>{data.total_runs}</h1>
                <h4>Total Runs</h4>
              </div>
            </div>
            <div id='row-statistic'>
              <div id='statistic-card'>
                <h1>{data.total_clubs}</h1>
                <h4>Total Clubs</h4>
              </div>
              <div id='statistic-card'>
                <h1>{data.total_events}</h1>
                <h4>Total Events</h4>
              </div>
              <div id='statistic-card'>
                <h1>{data.ranking}</h1>
                <h4>Ranking</h4>
              </div>
            </div>
          </div>
          <div id='profile-image-container'>
            <div style={{ height: '8rem' }}>
              <div id='profile-image-overlay'>
                <img
                  src={useSelector((state) => state.auth.image)}
                  alt='profile'
                  id='profile-image'
                />
                <div id='info-profile-container'>
                  <div id='name-container'>
                    <h1>{useSelector((state) => state.auth.fullName)}</h1>
                    <img
                      src='/verified.png'
                      alt='verified'
                      style={{ width: '2rem', height: '2rem' }}
                    />
                    <i className='fas icon-large fa-edit'></i>
                  </div>
                  <h4>Member since 2020</h4>
                  <img
                    src='/strava-icon.png'
                    alt='Connected Strava'
                    style={{ width: '3rem', height: '3rem' }}
                  />
                </div>
              </div>
            </div>

            <div id='profile-menu'>
              <SlideMenu
                ref={menu}
                model={end_items}
                popup
                viewportHeight={250}
                menuWidth={250}
              ></SlideMenu>

              <Button
                type='button'
                icon='pi pi-bars icon-large'
                severity='secondary'
                raised
                label='Menu'
                onClick={(event) => menu.current.toggle(event)}
              ></Button>
            </div>
          </div>
          <div id='profile-chart-container'>
            <div id='chart-container'>
              <Chart
                type='line'
                data={chartData}
                options={chartOptions}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            <div id='chart-container'>
              <Chart
                type='line'
                data={chartData}
                options={chartOptions}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
          <div id='profile-activities-container'>
            <div id='profile-button-container'>
              <Button
                id={
                  activeIndex === 1 ? 'button-profile-active' : 'button-profile'
                }
                icon='pi pi-calendar'
                label=' Giải đang tham gia'
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={
                  activeIndex === 2 ? 'button-profile-active' : 'button-profile'
                }
                icon='pi pi-calendar-plus'
                label='Hoạt động'
                onClick={() => {
                  setActiveIndex(2)
                }}
              />
              <Button
                id={
                  activeIndex === 3 ? 'button-profile-active' : 'button-profile'
                }
                icon='pi pi-calendar-check'
                label='Giải đã hoàn thành'
                onClick={() => {
                  setActiveIndex(3)
                }}
              />
              <Button
                id={
                  activeIndex === 4 ? 'button-profile-active' : 'button-profile'
                }
                icon='pi pi-images'
                label='Bộ sưu tập'
                onClick={() => {
                  setActiveIndex(4)
                }}
              />
            </div>
            {activeIndex === 2 ? (
              <div>
                <Title title='Hoạt động gần đây' />
                <Activity activities={data.activities} />
                <Paginator
                  first={first}
                  rows={per_page}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={current_page}
                />
              </div>
            ) : activeIndex === 3 ? (
              <div>
                <Club club={data.club} />
                <Paginator
                  first={first}
                  rows={per_page}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={current_page}
                />
              </div>
            ) : activeIndex === 1 ? (
              <div>
                <Club club={data.club} />
                <Paginator
                  first={first}
                  rows={per_page}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={current_page}
                />
              </div>
            ) : activeIndex === 4 ? null : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
