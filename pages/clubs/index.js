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
    total_clubs: 22,
    clubs: [
      {
        club_id: 1,
        name: 'DONG HANH CUNG CAC THIEN THAN - ANGELS RUN',
        image: 'https://picsum.photos/200/300',
        total_members: 100,
        total_distance: 1000,
      },
      {
        club_id: 2,
        name: 'Dak Lak Runners',
        image:
          'https://mobirace.net/Upload/Images/Club/202008/IMG_20200816_094952_16082020_094942_562.jpg',
        total_members: 100,
        total_distance: 1000,
      },
      {
        club_id: 3,
        name: 'MOBIFONE ĐẮK LẮK - ĐẮK NÔNG',
        image:
          'https://mobirace.net/Upload/Images/Club/202010/dl_dn_17102020_095936_684.jpg',
        total_members: 100,
        total_distance: 1000,
      },
      {
        club_id: 4,
        name: 'XOSOKIENTHIETQUANGBINH RUNNERS CLUB',
        image:
          'https://mobirace.net/Upload/Images/Club/202103/IMG_20200913_114028_18032021_152058_637.jpg',
        total_members: 100,
        total_distance: 1000,
      },
      {
        club_id: 5,
        name: 'Đài Viễn Thông Đông HCM - TT MLMN',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/FN_29092020_130940_125.png',
        total_members: 100,
        total_distance: 1000,
      },
      {
        club_id: 6,
        name: 'MLMN Win Together',
        image:
          'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
        total_members: 100,
        total_distance: 1000,
      },
    ],
  }
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
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
    <div>
      <Title title='Tất cả câu lạc bộ ' />
      {/* <Club club={data.clubs} /> */}
      <DataView data={data.clubs} href='/clubs/club-detail/' />
      <Paginator
        first={first}
        rows={data.per_page}
        totalRecords={data.total_clubs}
        rowsPerPageOptions={[5, 10, 15]}
        onPageChange={onPageChange}
        page={data.current_page}
      />
    </div>
  )
}

export default Clubs
