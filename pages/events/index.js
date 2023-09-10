import DataView from '@/components/dataview/DataView'
import Title from '@/components/landing/Title'
import Link from 'next/link'
import { Paginator } from 'primereact/paginator'
import React, { useState } from 'react'

const Events = () => {
  const [events, setEvents] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
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
      },
      {
        event_id: 1,
        name: 'MID-AUTUMN CHALLENGE - TẾT TRUNG THU ĐOÀN VIÊN ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f9f.png?w=1800',
        total_members: 120,
        total_clubs: 19,
      },
      {
        event_id: 2,
        name: '54 DÂN TỘC VIỆT NAM - DÂN TỘC MƯỜNG ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f56.png?w=720',
        total_members: 60,
        total_clubs: 11,
      },
      {
        event_id: 3,
        name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 13 - BẮC GIANG ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/cad906c5a3d5c8d0ef85aa523.jpg?w=720',
        total_members: 240,
        total_clubs: 30,
      },
      {
        event_id: 4,
        name: 'AZTEC LOST CHẶNG 1 - CHINH PHỤC THẦN MƯA TLALOC (THE GOD OF RAIN) ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1bf678a8a67029fa1e6697c62.jpg?w=720',
        total_members: 320,
        total_clubs: 101,
      },
      {
        event_id: 5,
        name: 'RACE AROUND THE WORLD - IRAN: BÍ ẨN XỨ BA TƯ ',
        image:
          'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/3661e301e10ee6febd38e793a.png?w=720',
        total_members: 130,
        total_clubs: 12,
      },
    ],
  }
  const itemTemplate = (item) => {
    return (
      <Link id='link-dataview' href={`/events/event-detail/${item.id}`}>
        <div id='dataview-container'>
          <div id='image-container-dataview'>
            <img src={item.image} alt={item.name} />
          </div>
          <div id='info-dataview'>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.member} Thành viên
            </h4>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.club} Câu lạc bộ
            </h4>
          </div>
          <div id='name-dataview'>
            <i class='fa fa-running icon-run' aria-hidden='true'></i>
            <div id='share-register-container'>
              <h4>{item.name}</h4>
              <div id='share-register-content'>
                <Link id='link-event' href={`/events/event-detail/${item.id}`}>
                  Tham gia sự kiện{' '}
                  <i className='pi pi-arrow-right' aria-hidden='true'></i>
                </Link>
                <Link id='link-event' href='/share'>
                  Chia sẻ <i className='pi pi-share-alt' aria-hidden='true'></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  return (
    <div>
      <Title title='Tất cả giải chạy bộ ' />
      <DataView
        data={data.events}
        href='/events/event-detail/'
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

export default Events
