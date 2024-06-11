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
import Post from '../Post'
import { Dialog } from 'primereact/dialog'
import NewPost from './NewPost'

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
  const [visibleLogin, setVisibleLogin] = useState(false)
  const [visibleJoin, setVisibleJoin] = useState(false)
  const [checkJoin, setCheckJoin] = useState(false)
  const [visibleAddNews, setVisibleAddNews] = useState(false)
  const [isMyPost, setIsMyPost] = useState(false)
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
  const [isMobile, setIsMobile] = useState(false)
  const [newFeed, setNewFeed] = useState([])
  const [page, setPage] = useState(1)

  const { t } = useTranslation('detail')
  const { t: tNews } = useTranslation('news')

  useEffect(() => {
    checkJoinClub()
  }, [])

  // useEffect(() => {
  //   fetchData()
  // }, [current_page, per_page, search, activeIndex])

  useEffect(() => {
    //responsive window
    if (window.innerHeight > window.innerWidth) {
      setIsMobile(true)
    }
  }, [])

  const fetchRankMember = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.get(
        `/clubs/rank-member/${club.club_id}?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res && res.status === 200) {
        const data = res.data
        setRankMember(data)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
        setTotalRecords(data.total_user)
      }
      setLoading(false)
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }

  const fetchRecentActivities = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.get(
        `/clubs/recent-active/${club.club_id}?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}&hour=48`
      )
      if (res && res.status === 200) {
        const data = res.data
        setActivities(data)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
        setTotalRecords(data.total_activities)
      }
      setLoading(false)
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

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(`/news/club/${club.club_id}`, {
        params: {
          current_page: page,
          per_page: 5,
          search_name: '',
        },
      })
      const data = res.data
      if (res.status === 200) {
        setNewFeed(data)
      }
    } catch (error) {
      showToast('error', t('get_news_fail'), error)
    }
    setLoading(false)
  }

  const fetchMyPosts = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(`/news/my-news/${club.club_id}`, {
        params: {
          current_page: page,
          per_page: 5,
          search_name: '',
        },
      })
      const data = res.data
      if (res.status === 200) {
        setNewFeed(data)
      }
    } catch (error) {
      showToast('error', t('get_news_fail'), error)
    }
    setLoading(false)
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
          setCheckJoin(true)
          setVisibleJoin(false)
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
        setCheckJoin(false)
        setVisibleJoin(false)
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
              id='button-join'
              label={checkJoin ? t('leave_club') : t('join-now')}
              onClick={() => {
                // setVisible(true)
                setVisibleJoin(true)
              }}
            />
          </div>

          <div id='info-detail'>
            <div id='statistic-club'>
              <Button
                id='button-tab'
                style={{ width: 'auto', minWidth: '25%' }}
                label={`${club.total_member} ${t('participants')}`}
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
              <div id='info-club-container'>
                <div id='info-club-detail'>
                  <div id='detail-club-container'>
                    <h4>{t('total-member-join')}</h4>
                    <h4>{club.total_member}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>{t('total-distance')}</h4>
                    <h4>{LocaleHelper.formatNumber(club.total_distance)}</h4>
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
                    <h4>{LocaleHelper.formatPace(club.min_pace)}</h4>
                  </div>
                </div>
                <div id='info-club-detail'>
                  <div id='detail-club-container'>
                    <h4>{t('created-at')}</h4>
                    <h4>
                      {isMobile
                        ? LocaleHelper.formatDate(new Date(club.created_at))
                        : LocaleHelper.formatDateTime(
                            new Date(club.created_at)
                          )}
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
                    <h4>{LocaleHelper.formatPace(club.max_pace)}</h4>
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
                style={{ width: 'auto', minWidth: '22%' }}
                icon='pi pi-calendar-plus'
                label={t('detail')}
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
                style={{ width: 'auto', minWidth: '22%' }}
                icon='pi pi-calendar-plus'
                label={t('new_feed')}
                onClick={() => {
                  setActiveIndex(2)
                  setIsMyPost(false)
                  if (store.getState().auth.isAuthenticated) fetchPosts()
                  else {
                    showToast(
                      'error',
                      t('not_login'),
                      t('notify_not_login_third')
                    )
                    setVisibleLogin(true)
                  }
                }}
              />
              <Button
                id={activeIndex === 3 ? 'button-tab--active' : 'button-tab'}
                style={{ width: 'auto', minWidth: '22%' }}
                icon='pi pi-calendar-plus'
                label={
                  isMobile ? t('mobile_activities') : t('recent-activities')
                }
                onClick={() => {
                  setActiveIndex(3)
                  fetchRecentActivities()
                }}
              />
              <Button
                id={activeIndex === 4 ? 'button-tab--active' : 'button-tab'}
                style={{ width: 'auto', minWidth: '22%' }}
                icon='pi pi-calendar'
                label={isMobile ? t('mobile_members') : t('scoreboard-member')}
                onClick={() => {
                  setActiveIndex(4)
                  fetchRankMember()
                }}
              />
            </div>
            {activeIndex === 1 ? (
              <div
                style={{ width: '100%' }}
                dangerouslySetInnerHTML={{ __html: introduce }}
              ></div>
            ) : activeIndex === 2 ? (
              <div style={{ width: '100%' }}>
                <div>
                  <div className='new-feed-menu'>
                    <div className='new-feed-button-container'>
                      <Button
                        icon='pi pi-plus p-icon-large'
                        style={{
                          width: '3rem',
                          height: '3rem',
                          borderRadius: '50%',
                        }}
                        onClick={() => {
                          setVisibleAddNews(true)
                        }}
                      />
                    </div>

                    <div className='new-feed-search '>
                      <AutoComplete
                        value={search_name}
                        style={{ width: '70%' }}
                        onChange={(e) => setSearchName(e.target.value)}
                        completeMethod={(e) => setSearch(!search)}
                        placeholder={t('search_for') + "'" + club.name + "'"}
                      />
                    </div>
                    <div className='new-feed-button-container'>
                      <Button
                        label={t('my_post')}
                        style={{
                          height: '3rem',
                          borderRadius: '1rem',
                        }}
                        onClick={() => {
                          setIsMyPost(true)
                          fetchMyPosts()
                        }}
                      />
                    </div>
                  </div>
                  <div className='new-feed-container'>
                    {newFeed.map((item, index) => (
                      <Post
                        key={index}
                        club_id={club.club_id}
                        post_id={item.post_id}
                        post_title={item.post_title}
                        post_content={item.post_content}
                        post_description={item.post_description}
                        post_date={item.post_date}
                        post_image={item.post_image}
                        count_likes={item.count_likes}
                        count_comments={item.count_comments}
                        is_liked={item._liked}
                        user_id={item.user_id}
                        user_name={item.user_name}
                        user_avatar={item.user_avatar}
                        user_role={item.user_role}
                        checkJoin={setCheckJoin}
                        t={t}
                        showToast={showToast}
                        isMyPost={isMyPost}
                        fetchMyPosts={fetchMyPosts}
                      />
                    ))}
                  </div>
                </div>

                <Paginator
                  first={first}
                  rows={per_page}
                  totalRecords={totalRecords}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={current_page}
                />
              </div>
            ) : activeIndex === 3 ? (
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
            )}
          </div>
        </div>
      </div>
      <Dialog
        header={tNews('add-news')}
        visible={visibleAddNews}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleAddNews(false)}
      >
        <NewPost
          club_id={club.club_id}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleAdd={setVisibleAddNews}
          fetchPosts={fetchPosts}
          t={tNews}
        />
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
              label={t('login')}
              onClick={() => router.push('/login')}
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        header={
          checkJoin ? t('notify_leave_club_third') : t('notify_not_login_third')
        }
        visible={visibleJoin}
        onHide={() => setVisibleJoin(false)}
        style={{ width: '30vw' }}
      >
        <div className='dialog-content-confirm'>
          <p>
            {checkJoin
              ? t('notify_leave_club_first')
              : t('notify_not_join_club_first')}
          </p>
          <p>
            {checkJoin
              ? t('notify_leave_club_second')
              : t('notify_not_join_club_second')}
          </p>
          <p>
            {checkJoin
              ? t('notify_leave_club_third')
              : t('notify_not_join_club_third')}
          </p>

          <div className='confirm-button-container'>
            <Button
              severity='secondary'
              raised
              id='button-detail'
              style={{ color: 'red' }}
              icon='pi pi-times'
              label={t('close')}
              onClick={() => setVisibleJoin(false)}
            />
            <Button
              severity='secondary'
              raised
              id='button-detail'
              icon='pi pi-sign-in'
              label={checkJoin ? t('leave_club_now') : t('join_club_now')}
              onClick={() => {
                if (checkJoin) {
                  handleLeaveClub()
                } else {
                  handleJoinClub()
                }
              }}
            />
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default ClubDetail
