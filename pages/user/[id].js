import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { SlideMenu } from 'primereact/slidemenu'
import { Chart } from 'primereact/chart'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Paginator } from 'primereact/paginator'
import { Dialog } from 'primereact/dialog'
import Title from '@/components/landing/Title'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChartActivity from './profile/ChartActivity'
import Activity from './profile/Activity'
import Club from './profile/Club'

const UserDetail = () => {
  const router = useRouter()
  const { id } = router.query

  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(4)
  const [first, setFirst] = useState(1)

  const data = {
    id: 1,
    name: 'Nguyễn Văn A',
    image: 'https://picsum.photos/200/300',
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
    club: [
      {
        name: 'DONG HANH CUNG CAC THIEN THAN - ANGELS RUN',
        image: 'https://picsum.photos/200/300',
        member: 100,
        total_distance: 1000,
      },
      {
        name: 'Club 2',
        image: 'https://picsum.photos/200/300',
        member: 100,
        total_distance: 1000,
      },
      {
        name: 'Club 3',
        image: 'https://picsum.photos/200/300',
        member: 100,
        total_distance: 1000,
      },
      {
        name: 'Club 4',
        image: 'https://picsum.photos/200/300',
        member: 100,
        total_distance: 1000,
      },
      {
        name: 'Club 5',
        image: 'https://picsum.photos/200/300',
        member: 100,
        total_distance: 1000,
      },
      {
        name: 'Club 6',
        image: 'https://picsum.photos/200/300',
        member: 100,
        total_distance: 1000,
      },
    ],
    total_distance: 107.5,
    pace: 5.52,
    total_runs: 20,
    total_clubs: 2,
    total_events: 3,
    ranking: 112,
  }

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
                  src={data.image}
                  alt='profile'
                  id='profile-image'
                />
                <div id='info-profile-container'>
                  <div id='name-container'>
                    <h1>{data.name}</h1>
                    <img
                      src='/verified.png'
                      alt='verified'
                      style={{ width: '2rem', height: '2rem' }}
                    />
                  </div>
                  <h4> Mã người dùng: {id} </h4>
                  <Link href='/events'>
                    <img
                      src='/strava-icon.png'
                      alt='Connected Strava'
                      style={{ width: '3rem', height: '3rem' }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div id='profile-chart-container'>
            <div id='chart-container'>
              <ChartActivity />
            </div>
            <div id='chart-container'>
              <ChartActivity />
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
              <div style={{ width: '95%' }}>
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
              <div style={{ width: '95%' }}>
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
              <div style={{ width: '95%' }}>
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

export default UserDetail
