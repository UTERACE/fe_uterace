import RankClub from '@/pages/landing/RankClub'
import RankMember from '@/pages/scoreboard/RankMember'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useRef, useState } from 'react'
import Countdown from '../Countdown'
import apiInstance from '@/api/apiInstance'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import { useRouter } from 'next/router'
import store from '@/store/store'
import { ConfirmPopup } from 'primereact/confirmpopup'
import Image from 'next/image'
import Activity from '@/pages/user/profile/Activity'
import { AutoComplete } from 'primereact/autocomplete'
import Head from 'next/head'
import LocaleHelper from '@/components/locale/LocaleHelper'

export const getServerSideProps = async ({ locale, params }) => {
  const event = await getEvent(params.id)
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'detail',
        'news',
        'scoreboard',
        'topbar',
      ])),
      event,
    },
  }
}

async function getEvent(id) {
  try {
    const response = await apiInstance.get(`/events/${id}`)
    const data = await response.data
    return data
  } catch (error) {
    console.error('Error fetching event details:', error)
    return null
  }
}

const EventDetail = ({ event }) => {
  const [isStatistic, setIsStatistic] = useState(false)
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [activeIndex, setActiveIndex] = useState(2)
  const [visible, setVisible] = useState(false)
  const [checkJoin, setCheckJoin] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(false)
  const buttonEl = useRef(null)

  const router = useRouter()
  const roles = store.getState().auth.roles
  const hasUserRole = roles ? roles.some((role) => role.roleId === 2) : false

  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [activities, setActivities] = useState({})
  const [rankMember, setRankMember] = useState({})
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { t } = useTranslation('detail')

  useEffect(() => {
    // setActivities(event.activities)
    // setRankMember(event.ranking_member)
    // setRankClub(event.ranking_club)
    checkJoinEvent()
  }, [updateStatus])

  useEffect(() => {
    if (activeIndex === 3) {
      fetchRankMember()
    } else if (activeIndex === 4) {
      fetchActivities()
    }
  }, [current_page, per_page, search, activeIndex])

  useEffect(() => {
    //responsive window
    if (window.innerHeight > window.innerWidth) {
      setIsMobile(true)
    }
  }, [])

  const fetchRankMember = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/events/rank-member/${event.event_id}?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      const data = res.data
      if (res.status === 200) {
        setRankMember(data)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
        setTotalRecords(data.total_user)
        setLoading(false)
      }
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }

  const fetchActivities = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/events/recent-active/${event.event_id}?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}&hour=48`
      )
      const data = res.data
      if (res.status === 200) {
        setActivities(data)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
        setTotalRecords(data.total_activities)
        setLoading(false)
      }
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }

  const checkJoinEvent = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/events/check-join-event/${event.event_id}`
      )
      const data = res.data
      if (res.status === 200) {
        setCheckJoin(data)
        setLoading(false)
      }
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }

  const acceptJoin = () => {
    handleJoinEvent()
  }

  const acceptLeave = () => {
    handleLeaveEvent()
  }

  const reject = () => {
    showToast('info', t('rejected'), t('you_are_rejected'))
  }

  const handleJoinEvent = async () => {
    setLoading(true)
    if (!hasUserRole) {
      router.push('/login')
      setLoading(false)
      showToast('error', t('leave_event_fail'), t('not_login'))
    } else {
      try {
        const res = await apiInstance.post(
          `/events/join-event/${event.event_id}`
        )
        const data = res.data
        if (res.status === 200) {
          showToast('success', t('join_event_success'), data.message)
          setUpdateStatus(!updateStatus)
          setLoading(false)
        }
      } catch (error) {
        showToast('error', t('join_event_fail'))
        setLoading(false)
      }
    }
  }

  const handleLeaveEvent = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.post(
        `/events/leave-event/${event.event_id}`
      )
      const data = res.data
      if (res.status === 200) {
        showToast('success', t('leave_event_success'), data.message)
        setUpdateStatus(!updateStatus)
        setLoading(false)
      }
    } catch (error) {
      showToast('error', t('leave_event_fail'))
      setLoading(false)
    }
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  return (
    <div className='centered-content-detailpage'>
      <Head>
        <title>{event.name}</title>
        <meta name='description' content={event.description} />
      </Head>
      <div className='centered-content-layout'>
        <div id='event-detail-container'>
          <div id='event-image-container-detail'>
            <Image src={event.image} alt='event' width={1080} height={780} />
          </div>
          <div id='event-info-detail'>
            <Image
              id='event-info-detail-img'
              src={event.image}
              alt='logo'
              width={200}
              height={200}
            />
            <h1>{event.name}</h1>
            <h6>{event.description}</h6>
            <div id='event-time-detail'>
              <Countdown
                from_date={event.from_date}
                to_date={event.to_date}
                t={t}
              />
            </div>
            <ConfirmPopup
              target={buttonEl.current}
              visible={visible}
              onHide={() => setVisible(false)}
              message={
                checkJoin ? t('confirm_leave_event') : t('confirm_join_event')
              }
              icon='pi pi-exclamation-triangle'
              accept={checkJoin ? acceptLeave : acceptJoin}
              reject={reject}
            />
            <Button
              ref={buttonEl}
              id='button-join'
              label={checkJoin ? t('leave_event') : t('join-now')}
              disabled={
                Date.now() > new Date(event.from_date).getTime() &&
                Date.now() < new Date(event.to_date).getTime()
                  ? false
                  : true
              }
              onClick={() => {
                setVisible(true)
              }}
            />
          </div>
          {isMobile ? (
            <div id='mobile-event-distance-container'>
              <div id='event-distance-title-container'>
                <div
                  id='distance-event'
                  style={{
                    backgroundColor: '#ffffff',
                    width: '70%',
                    marginBottom: '1rem',
                  }}
                >
                  {t('race-distances')}
                </div>
                <div id='event-distance-detail'>
                  {event.distance.map((item, index) => (
                    <div id='distance-event' key={item.id}>
                      <i className='pi pi-map-marker'></i>
                      <h4>{item.name}</h4>
                    </div>
                  ))}
                </div>
              </div>

              <div id='event-distance-title-container'>
                <div
                  id='distance-event'
                  style={{
                    backgroundColor: '#ffffff',
                    width: '70%',
                    marginBottom: '1rem',
                  }}
                >
                  {t('qualifying-activities')}
                </div>
                <div id='event-distance-detail'>
                  <div id='distance-event'>
                    <i className='pi pi-map-marker'></i>
                    <h4>{t('running')}</h4>
                  </div>
                  <div id='distance-event'>
                    <i className='pi pi-map-marker'></i>
                    <h4>{t('walking')}</h4>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          ) : (
            <div id='event-distance-container'>
              <div id='event-distance-title-container'>
                <div
                  id='distance-event'
                  style={{
                    backgroundColor: '#ffffff',
                    width: '70%',
                    marginBottom: '1rem',
                  }}
                >
                  {t('race-distances')}
                </div>
                <div id='event-distance-detail'>
                  {event.distance.map((item, index) => (
                    <div id='distance-event' key={item.id}>
                      <i className='pi pi-map-marker'></i>
                      <h4>{item.name}</h4>
                    </div>
                  ))}
                </div>
              </div>

              <div id='event-distance-title-container'>
                <div
                  id='distance-event'
                  style={{
                    backgroundColor: '#ffffff',
                    width: '70%',
                    marginBottom: '1rem',
                  }}
                >
                  {t('qualifying-activities')}
                </div>
                <div id='event-distance-detail'>
                  <div id='distance-event'>
                    <i className='pi pi-map-marker'></i>
                    <h4>{t('running')}</h4>
                  </div>
                  <div id='distance-event'>
                    <i className='pi pi-map-marker'></i>
                    <h4>{t('walking')}</h4>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div id='event-info-detail'>
            <div id='statistic-event'>
              <Button
                id='button-tab'
                style={{ width: 'auto', minWidth: '25%' }}
                label={`${event.total_member} ${t('participants')}`}
                onClick={() => {}}
              />
              <Button
                id={!isStatistic ? 'button-tab' : 'button-tab--active'}
                label={t('view-statistic')}
                style={{ width: 'auto', minWidth: '25%' }}
                iconPos='right'
                icon={!isStatistic ? 'pi pi-angle-down' : 'pi pi-angle-up'}
                onClick={() => {
                  setIsStatistic(!isStatistic)
                }}
              />
            </div>
            {isStatistic ? (
              <div id='info-event-container'>
                <div id='info-event-detail'>
                  <div id='detail-event-container'>
                    <h4>{t('total-member-join')}</h4>
                    <h4>{event.total_member}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>{t('athlete-completed')}</h4>
                    <h4>{event.completed}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>{t('total-activities')}</h4>
                    <h4>{event.total_activities}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>{t('total-clubs')}</h4>
                    <h4>{event.total_clubs}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>{t('min-pace')}</h4>
                    <h4>{LocaleHelper.formatPace(event.min_pace)}</h4>
                  </div>
                </div>
                <div id='info-event-detail'>
                  <div id='detail-event-container'>
                    <h4>{t('total-distance')}</h4>
                    <h4>{LocaleHelper.formatNumber(event.total_distance)}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>{t('athlete-in-progress')}</h4>
                    <h4>{event.not_completed}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>{t('athlete-male')}</h4>
                    <h4>{event.male}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>{t('athlete-female')}</h4>
                    <h4>{event.female}</h4>
                  </div>
                  <div id='detail-event-container'>
                    <h4>{t('max-pace')}</h4>
                    <h4>{LocaleHelper.formatPace(event.max_pace)}</h4>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div id='info-detail'>
            <div id='statistic-event'>
              <Button
                id={activeIndex === 0 ? 'button-tab--active' : 'button-tab'}
                style={{ width: 'auto', minWidth: '18%' }}
                icon='pi pi-tags'
                label={t('detail')}
                onClick={() => {
                  setActiveIndex(0)
                }}
              />
              <Button
                id={activeIndex === 1 ? 'button-tab--active' : 'button-tab'}
                style={{ width: 'auto', minWidth: '18%' }}
                icon='pi pi-calendar-plus'
                label={t('rules')}
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
                style={{ width: 'auto', minWidth: '18%' }}
                icon='pi pi-calendar-plus'
                label={t('awards')}
                onClick={() => {
                  setActiveIndex(2)
                }}
              />
              <Button
                id={activeIndex === 3 ? 'button-tab--active' : 'button-tab'}
                style={{ width: 'auto', minWidth: '18%' }}
                icon='pi pi-chart-line'
                label={isMobile ? t('mobile_members') : t('scoreboard-member')}
                onClick={() => {
                  setActiveIndex(3)
                  setSearchName('')
                }}
              />
              <Button
                id={activeIndex === 4 ? 'button-tab--active' : 'button-tab'}
                style={{ width: 'auto', minWidth: '18%' }}
                icon='pi pi-chart-line'
                label={
                  isMobile ? t('mobile_activities') : t('recent-activities')
                }
                onClick={() => {
                  setActiveIndex(4)
                  setSearchName('')
                }}
              />
            </div>
            {activeIndex === 1 ? (
              <div
                style={{ width: '100%' }}
                dangerouslySetInnerHTML={{ __html: event.regulations }}
              ></div>
            ) : activeIndex === 2 ? (
              <div
                style={{ width: '100%' }}
                dangerouslySetInnerHTML={{ __html: event.prize }}
              ></div>
            ) : activeIndex === 3 ? (
              <div style={{ width: '100%' }}>
                <div>
                  <AutoComplete
                    value={search_name}
                    onChange={(e) => setSearchName(e.target.value)}
                    completeMethod={(e) => setSearch(!search)}
                    placeholder={t('search_members')}
                  />
                </div>
                <RankMember value={rankMember.ranking_user} />
                <Paginator
                  first={first}
                  rows={per_page}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={current_page}
                />
              </div>
            ) : activeIndex === 4 ? (
              <div style={{ width: '95%' }}>
                {/* <RankClub value={rankClub.items} /> */}
                <div>
                  <AutoComplete
                    value={search_name}
                    onChange={(e) => setSearchName(e.target.value)}
                    completeMethod={(e) => setSearch(!search)}
                    placeholder={t('search_activities')}
                  />
                </div>
                <Activity
                  activities={activities.activities}
                  setLoading={setLoading}
                  showToast={showToast}
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
            ) : (
              <div
                style={{ width: '100%' }}
                dangerouslySetInnerHTML={{ __html: event.details }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail
