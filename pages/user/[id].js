import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import Title from '@/components/landing/Title'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChartActivity from './profile/ChartActivity'
import Activity from './profile/Activity'
import DataViewDashboard from '@/components/dataview/DataViewDashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import apiInstance from '@/api/apiInstance'

export const getStaticProps = async ({ locale, params }) => {
  const user = await getUser(params.id)
  return {
    props: {
      user,
      ...(await serverSideTranslations(locale, [
        'user',
        'scoreboard',
        'topbar',
      ])),
    },
  }
}

async function getUser(id) {
  try {
    const response = await apiInstance.get(`/user/${id}`)
    const data = await response.data
    return data
  } catch (error) {
    console.error('Error fetching event details:', error)
    return null
  }
}

const UserDetail = (user) => {
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(4)
  const [first, setFirst] = useState(1)

  const [dataChartWeek, setDataChartWeek] = useState({})
  const [dataChartMonth, setDataChartMonth] = useState({})
  const [activities, setActivities] = useState([])
  const [clubs, setClubs] = useState([])
  const [avatarImage, setAvatarImage] = useState('')
  const [avatarLabel, setAvatarLabel] = useState('A')
  const [data, setData] = useState({})

  const [activeIndex, setActiveIndex] = useState(2)
  const { t } = useTranslation('user')

  useEffect(() => {
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
      activities_chart_month: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        dataLine: [50, 25, 12, 48, 56, 76, 42],
        dataBar: [65, 59, 80, 81, 56, 55, 40],
      },
      activities_chart_week: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dataLine: [21, 84, 24, 75, 37, 65, 34],
        dataBar: [35, 34, 80, 45, 56, 55, 23],
      },
      total_distance: 107.5,
      pace: 5.52,
      total_activities: 20,
      total_clubs: 2,
      total_events: 3,
      ranking: 112,
      first_name: 'A',
      last_name: 'Nguyễn Văn',
      image: '',
      connect_strava: false,
    }
    setDataChartMonth(data.activities_chart_month)
    setDataChartWeek(data.activities_chart_week)
    setActivities(data.activities)
    setClubs(data.club)
    setAvatarImage(data.image)
    setAvatarLabel(data.first_name[0])
    setData(data)
  }, [])

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  const itemTemplate = (item) => {
    return (
      <div id='dataview-container' style={{ backgroundColor: 'white' }}>
        <div id='image-container-dataview'>
          <Link
            id='link-dataview'
            href={`/events/event-management/${item.event_id}`}
          >
            <img src={item.image} alt={item.name} />
          </Link>
        </div>
        <Link
          id='link-dataview'
          href={`/events/event-management/${item.event_id}`}
        >
          <div id='info-dataview'>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.total_members} {t('member-join')}
            </h4>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.total_clubs} {t('club-join')}
            </h4>
          </div>
          <div id='name-dataview'>
            <i class='fa fa-briefcase icon-run' aria-hidden='true'></i>
            <div id='share-register-container'>
              <h4>{item.name}</h4>
            </div>
          </div>
        </Link>
      </div>
    )
  }
  
  return (
    <div className='centered-content-full'>
      <div className='centered-content-layout'>
        <div id='profile-container'>
          <div id='statistic-container'>
            <div id='statistic-content'>
              <div id='statistic-card' title='Tổng quãng đường đã chạy'>
                <h1>{data.total_distance}</h1>
                <h4>{t('total-distance')}</h4>
              </div>
              <div id='statistic-card' title='Tốc độ trung bình'>
                <h1>{data.pace}</h1>
                <h4>{t('pace-agv')}</h4>
              </div>
              <div id='statistic-card' title='Tổng số hoạt động đã tham gia'>
                <h1>{data.total_activities}</h1>
                <h4>{t('total-activities')}</h4>
              </div>

              <div id='statistic-card' title='Tổng số câu lạc bộ đã tham gia'>
                <h1>{data.total_clubs}</h1>
                <h4>{t('total-clubs')}</h4>
              </div>
              <div id='statistic-card' title='Tổng số sự kiện đã tham gia'>
                <h1>{data.total_events}</h1>
                <h4>{t('total-events')}</h4>
              </div>
              <div id='statistic-card' title='Hạng của bạn trong hệ thống'>
                <h1>{data.ranking}</h1>
                <h4>{t('rank')}</h4>
              </div>
            </div>
          </div>
          <div id='profile-image-container'>
            <div style={{ height: '8rem' }}>
              <div id='profile-image-overlay'>
                <Avatar
                  style={{
                    border: '1px solid #ffffff',
                    marginTop: '2rem',
                    width: '10rem',
                    height: '10rem',
                    fontSize: '5rem',
                  }}
                  size='xlarge'
                  shape='circle'
                  label={!avatarImage ? avatarLabel : null}
                  image={avatarImage}
                />
                <div id='info-profile-container'>
                  <div id='name-container'>
                    <h1>{data.last_name + ' ' + data.first_name}</h1>
                    <img src='/verified.png' alt='verified' />
                  </div>
                  <div>
                    <h4>
                      {t('user-id')} {170347}{' '}
                    </h4>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <img
                      src='/strava-icon.png'
                      alt='Connected Strava'
                      style={{ width: '3rem', height: '3rem' }}
                    />
                    <Link href='/user/profile/setting?connect=2'>
                      <h5 style={{ marginTop: '1rem' }}>
                        {data.connect_strava
                          ? t('connected-strava')
                          : t('not-connected-strava')}
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id='profile-chart-container'>
            <div id='chart-container'>
              <ChartActivity
                label={dataChartWeek.labels}
                dataColumn={dataChartWeek.dataBar}
                dataLine={dataChartWeek.dataLine}
              />
            </div>
            <div id='chart-container'>
              <ChartActivity
                label={dataChartMonth.labels}
                dataColumn={dataChartMonth.dataBar}
                dataLine={dataChartMonth.dataLine}
              />
            </div>
          </div>
          <div id='profile-activities-container'>
            <div id='profile-button-container'>
              <Button
                id={activeIndex === 1 ? 'button-tab--active' : 'button-tab'}
                icon='pi pi-calendar'
                label={t('joining-events')}
                style={{ width: '25%' }}
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
                icon='pi pi-calendar-plus'
                label={t('recent-activities')}
                style={{ width: '25%' }}
                onClick={() => {
                  setActiveIndex(2)
                }}
              />
              <Button
                id={activeIndex === 3 ? 'button-tab--active' : 'button-tab'}
                icon='pi pi-calendar-minus'
                label={t('completed-events')}
                style={{ width: '25%' }}
                onClick={() => {
                  setActiveIndex(3)
                }}
              />
              <Button
                id={activeIndex === 4 ? 'button-tab--active' : 'button-tab'}
                icon='pi pi-images'
                label={t('collection')}
                style={{ width: '25%' }}
                onClick={() => {
                  setActiveIndex(4)
                }}
              />
            </div>
            {activeIndex === 2 ? (
              <div style={{ width: '95%' }}>
                <Title title={t('recent-activities')} />
                <Activity activities={activities} />
              </div>
            ) : activeIndex === 3 ? (
              <div style={{ width: '95%' }}>
                <DataViewDashboard
                  data={data.club}
                  href='/clubs/club-management/'
                  itemTemplate={itemTemplate}
                />
              </div>
            ) : activeIndex === 1 ? (
              <div style={{ width: '95%' }}>
                <DataViewDashboard
                  data={data.club}
                  href='/clubs/club-management/'
                  itemTemplate={itemTemplate}
                />
              </div>
            ) : activeIndex === 4 ? null : null}
            <div>
              <Paginator
                first={first}
                rows={per_page}
                totalRecords={totalRecords}
                rowsPerPageOptions={[6, 12, 18]}
                onPageChange={onPageChange}
                page={current_page}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail
