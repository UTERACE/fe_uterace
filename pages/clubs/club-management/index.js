import DataView from '@/components/dataview/DataView'
import Manage from '@/components/landing/Manage'
import Title from '@/components/landing/Title'
import OutstandingEdit from '@/components/management/OutstandingEdit'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import { SpeedDial } from 'primereact/speeddial'
import React, { useState } from 'react'
import Update from './UpdateClub'
import { Dialog } from 'primereact/dialog'
import AddClub from './AddClub'

const ClubManagement = () => {
  const [clubs, setClubs] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [visibleChange, setVisibleChange] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [dataClub, setDataClub] = useState({})
  const [index, setIndex] = useState(2)

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
  const dataDetail = {
    image:
      'https://mobirace.net/Upload/Images/Club/202009/FB_IMG_1601010618787_25092020_121355_804.jpg',
    name: 'CLB ĐỒNG HÀNH CÙNG CÁC THIÊN THẦN',
    description:
      'Giải chạy online “E-run for the heart I” do Đoàn khoa Quản trị kinh doanh (Đoàn trường Đại học Quốc tế Miền Đông) tổ chức với mong muốn thúc đẩy tinh thần tập luyện thể dục thể thao cho mọi người, đặc biệt là các bạn trẻ, hướng tới ngày tim mạch thế giới 29/9 và tuyên truyền, phổ biến, nâng cao nhận thức của cộng đồng về tăng cường sức khỏe tim mạch, phòng ngừa và tránh những rủi ro về sức khỏe tim mạch.',
  }
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
          id='link-dataview-container'
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
              <div id='share-register-content'>
                <Link
                  id='link-dataview'
                  href={`/clubs/club-management/${item.id}`}
                >
                  Tham gia câu lạc bộ{' '}
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
    <div className='centered-content-dataview'>
      <Title
        title={
          index === 3
            ? 'Các câu lạc bộ đã tham gia'
            : index === 2
            ? 'Các câu lạc bộ đã tạo'
            : null
        }
      />
      <Dialog
        header='Chỉnh sửa thông tin câu lạc bộ'
        visible={visibleChange}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleChange(false)}
      >
        <Update
          image={dataClub.image}
          name={dataClub.name}
          description={dataClub.description}
        />
      </Dialog>
      <Dialog
        header='Thêm câu lạc bộ mới'
        visible={visibleAdd}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleAdd(false)}
      >
        <AddClub />
      </Dialog>
      <div className='centered-content-layout'>
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
            label={'Thêm câu lạc bộ mới'}
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
            label='Câu lạc bộ đã tạo'
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
            label='Câu lạc bộ đã tham gia'
            icon='pi pi-list'
            iconPos='right'
            onClick={() => {
              setIndex(3)
            }}
          />
        </div>
      </div>
      <DataView
        data={data.clubs}
        href='/clubs/club-management/'
        itemTemplate={itemTemplate}
      />
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

export default ClubManagement
