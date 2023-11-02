import DataTable from '@/components/datatable/DataTable'
import DataViewDashboard from '@/components/dataview/DataViewDashboard'
import LocaleHelper from '@/components/locale/LocaleHelper'
import OutstandingEdit from '@/components/management/OutstandingEdit'
import Link from 'next/link'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'

const EventManagement = () => {
  const [events, setEvents] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const [loading, setLoading] = useState(false)
  const [visibleReason, setVisibleReason] = useState(false)
  const [visibleBlock, setVisibleBlock] = useState(false)
  const [reason, setReason] = useState('')

  useEffect(() => {
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
          outstanding: true,
          status: 1,
          reason_block: '',
        },
        {
          event_id: 1,
          name: 'MID-AUTUMN CHALLENGE - TẾT TRUNG THU ĐOÀN VIÊN ',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f9f.png?w=1800',
          total_members: 120,
          total_clubs: 19,
          outstanding: true,
          status: 0,
          reason_block: 'Không đạt yêu cầu',
        },
        {
          event_id: 2,
          name: '54 DÂN TỘC VIỆT NAM - DÂN TỘC MƯỜNG ',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f56.png?w=720',
          total_members: 60,
          total_clubs: 11,
          outstanding: false,
          status: 1,
          reason_block: 'Vi phạm quy định',
        },
        {
          event_id: 3,
          name: 'HÀNH TRÌNH XUYÊN VIỆT CHẶNG 13 - BẮC GIANG ',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/cad906c5a3d5c8d0ef85aa523.jpg?w=720',
          total_members: 240,
          total_clubs: 30,
          outstanding: true,
          status: 0,
          reason_block: '',
        },
        {
          event_id: 4,
          name: 'AZTEC LOST CHẶNG 1 - CHINH PHỤC THẦN MƯA TLALOC (THE GOD OF RAIN) ',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1bf678a8a67029fa1e6697c62.jpg?w=720',
          total_members: 320,
          total_clubs: 101,
          outstanding: true,
          status: 0,
          reason_block: '',
        },
        {
          event_id: 5,
          name: 'RACE AROUND THE WORLD - IRAN: BÍ ẨN XỨ BA TƯ ',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/3661e301e10ee6febd38e793a.png?w=720',
          total_members: 130,
          total_clubs: 12,
          outstanding: false,
          status: 1,
          reason_block: 'Sai quy định',
        },
      ],
    }
    setTotalRecords(data.total_events)
    setPerPage(data.per_page)
    setCurrentPage(data.current_page)
    setEvents(data.events)
  }, [])
  const itemTemplate = (item) => {
    return (
      <div id='dataview-container'>
        <div id='image-container-dataview'>
          <Link
            id='link-dataview'
            href={`/events/event-management/${item.event_id}`}
          >
            <img src={item.image} alt={item.name} />
          </Link>
          <OutstandingEdit
            items={items(item.event_id)}
            isOutstanding={item.outstanding}
            id={item.event_id}
            title={'sự kiện'}
          />
        </div>
        <Link
          id='link-dataview'
          href={`/events/event-management/${item.event_id}`}
        >
          <div id='info-dataview'>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.total_members} Thành viên
            </h4>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.total_clubs} Câu lạc bộ
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
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  const items = (event_id) => [
    {
      label: 'Add',
      icon: 'pi pi-plus',
      command: () => handleClick('/events/event-new'),
      title: 'Thêm sự kiện',
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: () => {
        handleClick('/events/event-new')
      },
      title: 'Cập nhật sự kiện',
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {},
      title: 'Xóa sự kiện',
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
          <Link href={`events/detail-event/${rowData.event_id}`}>
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
  const formatNumberClub = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatNumber(rowData.total_clubs.toFixed(2))
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
  const blockEvent = (rowData) => {
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
  const eventColumns = [
    {
      field: 'event_id',
      header: 'ID',
      bodyClassName: 'text-center',
    },
    {
      header: 'Thông tin sự kiện',
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
      header: 'Câu lạc bộ',
      body: formatNumberClub,
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
      header: 'Chặn sự kiện',
      bodyClassName: 'text-center',
      body: blockEvent,
    },
  ]
  return (
    <div id='initial-user-container'>
      {/* <DataViewDashboard
        data={events}
        href='/clubs/club-management/'
        itemTemplate={itemTemplate}
      /> */}
      <DataTable
        data={events}
        rows={4}
        loading={loading}
        columns={eventColumns}
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

export default EventManagement
