import React, { useState } from 'react'
import RankClub from './RankClub'
import RankMember from './RankMember'
import Detail from '@/components/landing/Detail'
import { Button } from 'primereact/button'
import { useTranslation } from 'next-i18next'
const Rank = ({ value }) => {
  const [activeIndex, setActiveIndex] = useState(2)
  const { t } = useTranslation('scoreboard')
  return (
    <div className='centered-content-layout'>
      <div id='statistic-club' style={{ width: '100%' }}>
        <Button
          id={activeIndex === 1 ? 'button-tab--active' : 'button-tab'}
          icon='pi pi-users'
          label={t('club')}
          style={{ width: '25%' }}
          onClick={() => {
            setActiveIndex(1)
          }}
        />
        <Button
          id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
          icon='pi pi-user'
          label={t('member')}
          style={{ width: '25%' }}
          onClick={() => {
            setActiveIndex(2)
          }}
        />
      </div>
      {activeIndex === 1 ? (
        <div>
          <RankClub value={value.ranking_club}></RankClub>
          <Detail link='/club' />
        </div>
      ) : (
        <div>
          <RankMember value={value.ranking_user}></RankMember>
          <Detail link='/member' />
        </div>
      )}
    </div>
  )
}

export default Rank
