import { Button } from 'primereact/button'
import React, { useContext, useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import Title from '@/components/landing/Title'
import Link from 'next/link'
import { ChartDaily, ChartMonthly } from './profile/ChartActivity'
import Activity from './profile/Activity'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import apiInstance from '@/api/apiInstance'
import Image from 'next/image'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import { AutoComplete } from 'primereact/autocomplete'
import Head from 'next/head'
import LocaleHelper from '@/components/locale/LocaleHelper'
import DataView from '@/components/dataview/DataView'
import { useRouter } from 'next/router'
import { InputNumber } from 'primereact/inputnumber'

export const getServerSideProps = async ({ locale, params }) => {
  const user = await getUser(params.id)
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'user',
        'club',
        'scoreboard',
        'topbar',
      ])),
      user,
    },
  }
}

async function getUser(id) {
  try {
    const response = await apiInstance.get(`/user/${id}`)
    const data = await response.data
    return data
  } catch (error) {
    console.error('Error fetching user details:', error)
    return null
  }
}

const UserDetail = ({ user }) => {
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const [current_page_event, setCurrentPageEvent] = useState(1)
  const [per_page_event, setPerPageEvent] = useState(3)
  const [totalRecordsEvent, setTotalRecordsEvent] = useState(1)
  const [firstEvent, setFirstEvent] = useState(0)

  const [current_page_event_joined, setCurrentPageEventJoined] = useState(1)
  const [per_page_event_joined, setPerPageEventJoined] = useState(3)
  const [totalRecordsEventJoined, setTotalRecordsEventJoined] = useState(1)
  const [firstEventJoined, setFirstEventJoined] = useState(0)

  const [current_page_club, setCurrentPageClub] = useState(1)
  const [per_page_club, setPerPageClub] = useState(3)
  const [totalRecordsClub, setTotalRecordsClub] = useState(1)
  const [firstClub, setFirstClub] = useState(0)

  const [activities, setActivities] = useState([])
  const [chartDateTime, setChartDateTime] = useState([])
  const [chartDatePace, setChartDatePace] = useState([])
  const [chartDateDistance, setChartDateDistance] = useState()
  const [chartMonthTime, setChartMonthTime] = useState([])
  const [chartMonthPace, setChartMonthPace] = useState([])
  const [chartMonthDistance, setChartMonthDistance] = useState([])
  const [clubs, setClubs] = useState([])
  const [avatarImage, setAvatarImage] = useState('')
  const [avatarLabel, setAvatarLabel] = useState('A')
  const [search_name, setSearchName] = useState('')
  const [search_name_event, setSearch_NameEvent] = useState('')
  const [search_name_event_joined, setSearch_NameEventJoined] = useState('')
  const [search_name_club, setSearch_NameClub] = useState('')
  const [hour, setHour] = useState(48)
  const [search, setSearch] = useState(false)
  const [searchClub, setSearchClub] = useState(false)
  const [searchEvent, setSearchEvent] = useState(false)
  const [searchEventJoined, setSearchEventJoined] = useState(false)

  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [activeIndex, setActiveIndex] = useState(2)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()
  const language = router.locale
  const [event, setEvents] = useState([])
  const [clubsCreated, setClubsCreated] = useState([])
  const [eventsJoined, setEventsJoined] = useState([])

  const { t } = useTranslation('user')
  const { t: tClub } = useTranslation('club')

  useEffect(() => {
    setAvatarImage(user.image)
    setChartDateTime(user.chart_date.map((time) => time.date_time))
    setChartDateDistance(
      user.chart_date.map((distance) => distance.date_distance)
    )
    setChartDatePace(user.chart_date.map((pace) => pace.date_pace))
    setChartMonthTime(user.chart_month.map((time) => time.month_time))
    setChartMonthDistance(
      user.chart_month.map((distance) => distance.month_distance)
    )
    setChartMonthPace(user.chart_month.map((pace) => pace.month_pace))
  }, [])

  useEffect(() => {
    //responsive window
    if (window.innerHeight > window.innerWidth) {
      setIsMobile(true)
    }
  }, [])

  useEffect(() => {
    fetchActivities()
  }, [current_page, per_page, hour])

  const fetchActivities = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/user/recent-active/${user.user_id}?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}&hour=${hour}`
      )
      if (res.status === 200) {
        setPerPage(res.data.per_page)
        setTotalRecords(res.data.total_activities)
        setCurrentPage(res.data.current_page)
        setActivities(res.data.activities)
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'User not connected to Strava')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEventsJoined()
  }, [current_page_event_joined, per_page_event_joined, searchEventJoined])

  const fetchEventsJoined = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/events/joined-event/${user.user_id}?current_page=${current_page_event_joined}&per_page=${per_page_event_joined}&search_name=${search_name_event_joined}`
      )
      if (res && res.status === 200) {
        const data = res.data
        setEventsJoined(data.events)
        setPerPageEventJoined(data.per_page)
        setTotalRecordsEventJoined(data.total_events)
        setCurrentPageEventJoined(data.current_page)
      }
      setLoading(false)
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEventCompleted()
  }, [current_page_event, per_page_event, searchEvent])
  const fetchEventCompleted = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/events?current_page=${current_page_event}&per_page=${per_page_event}&ongoing=1&search_name=${search_name_event}`
      )
      if (res.status === 200) {
        const data = res.data
        setEvents(data.events)
        setPerPageEvent(data.per_page)
        setTotalRecordsEvent(data.total_events)
        setCurrentPageEvent(data.current_page)
      }
      setLoading(false)
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClubsCreated()
  }, [current_page_club, per_page_club, searchClub])

  const fetchClubsCreated = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/clubs/created-club/${user.user_id}?current_page=${current_page_club}&per_page=${per_page_club}&search_name=${search_name_club}`
      )
      if (res.status === 200) {
        const data = res.data
        setClubsCreated(data.clubs)
        setPerPageClub(data.per_page)
        setTotalRecordsClub(data.total_clubs)
        setCurrentPageClub(data.current_page)
      }
      setLoading(false)
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  const onPageChangeEvent = (event) => {
    setFirstEvent(event.first)
    setCurrentPageEvent(event.page + 1)
    setPerPageEvent(event.rows)
  }

  const onPageChangeEventJoined = (event) => {
    setFirstEventJoined(event.first)
    setCurrentPageEventJoined(event.page + 1)
    setPerPageEventJoined(event.rows)
  }

  const onPageChangeClub = (event) => {
    setFirstClub(event.first)
    setCurrentPageClub(event.page + 1)
    setPerPageClub(event.rows)
  }

  const itemTemplateEvent = (item) => {
    return (
      <Link
        id='link-dataview-container'
        href={`/events/event-detail/${item.event_id}`}
      >
        <div id='dataview-container'>
          <div id='image-container-dataview'>
            <Image
              src={item.image ? item.image : '/logo.png'}
              alt={item.name}
              width={800}
              height={500}
            />
          </div>
          <div id='info-dataview'>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.total_members} {t('member-join')}
            </h4>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.total_activities} {t('club-join')}
            </h4>
          </div>
          <div id='name-dataview'>
            <i className='fa fa-running icon-run' aria-hidden='true'></i>
            <div id='share-register-container'>
              <h4>{item.name}</h4>
              <div id='share-register-content'>
                <Link
                  id='link-dataview'
                  href={`/events/event-detail/${item.event_id}`}
                >
                  {t('join-events')}{' '}
                  <i className='pi pi-arrow-right' aria-hidden='true'></i>
                </Link>
                <Link id='link-dataview' href='/share'>
                  {t('share')}{' '}
                  <i className='pi pi-share-alt' aria-hidden='true'></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className='centered-content-full'>
      <Head>
        <title>Profile - {user.last_name + ' ' + user.first_name}</title>
        <meta name='description' content={user.user_id} />
      </Head>
      <div className='centered-content-layout'>
        <div id='profile-container'>
          <div id='statistic-container'>
            <div id='statistic-content'>
              <div id='statistic-card' title='Tổng quãng đường đã chạy'>
                <h1>{LocaleHelper.formatNumber(user.total_distance)}</h1>
                <h4>{t('total-distance')}</h4>
              </div>
              <div id='statistic-card' title='Tốc độ trung bình'>
                <h1>
                  {language === 'vi'
                    ? LocaleHelper.formatPace(user.avg_pace)
                    : LocaleHelper.formatMinutesKmToMilesKm(user.avg_pace)}
                </h1>
                <h4>{t('pace-agv')}</h4>
              </div>
              <div id='statistic-card' title='Tổng số hoạt động đã tham gia'>
                <h1>{user.total_activities}</h1>
                <h4>{t('total-activities')}</h4>
              </div>

              <div id='statistic-card' title='Tổng số câu lạc bộ đã tham gia'>
                <h1>{user.total_clubs}</h1>
                <h4>{t('total-clubs')}</h4>
              </div>
              <div id='statistic-card' title='Tổng số sự kiện đã tham gia'>
                <h1>{user.total_event}</h1>
                <h4>{t('total-events')}</h4>
              </div>
              <div id='statistic-card' title='Hạng của bạn trong hệ thống'>
                <h1>{user.ranking}</h1>
                <h4>{t('rank')}</h4>
              </div>
            </div>
          </div>
          <div id='profile-image-container'>
            <div style={{ height: '8rem' }}>
              <div id='profile-image-overlay'>
                <Image
                  style={{
                    border: '1px solid #ffffff',
                    marginTop: '2rem',
                    marginLeft: '1rem',
                    width: '10rem',
                    height: '10rem',
                  }}
                  src={user.image ? user.image : '/default-avatar.png'}
                  alt='Profile image'
                  width={100}
                  height={100}
                />
                <div id='info-profile-container'>
                  {isMobile ? (
                    <div id='name-container'>
                      <h1>{user.last_name + ' ' + user.first_name}</h1>
                    </div>
                  ) : (
                    <div id='name-container'>
                      <h1>{user.last_name + ' ' + user.first_name}</h1>
                      <Image
                        src='/verified.png'
                        alt='verified'
                        width={20}
                        height={20}
                      />
                      <i className='fas icon-large fa-edit'></i>
                    </div>
                  )}
                  <div>
                    <h4>
                      {t('user-id')} {user.user_id}{' '}
                    </h4>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Image
                      src='/strava-icon.png'
                      alt='Connected Strava'
                      style={{ width: '3rem', height: '3rem' }}
                      width={30}
                      height={30}
                      title={
                        user.strava_user_link !== null
                          ? user.strava_user_link
                          : null
                      }
                      onClick={() => {
                        window.open(
                          user.strava_user_link !== null
                            ? user.strava_user_link
                            : null,
                          '_blank'
                        )
                      }}
                    />
                    <Link href='/user/profile/setting?connect=2'>
                      <h5 style={{ marginTop: '1rem' }}>
                        {user.strava_user_link !== null
                          ? t('connected-strava')
                          : t('not-connected-strava')}
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isMobile ? (
            <div id='mobile-chart-container'>
              <div>
                <ChartDaily
                  labels={chartDateTime}
                  seriesData={chartDateDistance}
                  t={t}
                />
              </div>
              <div>
                <ChartMonthly
                  labels={chartMonthTime}
                  seriesData={chartMonthDistance}
                  t={t}
                />
              </div>
            </div>
          ) : (
            <div id='profile-chart-container'>
              <div id='chart-container'>
                <ChartDaily
                  labels={chartDateTime}
                  seriesData={chartDateDistance}
                  t={t}
                />
              </div>
              <div id='chart-container'>
                <ChartMonthly
                  labels={chartMonthTime}
                  seriesData={chartMonthDistance}
                  t={t}
                />
              </div>
            </div>
          )}

          <div id='profile-activities-container'>
            <div id='profile-button-container'>
              <Button
                id={activeIndex === 1 ? 'button-tab--active' : 'button-tab'}
                icon='pi pi-calendar'
                label={isMobile ? t('joined') : t('joining-events')}
                style={isMobile ? { fontSize: '0.8rem' } : { width: '25%' }}
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
                icon='pi pi-calendar-plus'
                label={isMobile ? t('recent') : t('recent-activities')}
                style={isMobile ? { fontSize: '0.8rem' } : { width: '25%' }}
                onClick={() => {
                  setActiveIndex(2)
                }}
              />
              <Button
                id={activeIndex === 3 ? 'button-tab--active' : 'button-tab'}
                icon='pi pi-calendar-minus'
                label={isMobile ? t('completed') : t('completed-events')}
                style={isMobile ? { fontSize: '0.8rem' } : { width: '25%' }}
                onClick={() => {
                  setActiveIndex(3)
                }}
              />
              <Button
                id={activeIndex === 4 ? 'button-tab--active' : 'button-tab'}
                icon='pi pi-images'
                // label={t('collection')}
                label={isMobile ? t('clubs') : t('clubs-created')}
                style={isMobile ? { fontSize: '0.8rem' } : { width: '25%' }}
                onClick={() => {
                  setActiveIndex(4)
                }}
              />
            </div>
            {activeIndex === 2 ? (
              <div style={{ width: '95%' }}>
                <Title title={t('recent-activities')} />
                <Activity
                  activities={activities}
                  language={language}
                  setLoading={setLoading}
                  showToast={showToast}
                />
                {/* <div>
                  <AutoComplete
                    value={search_name}
                    onChange={(e) => setSearchName(e.target.value)}
                    completeMethod={(e) => setSearch(!search)}
                    placeholder={'Tìm kiếm hoạt động'}
                  />
                </div> */}
                <InputNumber
                  value={hour}
                  onValueChange={(e) => setHour(e.value)}
                  prefix='Hour '
                />
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
                <div style={{ marginBottom: '1rem' }}>
                  <AutoComplete
                    value={search_name_event}
                    onChange={(e) => setSearch_NameEventJoined(e.target.value)}
                    completeMethod={(e) =>
                      setSearchEventJoined(!searchEventJoined)
                    }
                    placeholder={t('search_event')}
                  />
                </div>
                <DataView
                  data={eventsJoined}
                  itemTemplate={itemTemplateEvent}
                />
                <Paginator
                  first={firstEventJoined}
                  rows={per_page_event_joined}
                  totalRecords={totalRecordsEventJoined}
                  rowsPerPageOptions={[3, 6, 9]}
                  onPageChange={onPageChangeEventJoined}
                  page={current_page_event_joined}
                />
              </div>
            ) : activeIndex === 3 ? (
              <div style={{ width: '95%' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <AutoComplete
                    value={search_name_event}
                    onChange={(e) => setSearch_NameEvent(e.target.value)}
                    completeMethod={(e) => setSearchEvent(!searchEvent)}
                    placeholder={t('search_event')}
                  />
                </div>
                <DataView data={event} itemTemplate={itemTemplateEvent} />
                <Paginator
                  first={firstEvent}
                  rows={per_page_event}
                  totalRecords={totalRecordsEvent}
                  rowsPerPageOptions={[3, 6, 9]}
                  onPageChange={onPageChangeEvent}
                  page={current_page_event}
                />
              </div>
            ) : activeIndex === 4 ? (
              <div style={{ width: '95%' }}>
                <div style={{ marginBottom: '1rem' }}>
                  <AutoComplete
                    value={search_name_club}
                    onChange={(e) => setSearch_NameClub(e.target.value)}
                    completeMethod={(e) => setSearchClub(!searchClub)}
                    placeholder={tClub('search')}
                  />
                </div>
                <DataView
                  data={clubsCreated}
                  href='/clubs/club-detail/'
                  t={tClub}
                />
                <Paginator
                  first={firstClub}
                  rows={per_page_club}
                  totalRecords={totalRecordsClub}
                  rowsPerPageOptions={[3, 6, 9]}
                  onPageChange={onPageChangeClub}
                  page={current_page_club}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail
