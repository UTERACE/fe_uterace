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

export const getServerSideProps = async ({ locale, params }) => {
  const club = await getClub(params.id)
  return {
    props: {
      club,
      ...(await serverSideTranslations(locale, [
        'detail',
        'news',
        'scoreboard',
        'topbar',
      ])),
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
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [activeIndex, setActiveIndex] = useState(1)
  const [visible, setVisible] = useState(false)
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

  const { t } = useTranslation('detail')

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
      <div className='centered-content-layout'>
        <div id='detail-container'>
          <div id='image-container-detail'>
            <img src={club.image} alt='club' />
          </div>
          <div id='info-detail'>
            <img id='info-detail-img' src={club.image} alt='logo' />
            <h1>{club.name}</h1>
            <h6>{club.description}</h6>
            <ConfirmPopup
              target={buttonEl.current}
              visible={visible}
              onHide={() => setVisible(false)}
              message={t('confirm_join_club')}
              icon='pi pi-exclamation-triangle'
              accept={acceptJoin}
              reject={reject}
            />
            <Button
              ref={buttonEl}
              id='button-join'
              label={t('join-now')}
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
                <Activity activities={activities.items} />
                <Paginator
                  first={first}
                  rows={activities.per_page}
                  totalRecords={activities.total_activity}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={activities.current_page}
                />
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubDetail
