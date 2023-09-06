import React, { useState } from 'react'
import { Paginator } from 'primereact/paginator'
import DataView from '@/components/dataview/DataView'
import Title from '@/components/landing/Title'
import Link from 'next/link'
import LocaleHelper from '@/components/locale/LocaleHelper'

const NewsPage = () => {
  const [news, setNews] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const data = {
    per_page: 5,
    current_page: 1,
    total_page: 5,
    total_news: 22,
    news: [
      {
        id: 127,
        name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 8 - HÀ GIANG ',
        description: 'Chạy vì 1 mình abcd',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
      {
        id: 5,
        name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 9 - BẮC KẠN ',
        description: 'Chạy vì 1 con mèo',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
      {
        id: 1,
        name: '54 DÂN TỘC VIỆT NAM - DÂN TỘC TÀY ',
        description: 'Chạy vì 1 mình abcd',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/FB_IMG_1601010618787_25092020_121355_804.jpg',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
      {
        id: 2,
        name: 'CHAMPIONSHIP - YEAR OF THE CAT 2023 ',
        description:
          'Team yêu chạy bộ thuộc Công ty Dịch vụ MobiFone Khu vực 3',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/bestfriend_24092020_103151_570.jpg',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
      {
        id: 3,
        name: '21 Day Challenge - The Horse Warrior ',
        description: 'Câu lạc bộ chạy bộ taị Quảng Trị',
        image:
          'https://mobirace.net/Upload/Images/Club/202008/dulichquangtri1-752x400_17082020_084033_166.jpg',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
      {
        id: 4,
        name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 8 - HÀ GIANG ',
        description: 'string',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
    ],
  }
  const itemTemplate = (item) => {
    return (
      <div id='dataview-container'>
        <div id='image-container-dataview'>
          <img src={item.image} alt={item.name} />
        </div>
        <div id='info-dataview'>
          <h4>
            {/* <i className='pi pi-users ml2-icon' aria-hidden='true'></i> */}
            Ngày tạo: {LocaleHelper.formatDateTime(new Date(item.createAt))}
          </h4>
          <h4>
            {/* <i className='pi pi-map ml2-icon' aria-hidden='true'></i> */}
            Cập nhật: {LocaleHelper.formatDateTime(new Date(item.updateAt))}
          </h4>
        </div>
        <div id='name-dataview'>
          <i class='fa fa-running icon-run' aria-hidden='true'></i>
          <div id='share-register-container'>
            <h4>{item.name}</h4>
            <h6>{item.description}</h6>
            <div id='share-register-content'>
              <Link id='link-event' href={`/news/news-detail/${item.id}`}>
                Xem ngay{' '}
                <i className='pi pi-arrow-right' aria-hidden='true'></i>
              </Link>
              <Link id='link-event' href='/share'>
                Chia sẻ <i className='pi pi-share-alt' aria-hidden='true'></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  return (
    <div>
      <Title title='Các tin tức thể thao ' />
      <DataView
        data={data.news}
        href='/news/news-detail/'
        itemTemplate={itemTemplate}
      />
      <Paginator
        first={first}
        rows={data.per_page}
        totalRecords={data.total_news}
        rowsPerPageOptions={[5, 10, 15]}
        onPageChange={onPageChange}
        page={data.current_page}
      />
    </div>
  )
}

export default NewsPage
