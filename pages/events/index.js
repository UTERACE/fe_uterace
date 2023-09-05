import DataView from '@/components/dataview/DataView'
import Title from '@/components/landing/Title'
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
    total_club: 22,
    events: [
      {
        id: 127,
        name: '21 DAY CHALLENGE - THE MONKEY WARRIOR ',
        description: 'fasfsdfgdffa',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
        member: 3,
        total_distance: 2.5,
      },
      {
        id: 5,
        name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 9 - BẮC KẠN ',
        description: 'string',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
        member: 1,
        total_distance: 0.1,
      },
      {
        id: 1,
        name: '54 DÂN TỘC VIỆT NAM - DÂN TỘC TÀY ',
        description: 'Chạy vì 1 mình abcd',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/FB_IMG_1601010618787_25092020_121355_804.jpg',
        member: 4,
        total_distance: 0.0,
      },
      {
        id: 2,
        name: 'CHAMPIONSHIP - YEAR OF THE CAT 2023 ',
        description:
          'Team yêu chạy bộ thuộc Công ty Dịch vụ MobiFone Khu vực 3',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/bestfriend_24092020_103151_570.jpg',
        member: 1,
        total_distance: 0.0,
      },
      {
        id: 3,
        name: '21 Day Challenge - The Horse Warrior ',
        description: 'Câu lạc bộ chạy bộ taị Quảng Trị',
        image:
          'https://mobirace.net/Upload/Images/Club/202008/dulichquangtri1-752x400_17082020_084033_166.jpg',
        member: 1,
        total_distance: 0.0,
      },
      {
        id: 4,
        name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 8 - HÀ GIANG ',
        description: 'string',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
        member: 1,
        total_distance: 0.0,
      },
    ],
  }
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  return (
    <div>
      <Title title='Tất cả giải chạy bộ ' />
      <DataView data={data.events} href='/events/event-detail/' />
      <Paginator
        first={first}
        rows={data.per_page}
        totalRecords={data.total_club}
        rowsPerPageOptions={[5, 10, 15]}
        onPageChange={onPageChange}
        page={data.current_page}
      />
    </div>
  )
}

export default Events
