import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import DataTable from '@/components/datatable/DataTable'
import LocaleHelper from '@/components/locale/LocaleHelper'
import Link from 'next/link'
import { AutoComplete } from 'primereact/autocomplete'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useState } from 'react'

const ClubManagement = () => {
  const [clubs, setClubs] = useState([])
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
  const [club_id, setClubId] = useState()
  const [reasonBlock, setReasonBlock] = useState('')
  const [search, setSearch] = useState(false)

  useEffect(() => {
    fetchClubManagement()
  }, [per_page, current_page, search])

  const fetchClubManagement = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/manage-club?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res.status === 200) {
        setClubs(res.data.clubs)
        setCurrentPage(res.data.current_page)
        setPerPage(res.data.per_page)
        setTotalRecords(res.data.total_clubs)
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
    }
  }

  const handleBlockClub = async (club_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-club/lock/${club_id}`, {
        reason: reason,
      })
      if (res.status === 200) {
        setVisibleReason(false)
        setVisibleBlock(false)
        showToast('success', 'Successfully', res.data.message)
        setClubId(null)
        setReason('')
        fetchClubManagement()
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleUnlockClub = async (club_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-club/unlock/${club_id}`)
      if (res.status === 200) {
        showToast('success', 'Successfully', res.data.message)
        fetchClubManagement()
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleOutstandingClub = async (club_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-club/outstanding/${club_id}`)
      if (res.status === 200) {
        showToast('success', 'Successfully', res.data.message)
        fetchClubManagement()
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleNotOutstandingClub = async (club_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(
        `/manage-club/not-outstanding/${club_id}`
      )
      if (res.status === 200) {
        showToast('success', 'Successfully', res.data.message)
        fetchClubManagement()
        setLoading(false)
      }
    } catch (e) {
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
              handleNotOutstandingClub(rowData.club_id)
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
              handleOutstandingClub(rowData.club_id)
            }}
          >
            Chọn nổi bật
          </Button>
        </div>
      )
    }
  }

  const blockClub = (rowData) => {
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
              handleUnlockClub(rowData.club_id)
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
              setClubId(rowData.club_id)
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
      <Dialog
        header='Lý do chặn sự kiện'
        visible={visibleReason}
        position='top'
        style={{ width: '30%', height: 'auto', borderRadius: '20px' }}
        onHide={() => {
          setClubId(null)
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
                  handleBlockClub(club_id)
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
      <DataTable data={clubs} rows={4} columns={clubColumns} />
      <div>
        <AutoComplete
          value={search_name}
          onChange={(e) => setSearchName(e.target.value)}
          completeMethod={(e) => setSearch(!search)}
          placeholder={'Tìm kiếm câu lạc bộ'}
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

export default ClubManagement
