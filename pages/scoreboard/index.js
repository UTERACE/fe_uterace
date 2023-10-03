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
    ranking_user: [
      {
        user_id: 119,
        first_name: 'Can',
        last_name: 'Lê',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/cad906c5a3d5c8d0ef85aa523.jpg?w=1800',
        total_distance: 15.02,
        ranking: 1,
        pace: 10.082677841186523,
        organization: 'Tổng công ty Viễn thông MobiFone',
        gender: 'Nam',
      },
      {
        user_id: 2,
        ranking: 2,
        first_name: 'Nguyễn',
        last_name: 'Sinh Hùng',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f9f.png?w=1800',
        total_distance: 2.42,
        organization: 'Công ty DV MobiFone KV2',
        pace: 6.15,
        gender: 'Nam',
      },
      {
        user_id: 1,
        ranking: 3,
        first_name: 'Nguyễn',
        last_name: 'Văn A',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f56.png?w=1800',
        total_distance: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        pace: 0.0,
        gender: 'Nam',
      },
      {
        user_id: 3,
        ranking: 4,
        first_name: 'Nguyễn',
        last_name: 'Văn B',
        image: '',
        total_distance: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        pace: 0.0,
        gender: 'Nam',
      },
      {
        user_id: 4,
        ranking: 5,
        first_name: 'Trần',
        last_name: 'Thiện',
        image: '',
        total_distance: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        pace: 0.0,
        gender: 'Nam',
      },
      {
        user_id: 5,
        ranking: 6,
        first_name: 'Nguyễn',
        last_name: 'Văn C',
        image: '',
        total_distance: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        pace: 0.0,
        gender: 'Nam',
      },
      {
        user_id: 6,
        ranking: 7,
        first_name: 'Nguyễn',
        last_name: 'Văn D',
        image: '',
        total_distance: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        pace: 0.0,
        gender: 'Nam',
      },
      {
        user_id: 21,
        ranking: 8,
        first_name: 'Nguyễn',
        last_name: 'Văn E',
        image: '',
        total_distance: 0.0,
        organization: 'Công ty DV MobiFone KV2',
        pace: 0.0,
        gender: 'Nam',
      },
    ],
  }
  const data_club = {
    per_page: 10,
    total_user: 25,
    current_page: 1,
    total_page: 3,
    ranking_club: [
      {
        club_id: 127,
        ranking: 1,
        name: '21 DAY CHALLENGE - THE MONKEY WARRIOR',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/964dc49a82e49a098b089ec7e.jpg?w=1800',
        total_distance: 2.4822000511921942,
        total_members: 3,
        total_activities: 234,
      },
      {
        club_id: 5,
        ranking: 2,
        name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 9 - BẮC KẠN',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
        total_distance: 0.1409999979659915,
        total_members: 1,
        total_activities: 6,
      },
      {
        club_id: 23,
        ranking: 3,
        name: '54 DÂN TỘC VIỆT NAM - DÂN TỘC TÀY',
        PICTURE_PATH:
          'https://mobirace.net/Upload/Images/Club/202009/FB_IMG_1601010618787_25092020_121355_804.jpg',
        total_distance: 0.0,
        total_members: 0,
        total_activities: 0,
      },
      {
        club_id: 133,
        ranking: 4,
        name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 8 - HÀ GIANG',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
        total_distance: 0.0,
        total_members: 0,
        total_activities: 0,
      },
      {
        club_id: 131,
        ranking: 5,
        name: '21 Day Challenge - The Horse Warrior',
        image:
          'https://mobirace.net/Upload/Images/Club/202008/dulichquangtri1-752x400_17082020_084033_166.jpg',
        total_distance: 0.0,
        total_members: 0,
        total_activities: 44,
      },
      {
        club_id: 121,
        ranking: 5,
        name: '21 Day Challenge - The Horse Warrior',
        image:
          'https://mobirace.net/Upload/Images/Club/202008/dulichquangtri1-752x400_17082020_084033_166.jpg',
        total_distance: 0.0,
        total_members: 0,
        total_activities: 44,
      },
      {
        club_id: 117,
        ranking: 5,
        name: '21 Day Challenge - The Horse Warrior',
        image:
          'https://mobirace.net/Upload/Images/Club/202008/dulichquangtri1-752x400_17082020_084033_166.jpg',
        total_distance: 0.0,
        total_members: 0,
        total_activities: 44,
      },
      {
        club_id: 116,
        ranking: 5,
        name: '21 Day Challenge - The Horse Warrior',
        image:
          'https://mobirace.net/Upload/Images/Club/202008/dulichquangtri1-752x400_17082020_084033_166.jpg',
        total_distance: 0.0,
        total_members: 0,
        total_activities: 44,
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
      <Title
        title={
          activeIndex === 1 ? 'Bảng xếp hạng cá nhân' : 'Bảng xếp hạng CLB'
        }
      />
      <div className='centered-content-layout'>
        <div
          id='button-header-container'
        >
          <Button
            id={activeIndex === 1 ? 'button-tab--active' : 'button-tab'}
            icon='pi pi-chart-bar'
            label=' Bảng xếp hạng cá nhân'
            onClick={() => {
              setActiveIndex(1)
            }}
          />
          <Button
            id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
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
            <RankMember value={data.ranking_user}></RankMember>
            <Paginator
              first={first}
              rows={data.per_page}
              totalRecords={data.total_user}
              rowsPerPageOptions={[10, 25, 50]}
              onPageChange={onPageChange}
              page={data.current_page}
            />
          </div>
        ) : (
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
            <RankClub value={data_club.ranking_club}></RankClub>
            <Paginator
              first={first}
              rows={data_club.per_page}
              totalRecords={data_club.total_user}
              rowsPerPageOptions={[10, 25, 50]}
              onPageChange={onPageChange}
              page={data_club.current_page}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Scoreboard
