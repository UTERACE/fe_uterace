import DataViewDashboard from '@/components/dataview/DataViewDashboard'
import OutstandingEdit from '@/components/management/OutstandingEdit'
import Link from 'next/link'
import { Paginator } from 'primereact/paginator'
import React, { useEffect, useState } from 'react'

const ClubManagement = () => {
  const [clubs, setClubs] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  useEffect(() => {
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
          outstanding: true,
        },
        {
          club_id: 2,
          name: 'Dak Lak Runners',
          image:
            'https://mobirace.net/Upload/Images/Club/202008/IMG_20200816_094952_16082020_094942_562.jpg',
          total_members: 100,
          total_distance: 1000,
          outstanding: false,
        },
        {
          club_id: 3,
          name: 'MOBIFONE ĐẮK LẮK - ĐẮK NÔNG',
          image:
            'https://mobirace.net/Upload/Images/Club/202010/dl_dn_17102020_095936_684.jpg',
          total_members: 100,
          total_distance: 1000,
          outstanding: true,
        },
        {
          club_id: 4,
          name: 'XOSOKIENTHIETQUANGBINH RUNNERS CLUB',
          image:
            'https://mobirace.net/Upload/Images/Club/202103/IMG_20200913_114028_18032021_152058_637.jpg',
          total_members: 100,
          total_distance: 1000,
          outstanding: true,
        },
        {
          club_id: 5,
          name: 'Đài Viễn Thông Đông HCM - TT MLMN',
          image:
            'https://mobirace.net/Upload/Images/Club/202009/FN_29092020_130940_125.png',
          total_members: 100,
          total_distance: 1000,
          outstanding: false,
        },
        {
          club_id: 6,
          name: 'MLMN Win Together',
          image:
            'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
          total_members: 100,
          total_distance: 1000,
          outstanding: true,
        },
      ],
    }
    setClubs(data.clubs)
    setCurrentPage(data.current_page)
    setPerPage(data.per_page)
    setTotalRecords(data.total_clubs)
  }, [])
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  const itemTemplate = (item) => {
    return (
      <div id='dataview-container'>
        <div id='image-container-dataview'>
          <Link
            id='link-dataview'
            href={`/clubs/club-management/${item.club_id}`}
          >
            <img src={item.image} alt={item.name} />
          </Link>
          <OutstandingEdit
            items={items(item.club_id)}
            isOutstanding={item.outstanding}
            id={item.club_id}
            title='câu lạc bộ'
          />
        </div>
        <Link
          id='link-dataview'
          href={`/clubs/club-management/${item.club_id}`}
        >
          <div id='info-dataview'>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.member} Thành viên
            </h4>
            <h4>
              <i className='pi pi-map ml2-icon' aria-hidden='true'></i>
              {item.total_distance} Km
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
  const handleClickEdit = (club_id) => {
    if (club_id == 1) {
      setDataClub(dataDetail)
    } else {
      setDataClub({})
    }
    setVisibleChange(true)
  }
  const items = (club_id) => [
    {
      label: 'Add',
      icon: 'pi pi-plus',
      command: () => {},
      title: 'Thêm câu lạc bộ mới',
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: () => {
        handleClickEdit(club_id)
      },
      title: 'Cập nhật câu lạc bộ',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {},
      title: 'Xóa câu lạc bộ',
    },
    {
      label: 'React Website',
      icon: 'pi pi-external-link',
      command: () => {},
    },
  ]
  return (
    <div id='initial-user-container'>
      <DataViewDashboard
        data={clubs}
        href='/clubs/club-management/'
        itemTemplate={itemTemplate}
      />
      <Paginator
        first={first}
        rows={per_page}
        totalRecords={totalRecords}
        rowsPerPageOptions={[5, 10, 15]}
        onPageChange={onPageChange}
        page={current_page}
      />
    </div>
  )
}

export default ClubManagement
