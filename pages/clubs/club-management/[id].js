import Title from '@/components/landing/Title'
import News from '@/pages/landing/News'
import Activity from '@/pages/user/profile/Activity'
import RankMember from '@/pages/scoreboard/RankMember'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import Update from './UpdateClub'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import apiInstance from '@/api/apiInstance'
import NewNews from '@/pages/news/new-news'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import { useRouter } from 'next/router'
import UpdateInfo from './UpdateInfo'
import UpdateNews from './UpdateNews'
import Image from 'next/image'
import { AutoComplete } from 'primereact/autocomplete'
import Head from 'next/head'
import { InputText } from 'primereact/inputtext'
import store from '@/store/store'
import RankMemberClub from '@/pages/scoreboard/RankMemberClub'
import Post from './Post'
import { Dropdown } from 'primereact/dropdown'

export const getServerSideProps = async ({ locale, params }) => {
  const club = await getClub(params.id)
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'detail',
        'news',
        'club',
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
    console.error('Error fetching event details:', error)
    return null
  }
}

const ManagementClubDetail = ({ club }) => {
  const [isStatistic, setIsStatistic] = useState(false)
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [current_page_activity, setCurrentPageActivity] = useState(1)
  const [per_page_activity, setPerPageActivity] = useState(6)
  const [totalRecordsActivity, setTotalRecordsActivity] = useState(1)
  const [first, setFirst] = useState(0)

  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(1)
  const [visibleChange, setVisibleChange] = useState(false)
  const [visibleAddNews, setVisibleAddNews] = useState(false)
  const [visibleUpdateNews, setVisibleUpdateNews] = useState(false)
  const [visibleInfo, setVisibleInfo] = useState(false)
  const [visibleChangeManager, setVisibleChangeManager] = useState(false)
  const [searchMember, setSearchMember] = useState('')
  const [members, setMembers] = useState([])
  const [updateStatus, setUpdateStatus] = useState(false)
  const [updateNewsId, setUpdateNewsId] = useState(0)
  const [selectedMemberId, setSelectedMemberId] = useState(null)
  const [newFeed, setNewFeed] = useState([])
  const [page, setPage] = useState(1)
  const [hour, setHour] = useState(720)

  const handleMemberClick = (id) => {
    setSelectedMemberId(id === store.getState().auth.id ? null : id)
  }

  const [news, setNews] = useState(club.news)
  const [activities, setActivities] = useState({})
  const [rankMember, setRankMember] = useState({})
  const [introduce, setIntroduce] = useState(club.details)
  const [detailsNews, setDetailsNews] = useState({})
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { t } = useTranslation('detail')
  const { t: tNews } = useTranslation('news')
  const { t: tClub } = useTranslation('club')

  useEffect(() => {
    if (updateStatus) {
      setTimeout(() => {
        router.reload()
      }, 1000)
    }
  }, [updateStatus])

  useEffect(() => {
    if (updateNewsId !== 0) fetchDetailNews()
  }, [updateNewsId])

  useEffect(() => {
    if (activeIndex === 2) {
      fetchActivities()
    } else if (activeIndex === 3) {
      fetchScoreboard()
    }
  }, [current_page, per_page, search])

  useEffect(() => {
    //responsive window
    if (window.innerHeight > window.innerWidth) {
      setIsMobile(true)
    }
  }, [])

  useEffect(() => {
    fetchActivities()
  }, [hour, current_page_activity, per_page_activity, totalRecordsActivity])

  const fetchScoreboard = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/clubs/rank-member/${club.club_id}?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res.status === 200) {
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

  const fetchActivities = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/clubs/recent-active/${club.club_id}?current_page=${current_page_activity}&per_page=${per_page_activity}&search_name=${search_name}&hour=${hour}`
      )
      if (res.status === 200) {
        const data = res.data
        setActivities(data)
        setCurrentPageActivity(data.current_page)
        setPerPageActivity(data.per_page)
        setTotalRecordsActivity(data.total_activities)
      }
      setLoading(false)
    } catch (error) {
      showToast('error', error)
      setLoading(false)
    }
  }

  const fetchDetailNews = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(`/news/${updateNewsId}`)
      const data = res.data
      if (res.status === 200) {
        setDetailsNews(data)
        setVisibleUpdateNews(true)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      showToast('error', t('get_info_news_fail'), error)
    }
  }

  const handleSearchMember = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/clubs/member/${club.club_id}?search=${searchMember}`
      )
      const data = res.data
      if (res.status === 200) {
        setMembers(data)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      showToast('error', t('search_member_fail'), error)
    }
  }

  const handleChangeManager = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.put('/clubs/change-admin', {
        club_id: club.club_id,
        user_id: selectedMemberId,
      })
      if (res.status === 200) {
        showToast('success', t('change_manager_success'))
        setVisibleChangeManager(false)
        setUpdateStatus(true)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      showToast('error', t('change_manager_fail'), error)
    }
  }

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(`/news/active-news/${club.club_id}`, {
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

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  const onPageChangeActivity = (event) => {
    setFirst(event.first)
    setCurrentPageActivity(event.page + 1)
    setPerPageActivity(event.rows)
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
              id='info-detail-img'
              src={club.image}
              alt='logo'
              width={200}
              height={200}
            />
            <h1>{club.name}</h1>
            <h6>{club.description}</h6>
            <Button
              id='button-join'
              label={t('join-now')}
              disabled={true}
              onClick={() => {
                handleJoinClub()
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
                id='button-tab'
                label={t('change_manager')}
                style={{ width: 'auto', minWidth: '25%' }}
                disabled={club.manager_id !== store.getState().auth.id}
                onClick={() => {
                  setVisibleChangeManager(true)
                }}
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
            <div style={{ width: '90%', marginBottom: '1rem' }}>
              <Button
                id='button-join'
                icon='pi pi-calendar-plus'
                label={tNews('add-news')}
                onClick={() => {
                  setVisibleAddNews(true)
                }}
              />
            </div>

            <News
              data={news}
              update
              setUpdateNewsId={setUpdateNewsId}
              setUpdateStatus={setUpdateStatus}
              setLoading={setLoading}
              showToast={showToast}
            />
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
                icon='pi pi-calendar'
                label={t('active_news')}
                onClick={() => {
                  setActiveIndex(2)
                  fetchPosts()
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
                  fetchActivities()
                }}
              />
              <Button
                id={activeIndex === 4 ? 'button-tab--active' : 'button-tab'}
                style={{ width: 'auto', minWidth: '22%' }}
                icon='pi pi-calendar'
                label={isMobile ? t('mobile_members') : t('scoreboard-member')}
                onClick={() => {
                  setActiveIndex(4)
                  fetchScoreboard()
                }}
              />
            </div>
            {activeIndex === 3 ? (
              <div style={{ width: '95%' }}>
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
                  rows={per_page_activity}
                  totalRecords={totalRecordsActivity}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChangeActivity}
                  page={current_page_activity}
                />
              </div>
            ) : activeIndex === 4 ? (
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
                <RankMemberClub
                  value={rankMember.ranking_user}
                  clubId={club.club_id}
                  fetchMembers={fetchScoreboard}
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
            ) : activeIndex === 2 ? (
              <div className='active-post-container'>
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
                    post_status={item.post_status}
                    count_likes={item.count_likes}
                    count_comments={item.count_comments}
                    is_liked={item._liked}
                    user_id={item.user_id}
                    user_name={item.user_name}
                    user_avatar={item.user_avatar}
                    user_role={item.user_role}
                    t={t}
                    showToast={showToast}
                    fetchMyPosts={fetchPosts}
                  />
                ))}
              </div>
            ) : (
              <div style={{ width: '100%' }}>
                <Button
                  icon='pi pi-pencil'
                  id='button-join'
                  label={t('update-info-detail')}
                  style={{ width: 'auto', height: '3rem' }}
                  onClick={() => {
                    setVisibleInfo(true)
                  }}
                />
                <div dangerouslySetInnerHTML={{ __html: introduce }}></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        header={t('change_manager')}
        visible={visibleChangeManager}
        position='canter'
        style={{
          width: '50%',
          borderRadius: '20px',
        }}
        onHide={() => setVisibleChangeManager(false)}
      >
        <div className='dialog-content-confirm'>
          <p>{t('change_manager_first')}</p>
          <p>{t('change_manager_second')}</p>
          <p>{t('change_manager_third')}</p>
          <div className='search-member-container'>
            <InputText
              style={{ minWidth: '80%' }}
              value={searchMember}
              onChange={(e) => setSearchMember(e.target.value)}
            />
            <Button
              icon='pi pi-search'
              severity='secondary'
              raised
              id='button-detail'
              label={t('search')}
              onClick={() => {
                handleSearchMember()
              }}
            />
          </div>
          <div className='list-member-container'>
            {members.length > 0 ? (
              members.map((member) => (
                <div
                  key={member.userId}
                  className={`member-item ${
                    selectedMemberId === member.userId ? 'selected' : ''
                  }`}
                  onClick={() => handleMemberClick(member.userId)}
                >
                  <Image
                    src={member.avatar}
                    alt='avatar'
                    width={50}
                    height={50}
                  />
                  <div className='member-info'>
                    <div>
                      <h4>{member.lastName + ' ' + member.firstName}</h4>
                      <h6>{member.email}</h6>
                    </div>
                    <div>
                      <h6>
                        Day of birth:{' '}
                        {LocaleHelper.formatDate(new Date(member.dateOfBirth))}
                      </h6>
                      <h6>Gender: {member.gender}</h6>
                    </div>
                    <div>
                      {selectedMemberId === member.userId && (
                        <span className='selected-mark'>&#10003;</span> // Add checkmark when selected
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <label>{t('no_result')}</label>
            )}
          </div>

          <div className='confirm-button-container'>
            <Button
              severity='secondary'
              raised
              id='button-detail'
              style={{ color: 'red' }}
              icon='pi pi-times'
              label={t('close')}
              onClick={() => setVisibleChangeManager(false)}
            />
            <Button
              severity='secondary'
              raised
              id='button-detail'
              icon='pi pi-sign-in'
              label={t('change_manager')}
              disabled={selectedMemberId === null}
              onClick={() => {
                handleChangeManager()
              }}
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        header={t('update-info-club')}
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
          club_id={club.club_id}
          image={club.image}
          name={club.name}
          description={club.description}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleChange={setVisibleChange}
          setUpdate={setUpdateStatus}
          t={tClub}
        />
      </Dialog>
      <Dialog
        header={t('update-info-detail')}
        visible={visibleInfo}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleInfo(false)}
      >
        <UpdateInfo
          club_id={club.club_id}
          image={club.image}
          description={introduce}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleInfo={setVisibleInfo}
          setUpdate={setUpdateStatus}
          t={t}
        />
      </Dialog>
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
        <NewNews
          club_id={club.club_id}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleAdd={setVisibleAddNews}
          setUpdate={setUpdateStatus}
          t={tNews}
        />
      </Dialog>
      <Dialog
        header={tNews('update-news')}
        visible={visibleUpdateNews}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleUpdateNews(false)}
      >
        <UpdateNews
          club_id={club.club_id}
          news_id={detailsNews.news_id}
          title={detailsNews.name}
          description={detailsNews.description}
          image={detailsNews.image}
          content={detailsNews.content}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleUpdateNews={setVisibleUpdateNews}
          setUpdate={setUpdateStatus}
          t={tNews}
        />
      </Dialog>
    </div>
  )
}

export default ManagementClubDetail
