import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { SlideMenu } from 'primereact/slidemenu'
import React, { useEffect, useRef, useState } from 'react'
import Activity from './Activity'
import { Paginator } from 'primereact/paginator'
import { Dialog } from 'primereact/dialog'
import Title from '@/components/landing/Title'
import ChartActivity from './ChartActivity'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ChangeAvatar from './setting/ChangeAvatar'
import DataViewDashboard from '@/components/dataview/DataViewDashboard'

const Profile = () => {
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(4)
  const [first, setFirst] = useState(1)

  const [visibleChange, setVisibleChange] = useState(false)

  const [dataChartWeek, setDataChartWeek] = useState({})
  const [dataChartMonth, setDataChartMonth] = useState({})
  const [activities, setActivities] = useState([])
  const [clubs, setClubs] = useState([])
  const [avatarImage, setAvatarImage] = useState('')
  const [avatarLabel, setAvatarLabel] = useState('A')
  const [data, setData] = useState({})
  const menu = useRef(null)
  const router = useRouter()
  const handleClick = (url) => {
    router.push(url)
  }
  const end_items = [
    {
      label: 'Chỉnh sửa thông tin',
      icon: 'pi pi-fw pi-user-edit',
      command: () => handleClick('/user/profile/setting'),
    },
    {
      label: 'Đổi hình đại diện',
      icon: 'pi pi-fw pi-image',
      command: () => {
        setVisibleChange(true)
      },
    },
    {
      label: 'Thay đổi mật khẩu',
      icon: 'pi pi-fw pi-pencil',
      command: () => handleClick(`/user/profile/setting/?connect=${1}`),
    },
    {
      label: 'Kết nối ứng dụng',
      icon: 'pi pi-fw  pi-link',
      command: () => handleClick(`/user/profile/setting/?connect=${2}`),
    },
    {
      separator: true,
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-power-off',
      command: () => handleClickLogout(),
    },
  ]
  useEffect(() => {
    const data = {
      activities: [
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
      club: [
        {
          name: 'DONG HANH CUNG CAC THIEN THAN - ANGELS RUN',
          image: 'https://picsum.photos/200/300',
          member: 100,
          total_distance: 1000,
        },
        {
          name: 'Club 2',
          image: 'https://picsum.photos/200/300',
          member: 100,
          total_distance: 1000,
        },
        {
          name: 'Club 3',
          image: 'https://picsum.photos/200/300',
          member: 100,
          total_distance: 1000,
        },
        {
          name: 'Club 4',
          image: 'https://picsum.photos/200/300',
          member: 100,
          total_distance: 1000,
        },
        {
          name: 'Club 5',
          image: 'https://picsum.photos/200/300',
          member: 100,
          total_distance: 1000,
        },
        {
          name: 'Club 6',
          image: 'https://picsum.photos/200/300',
          member: 100,
          total_distance: 1000,
        },
      ],
      activities_chart_month: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        dataLine: [50, 25, 12, 48, 56, 76, 42],
        dataBar: [65, 59, 80, 81, 56, 55, 40],
      },
      activities_chart_week: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        dataLine: [21, 84, 24, 75, 37, 65, 34],
        dataBar: [35, 34, 80, 45, 56, 55, 23],
      },
      total_distance: 107.5,
      pace: 5.52,
      total_activities: 20,
      total_clubs: 2,
      total_events: 3,
      ranking: 112,
      first_name: 'A',
      last_name: 'Nguyễn Văn',
      image: '',
      connect_strava: false,
    }
    setDataChartMonth(data.activities_chart_month)
    setDataChartWeek(data.activities_chart_week)
    setActivities(data.activities)
    setClubs(data.club)
    setAvatarImage(data.image)
    setAvatarLabel(data.first_name[0])
    setData(data)
  }, [])

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  const [activeIndex, setActiveIndex] = useState(2)
  const itemTemplate = (item) => {
    return (
      <div id='dataview-container' style={{ backgroundColor: 'white' }}>
        <div id='image-container-dataview'>
          <Link
            id='link-dataview'
            href={`/events/event-management/${item.event_id}`}
          >
            <img src={item.image} alt={item.name} />
          </Link>
        </div>
        <Link
          id='link-dataview'
          href={`/events/event-management/${item.event_id}`}
        >
          <div id='info-dataview'>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.total_members} Thành viên
            </h4>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.total_clubs} Câu lạc bộ
            </h4>
          </div>
          <div id='name-dataview'>
            <i class='fa fa-briefcase icon-run' aria-hidden='true'></i>
            <div id='share-register-container'>
              <h4>{item.name}</h4>
            </div>
          </div>
        </Link>
      </div>
    )
  }
  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <div className='centered-content-layout'>
        <div id='profile-container'>
          <div id='statistic-container'>
            <div id='statistic-content'>
              <div id='statistic-card' title='Tổng quãng đường đã chạy'>
                <h1>{data.total_distance}</h1>
                <h4>Tổng quãng đường (km)</h4>
              </div>
              <div id='statistic-card' title='Tốc độ trung bình'>
                <h1>{data.pace}</h1>
                <h4>Tốc độ trung bình (km/h)</h4>
              </div>
              <div id='statistic-card' title='Tổng số hoạt động đã tham gia'>
                <h1>{data.total_activities}</h1>
                <h4>Tổng số hoạt động</h4>
              </div>

              <div id='statistic-card' title='Tổng số câu lạc bộ đã tham gia'>
                <h1>{data.total_clubs}</h1>
                <h4>Tổng số câu lạc bộ</h4>
              </div>
              <div id='statistic-card' title='Tổng số sự kiện đã tham gia'>
                <h1>{data.total_events}</h1>
                <h4>Tổng số sự kiện</h4>
              </div>
              <div id='statistic-card' title='Hạng của bạn trong hệ thống'>
                <h1>{data.ranking}</h1>
                <h4>Hạng của bạn</h4>
              </div>
            </div>
          </div>
          <div id='profile-image-container'>
            <div style={{ height: '8rem' }}>
              <div id='profile-image-overlay'>
                <Avatar
                  style={{
                    border: '1px solid #ffffff',
                    marginTop: '2rem',
                    width: '10rem',
                    height: '10rem',
                    fontSize: '5rem',
                  }}
                  size='xlarge'
                  shape='circle'
                  label={!avatarImage ? avatarLabel : null}
                  image={avatarImage}
                />
                <div id='info-profile-container'>
                  <div id='name-container'>
                    <h1>{data.last_name + ' ' + data.first_name}</h1>
                    <img
                      src='/verified.png'
                      alt='verified'
                    />
                    <i className='fas icon-large fa-edit'></i>
                  </div>
                  <div>
                    <h4> Mã người dùng: {170347} </h4>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <img
                      src='/strava-icon.png'
                      alt='Connected Strava'
                      style={{ width: '3rem', height: '3rem' }}
                    />
                    <Link href='/user/profile/setting?connect=2'>
                      <h5 style={{ marginTop: '1rem' }}>
                        {data.connect_strava
                          ? 'Đã kết nối với Strava'
                          : 'Chưa kết nối với Strava'}
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div id='profile-menu'>
              <SlideMenu
                ref={menu}
                model={end_items}
                popup
                viewportHeight={250}
                menuWidth={250}
              ></SlideMenu>

              <Button
                type='button'
                icon='pi pi-bars icon-large'
                severity='secondary'
                raised
                label='Menu'
                onClick={(event) => menu.current.toggle(event)}
              ></Button>
            </div>
          </div>
          <Dialog
            header='Thay đổi hình đại diện'
            visible={visibleChange}
            position='top'
            style={{ width: '60%', height: '60%', borderRadius: '20px' }}
            onHide={() => setVisibleChange(false)}
          >
            <ChangeAvatar />
          </Dialog>
          <div id='profile-chart-container'>
            <div id='chart-container'>
              <ChartActivity
                label={dataChartWeek.labels}
                dataColumn={dataChartWeek.dataBar}
                dataLine={dataChartWeek.dataLine}
              />
            </div>
            <div id='chart-container'>
              <ChartActivity
                label={dataChartMonth.labels}
                dataColumn={dataChartMonth.dataBar}
                dataLine={dataChartMonth.dataLine}
              />
            </div>
          </div>
          <div id='profile-activities-container'>
            <div id='profile-button-container'>
              <Button
                id={
                  activeIndex === 1 ? 'button-tab--active' : 'button-tab'
                }
                icon='pi pi-calendar'
                label=' Giải đang tham gia'
                onClick={() => {
                  setActiveIndex(1)
                }}
              />
              <Button
                id={
                  activeIndex === 2 ? 'button-tab--active' : 'button-tab'
                }
                icon='pi pi-calendar-plus'
                label='Hoạt động'
                onClick={() => {
                  setActiveIndex(2)
                }}
              />
              <Button
                id={
                  activeIndex === 3 ? 'button-tab--active' : 'button-tab'
                }
                icon='pi pi-calendar-minus'
                label='Giải đã hoàn thành'
                onClick={() => {
                  setActiveIndex(3)
                }}
              />
              <Button
                id={
                  activeIndex === 4 ? 'button-tab--active' : 'button-tab'
                }
                icon='pi pi-images'
                label='Bộ sưu tập'
                onClick={() => {
                  setActiveIndex(4)
                }}
              />
            </div>
            {activeIndex === 2 ? (
              <div style={{ width: '95%' }}>
                <Title title='Hoạt động gần đây' />
                <Activity activities={activities} />
              </div>
            ) : activeIndex === 3 ? (
              <div style={{ width: '95%' }}>
                <DataViewDashboard
                  data={data.club}
                  href='/clubs/club-management/'
                  itemTemplate={itemTemplate}
                />
              </div>
            ) : activeIndex === 1 ? (
              <div style={{ width: '95%' }}>
                <DataViewDashboard
                  data={data.club}
                  href='/clubs/club-management/'
                  itemTemplate={itemTemplate}
                />
              </div>
            ) : activeIndex === 4 ? null : null}
            <div>
              <Paginator
                first={first}
                rows={per_page}
                totalRecords={totalRecords}
                rowsPerPageOptions={[6, 12, 18]}
                onPageChange={onPageChange}
                page={current_page}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
