import { Button } from 'primereact/button'
import { SlideMenu } from 'primereact/slidemenu'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Activity from './Activity'
import { Paginator } from 'primereact/paginator'
import { Dialog } from 'primereact/dialog'
import Title from '@/components/landing/Title'
import { ChartDaily, ChartMonthly } from './ChartActivity'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChangeAvatar from './setting/ChangeAvatar'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import apiInstance from '@/api/apiInstance'
import { AutoComplete } from 'primereact/autocomplete'
import Image from 'next/image'
import LocaleHelper from '@/components/locale/LocaleHelper'
import DataView from '@/components/dataview/DataView'
import { InputNumber } from 'primereact/inputnumber'

const Profile = () => {
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

  const [visibleChange, setVisibleChange] = useState(false)
  const [activeIndex, setActiveIndex] = useState(2)
  const [isMobile, setIsMobile] = useState(false)

  const [polyline, setPolyline] = useState([])
  const [chartDateTime, setChartDateTime] = useState([])
  const [chartDatePace, setChartDatePace] = useState([])
  const [chartDateDistance, setChartDateDistance] = useState()
  const [chartMonthTime, setChartMonthTime] = useState([])
  const [chartMonthPace, setChartMonthPace] = useState([])
  const [chartMonthDistance, setChartMonthDistance] = useState([])
  const [activities, setActivities] = useState([])
  const [search_name, setSearchName] = useState('')
  const [search_name_event, setSearch_NameEvent] = useState('')
  const [search_name_event_joined, setSearch_NameEventJoined] = useState('')
  const [search_name_club, setSearch_NameClub] = useState('')
  const [hour, setHour] = useState(48)
  const [completed, setCompleted] = useState(false)
  const [data, setData] = useState({})
  const menu = useRef(null)
  const router = useRouter()
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [searchClub, setSearchClub] = useState(false)
  const [searchEvent, setSearchEvent] = useState(false)
  const [searchEventJoined, setSearchEventJoined] = useState(false)
  const language = router.locale
  const [event, setEvents] = useState([])
  const [clubsCreated, setClubsCreated] = useState([])
  const [eventsJoined, setEventsJoined] = useState([])

  const { t } = useTranslation('user')
  const { t: tClub } = useTranslation('club')

  const handleClick = (url) => {
    router.push(url)
  }

  const end_items = [
    {
      label: t('edit-info'),
      icon: 'pi pi-fw pi-user-edit',
      command: () => handleClick('/user/profile/setting'),
    },
    {
      label: t('change-avatar'),
      icon: 'pi pi-fw pi-image',
      command: () => {
        setVisibleChange(true)
      },
    },
    {
      label: t('change-password'),
      icon: 'pi pi-fw pi-pencil',
      command: () => handleClick(`/user/profile/setting/?connect=${1}`),
    },
    {
      label: t('connect-strava'),
      icon: 'pi pi-fw  pi-link',
      command: () => handleClick(`/user/profile/setting/?connect=${2}`),
    },
    {
      separator: true,
    },
    {
      label: t('logout'),
      icon: 'pi pi-fw pi-power-off',
      command: () => handleClickLogout(),
    },
  ]

  useEffect(() => {
    //responsive window
    if (window.innerHeight > window.innerWidth) {
      setIsMobile(true)
    }
  }, [])

  useEffect(() => {
    fetchProfile()
  }, [])

  useEffect(() => {
    fetchActivities()
  }, [current_page, per_page, hour])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get('/user/profile')
      const data = res.data
      if (res.status === 200) {
        setData(data)
        setChartDateTime(data.chart_date.map((time) => time.date_time))
        setChartDateDistance(
          data.chart_date.map((distance) => distance.date_distance)
        )
        setChartDatePace(data.chart_date.map((pace) => pace.date_pace))
        setChartMonthTime(data.chart_month.map((time) => time.month_time))
        setChartMonthDistance(
          data.chart_month.map((distance) => distance.month_distance)
        )
        setChartMonthPace(data.chart_month.map((pace) => pace.month_pace))
        setLoading(false)
      }
    } catch (error) {
      showToast('error', 'Error', error.toString())
      setLoading(false)
    }
  }

  const fetchActivities = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/user/recent-active?per_page=${per_page}&current_page=${current_page}&search_name=${search_name}&hour=${hour}`
      )
      if (res.status === 200) {
        setPerPage(res.data.per_page)
        setTotalRecords(res.data.total_activities)
        setCurrentPage(res.data.current_page)
        setActivities(res.data.activities)
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [completed, current_page_event, per_page_event, searchEvent])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/user/event-completed?current_page=${current_page_event}&per_page=${per_page_event}&search_name=${search_name_event}&complete=${completed}`
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
        `/clubs/created-club?current_page=${current_page_club}&per_page=${per_page_club}&search_name=${search_name_club}`
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
              src={item.image ? item.image : '/logoclub.png'}
              alt={item.name}
              width={800}
              height={500}
              title={item.name}
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
      <div className='centered-content-layout'>
        <div id='profile-container'>
          <div id='statistic-container'>
            <div id='statistic-content'>
              <div id='statistic-card' title='Tổng quãng đường đã chạy'>
                <h1>{LocaleHelper.formatNumber(data.total_distance)}</h1>
                <h4>{t('total-distance')}</h4>
              </div>
              <div id='statistic-card' title='Tốc độ trung bình'>
                <h1>
                  {language === 'vi'
                    ? LocaleHelper.formatPace(data.avg_pace)
                    : LocaleHelper.formatMinutesKmToMilesKm(data.avg_pace)}
                </h1>
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
                <h1>{data.total_event}</h1>
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
                <Image
                  style={{
                    border: '1px solid #ffffff',
                    marginTop: '2rem',
                    marginLeft: '1rem',
                    width: '10rem',
                    height: '10rem',
                  }}
                  src={data.image ? data.image : '/default-avatar.png'}
                  alt='avatar'
                  width={100}
                  height={100}
                />
                <div id='info-profile-container'>
                  {isMobile ? (
                    <div id='name-container'>
                      <h1>{data.last_name + ' ' + data.first_name}</h1>
                    </div>
                  ) : (
                    <div id='name-container'>
                      <h1>{data.last_name + ' ' + data.first_name}</h1>
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
                      {t('user-id')} {data.user_id}{' '}
                    </h4>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <Image
                      src='/strava-icon.png'
                      alt='Connected Strava'
                      style={{ width: '3rem', height: '3rem' }}
                      width={20}
                      height={20}
                      title={
                        data.strava_user_link !== null
                          ? data.strava_user_link
                          : null
                      }
                      onClick={() => {
                        window.open(
                          data.strava_user_link !== null
                            ? data.strava_user_link
                            : null,
                          '_blank'
                        )
                      }}
                    />
                    <Link href='/user/profile/setting?connect=2'>
                      <h5 style={{ marginTop: '1rem' }}>
                        {data.strava_user_link !== null
                          ? t('connected-strava')
                          : t('not-connected-strava')}
                      </h5>
                    </Link>
                  </div>
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
          <Dialog
            header={t('change-avatar')}
            visible={visibleChange}
            position='top'
            style={{ width: '60%', height: '60%', borderRadius: '20px' }}
            onHide={() => setVisibleChange(false)}
          >
            <ChangeAvatar
              setLoading={setLoading}
              showToast={showToast}
              setVisibleChange={setVisibleChange}
            />
          </Dialog>
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
                style={
                  isMobile
                    ? { fontSize: '0.8rem' }
                    : { width: 'auto', minWidth: '22%' }
                }
                onClick={() => {
                  setActiveIndex(1)
                  setCompleted(false)
                }}
              />
              <Button
                id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
                icon='pi pi-calendar-plus'
                label={isMobile ? t('recent') : t('recent-activities')}
                style={
                  isMobile
                    ? { fontSize: '0.8rem' }
                    : { width: 'auto', minWidth: '22%' }
                }
                onClick={() => {
                  setActiveIndex(2)
                }}
              />
              <Button
                id={activeIndex === 3 ? 'button-tab--active' : 'button-tab'}
                icon='pi pi-calendar-minus'
                label={isMobile ? t('completed') : t('completed-events')}
                style={
                  isMobile
                    ? { fontSize: '0.8rem' }
                    : { width: 'auto', minWidth: '22%' }
                }
                onClick={() => {
                  setActiveIndex(3)
                  setCompleted(true)
                }}
              />
              <Button
                id={activeIndex === 4 ? 'button-tab--active' : 'button-tab'}
                icon='pi pi-images'
                // label={t('collection')}
                label={isMobile ? t('clubs') : t('clubs-created')}
                style={
                  isMobile
                    ? { fontSize: '0.8rem' }
                    : { width: 'auto', minWidth: '22%' }
                }
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

export default Profile

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'user',
        'club',
        'scoreboard',
        'topbar',
      ])),
    },
  }
}
