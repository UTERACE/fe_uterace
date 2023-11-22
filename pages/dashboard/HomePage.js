import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import DataTable from '@/components/datatable/DataTable'
import LocaleHelper from '@/components/locale/LocaleHelper'
import Link from 'next/link'
import { AutoComplete } from 'primereact/autocomplete'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useState } from 'react'

const HomePage = () => {
  const [userInit, setUserInit] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(10)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const showToast = useToast().showToast
  const setLoading = useContext(LoadingContext)
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState(false)

  useEffect(() => {
    fetchUserInitialize()
  }, [per_page, current_page, search])

  const fetchUserInitialize = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/manage-user/initialize?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res.status === 200) {
        setUserInit(res.data.user_initialize)
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

  const handleReInitialize = async (user_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-user/initialize/${user_id}`)
      if (res.status === 200) {
        showToast('success', 'Đồng bộ thành công', res.data.message)
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleReInitializeAll = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-user/initialize`)
      if (res.status === 200) {
        showToast('success', 'Đồng bộ thành công', res.data.message)
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
  const formatStatus = (rowData) => {
    if (rowData.status === '1') {
      return <span style={{ color: 'green' }}>Đã đồng bộ</span>
    } else if (rowData.status === '0') {
      return <span style={{ color: 'red' }}>Chưa đồng bộ</span>
    } else if (rowData.status === '-1') {
      return <span style={{ color: 'blue' }}>Đang đồng bộ</span>
    } else return <span style={{ color: 'red' }}>Lỗi</span>
  }
  const formatDateTime = (rowData) => {
    if (rowData.last_sync != null) {
      return LocaleHelper.formatDateTime(new Date(rowData.last_sync))
    }
    return 'Not available'
  }
  const handleInitUser = (rowData) => {
    return (
      <Button
        id='button-reinitialize'
        type='button'
        onClick={() => {
          fetchUserInitialize(rowData.user_id)
        }}
      >
        Đồng bộ
      </Button>
    )
  }
  const userInitColumns = [
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
      field: 'status',
      header: 'Trạng thái đồng bộ',
      bodyClassName: 'text-center',
      body: formatStatus,
    },
    {
      field: 'last_sync',
      header: 'Lần cuối đồng bộ',
      body: formatDateTime,
      bodyClassName: 'text-center',
    },
    {
      field: 'user_id',
      header: 'Đồng bộ',
      bodyClassName: 'text-center',
      body: handleInitUser,
    },
  ]
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  return (
    <div id='initial-user-container'>
      <DataTable data={userInit} rows={4} columns={userInitColumns} />
      <div id='button-reinitialize-container'>
        <Button label='Đồng bộ tất cả' id='button-reinitialize' />
      </div>
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

export default HomePage
