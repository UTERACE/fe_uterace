import DataTable from '@/components/datatable/DataTable'
import Link from 'next/link'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useEffect, useState } from 'react'

const HomePage = () => {
  const [loading, setLoading] = useState(false)
  const [userInit, setUserInit] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  useEffect(() => {
    setLoading(true)
    const data = {
      per_page: 10,
      total_user: 25,
      current_page: 1,
      total_page: 3,
      users: [
        {
          user_id: 119,
          first_name: 'Can',
          last_name: 'Lê',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/cad906c5a3d5c8d0ef85aa523.jpg?w=1800',
          last_sync: '2021-06-01 10:00:00',
          status: 1,
        },
        {
          user_id: 2,
          first_name: 'Nguyễn',
          last_name: 'Sinh Hùng',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f9f.png?w=1800',
          last_sync: '2021-06-01 10:00:00',
          status: 0,
        },
        {
          user_id: 1,
          first_name: 'Nguyễn',
          last_name: 'Văn A',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f56.png?w=1800',
          last_sync: '2021-06-01 10:00:00',
          status: 0,
        },
        {
          user_id: 3,
          first_name: 'Nguyễn',
          last_name: 'Văn B',
          image: '',
          last_sync: '2021-06-01 10:00:00',
          status: 1,
        },
        {
          user_id: 4,
          first_name: 'Trần',
          last_name: 'Thiện',
          image: '',
          last_sync: '2021-06-01 10:00:00',
          status: -1,
        },
        {
          user_id: 5,
          first_name: 'Nguyễn',
          last_name: 'Văn C',
          image: '',
          last_sync: '2021-06-01 10:00:00',
          status: 0,
        },
        {
          user_id: 6,
          first_name: 'Nguyễn',
          last_name: 'Văn D',
          image: '',
          last_sync: '2021-06-01 10:00:00',
          status: 0,
        },
        {
          user_id: 21,
          first_name: 'Nguyễn',
          last_name: 'Văn E',
          image: '',
          last_sync: '2021-06-01 10:00:00',
          status: 1,
        },
      ],
    }
    setUserInit(data.users)
    setPerPage(data.per_page)
    setTotalRecords(data.total_user)
    setCurrentPage(data.current_page)

    setLoading(false)
  }, [])
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
    if (rowData.status === 1) {
      return <span style={{ color: 'green' }}>Đã đồng bộ</span>
    } else if (rowData.status === 0) {
      return <span style={{ color: 'red' }}>Chưa đồng bộ</span>
    } else {
      return <span style={{ color: 'blue' }}>Đang đồng bộ</span>
    }
  }
  const formatDateTime = (rowData) => {
    return rowData.last_sync
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
      <DataTable
        data={userInit}
        rows={4}
        loading={loading}
        columns={userInitColumns}
      />
      <div id='button-reinitialize-container'>
        <Button label='Đồng bộ tất cả' id='button-reinitialize' />
      </div>

      <Paginator
        first={first}
        rows={per_page}
        totalRecords={totalRecords}
        rowsPerPageOptions={[10, 25, 50]}
        onPageChange={onPageChange}
        page={current_page}
      />
    </div>
  )
}

export default HomePage
