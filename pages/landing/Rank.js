import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import RankClub from './RankClub'
import RankMember from './RankMember'
import Title from '../../components/landing/Title'
import Detail from '@/components/landing/Detail'
const Rank = ({ value }) => {
  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: "url('/bg1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Title title='Ranking club' />
      <div className='centered-content-layout'>
        <TabView style={{ width: '100%' }}>
          <TabPanel header='Bảng xếp hạng CLB' style={{ background: 'none' }}>
            <RankClub value={value.rankclub}></RankClub>
            <Detail link='/club' />
          </TabPanel>
          <TabPanel header='Bảng xếp hạng cá nhân'>
            <RankMember value={value.rankuser}></RankMember>
            <Detail link='/member' />
          </TabPanel>
        </TabView>
      </div>
    </div>
  )
}

export default Rank
