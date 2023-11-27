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

export const getServerSideProps = async ({ locale, params }) => {
  const event = await getEvent(params.id)
  return {
    props: {
      event,
      ...(await serverSideTranslations(locale, [
        'detail',
        'news',
        'scoreboard',
        'topbar',
      ])),
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
  const [per_page, setPerPage] = useState(5)
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
  const [rankClub, setRankClub] = useState({})

  const { t } = useTranslation('detail')

  useEffect(() => {
    // setActivities(event.activities)
    // setRankMember(event.ranking_member)
    // setRankClub(event.ranking_club)
    checkJoinEvent()
  }, [updateStatus])

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
              label={checkJoin ? t('leave_club') : t('join-now')}
              onClick={() => {
                setVisible(true)
              }}
            />
          </div>
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
                  <div id='distance-event'>
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

          <div id='event-info-detail'>
            <div id='statistic-event'>
              <Button
                id='button-tab'
                style={{ width: '35%' }}
                label={`${event.total_member} ${t('participants')}`}
                onClick={() => {}}
              />
              <Button
                id={!isStatistic ? 'button-tab' : 'button-tab--active'}
                label={t('view-statistic')}
                style={{ width: '35%' }}
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
                    <h4>{t('total-distance')}</h4>
                    <h4>{event.total_distance}</h4>
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
                    <h4>{event.min_pace}</h4>
                  </div>
                </div>
                <div id='info-event-detail'>
                  <div id='detail-event-container'>
                    <h4>{t('athlete-completed')}</h4>
                    <h4>{event.completed}</h4>
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
                    <h4>{event.max_pace}</h4>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div id='info-detail'>
            <div id='statistic-event'>
              <Button
                id={activeIndex === 0 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '20%' }}
                icon='pi pi-tags'
                label={t('detail')}
                onClick={() => {
                  setActiveIndex(0)
                }}
              />
              <Button
                id={activeIndex === 1 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '20%' }}
                icon='pi pi-calendar-plus'
                label={t('rules')}
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '22%' }}
                icon='pi pi-calendar-plus'
                label={t('awards')}
                onClick={() => {
                  setActiveIndex(2)
                }}
              />
              <Button
                id={activeIndex === 3 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '20%' }}
                icon='pi pi-chart-line'
                label={t('scoreboard-member')}
                onClick={() => {
                  setActiveIndex(3)
                }}
              />
              <Button
                id={activeIndex === 4 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '20%' }}
                icon='pi pi-chart-line'
                label={t('scoreboard-club')}
                onClick={() => {
                  setActiveIndex(4)
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
              <div>
                <RankMember value={rankMember.items} />
                <Paginator
                  first={first}
                  rows={rankMember.per_page}
                  totalRecords={rankMember.total_activity}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={rankMember.current_page}
                />
              </div>
            ) : activeIndex === 4 ? (
              <div>
                <RankClub value={rankClub.items} />
                <Paginator
                  first={first}
                  rows={rankClub.per_page}
                  totalRecords={rankClub.total_activity}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={rankClub.current_page}
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
