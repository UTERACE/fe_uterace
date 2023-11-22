import DataTable from '@/components/datatable/DataTable'
import LocaleHelper from '@/components/locale/LocaleHelper'
import OutstandingEdit from '@/components/management/OutstandingEdit'
import Link from 'next/link'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useState } from 'react'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import apiInstance from '@/api/apiInstance'
import { AutoComplete } from 'primereact/autocomplete'

const EventManagement = () => {
  const [events, setEvents] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(10)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const [visibleReason, setVisibleReason] = useState(false)
  const [visibleBlock, setVisibleBlock] = useState(false)
  const [reason, setReason] = useState('')
  const showToast = useToast().showToast
  const setLoading = useContext(LoadingContext)
  const [search_name, setSearchName] = useState('')
  const [event_id, setEventId] = useState()
  const [reasonBlock, setReasonBlock] = useState('')
  const [search, setSearch] = useState(false)

  useEffect(() => {
    fetchEventManagement()
  }, [per_page, current_page, search])

  const fetchEventManagement = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/manage-event?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res.status === 200) {
        setEvents(res.data.events)
        setCurrentPage(res.data.current_page)
        setPerPage(res.data.per_page)
        setTotalRecords(res.data.total_events)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleBlockEvent = async (event_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-event/lock/${event_id}`, {
        reason: reason,
      })
      if (res.status === 200) {
        setVisibleReason(false)
        setVisibleBlock(false)
        showToast('success', 'Successfully', res.data.message)
        fetchEventManagement()
      }
    } catch (err) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleUnlockEvent = async (event_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-event/unlock/${event_id}`)
      if (res.status === 200) {
        showToast('success', 'Successfully', res.data.message)
        fetchEventManagement()
      }
    } catch (err) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleOutstandingEvent = async (event_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(
        `/manage-event/outstanding/${event_id}`
      )
      if (res.status === 200) {
        showToast('success', 'Successfully', res.data.message)
        fetchEventManagement()
      }
    } catch (err) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleNotOutstandingEvent = async (event_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(
        `/manage-event/not-outstanding/${event_id}`
      )
      if (res.status === 200) {
        showToast('success', 'Successfully', res.data.message)
        fetchEventManagement()
      }
    } catch (err) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

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
      return LocaleHelper.formatNumber(rowData.total_activities.toFixed(2))
    }
    return ''
  }

  const formatOutstanding = (rowData) => {
    if (rowData.outstanding === '1') {
      return (
        <div id='content-datatable-container'>
          <i className='pi pi-check-circle' style={{ color: 'green' }} />
          <span style={{ color: 'green' }}>Đang nổi bật</span>
        </div>
      )
    } else if (rowData.outstanding === '0') {
      return (
        <div id='content-datatable-container'>
          <i className='pi pi-times-circle' style={{ color: 'black' }} />
          <span style={{ color: 'black' }}>Mặc định</span>
        </div>
      )
    }
  }
  const formatUpdate = (rowData) => {
    if (rowData.outstanding === '1') {
      return (
        <div id='content-datatable-container'>
          <Button
            id='button-reinitialize'
            type='button'
            onClick={() => {
              handleNotOutstandingEvent(rowData.event_id)
            }}
          >
            Hủy nổi bật
          </Button>
        </div>
      )
    } else if (rowData.outstanding === '0') {
      return (
        <div id='content-datatable-container'>
          <Button
            id='button-reinitialize'
            type='button'
            onClick={() => {
              handleOutstandingEvent(rowData.event_id)
            }}
          >
            Chọn nổi bật
          </Button>
        </div>
      )
    }
  }
  const blockEvent = (rowData) => {
    if (rowData.status === '0') {
      return (
        <div id='content-datatable-container'>
          <i
            className='pi pi-exclamation-circle'
            style={{ color: 'red' }}
            title={rowData.reason_block}
            onClick={() => {
              setVisibleReason(true)
              setReasonBlock(rowData.reason_block)
            }}
          />
          <Button
            id='button-reinitialize'
            type='button'
            onClick={() => {
              handleUnlockEvent(rowData.event_id)
            }}
          >
            Mở chặn
          </Button>
        </div>
      )
    } else if (rowData.status === '1') {
      return (
        <div id='content-datatable-container'>
          <Button
            id='button-reinitialize'
            type='button'
            onClick={() => {
              setVisibleBlock(true)
              setVisibleReason(true)
              setEventId(rowData.event_id)
            }}
          >
            Chặn
          </Button>
        </div>
      )
    }
  }
  const formatStatus = (rowData) => {
    if (rowData.status === '0') {
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
    } else if (rowData.status === '1') {
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
      field: 'total_activities',
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
      <Dialog
        header='Lý do chặn sự kiện'
        visible={visibleReason}
        position='top'
        style={{ width: '30%', height: 'auto', borderRadius: '20px' }}
        onHide={() => {
          setEventId(null)
          setReason('')
          setVisibleReason(false)
        }}
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
                  handleBlockEvent(event_id)
                  setEventId(null)
                  setReason('')
                }}
              >
                Chặn sự kiện
              </Button>
            </div>
          ) : (
            <h4> {reasonBlock}</h4>
          )}
        </div>
      </Dialog>
      <DataTable data={events} rows={4} columns={eventColumns} />
      <div>
        <AutoComplete
          value={search_name}
          onChange={(e) => setSearchName(e.target.value)}
          completeMethod={(e) => setSearch(!search)}
          placeholder={'Tìm kiếm sự kiện'}
        />
      </div>
      <Paginator
        first={first}
        rows={per_page}
        totalRecords={totalRecords}
        rowsPerPageOptions={[10, 15, 20]}
        onPageChange={onPageChange}
        page={current_page}
      />
    </div>
  )
}

export default EventManagement
