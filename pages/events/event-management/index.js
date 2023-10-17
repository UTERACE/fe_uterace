import DataView from '@/components/dataview/DataView'
import Title from '@/components/landing/Title'
import OutstandingEdit from '@/components/management/OutstandingEdit'
import store from '@/store/store'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import { SpeedDial } from 'primereact/speeddial'
import React, { useState } from 'react'

const EventManagement = () => {
  const [clubs, setClubs] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [index, setIndex] = useState(2)

  const router = useRouter()
  const roles = store.getState().auth.roles
  const hasAdminRole = roles ? roles.some((role) => role.roleId === 1) : false
  console.log('hasAdminRole', hasAdminRole)
  const data = {
    per_page: 5,
    current_page: 1,
    total_page: 5,
    total_events: 22,
    events: [
      {
        event_id: 127,
        name: '21 DAY CHALLENGE - THE MONKEY WARRIOR ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/e06bb7dc736ecb9b9920953e4.png?w=720',
        total_members: 3,
        total_clubs: 2,
        outstanding: true,
      },
      {
        event_id: 1,
        name: 'MID-AUTUMN CHALLENGE - TẾT TRUNG THU ĐOÀN VIÊN ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f9f.png?w=1800',
        total_members: 120,
        total_clubs: 19,
        outstanding: true,
      },
      {
        event_id: 2,
        name: '54 DÂN TỘC VIỆT NAM - DÂN TỘC MƯỜNG ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f56.png?w=720',
        total_members: 60,
        total_clubs: 11,
        outstanding: false,
      },
      {
        event_id: 3,
        name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 13 - BẮC GIANG ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/cad906c5a3d5c8d0ef85aa523.jpg?w=720',
        total_members: 240,
        total_clubs: 30,
        outstanding: true,
      },
      {
        event_id: 4,
        name: 'AZTEC LOST CHẶNG 1 - CHINH PHỤC THẦN MƯA TLALOC (THE GOD OF RAIN) ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1bf678a8a67029fa1e6697c62.jpg?w=720',
        total_members: 320,
        total_clubs: 101,
        outstanding: true,
      },
      {
        event_id: 5,
        name: 'RACE AROUND THE WORLD - IRAN: BÍ ẨN XỨ BA TƯ ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/3661e301e10ee6febd38e793a.png?w=720',
        total_members: 130,
        total_clubs: 12,
        outstanding: false,
      },
    ],
  }
  const handleClick = (url) => {
    router.push(url)
  }
  const itemTemplate = (item) => {
    return (
      <div id='dataview-container'>
        <div id='image-container-dataview'>
          <Link
            id='link-dataview'
            href={`/events/event-management/${item.event_id}`}
          >
            <img src={item.image} alt={item.name} />
          </Link>
          <OutstandingEdit
            items={items}
            isOutstanding={item.outstanding}
            id={item.event_id}
            title={'sự kiện'}
          />
        </div>
        <Link
          id='link-dataview-container'
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
              <div id='share-register-content'>
                <Link
                  id='link-dataview'
                  href={`/events/event-management/${item.event_id}`}
                >
                  Tham gia sự kiện{' '}
                  <i className='pi pi-arrow-right' aria-hidden='true'></i>
                </Link>
                <Link id='link-dataview' href='/share'>
                  Chia sẻ <i className='pi pi-share-alt' aria-hidden='true'></i>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  const items = [
    {
      label: 'Add',
      icon: 'pi pi-plus',
      command: () => handleClick('/events/event-new'),
      title: 'Thêm sự kiện mới',
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: () => {
        handleClick('/events/event-new')
      },
      title: 'Cập nhật sự kiện',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {},
      title: 'Xóa sự kiệnộ',
    },
    {
      label: 'React Website',
      icon: 'pi pi-external-link',
      command: () => {},
    },
  ]
  return (
    <div className='centered-content-dataview'>
      <Title
        title={
          index === 3
            ? 'Các sự kiện đang diễn ra'
            : index === 2
            ? 'Các sự kiện đã tạo'
            : null
        }
      />
      <div className='centered-content-layout'>
        {hasAdminRole ? (
          <div
            style={{
              width: '75%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            <Button
              id={index == 1 ? 'button-tab--active' : 'button-tab'}
              type='button'
              style={{ width: '100%' }}
              label={'Thêm sự kiện mới'}
              icon='pi pi-plus'
              iconPos='right'
              onClick={() => {
                setIndex(1)
                setVisibleAdd(true)
              }}
            />
            <Button
              id={index == 2 ? 'button-tab--active' : 'button-tab'}
              type='button'
              style={{ width: '100%' }}
              label='Sự kiện đã tạo'
              icon='pi pi-list'
              iconPos='right'
              onClick={() => {
                setIndex(2)
              }}
            />
            <Button
              id={index == 3 ? 'button-tab--active' : 'button-tab'}
              type='button'
              style={{ width: '100%' }}
              label='Sự kiện đang diễn ra'
              icon='pi pi-list'
              iconPos='right'
              onClick={() => {
                setIndex(3)
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '50%',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            <Button
              id={index == 2 ? 'button-tab--active' : 'button-tab'}
              type='button'
              style={{ width: '100%' }}
              label='Sự kiện đã tham gia'
              icon='pi pi-list'
              iconPos='right'
              onClick={() => {
                setIndex(2)
              }}
            />
            <Button
              id={index == 3 ? 'button-tab--active' : 'button-tab'}
              type='button'
              style={{ width: '100%' }}
              label='Sự kiện đang diễn ra'
              icon='pi pi-list'
              iconPos='right'
              onClick={() => {
                setIndex(3)
              }}
            />
          </div>
        )}
      </div>
      <DataView
        data={data.events}
        href='/clubs/club-management/'
        itemTemplate={itemTemplate}
      />
      <Paginator
        first={first}
        rows={data.per_page}
        totalRecords={data.total_events}
        rowsPerPageOptions={[5, 10, 15]}
        onPageChange={onPageChange}
        page={data.current_page}
      />
    </div>
  )
}

export default EventManagement
