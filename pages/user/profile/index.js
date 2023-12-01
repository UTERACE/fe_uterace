import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { SlideMenu } from 'primereact/slidemenu'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Activity from './Activity'
import { Paginator } from 'primereact/paginator'
import { Dialog } from 'primereact/dialog'
import Title from '@/components/landing/Title'
import ChartActivity, { ChartDaily, ChartMonthly } from './ChartActivity'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChangeAvatar from './setting/ChangeAvatar'
import DataViewDashboard from '@/components/dataview/DataViewDashboard'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import apiInstance from '@/api/apiInstance'
import { AutoComplete } from 'primereact/autocomplete'
import Image from 'next/image'
import LocaleHelper from '@/components/locale/LocaleHelper'

const Profile = () => {
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const [visibleChange, setVisibleChange] = useState(false)
  const [activeIndex, setActiveIndex] = useState(2)

  const [polyline, setPolyline] = useState([])
  const [chartDateTime, setChartDateTime] = useState([])
  const [chartDatePace, setChartDatePace] = useState([])
  const [chartDateDistance, setChartDateDistance] = useState()
  const [chartMonthTime, setChartMonthTime] = useState([])
  const [chartMonthPace, setChartMonthPace] = useState([])
  const [chartMonthDistance, setChartMonthDistance] = useState([])
  const [activities, setActivities] = useState([])
  const [search_name, setSearchName] = useState('')
  const [hour, setHour] = useState(2500)
  const [clubs, setClubs] = useState([])
  const [avatarImage, setAvatarImage] = useState('')
  const [avatarLabel, setAvatarLabel] = useState('A')
  const [data, setData] = useState({})
  const menu = useRef(null)
  const router = useRouter()
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [search, setSearch] = useState(false)

  const { t } = useTranslation('user')

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
    fetchProfile()
  }, [])

  useEffect(() => {
    fetchActivities()
  }, [current_page, per_page, search, hour])

  const fetchProfile = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get('/user/profile')
      const data = res.data
      if (res.status === 200) {
        setData(data)
        setAvatarImage(data.image)
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

  const fetchDataMap = async (activity_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.get(`/decode_polyline/${activity_id}`)
      if (res.status === 200) {
        setPolyline(res.data)
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const fetchActivities = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/user/recent-active?per_page=${per_page}&page=${current_page}&search_name=${search_name}&hour=25000`
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
            <Image src={item.image} alt={item.name} />
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
                <h1>{LocaleHelper.formatNumber(data.total_distance)}</h1>
                <h4>{t('total-distance')}</h4>
              </div>
              <div id='statistic-card' title='Tốc độ trung bình'>
                <h1>{LocaleHelper.formatPace(data.avg_pace)}</h1>
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
                    <Image
                      src='/verified.png'
                      alt='verified'
                      width={20}
                      height={20}
                    />
                    <i className='fas icon-large fa-edit'></i>
                  </div>
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
          <div id='profile-chart-container'>
            <div id='chart-container'>
              <ChartDaily
                labels={chartDateTime}
                seriesData={chartDateDistance}
              />
            </div>
            <div id='chart-container'>
              <ChartMonthly
                labels={chartMonthTime}
                seriesData={chartMonthDistance}
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
                <Activity
                  activities={activities}
                  setLoading={setLoading}
                  showToast={showToast}
                />
                <div>
                  <AutoComplete
                    value={search_name}
                    onChange={(e) => setSearchName(e.target.value)}
                    completeMethod={(e) => setSearch(!search)}
                    placeholder={'Tìm kiếm hoạt động'}
                  />
                </div>
              </div>
            ) : activeIndex === 3 ? (
              <div style={{ width: '95%' }}>
                {/* <DataViewDashboard
                  data={data.club}
                  href='/clubs/club-management/'
                  itemTemplate={itemTemplate}
                /> */}
              </div>
            ) : activeIndex === 1 ? (
              <div style={{ width: '95%' }}>
                {/* <DataViewDashboard
                  data={data.club}
                  href='/clubs/club-management/'
                  itemTemplate={itemTemplate}
                /> */}
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

export default Profile

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'user',
        'scoreboard',
        'topbar',
      ])),
    },
  }
}
