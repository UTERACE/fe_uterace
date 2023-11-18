import React, { use, useEffect } from 'react'
import Title from '../../components/landing/Title'
import Detail from '@/components/landing/Detail'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { useTranslation } from 'next-i18next'

const Statistic = ({ statistic }) => {
  const {t}=useTranslation('home')

  useEffect(() => {
    const width = window.innerWidth
    if (width <= 1024) {
      const carouselElement =
        document.getElementsByClassName('target-container')[0]
      if (carouselElement) {
        carouselElement.style.setProperty('--num-columns', 2)
      }
    }
  }, [])
  
  return (
    <div id='target-wrapper'>
      <div className='target-container'>
        <div id='target-item'>
          <img src='/statistic/run_member.png' alt='member' />
          <span>{LocaleHelper.formatNumber(statistic.total_members)}</span>
          <p>{t('total-member')}</p>
        </div>
        <div
          id='target-item'
          style={{ backgroundColor: '#DB2D33', color: 'white' }}
        >
          <img src='/statistic/running.png' alt='running' />
          <span>{LocaleHelper.formatNumber(statistic.total_distance)}</span>
          <p>{t('total-distance')}</p>
        </div>
        <div id='target-item'>
          <img src='/statistic/run_club.png' alt='club' />
          <span>{LocaleHelper.formatNumber(statistic.total_clubs)}</span>
          <p>{t('total-club')}</p>
        </div>
        <div id='target-item'>
          <img src='/statistic/run_event.png' alt='event' />
          <span>{LocaleHelper.formatNumber(statistic.total_event)}</span>
          <p>{t('total-event')}</p>
        </div>
      </div>
      <Detail link='/news/news-detail/1' />
    </div>
  )
}

export default Statistic
