import React, { useState } from 'react'
import RankClub from './RankClub'
import RankMember from './RankMember'
import Detail from '@/components/landing/Detail'
import { Button } from 'primereact/button'
const Rank = ({ value }) => {
  const [activeIndex, setActiveIndex] = useState(2)

  return (
    <div className='centered-content-layout'>
      <div id='statistic-club' style={{ width: '100%' }}>
        <Button
          id={activeIndex === 1 ? 'button-tab--active' : 'button-tab'}
          icon='pi pi-users'
          label='Câu lạc bộ'
          onClick={() => {
            setActiveIndex(1)
          }}
        />
        <Button
          id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
          icon='pi pi-user'
          label='Cá nhân'
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
      {/* <TabView style={{ width: '100%' }}>
        <TabPanel header='Câu lạc bộ' style={{ background: 'none' }}></TabPanel>
        <TabPanel header='Cá nhân'>
          <RankMember value={value.rankuser}></RankMember>
          <Detail link='/member' />
        </TabPanel>
      </TabView> */}
    </div>
  )
}

export default Rank
