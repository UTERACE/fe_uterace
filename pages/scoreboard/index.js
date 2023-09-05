import React, { useState } from 'react'
import Title from '../../components/landing/Title'
import { TabPanel, TabView } from 'primereact/tabview'
import RankClub from '../landing/RankClub'
import RankMember from './RankMember'
import { Paginator } from 'primereact/paginator'
import { Button } from 'primereact/button'

const Scoreboard = () => {
  const data = {
    per_page: 10,
    total_user: 25,
    current_page: 1,
    total_page: 3,
    member: [
      {
        id: 119,
        fullname: 'Can Lê',
        image: '/no_avatar_strava.png',
        total_distance: 15.02,
        ranking: 1,
        pace: 10.082677841186523,
        organization: 'Tổng công ty Viễn thông MobiFone',
        gender: 'Nam',
      },
      {
        id: 93,
        fullname: 'Nguyễn Hà Kiên',
        image: '',
        total_distance: 0.0,
        ranking: 2,
        pace: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        gender: 'Nam',
      },
      {
        id: 107,
        fullname: 'nguyen van ha ',
        image: '/no_avatar_strava.png',
        total_distance: 0.0,
        ranking: 3,
        pace: 0.0,
        organization: 'Công ty PTI',
        gender: 'Nam',
      },
      {
        id: 133,
        fullname: 'Van Hoang Luong',
        image: '/no_avatar_strava.png',
        total_distance: 0.0,
        ranking: 4,
        pace: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        gender: 'Nam',
      },
      {
        id: 129,
        fullname: 'sadsad sad wq',
        image: '/no_avatar_strava.png',
        total_distance: 0.0,
        ranking: 5,
        pace: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        gender: 'Nam',
      },
      {
        id: 127,
        fullname: 'Nguyễn Sơn Tùng',
        image: '/no_avatar_strava.png',
        total_distance: 0.0,
        ranking: 6,
        pace: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        gender: 'Nam',
      },
      {
        id: 126,
        fullname: 'sadsad as ds',
        image: '/no_avatar_strava.png',
        total_distance: 0.0,
        ranking: 7,
        pace: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        gender: 'Nam',
      },
      {
        id: 125,
        fullname: 'Nguyễn Hà Kiên',
        image: '/no_avatar_strava.png',
        total_distance: 0.0,
        ranking: 10,
        pace: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        gender: 'Nam',
      },
    ],
  }
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPageapi, setCurrentPageapi] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [activeIndex, setActiveIndex] = useState(1)

  const onPageChange = (event) => {
    setCurrentPage(event.first + 2)
    setCurrentPageapi(event.page + 1)
    setRowsPerPage(event.rows)
  }
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
        <div
          id='profile-button-container'
          style={{ width: '100%', justifyContent: 'start', gap: '2rem' }}
        >
          <Button
            id={activeIndex === 1 ? 'button-profile-active' : 'button-profile'}
            icon='pi pi-calendar'
            label=' Bảng xếp hạng CLB'
            onClick={() => {
              setActiveIndex(1)
            }}
          />
          <Button
            id={activeIndex === 2 ? 'button-profile-active' : 'button-profile'}
            icon='pi pi-calendar-plus'
            label='Bảng xếp hạng cá nhân'
            onClick={() => {
              setActiveIndex(2)
            }}
          />
        </div>
        {/* <TabView style={{ width: '100%' }}>
          <TabPanel header='Bảng xếp hạng CLB' style={{ background: 'none' }}>
            <RankClub value={value.rankclub}></RankClub>
          </TabPanel>
          <TabPanel header='Bảng xếp hạng cá nhân'> */}
        {activeIndex === 1 ? (
          <div>
            <RankMember value={data.member}></RankMember>
            <Paginator
              first={data.current_page}
              rows={data.per_page}
              totalRecords={data.total_page}
              rowsPerPageOptions={[10, 25, 50]}
              onPageChange={onPageChange}
            />
          </div>
        ) : null}

        {/* </TabPanel>
        </TabView> */}
      </div>
    </div>
  )
}

export default Scoreboard
