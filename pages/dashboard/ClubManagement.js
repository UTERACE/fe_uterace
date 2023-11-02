import DataTable from '@/components/datatable/DataTable'
import DataViewDashboard from '@/components/dataview/DataViewDashboard'
import LocaleHelper from '@/components/locale/LocaleHelper'
import OutstandingEdit from '@/components/management/OutstandingEdit'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { Paginator } from 'primereact/paginator'
import React, { useEffect, useState } from 'react'

const ClubManagement = () => {
  const [clubs, setClubs] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const [visibleReason, setVisibleReason] = useState(false)
  const [visibleBlock, setVisibleBlock] = useState(false)
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [dataClub, setDataClub] = useState({})

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
          status: 1,
          reason_block: '',
        },
        {
          club_id: 2,
          name: 'Dak Lak Runners',
          image:
            'https://mobirace.net/Upload/Images/Club/202008/IMG_20200816_094952_16082020_094942_562.jpg',
          total_members: 100,
          total_distance: 1000,
          outstanding: false,
          status: 0,
          reason_block: '',
        },
        {
          club_id: 3,
          name: 'MOBIFONE ĐẮK LẮK - ĐẮK NÔNG',
          image:
            'https://mobirace.net/Upload/Images/Club/202010/dl_dn_17102020_095936_684.jpg',
          total_members: 100,
          total_distance: 1000,
          outstanding: true,
          status: 0,
          reason_block: 'Không đạt yêu cầu',
        },
        {
          club_id: 4,
          name: 'XOSOKIENTHIETQUANGBINH RUNNERS CLUB',
          image:
            'https://mobirace.net/Upload/Images/Club/202103/IMG_20200913_114028_18032021_152058_637.jpg',
          total_members: 100,
          total_distance: 1000,
          outstanding: true,
          status: 1,
          reason_block: 'Vi phạm quy định',
        },
        {
          club_id: 5,
          name: 'Đài Viễn Thông Đông HCM - TT MLMN',
          image:
            'https://mobirace.net/Upload/Images/Club/202009/FN_29092020_130940_125.png',
          total_members: 100,
          total_distance: 1000,
          outstanding: false,
          status: 0,
          reason_block: '',
        },
        {
          club_id: 6,
          name: 'MLMN Win Together',
          image:
            'https://mobirace.net/Upload/Images/Club/202009/5DE60CEF-1902-4660-ACD5-2C5559B69664_30092020_171158_841.jpeg',
          total_members: 100,
          total_distance: 1000,
          outstanding: true,
          status: 1,
          reason_block: 'Sai quy định',
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
  const fullnameWithImageTemplate = (rowData) => {
    const avatarImage = rowData.image
    return (
      <div id='info-detail-container'>
        <div id='info-image-container'>
          <img src={avatarImage} alt={rowData.name} />
        </div>
        <div id='info-name-container'>
          <Link href={`clubs/detail-club/${rowData.event_id}`}>
            <span>{rowData.name}</span>
          </Link>
        </div>
      </div>
    )
  }
  const formatNumberMember = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatNumber(rowData.total_members.toFixed(2))
    }
    return ''
  }
  const formatNumberDistance = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatNumber(rowData.total_distance.toFixed(2))
    }
    return ''
  }
  const formatOutstanding = (rowData) => {
    if (rowData.outstanding === true) {
      return (
        <div id='content-datatable-container'>
          <i className='pi pi-check-circle' style={{ color: 'green' }} />
          <span style={{ color: 'green' }}>Đang nổi bật</span>
        </div>
      )
    } else if (rowData.outstanding === false) {
      return (
        <div id='content-datatable-container'>
          <i className='pi pi-times-circle' style={{ color: 'black' }} />
          <span style={{ color: 'black' }}>Mặc định</span>
        </div>
      )
    }
  }
  const formatUpdate = (rowData) => {
    if (rowData.outstanding === true) {
      return (
        <div id='content-datatable-container'>
          <Button id='button-reinitialize' type='button' onClick={() => {}}>
            Chọn nổi bật
          </Button>
        </div>
      )
    } else if (rowData.outstanding === false) {
      return (
        <div id='content-datatable-container'>
          <Button id='button-reinitialize' type='button' onClick={() => {}}>
            Nổi bật
          </Button>
        </div>
      )
    }
  }
  const blockClub = (rowData) => {
    if (rowData.status === 0) {
      return (
        <div id='content-datatable-container'>
          <i
            className='pi pi-exclamation-circle'
            style={{ color: 'red' }}
            title={rowData.reason_block}
            onClick={() => setVisibleReason(true)}
          />
          <Dialog
            header='Lý do chặn sự kiện'
            visible={visibleReason}
            position='top'
            style={{ width: '30%', height: 'auto', borderRadius: '20px' }}
            onHide={() => setVisibleReason(false)}
          >
            <div style={{ margin: '2rem', color: 'black' }}>
              {visibleBlock ? (
                <div id='content-dialog-container'>
                  <InputTextarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    rows={5}
                    cols={30}
                    autoResize
                  />
                  <Button
                    id='button-reinitialize'
                    type='submit'
                    onClick={() => {
                      handleBlockUser()
                    }}
                  >
                    Chặn sự kiện
                  </Button>
                </div>
              ) : (
                <h4> {rowData.reason_block}</h4>
              )}
            </div>
          </Dialog>
          <Button
            id='button-reinitialize'
            type='button'
            onClick={() => {
              handleUnlockUser()
            }}
          >
            Mở chặn
          </Button>
        </div>
      )
    } else if (rowData.status === 1) {
      return (
        <div id='content-datatable-container'>
          <Button
            id='button-reinitialize'
            type='button'
            onClick={() => {
              setVisibleBlock(true)
              setVisibleReason(true)
            }}
          >
            Chặn
          </Button>
        </div>
      )
    }
  }
  const formatStatus = (rowData) => {
    if (rowData.status === 0) {
      return (
        <div id='content-datatable-container'>
          <img
            src='/lock.png'
            alt='lock'
            style={{ width: '1.5rem', height: '1.5rem' }}
          />{' '}
          <span style={{ color: 'red' }}>Đang bị chặn</span>
        </div>
      )
    } else if (rowData.status === 1) {
      return (
        <div id='content-datatable-container'>
          <img
            src='/verified.png'
            alt='verified'
            style={{ width: '1.5rem', height: '1.5rem' }}
          />
          <span style={{ color: 'green' }}>Đang hoạt động</span>
        </div>
      )
    }
  }
  const clubColumns = [
    {
      field: 'club_id',
      header: 'ID',
      bodyClassName: 'text-center',
    },
    {
      header: 'Thông tin câu lạc bộ',
      body: fullnameWithImageTemplate,
    },
    {
      field: 'total_members',
      header: 'Thành viên',
      bodyClassName: 'text-center',
      body: formatNumberMember,
    },
    {
      field: 'total_clubs',
      header: 'Tổng quảng đường (km)',
      body: formatNumberDistance,
      bodyClassName: 'text-center',
    },
    {
      field: 'outstanding',
      header: 'Nổi bật',
      bodyClassName: 'text-center',
      body: formatOutstanding,
    },
    {
      field: 'updated',
      header: 'Cập nhật',
      bodyClassName: 'text-center',
      body: formatUpdate,
    },
    {
      field: 'status',
      header: 'Trạng thái',
      bodyClassName: 'text-center',
      body: formatStatus,
    },
    {
      field: 'block',
      header: 'Chặn câu lạc bộ',
      bodyClassName: 'text-center',
      body: blockClub,
    },
  ]
  return (
    <div id='initial-user-container'>
      {/* <DataViewDashboard
        data={clubs}
        href='/clubs/club-management/'
        itemTemplate={itemTemplate}
      /> */}
      <DataTable
        data={clubs}
        rows={4}
        loading={loading}
        columns={clubColumns}
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
