import LocaleHelper from '@/components/locale/LocaleHelper'
import React, { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import Title from '../../components/landing/Title'
import Link from 'next/link'
import { Button } from 'primereact/button'
import Club from '../landing/Club'
import DataView from '@/components/dataview/DataView'
import apiInstance from '@/api/apiInstance'

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
  useEffect(() => {
    setClubs(data.clubs)
    setTotalRecords(data.total_clubs)
  }, [])
  const fetchClubs = async () => {
    const res = await apiInstance.get(
      `/clubs?page=${current_page}&per_page=${per_page}`
    )
    const data = await res.json()
    setClubs(data.clubs)
    setTotalRecords(data.total_clubs)
  }
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  return (
    <div>
      <Title title='Tất cả câu lạc bộ ' />
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
