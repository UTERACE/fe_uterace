import RankClub from '@/pages/landing/RankClub'
import RankMember from '@/pages/scoreboard/RankMember'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useState } from 'react'
import Countdown from '../Countdown'
import { Dialog } from 'primereact/dialog'
import Update from './UpdateEvent'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'

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

const DynamicTinyMCE = dynamic(
  () => import('../../../components/editor/TinyMCEEditor'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)

const EventDetail = ({ event }) => {
  const [isStatistic, setIsStatistic] = useState(false)
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleChange, setVisibleChange] = useState(false)
  const [visibleIntroduce, setVisibleIntroduce] = useState(false)
  const [visiblePrize, setVisiblePrize] = useState(false)
  const [visibleRole, setVisibleRole] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(false)

  const [activities, setActivities] = useState({})
  const [rankMember, setRankMember] = useState({})
  const [rankClub, setRankClub] = useState({})
  const [distance, setDistance] = useState(event.distance)
  const [introduce, setIntroduce] = useState(event.details)
  const [prize, setPrize] = useState(event.prize)
  const [role, setRole] = useState(event.regulations)

  const { t } = useTranslation('detail')

  useEffect(() => {
    // setActivities(event.activities)
    // setRankMember(event.ranking_member)
    // setRankClub(event.ranking_club)
    // setDistance(event.distance)
  }, [updateStatus])
  
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  return (
    <div className='centered-content-detailpage'>
      <Dialog
        header={t('update-info-event')}
        visible={visibleChange}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleChange(false)}
      >
        <Update
          event_id={event.event_id}
          image={event.image}
          name={event.name}
          description={event.description}
          start_time={event.from_date}
          end_time={event.to_date}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleChange={setVisibleChange}
          setUpdateStatus={setUpdateStatus}
        />
      </Dialog>
      <Dialog
        header={t('update-info-detail')}
        visible={visibleIntroduce}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleIntroduce(false)}
      >
        <DynamicTinyMCE
          value={introduce}
          onSave={setIntroduce}
          label='Chỉnh sửa'
        />
      </Dialog>
      <Dialog
        header={t('update-info-award')}
        visible={visiblePrize}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisiblePrize(false)}
      >
        <DynamicTinyMCE value={prize} onSave={setPrize} label='Chỉnh sửa' />
      </Dialog>
      <Dialog
        header={t('update-info-rules')}
        visible={visibleRole}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleRole(false)}
      >
        <DynamicTinyMCE value={role} onSave={setRole} label='Chỉnh sửa' />
      </Dialog>
      <div className='centered-content-layout'>
        <div id='event-detail-container'>
          <div id='event-image-container-detail'>
            <img src={event.image} alt='event' />
          </div>
          <div id='event-info-detail'>
            <div
              style={{ width: '100%', display: 'flex', justifyContent: 'end' }}
            >
              <Button
                id='button-join'
                icon='pi pi-calendar-plus'
                label={t('update-info')}
                onClick={() => {
                  setVisibleChange(true)
                }}
              />
            </div>
            <img id='event-info-detail-img' src={event.image} alt='logo' />
            <h1>{event.name}</h1>
            <h6>{event.description}</h6>
            <div id='event-time-detail'>
              <Countdown from_date={event.from_date} to_date={event.to_date} />
            </div>
            <Button
              id='button-join'
              label={t('join-now')}
              disabled={true}
              onClick={() => {}}
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
                {distance.map((item, index) => (
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
              <div style={{ width: '100%' }}>
                <Button
                  icon='pi pi-pencil'
                  id='button-join'
                  style={{ width: '30%' }}
                  label={t('update-info-rules')}
                  onClick={() => {
                    setVisibleRole(true)
                  }}
                />
                <div dangerouslySetInnerHTML={{ __html: role }}></div>
              </div>
            ) : activeIndex === 2 ? (
              <div style={{ width: '100%' }}>
                <Button
                  icon='pi pi-pencil'
                  id='button-join'
                  style={{ width: '40%' }}
                  label={t('update-info-award')}
                  onClick={() => {
                    setVisiblePrize(true)
                  }}
                />
                <div dangerouslySetInnerHTML={{ __html: prize }}></div>
              </div>
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
              <div>
                <Button
                  icon='pi pi-pencil'
                  id='button-join'
                  style={{ width: '30%' }}
                  label={t('update-info-detail')}
                  onClick={() => {
                    setVisibleIntroduce(true)
                  }}
                />
                <div
                  style={{ width: '100%' }}
                  dangerouslySetInnerHTML={{ __html: introduce }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetail
