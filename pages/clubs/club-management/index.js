import DataView from '@/components/dataview/DataView'
import Title from '@/components/landing/Title'
import OutstandingEdit from '@/components/management/OutstandingEdit'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useState } from 'react'
import Update from './UpdateClub'
import { Dialog } from 'primereact/dialog'
import AddClub from './AddClub'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import apiInstance from '@/api/apiInstance'

const ClubManagement = () => {
  const [clubs, setClubs] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [visibleChange, setVisibleChange] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [dataClub, setDataClub] = useState({})
  const [index, setIndex] = useState(2)
  const [updateStatus, setUpdateStatus] = useState(false)
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  // const data = {
  //   per_page: 5,
  //   current_page: 1,
  //   total_page: 5,
  //   total_clubs: 22,
  //   clubs: [
  //     {
  //       club_id: 1,
  //       name: 'DONG HANH CUNG CAC THIEN THAN - ANGELS RUN',
  //       image: 'https://picsum.photos/200/300',
  //       total_members: 100,
  //       total_distance: 1000,
  //       outstanding: true,
  //     },
  //     {
  //       club_id: 2,
  //       name: 'Dak Lak Runners',
  //       image:
  //         'https://mobirace.net/Upload/Images/Club/202008/IMG_20200816_094952_16082020_094942_562.jpg',
  //       total_members: 100,
  //       total_distance: 1000,
  //       outstanding: false,
  //     },
  //     {
  //       club_id: 3,
  //       name: 'MOBIFONE ĐẮK LẮK - ĐẮK NÔNG',
  //       image:
  //         'https://mobirace.net/Upload/Images/Club/202010/dl_dn_17102020_095936_684.jpg',
  //       total_members: 100,
  //       total_distance: 1000,
  //       outstanding: true,
  //     },
  //     {
  //       club_id: 4,
  //       name: 'XOSOKIENTHIETQUANGBINH RUNNERS CLUB',
  //       image:
  //         'https://mobirace.net/Upload/Images/Club/202103/IMG_20200913_114028_18032021_152058_637.jpg',
  //       total_members: 100,
  //       total_distance: 1000,
  //       outstanding: true,
  //     },
  //     {
  //       club_id: 5,
  //       name: 'Đài Viễn Thông Đông HCM - TT MLMN',
  //       image:
  //         'https://mobirace.net/Upload/Images/Club/202009/FN_29092020_130940_125.png',
  //       total_members: 100,
  //       total_distance: 1000,
  //       outstanding: false,
  //     },
  //     {
  //       club_id: 6,
  //       name: 'MLMN Win Together',
  //       image:
  //         'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
  //       total_members: 100,
  //       total_distance: 1000,
  //       outstanding: true,
  //     },
  //   ],
  // }
  // const dataDetail = {
  //   image:
  //     'https://mobirace.net/Upload/Images/Club/202009/FB_IMG_1601010618787_25092020_121355_804.jpg',
  //   name: 'CLB ĐỒNG HÀNH CÙNG CÁC THIÊN THẦN',
  //   description:
  //     'Giải chạy online “E-run for the heart I” do Đoàn khoa Quản trị kinh doanh (Đoàn trường Đại học Quốc tế Miền Đông) tổ chức với mong muốn thúc đẩy tinh thần tập luyện thể dục thể thao cho mọi người, đặc biệt là các bạn trẻ, hướng tới ngày tim mạch thế giới 29/9 và tuyên truyền, phổ biến, nâng cao nhận thức của cộng đồng về tăng cường sức khỏe tim mạch, phòng ngừa và tránh những rủi ro về sức khỏe tim mạch.',
  // }
  useEffect(() => {
    if (index === 2) {
      fetchCreatedClubs()
    } else if (index === 3) {
      fetchJoinedClubs()
    }
  }, [current_page, per_page, index, visibleChange, visibleAdd, updateStatus])
  const fetchCreatedClubs = async () => {
    try {
      const res = await apiInstance.get(
        `/clubs/created-club?current_page=${current_page}&per_page=${per_page}`
      )
      const data = res.data
      if (res.status === 200) {
        setClubs(data.clubs)
        setTotalRecords(data.total_clubs)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
      }
    } catch (err) {
      showToast('error', 'Lỗi', err)
    }
  }
  const fetchJoinedClubs = async () => {
    try {
      const res = await apiInstance.get(
        `/clubs/joined-club?current_page=${current_page}&per_page=${per_page}`
      )
      const data = res.data
      if (res.status === 200) {
        setClubs(data.clubs)
        setTotalRecords(data.total_clubs)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
      }
    } catch (err) {
      showToast('error', 'Lỗi', err)
    }
  }
  const fetchDetailClub = async (club_id) => {
    try {
      const res = await apiInstance.get(`/clubs/${club_id}`)
      if (res.status === 200) {
        setDataClub(res.data)
        setVisibleChange(true)
      }
    } catch (err) {
      showToast('error', 'Lỗi', err)
    }
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  const { t } = useTranslation('club')
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
              {item.total_member} {t('member-join')}
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
                  {t('club-join')}{' '}
                  <i className='pi pi-arrow-right' aria-hidden='true'></i>
                </Link>
                <Link id='link-dataview' href='/share'>
                  {t('share')}{' '}
                  <i className='pi pi-share-alt' aria-hidden='true'></i>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
  const handleClickEdit = (club_id) => {
    fetchDetailClub(club_id)
  }
  const handleClickDelete = (club_id) => {
    deleteClub(club_id)
  }
  const deleteClub = async (club_id) => {
    try {
      const res = await apiInstance.delete(`/clubs/${club_id}`)
      if (res.status === 200) {
        showToast('success', 'Xóa câu lạc bộ thành công')
        setUpdateStatus(!updateStatus)
      }
    } catch (err) {
      showToast('error', 'Xóa câu lạc bộ thất bại', err)
    }
  }
  const items = (club_id) => [
    {
      label: 'Add',
      icon: 'pi pi-plus',
      command: () => {},
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: () => {
        handleClickEdit(club_id)
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        handleClickDelete(club_id)
      },
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
            ? t('joined-clubs')
            : index === 2
            ? t('created-clubs')
            : null
        }
      />
      <Dialog
        header={t('update-clubs')}
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
          club_id={dataClub.club_id}
          image={dataClub.image}
          name={dataClub.name}
          description={dataClub.description}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleChange={setVisibleChange}
          setUpdate={setUpdateStatus}
        />
      </Dialog>
      <Dialog
        header={t('new-club')}
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
        <AddClub
          setLoading={setLoading}
          showToast={showToast}
          setVisibleAdd={setVisibleAdd}
          setUpdate={setUpdateStatus}
        />
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
            label={t('new-club')}
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
            label={t('created-clubs')}
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
            label={t('joined-clubs')}
            icon='pi pi-list'
            iconPos='right'
            onClick={() => {
              setIndex(3)
            }}
          />
        </div>
      </div>
      <DataView
        data={clubs}
        href='/clubs/club-management/'
        itemTemplate={itemTemplate}
      />
      <Paginator
        first={first}
        rows={per_page}
        totalRecords={totalRecords}
        rowsPerPageOptions={[6, 9, 12]}
        onPageChange={onPageChange}
        page={current_page}
      />
    </div>
  )
}

export default ClubManagement
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['club', 'topbar'])),
    },
  }
}
