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
import { useRouter } from 'next/router'
import { MultiSelect } from 'primereact/multiselect'
import UpdateInfo from './UpdateInfo'
import Image from 'next/image'
import { AutoComplete } from 'primereact/autocomplete'
import Activity from '@/pages/user/profile/Activity'
import Head from 'next/head'

export const getServerSideProps = async ({ locale, params }) => {
  const event = await getEvent(params.id)
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'detail',
        'event',
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
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleChange, setVisibleChange] = useState(false)
  const [visibleIntroduce, setVisibleIntroduce] = useState(false)
  const [visiblePrize, setVisiblePrize] = useState(false)
  const [visibleRole, setVisibleRole] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(false)
  const [distances, setDistances] = useState([])
  const [selectedCities, setSelectedCities] = useState(null)
  const [visibleAddDistance, setVisibleAddDistance] = useState(false)

  const [activities, setActivities] = useState({})
  const [rankMember, setRankMember] = useState({})
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState('')
  const [distance, setDistance] = useState(event.distance)
  const [introduce, setIntroduce] = useState(event.details)
  const [prize, setPrize] = useState(event.prize)
  const [role, setRole] = useState(event.regulations)

  const { t } = useTranslation('detail')
  const { t: tEvent } = useTranslation('event')

  useEffect(() => {
    // setActivities(event.activities)
    // setRankMember(event.ranking_member)
    // setRankClub(event.ranking_club)
    if (updateStatus) {
      //wait 1s to update
      setTimeout(() => {
        router.reload()
      }, 1000)
    }
    fetchDistance()
  }, [updateStatus])

  useEffect(() => {
    if (activeIndex === 3) {
      fetchRankMember()
    } else if (activeIndex === 4) {
      fetchActivities()
    }
  }, [current_page, per_page, search, activeIndex])

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

  const fetchDistance = async () => {
    try {
      const res = await apiInstance.get('/distance')
      const data = res.data
      if (res.status === 200) {
        const options = data.map((item) => ({
          name: item.runningCategoryName,
          id: item.runningCategoryID,
          distance: item.runningCategoryDistance,
        }))
        setDistances(options)
      }
    } catch (error) {
      showToast('error', t('get_distance_fail'), error)
    }
  }

  const fetchAddDistance = async (distance_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(
        `/events/${event.event_id}/add-distance/${distance_id}`
      )
      if (res.status === 200) {
        showToast('success', t('add_distance_success'), res.data.message)
        setLoading(false)
        setUpdateStatus(true)
      }
    } catch (error) {
      showToast('error', t('add_distance_fail'))
      setLoading(false)
    }
  }

  const fetchDeleteDistance = async (distance_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.delete(
        `/events/${event.event_id}/delete-distance/${distance_id}`
      )
      if (res.status === 200) {
        showToast('success', t('delete_distance_success'), res.data.message)
        setLoading(false)
        setUpdateStatus(true)
      }
    } catch (error) {
      showToast('error', t('delete_distance_fail'))
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
          min_pace={event.min_pace}
          max_pace={event.max_pace}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleChange={setVisibleChange}
          setUpdateStatus={setUpdateStatus}
          t={tEvent}
          tDetail={t}
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
        <UpdateInfo
          event_id={event.event_id}
          details={introduce}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleIntroduce={setVisibleIntroduce}
          setUpdateStatus={setUpdateStatus}
          t={tEvent}
        />
        {/* <DynamicTinyMCE
          value={introduce}
          onSave={setIntroduce}
          label='Chỉnh sửa'
        /> */}
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
        <UpdateInfo
          event_id={event.event_id}
          prize={prize}
          setLoading={setLoading}
          showToast={showToast}
          setVisiblePrize={setVisiblePrize}
          setUpdateStatus={setUpdateStatus}
          t={tEvent}
        />
        {/* <DynamicTinyMCE value={prize} onSave={setPrize} label='Chỉnh sửa' /> */}
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
        <UpdateInfo
          event_id={event.event_id}
          regulations={role}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleRole={setVisibleRole}
          setUpdateStatus={setUpdateStatus}
          t={tEvent}
        />

        {/* <DynamicTinyMCE value={role} onSave={setRole} label='Chỉnh sửa' /> */}
      </Dialog>
      <div className='centered-content-layout'>
        <div id='event-detail-container'>
          <div id='event-image-container-detail'>
            <Image src={event.image} alt='event' width={1080} height={780} />
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
                <div
                  id='add-distance-container'
                  onClick={() => {
                    setVisibleAddDistance(true)
                  }}
                >
                  <i className='pi pi-plus'></i>
                </div>
                <Dialog
                  header='Thêm khoảng cách'
                  visible={visibleAddDistance}
                  onHide={() => setVisibleAddDistance(false)}
                >
                  <div
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      gap: '1rem',
                      padding: '1rem',
                    }}
                  >
                    <MultiSelect
                      value={selectedCities}
                      onChange={(e) => setSelectedCities(e.value)}
                      options={distances}
                      optionLabel='name'
                      display='chip'
                      placeholder='Select Cities'
                      maxSelectedLabels={1}
                      className='w-full md:w-20rem'
                    />
                    <Button
                      label='Thêm'
                      onClick={() => {
                        fetchAddDistance(selectedCities[0].id)
                        setVisibleAddDistance(false)
                      }}
                    />
                  </div>
                </Dialog>
              </div>
              <div id='event-distance-detail'>
                {distance.map((item, index) => (
                  <div id='distance-event' key={item.id}>
                    <i className='pi pi-map-marker'></i>
                    <h4>{item.name}</h4>
                    <div
                      id='delete-distance-container'
                      onClick={() => {
                        fetchDeleteDistance(item.id)
                      }}
                    >
                      <i className='pi pi-minus'></i>
                    </div>
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
                    <h4>{LocaleHelper.formatPace(event.min_pace)}</h4>
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
                  setSearchName('')
                }}
              />
              <Button
                id={activeIndex === 4 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '20%' }}
                icon='pi pi-chart-line'
                label={t('recent_activities')}
                onClick={() => {
                  setActiveIndex(4)
                  setSearchName('')
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
              <div>
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
