import LocaleHelper from '@/components/locale/LocaleHelper'
import React, { useState } from 'react'
import { Paginator } from 'primereact/paginator'
import Title from '../../components/landing/Title'
import Link from 'next/link'
import { Button } from 'primereact/button'
import Club from '../landing/Club'
import DataView from '@/components/dataview/DataView'

const Clubs = () => {
  const [clubs, setClubs] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const data = {
    per_page: 5,
    current_page: 1,
    total_page: 5,
    total_club: 22,
    clubs: [
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
    console.log(event)
    setCurrentPage(event.page + 1)
    console.log(current_page)
    setPerPage(event.rows)
    console.log(per_page)
  }
  const itemTemplate = (club) => {
    return (
      <div className='centered-content-layout'>
        <div className='custom-carousel-content'>
          {club.map((item) => (
            <div id='club-container'>
              <div id='image-container-club'>
                <img src={item.image} alt={item.name} />
              </div>
              <div id='info-club'>
                <h4>
                  <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
                  {item.member} Thành viên 
                </h4>
                <h4>
                  <i className='pi pi-map ml2-icon' aria-hidden='true'></i>
                  {item.total_distance} km
                </h4>
              </div>
              <div id='name-club'>
                <i class='fa fa-running icon-run' aria-hidden='true'></i>
                <div id='share-register-container'>
                  <h4>{item.name}</h4>
                  <div id='share-register-content'>
                    <Link id='link-event' href='/register'>
                      Đăng ký{' '}
                      <i className='pi pi-arrow-right' aria-hidden='true'></i>
                    </Link>
                    <Link id='link-event' href='/share'>
                      Chia sẻ{' '}
                      <i className='pi pi-share-alt' aria-hidden='true'></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Detail link='/club' />
      </div>
    )
  }
  return (
    // <div
    //   className='centered-content-full'
    //   style={{
    //     backgroundColor: '#f5f5f5',
    //     backgroundImage: "url('/bg1.png')",
    //     backgroundSize: 'cover',
    //     backgroundPosition: 'center',
    //   }}
    // >
    //   <Title title='Ranking club' />
    //   <div className='centered-content-layout'>
    //     <DataView
    //       value={data.clubs}
    //       layout='grid'
    //       itemTemplate={itemTemplate}
    //     />
    //     <Paginator
    //       first={first}
    //       rows={per_page}
    //       totalRecords={totalRecords}
    //       rowsPerPageOptions={[5, 10, 15]}
    //       onPageChange={onPageChange}
    //       page={current_page}
    //     />
    //   </div>
    // </div>
    <div>
      <Title title='Tất cả câu lạc bộ ' />
      {/* <Club club={data.clubs} /> */}
      <DataView data={data.clubs} href='/clubs/club-detail/' />
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

export default Clubs
