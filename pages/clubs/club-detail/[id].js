import Title from '@/components/landing/Title'
import News from '@/pages/landing/News'
import Activity from '@/pages/profile/Activity'
import RankMember from '@/pages/scoreboard/RankMember'
import { useRouter } from 'next/router'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useState } from 'react'

const ClubDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [isStatistic, setIsStatistic] = useState(false)
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [activeIndex, setActiveIndex] = useState(2)

  const data = {
    event: {
      per_page: 5,
      current_page: 1,
      total_page: 5,
      total_activity: 22,
      items: [
        {
          name: 'DONG HANH CUNG CAC THIEN THAN - ANGELS RUN',
          image: 'https://picsum.photos/200/300',
          member: 100,
          club: 10,
        },
        {
          name: 'Event 2',
          image: 'https://picsum.photos/200/300',
          member: 100,
          club: 10,
        },
        {
          name: 'Event 3',
          image: 'https://picsum.photos/200/300',
          member: 100,
          club: 10,
        },
        {
          name: 'Event 4',
          image: 'https://picsum.photos/200/300',
          member: 100,
          club: 10,
        },
        {
          name: 'Event 5',
          image: 'https://picsum.photos/200/300',
          member: 100,
          club: 10,
        },
        {
          name: 'Event 6',
          image: 'https://picsum.photos/200/300',
          member: 100,
          club: 10,
        },
        {
          name: 'Event 7',
          image: 'https://picsum.photos/200/300',
          member: 100,
          club: 10,
        },
      ],
    },
    activities: {
      per_page: 5,
      current_page: 1,
      total_page: 5,
      total_activity: 22,
      items: [
        {
          name: 'Morning Run',
          image: 'https://picsum.photos/200/300',
          day: '23:04, 14/10/2022',
          distance: 2.49,
          pace: 5.0,
          time: '00:12:45',
        },
        {
          name: 'Afternoon Run',
          image: 'https://picsum.photos/200/300',
          day: '23:04, 14/10/2022',
          distance: 2.49,
          pace: 5.0,
          time: '00:12:45',
        },
        {
          name: 'Afternoon Run',
          image: 'https://picsum.photos/200/300',
          day: '23:04, 14/10/2022',
          distance: 2.49,
          pace: 5.0,
          time: '00:12:45',
        },
        {
          name: 'Lunch Run',
          image: 'https://picsum.photos/200/300',
          day: '23:04, 14/10/2022',
          distance: 2.49,
          pace: 5.0,
          time: '00:12:45',
        },
        {
          name: 'Lunch Run',
          image: 'https://picsum.photos/200/300',
          day: '23:04, 14/10/2022',
          distance: 2.49,
          pace: 5.0,
          time: '00:12:45',
        },
        {
          name: 'Morning Run',
          image: 'https://picsum.photos/200/300',
          day: '23:04, 14/10/2022',
          distance: 2.49,
          pace: 5.0,
          time: '00:12:45',
        },
      ],
    },
    rank_member: {
      per_page: 10,
      total_user: 25,
      current_page: 1,
      total_page: 3,
      items: [
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
    },
  }
  const onPageChange = (event) => {
    setFirst(event.first)
    console.log(event)
    setCurrentPage(event.page + 1)
    console.log(current_page)
    setPerPage(event.rows)
    console.log(per_page)
  }
  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <div className='centered-content-layout'>
        <div id='detail-container'>
          <div id='image-container-detail'>
            <img
              src='https://mobirace.net/Upload/Images/Club/202009/FB_IMG_1601010618787_25092020_121355_804.jpg'
              alt='club1'
            />
          </div>
          <div id='info-detail'>
            <img id='info-detail-img' src='https://picsum.photos/200/300' alt='logo' />
            <h1>{'E-run for fun'}</h1>
            <h6>
              {
                'Giải chạy online “E-run for the heart I” do Đoàn khoa Quản trị kinh doanh (Đoàn trường Đại học Quốc tế Miền Đông) tổ chức với mong muốn thúc đẩy tinh thần tập luyện thể dục thể thao cho mọi người, đặc biệt là các bạn trẻ, hướng tới ngày tim mạch thế giới 29/9 và tuyên truyền, phổ biến, nâng cao nhận thức của cộng đồng về tăng cường sức khỏe tim mạch, phòng ngừa và tránh những rủi ro về sức khỏe tim mạch.'
              }
            </h6>
            <Button
              id='button-join-club'
              label='Tham gia ngay'
              onClick={() => {}}
            />
          </div>
          <div id='info-detail'>
            <div id='statistic-club'>
              <Button
                id='button-statistic-club'
                label='Người tham gia '
                onClick={() => {}}
              />
              <Button
                id={
                  !isStatistic
                    ? 'button-statistic-club'
                    : 'button-statistic-club-active'
                }
                label='Xem thống kê'
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
                    <h4>Tổng số VĐV đã tham gia: </h4>
                    <h4>{'67'}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>Tổng số km đã chạy:</h4>
                    <h4>{'34'}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>Tổng số hoạt động:</h4>
                    <h4>{'314'}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>Tổng số bài viết:</h4>
                    <h4>{'4'}</h4>
                  </div>
                </div>
                <div id='info-club-detail'>
                  <div id='detail-club-container'>
                    <h4>Ngày thành lập câu lạc bộ: </h4>
                    <h4>{'12/12/2012'}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>Quản lí câu lạc bộ: </h4>
                    <h4>{'Nguyễn Văn A'}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>VĐV Nam: </h4>
                    <h4>{'2'}</h4>
                  </div>
                  <div id='detail-club-container'>
                    <h4>VĐV Nữ:</h4>
                    <h4>{'2'}</h4>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div>
            <Title title='Bài viết của câu lạc bộ ' />
            <News data={data.event.items} />
          </div>
          <div id='info-detail'>
            <div id='statistic-club'>
              <Button
                id={
                  activeIndex === 2
                    ? 'button-statistic-club-active'
                    : 'button-statistic-club'
                }
                icon='pi pi-calendar'
                label='Bảng xếp hạng thành viên '
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={
                  activeIndex === 1
                    ? 'button-statistic-club-active'
                    : 'button-statistic-club'
                }
                icon='pi pi-calendar-plus'
                label='Hoạt động gần đây'
                onClick={() => {
                  setActiveIndex(2)
                }}
              />
            </div>
            {activeIndex === 2 ? (
              <div>
                <Activity activities={data.activities.items} />
                <Paginator
                  first={first}
                  rows={data.activities.per_page}
                  totalRecords={data.activities.total_activity}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={data.activities.current_page}
                />
              </div>
            ) : (
              <div>
                <RankMember value={data.rank_member.items} />
                <Paginator
                  first={first}
                  rows={data.per_page}
                  totalRecords={data.total_activity}
                  rowsPerPageOptions={[6, 12, 18]}
                  onPageChange={onPageChange}
                  page={data.current_page}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubDetail
