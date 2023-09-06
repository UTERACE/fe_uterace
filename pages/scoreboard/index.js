import React, { useState } from 'react'
import Title from '../../components/landing/Title'
import { TabPanel, TabView } from 'primereact/tabview'
import RankClub from '../landing/RankClub'
import RankMember from './RankMember'
import { Paginator } from 'primereact/paginator'
import { Button } from 'primereact/button'

const Scoreboard = () => {
  const [member, setMember] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [activeIndex, setActiveIndex] = useState(1)
  const [month, setMonth] = useState(1)

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
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

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
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
      <Title title={activeIndex === 1 ? 'Bảng xếp hạng cá nhân':'Bảng xếp hạng CLB'}/>
      <div className='centered-content-layout'>
        <div
          id='profile-button-container'
          style={{ width: '100%', justifyContent: 'start', gap: '2rem' }}
        >
          <Button
            id={activeIndex === 1 ? 'button-profile-active' : 'button-profile'}
            icon='pi pi-chart-bar'
            label=' Bảng xếp hạng cá nhân'
            onClick={() => {
              setActiveIndex(1)
            }}
          />
          <Button
            id={activeIndex === 2 ? 'button-profile-active' : 'button-profile'}
            icon='pi pi-chart-line'
            label='Bảng xếp hạng CLB'
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
            <div id='month-button-container'>
              <Button
                id={month === 1 ? 'button-month-active' : 'button-month'}
                icon='pi pi-chart-bar'
                label='Tổng'
                onClick={() => {
                  setMonth(1)
                }}
              />
              <Button
                id={
                  month === currentMonth
                    ? 'button-month-active'
                    : 'button-month'
                }
                icon='pi pi-calendar-plus'
                label={`Tháng ${currentMonth}`}
                onClick={() => {
                  setMonth(currentMonth)
                  console.log(month)
                }}
              />
              <Button
                id={
                  month === currentMonth - 1
                    ? 'button-month-active'
                    : 'button-month'
                }
                icon='pi pi-calendar-minus'
                label={`Tháng ${currentMonth - 1}`}
                onClick={() => {
                  setMonth(currentMonth - 1)
                  console.log(month)
                }}
              />
              <Button
                id={
                  month === currentMonth - 2
                    ? 'button-month-active'
                    : 'button-month'
                }
                icon='pi pi-calendar-times'
                label={`Tháng ${currentMonth - 2}`}
                onClick={() => {
                  setMonth(currentMonth - 2)
                  console.log(month)
                }}
              />
            </div>
            <RankMember value={data.member}></RankMember>
            <Paginator
              first={first}
              rows={data.per_page}
              totalRecords={data.total_user}
              rowsPerPageOptions={[10, 25, 50]}
              onPageChange={onPageChange}
              page={data.current_page}
            />
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Scoreboard
