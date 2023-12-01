import Title from '@/components/landing/Title'
import News from '@/pages/landing/News'
import Activity from '@/pages/user/profile/Activity'
import RankMember from '@/pages/scoreboard/RankMember'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useRef, useState } from 'react'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import { useRouter } from 'next/router'
import store from '@/store/store'
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import Image from 'next/image'
import { AutoComplete } from 'primereact/autocomplete'
import Head from 'next/head'

export const getServerSideProps = async ({ locale, params }) => {
  const club = await getClub(params.id)
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'detail',
        'news',
        'scoreboard',
        'topbar',
      ])),
      club,
    },
  }
}

async function getClub(id) {
  try {
    const response = await apiInstance.get(`/clubs/${id}`)
    const data = await response.data
    return data
  } catch (error) {
    console.error('Error fetching club details:', error)
    return null
  }
}

const ClubDetail = ({ club }) => {
  const [isStatistic, setIsStatistic] = useState(false)
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [activeIndex, setActiveIndex] = useState(1)
  const [visible, setVisible] = useState(false)
  const [checkJoin, setCheckJoin] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(false)
  const buttonEl = useRef(null)

  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const router = useRouter()
  const roles = store.getState().auth.roles
  const hasUserRole = roles ? roles.some((role) => role.roleId === 2) : false

  const [introduce, setIntroduce] = useState(club.details)
  const [news, setNews] = useState(club.news)
  const [activities, setActivities] = useState({})
  const [rankMember, setRankMember] = useState({})
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState(false)

  const { t } = useTranslation('detail')

  useEffect(() => {
    checkJoinClub()
  }, [updateStatus])

  useEffect(() => {
    if (activeIndex === 3) {
      fetchRankMember()
    } else if (activeIndex === 2) {
      fetchActivities()
    }
  }, [current_page, per_page, search, activeIndex])

  const fetchRankMember = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/clubs/rank-member/${club.club_id}?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
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
        `/clubs/recent-active/${club.club_id}?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}&hour=48`
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

  const checkJoinClub = async () => {
    try {
      const res = await apiInstance.get(
        `/clubs/check-join-club/${club.club_id}`
      )
      const data = res.data
      if (res.status === 200) {
        setCheckJoin(data)
      }
    } catch (error) {
      showToast('error', t('get_info_fail'), error)
    }
  }

  const acceptJoin = () => {
    handleJoinClub()
  }

  const acceptLeave = () => {
    handleLeaveClub()
  }

  const reject = () => {
    showToast('info', t('rejected'), t('you_are_rejected'))
  }

  const handleJoinClub = async () => {
    setLoading(true)
    if (!hasUserRole) {
      router.push('/login')
      setLoading(false)
      showToast('error', t('join_club_fail'), t('not_login'))
    } else {
      try {
        const res = await apiInstance.post(`/clubs/join-club/${club.club_id}`)
        const dataRes = res.data
        if (res.status == 200) {
          showToast('success', t('join_club_success'), dataRes.message)
          setLoading(false)
          setUpdateStatus(true)
        }
      } catch (error) {
        showToast('error', t('join_club_fail'), error)
        setLoading(false)
      }
    }
  }

  const handleLeaveClub = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.delete(`/clubs/leave-club/${club.club_id}`)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', t('leave_club_success'), dataRes.message)
        setLoading(false)
        setUpdateStatus(true)
      }
    } catch (error) {
      showToast('error', t('leave_club_fail'), error)
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
        <title>{club.name}</title>
        <meta name='description' content={club.description} />
      </Head>
      <div className='centered-content-layout'>
        <div id='detail-container'>
          <div id='image-container-detail'>
            <Image src={club.image} alt='club' width={1080} height={780} />
          </div>
          <div id='info-detail'>
            <Image
              id='info-detail-img'
              src={club.image}
              alt='logo'
              width={200}
              height={200}
            />
            <h1>{club.name}</h1>
            <h6>{club.description}</h6>
            <ConfirmPopup
              target={buttonEl.current}
              visible={visible}
              onHide={() => setVisible(false)}
              message={
                checkJoin ? t('confirm_leave_club') : t('confirm_join_club')
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

          <div id='info-detail'>
            <div id='statistic-club'>
              <Button
                id='button-tab'
                style={{ width: '35%' }}
                label={`${club.total_member} ${t('participants')}`}
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
              <div id='info-club-container'>
                <div id='info-club-detail'>
                  <div id='detail-club-container'>
                    <h4>{t('total-member-join')}</h4>
                    <h4>{club.total_member}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>{t('total-distance')}</h4>
                    <h4>{club.total_distance}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>{t('total-activities')}</h4>
                    <h4>{club.total_activities}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>{t('total-news')}</h4>
                    <h4>{club.total_news}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>{t('min-pace')}</h4>
                    <h4>{club.min_pace}</h4>
                  </div>
                </div>
                <div id='info-club-detail'>
                  <div id='detail-club-container'>
                    <h4>{t('created-at')}</h4>
                    <h4>
                      {LocaleHelper.formatDateTime(new Date(club.created_at))}
                    </h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>{t('manager')}</h4>
                    <h4>{club.manager}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>{t('athlete-male')}</h4>
                    <h4>{club.male}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>{t('athlete-female')}</h4>
                    <h4>{club.female}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>{t('max-pace')}</h4>
                    <h4>{club.max_pace}</h4>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div id='info-detail'>
            <Title title={t('post-clubs')} />
            <News data={news} />
          </div>
          <div id='info-detail'>
            <div id='statistic-club'>
              <Button
                id={activeIndex === 1 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '100%' }}
                icon='pi pi-calendar-plus'
                label={t('detail')}
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '100%' }}
                icon='pi pi-calendar-plus'
                label={t('recent-activities')}
                onClick={() => {
                  setActiveIndex(2)
                }}
              />
              <Button
                id={activeIndex === 3 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '100%' }}
                icon='pi pi-calendar'
                label={t('scoreboard-member')}
                onClick={() => {
                  setActiveIndex(3)
                }}
              />
            </div>
            {activeIndex === 1 ? (
              <div
                style={{ width: '100%' }}
                dangerouslySetInnerHTML={{ __html: introduce }}
              ></div>
            ) : activeIndex === 2 ? (
              <div style={{ width: '95%' }}>
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubDetail
