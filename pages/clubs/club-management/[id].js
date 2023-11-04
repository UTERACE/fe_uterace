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
    console.error('Error fetching event details:', error)
    return null
  }
}

const ManagementClubDetail = ({ club }) => {
  const [isStatistic, setIsStatistic] = useState(false)
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(1)
  const [visibleChange, setVisibleChange] = useState(false)
  const [visibleAddNews, setVisibleAddNews] = useState(false)
  const [visibleUpdateNews, setVisibleUpdateNews] = useState(false)
  const [visibleInfo, setVisibleInfo] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(false)
  const [updateNewsId, setUpdateNewsId] = useState(0)

  const [news, setNews] = useState(club.news)
  const [activities, setActivities] = useState({})
  const [rankMember, setRankMember] = useState({})
  const [introduce, setIntroduce] = useState(club.details)
  const [detailsNews, setDetailsNews] = useState({})

  const { t } = useTranslation('detail')

  useEffect(() => {
    // setNews(club.news)
    // setActivities(data.activities)
    // setRankMember(data.ranking_member)
    if (updateStatus) {
      router.reload()
    }
  }, [updateStatus])

  useEffect(() => {
    if (updateNewsId !== 0) fetchDetailNews()
  }, [updateNewsId])

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
      showToast('error', 'Lấy dữ liệu thất bại', error)
    }
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  return (
    <div className='centered-content-detailpage'>
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
        />
      </Dialog>
      <Dialog
        header={t('add-news')}
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
        />
      </Dialog>
      <Dialog
        header={t('update-news')}
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
        />
      </Dialog>
      <div className='centered-content-layout'>
        <div id='detail-container'>
          <div id='image-container-detail'>
            <img src={club.image} alt='club' />
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
            <img id='info-detail-img' src={club.image} alt='logo' />
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
                    <h4>{LocaleHelper.formatDateTime(club.create_at)}</h4>
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
            <div style={{width:'90%', marginBottom:'1rem'}}>
              <Button
                id='button-join'
                icon='pi pi-calendar-plus'
                label={t('new-news')}
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
                style={{ width: '80%' }}
                icon='pi pi-calendar-plus'
                label={t('detail')}
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
                style={{ width: '90%' }}
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
            {activeIndex === 2 ? (
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
            ) : (
              <div style={{ width: '100%' }}>
                <Button
                  icon='pi pi-pencil'
                  id='button-join'
                  label={t('update-info-detail')}
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
    </div>
  )
}

export default ManagementClubDetail
