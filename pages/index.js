import React, { useContext, useEffect, useState } from 'react'
import Slideshow from './landing/Slideshow'
import Title from '@/components/landing/Title'
import Rank from './landing/Rank'
import Event from './landing/Event'
import DataView from '@/components/dataview/DataView'
import Statistic from './landing/Statistic'
import News from './landing/News'
import Detail from '@/components/landing/Detail'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'

const Homepage = () => {
  const [data, setData] = useState()
  const showToast = useToast().showToast
  const setLoading = useContext(LoadingContext)
  const [isMobile, setIsMobile] = useState(false)

  const { t } = useTranslation('home')

  useEffect(() => {
    //responsive window
    if (window.innerHeight > window.innerWidth) {
      setIsMobile(true)
    }
  }, [])

  useEffect(() => {
    fetchHomepage()
  }, [])

  const fetchHomepage = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get('/home')
      if (res.status === 200) {
        setData(res.data)
        setLoading(false)
      }
    } catch (e) {
      showToast('error', t('fetch_homepage_fail'), e)
      setLoading(false)
    }
  }

  if (!data) return <div></div>

  return (
    <div>
      <Slideshow data={data.overview} />
      <div className='centered-content-scoreboard'>
        <Title title={t('scoreboard')} />
        <Rank value={data} isMobile={isMobile} />
      </div>

      <div className='centered-content-event'>
        <Title title={t('event-popular')} />
        <Event event={data.events} />
      </div>
      <div className='centered-content-club'>
        <Title title={t('club-popular')} />
        <DataView
          data={data.clubs}
          href={`/clubs/club-detail/`}
        />
        <Detail link={'/clubs'} />
      </div>
      <div className='centered-content-statistic'>
        <Title title={t('statistic-social')} />
        <Statistic statistic={data.statistic} />
      </div>

      <div className='centered-content-news'>
        <Title title={t('news-popular')} />
        <News data={data.news} />
        <Detail link={'/news'} />
      </div>
    </div>
  )
}

export default Homepage
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'home',
        'scoreboard',
        'event',
        'club',
        'news',
        'topbar',
      ])),
    },
  }
}
