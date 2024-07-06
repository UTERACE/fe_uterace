import RankMember from '@/pages/scoreboard/RankMember'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useState } from 'react'
import Countdown from '../Countdown'
import apiInstance from '@/api/apiInstance'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import { useRouter } from 'next/router'
import store from '@/store/store'
import Image from 'next/image'
import Activity from '@/pages/user/profile/Activity'
import { AutoComplete } from 'primereact/autocomplete'
import Head from 'next/head'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { Dialog } from 'primereact/dialog'
import { Dropdown } from 'primereact/dropdown'
import Title from '@/components/landing/Title'

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
  const [visibleJoin, setVisibleJoin] = useState(false)
  const [visibleLogin, setVisibleLogin] = useState(false)
  const [checkJoin, setCheckJoin] = useState(false)
  const [activities, setActivities] = useState({})
  const [rankMember, setRankMember] = useState({})
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [hour, setHour] = useState(720)

  const { t } = useTranslation('detail')
  const router = useRouter()
  const language = router.locale
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  useEffect(() => {
    if (activeIndex === 3) {
      fetchRankMember()
    } else if (activeIndex === 4) {
      fetchActivities()
    }
  }, [current_page, per_page, search, activeIndex])

  useEffect(() => {
    checkJoinEvent()
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
        `/events/recent-active/${event.event_id}?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}&hour=${hour}`
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

  const handleJoinEvent = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/events/join-event/${event.event_id}`)
      const data = res.data
      if (res.status === 200) {
        showToast('success', t('join_event_success'), data.message)
        setCheckJoin(true)
        setVisibleJoin(false)
        setLoading(false)
      }
    } catch (error) {
      showToast('error', t('join_event_fail'))
      setLoading(false)
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
        setCheckJoin(false)
        setVisibleJoin(false)
        setLoading(false)
      }
    } catch (error) {
      showToast('error', t('leave_event_fail'))
      setLoading(false)
    }
  }

  const checkJoinAnLeave = () => {
    if (checkJoin) {
      if (
        event.is_free &&
        Date.now() > new Date(event.from_date).getTime() &&
        Date.now() < new Date(event.to_date).getTime()
      ) {
        return false
      }
      return true
    }
    return false
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
            {event.is_free ? (
              <div id='event-price-detail'>
                <h4>{t('free')}</h4>
              </div>
            ) : (
              <div id='event-price-detail'>
                <h4>
                  {LocaleHelper.formatCurrency(
                    event.registration_fee,
                    language
                  )}
                </h4>
              </div>
            )}
            <Button
              id='button-join'
              label={checkJoin ? t('leave_event') : t('join-now')}
              disabled={checkJoinAnLeave()}
              onClick={() => {
                if (store.getState().auth.isAuthenticated) {
                  setVisibleJoin(true)
                } else {
                  setVisibleLogin(true)
                }
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
                  fetchRankMember()
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
                  fetchActivities()
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
                  <Title title={t('scoreboard-member')} />
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
                  {/* <AutoComplete
                    value={search_name}
                    onChange={(e) => setSearchName(e.target.value)}
                    completeMethod={(e) => setSearch(!search)}
                    placeholder={t('search_activities')}
                  /> */}
                  <Title title={t('recent-activities')} />
                  <Dropdown
                    value={hour}
                    options={[
                      { label: '48 giờ qua', value: 48 },
                      { label: '7 ngày qua', value: 168 },
                      { label: '30 ngày qua', value: 720 },
                      { label: '3 tháng qua', value: 2160 },
                      { label: '6 tháng qua', value: 4320 },
                      { label: '1 năm qua', value: 8760 },
                    ]}
                    onChange={(e) => setHour(e.value)}
                    optionLabel='label'
                    placeholder={t('select-hour')}
                    style={{ height: '2.2rem' }}
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
      <Dialog
        header={
          checkJoin && event.is_free
            ? t('notify_leave_event_third')
            : !checkJoin && event.is_free
            ? t('notify_not_join_event_third')
            : t('notify_not_join_event_fourth') +
              ' ' +
              LocaleHelper.formatCurrency(event.registration_fee, language)
        }
        visible={visibleJoin}
        onHide={() => setVisibleJoin(false)}
        style={{ width: '30vw' }}
      >
        <div className='dialog-content-confirm'>
          <p>
            {checkJoin
              ? t('notify_leave_event_first')
              : t('notify_not_join_event_first')}
          </p>
          <p>
            {checkJoin
              ? t('notify_leave_event_second')
              : t('notify_not_join_event_second')}
          </p>
          <p>
            {checkJoin
              ? t('notify_leave_event_third')
              : t('notify_not_join_event_third')}
          </p>

          <div className='confirm-button-container'>
            <Button
              severity='secondary'
              raised
              id='button-detail'
              style={{ color: 'red' }}
              icon='pi pi-times'
              label={t('close')}
              onClick={() => {
                setVisibleJoin(false)
              }}
            />
            {!event.is_free ? (
              <Button
                severity='secondary'
                raised
                id='button-detail'
                icon='pi pi-sign-in'
                label={t('payment')}
                onClick={() => {
                  router.push(`/events/payment/${event.event_id}`)
                }}
              />
            ) : (
              <Button
                severity='secondary'
                raised
                id='button-detail'
                icon='pi pi-sign-in'
                label={checkJoin ? t('leave_event_now') : t('join_event_now')}
                onClick={() => {
                  if (checkJoin) {
                    handleLeaveEvent()
                  } else {
                    handleJoinEvent()
                  }
                }}
              />
            )}
          </div>
        </div>
      </Dialog>
      <Dialog
        header={t('notify_not_login_third')}
        visible={visibleLogin}
        onHide={() => setVisibleLogin(false)}
        style={{ width: '30vw' }}
      >
        <div className='dialog-content-confirm'>
          <p>{t('notify_not_login_first')}</p>
          <p>{t('notify_not_login_second')}</p>
          <p>{t('notify_not_login_third')}</p>
          <div className='confirm-button-container'>
            <Button
              severity='secondary'
              raised
              id='button-detail'
              style={{ color: 'red' }}
              icon='pi pi-times'
              label={t('close')}
              onClick={() => setVisibleLogin(false)}
            />
            <Button
              severity='secondary'
              raised
              id='button-detail'
              icon='pi pi-sign-in'
              label={t('login_now')}
              onClick={() => router.push('/login')}
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default EventDetail
