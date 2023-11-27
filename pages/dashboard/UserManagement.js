import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import DataTable from '@/components/datatable/DataTable'
import LocaleHelper from '@/components/locale/LocaleHelper'
import Image from 'next/image'
import Link from 'next/link'
import { AutoComplete } from 'primereact/autocomplete'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useState } from 'react'

const UserManagement = () => {
  const [user, setUser] = useState([])
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
  const [user_id, setUserId] = useState()
  const [reasonBlock, setReasonBlock] = useState('')
  const [search, setSearch] = useState(false)

  useEffect(() => {
    fetchUserManagement()
  }, [per_page, current_page, search])

  const fetchUserManagement = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/manage-user?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res.status === 200) {
        setUser(res.data.users)
        setCurrentPage(res.data.current_page)
        setPerPage(res.data.per_page)
        setTotalRecords(res.data.total_user)
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleBlockUser = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-user/lock/${user_id}`, {
        reason: reason,
      })
      if (res.status === 200) {
        setVisibleReason(false)
        setVisibleBlock(false)
        showToast('success', 'Successfully', res.data.message)
        setUserId(null)
        setReason('')
        fetchUserManagement()
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleUnlockUser = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-user/unlock/${user_id}`)
      if (res.status === 200) {
        showToast('success', 'Successfully', res.data.message)
        fetchUserManagement()
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const fullnameWithImageTemplate = (rowData) => {
    const avatarImage = rowData.image
    const avatarLabel = rowData.first_name
      ? rowData.first_name[0].toUpperCase()
      : 'B'
    return (
      <div id='member-info'>
        <Avatar
          label={!avatarImage ? avatarLabel : null}
          image={avatarImage}
          size='xlarge'
          shape='circle'
        />
        <Link href={`user/${rowData.id}`}>
          <span id='member-name'>
            {rowData.last_name + ' ' + rowData.first_name}
          </span>
        </Link>
      </div>
    )
  }
  const formatNumber = (rowData) => {
    if (rowData && rowData.totalDistance != null) {
      return LocaleHelper.formatNumber(rowData.totalDistance.toFixed(2))
    }
    return ''
  }
  const formatPace = (rowData) => {
    if (rowData && rowData.pace != null) {
      return LocaleHelper.formatNumber(rowData.pace.toFixed(2))
    }
    return ''
  }

  const formatStatus = (rowData) => {
    if (rowData.status === '0') {
      return (
        <div id='content-datatable-container'>
          <Image
            src='/lock.png'
            alt='lock'
            style={{ width: '1.5rem', height: '1.5rem' }}
            width={20}
            height={20}
          />{' '}
          <span style={{ color: 'red' }}>Đang bị khóa</span>
        </div>
      )
    } else if (rowData.status === '1') {
      return (
        <div id='content-datatable-container'>
          <Image
            src='/verified.png'
            alt='verified'
            style={{ width: '1.5rem', height: '1.5rem' }}
            width={20}
            height={20}
          />
          <span style={{ color: 'green' }}>Đang hoạt động</span>
        </div>
      )
    }
  }
  const blockUser = (rowData) => {
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
              handleUnlockUser()
            }}
          >
            Mở khóa
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
              setUserId(rowData.user_id)
            }}
          >
            Khóa
          </Button>
        </div>
      )
    }
  }
  const memberColumns = [
    {
      field: 'user_id',
      header: 'ID',
      bodyClassName: 'text-center',
    },
    {
      header: 'Thành viên',
      body: fullnameWithImageTemplate,
    },
    {
      field: 'totalDistance',
      header: 'Tổng quảng đường (km)',
      bodyClassName: 'text-center',
      body: formatNumber,
    },
    {
      field: 'pace',
      header: 'Pace (phút/km)',
      body: formatPace,
      bodyClassName: 'text-center',
    },
    {
      field: 'organization',
      header: 'Cơ quan, tổ chức',
      bodyClassName: 'text-center',
    },
    {
      field: 'gender',
      header: 'Giới tính',
      bodyClassName: 'text-center',
    },
    {
      field: 'status',
      header: 'Trạng thái',
      bodyClassName: 'text-center',
      body: formatStatus,
    },
    {
      field: 'status',
      header: 'Khóa tài khoản',
      bodyClassName: 'text-center',
      body: blockUser,
    },
  ]

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  return (
    <div id='initial-user-container'>
      <Dialog
        header='Lý do khóa tài khoản'
        visible={visibleReason}
        position='top'
        style={{ width: '30%', height: 'auto', borderRadius: '20px' }}
        onHide={() => {
          setUserId(null)
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
                  handleBlockUser(user_id)
                }}
              >
                Khóa tài khoản
              </Button>
            </div>
          ) : (
            <h4> {reasonBlock}</h4>
          )}
        </div>
      </Dialog>
      <DataTable data={user} rows={4} columns={memberColumns} />
      <div>
        <AutoComplete
          value={search_name}
          onChange={(e) => setSearchName(e.target.value)}
          completeMethod={(e) => setSearch(!search)}
          placeholder={'Tìm kiếm thành viên'}
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

export default UserManagement
