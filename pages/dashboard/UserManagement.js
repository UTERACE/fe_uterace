import DataTable from '@/components/datatable/DataTable'
import LocaleHelper from '@/components/locale/LocaleHelper'
import Link from 'next/link'
import { Avatar } from 'primereact/avatar'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { Paginator } from 'primereact/paginator'
import React, { useEffect, useState } from 'react'

const UserManagement = () => {
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [visibleReason, setVisibleReason] = useState(false)
  const [visibleBlock, setVisibleBlock] = useState(false)

  const [reason, setReason] = useState('')

  useEffect(() => {
    setLoading(true)
    const data = {
      per_page: 10,
      total_user: 25,
      current_page: 1,
      total_page: 3,
      ranking_user: [
        {
          user_id: 119,
          first_name: 'Can',
          last_name: 'Lê',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/cad906c5a3d5c8d0ef85aa523.jpg?w=1800',
          total_distance: 15.02,
          pace: 10.082677841186523,
          organization: 'Tổng công ty Viễn thông MobiFone',
          gender: 'Nam',
          status: 1,
          reason_block: '',
        },
        {
          user_id: 2,
          first_name: 'Nguyễn',
          last_name: 'Sinh Hùng',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f9f.png?w=1800',
          total_distance: 2.42,
          organization: 'Công ty DV MobiFone KV2',
          pace: 6.15,
          gender: 'Nam',
          status: 0,
          reason_block: 'Không đạt yêu cầu',
        },
        {
          user_id: 1,
          first_name: 'Nguyễn',
          last_name: 'Văn A',
          image:
            'https://vietrace365.vn/uploads/f_5ce61e1be601fa1e66398287/1980f3931a315b785bf629f56.png?w=1800',
          total_distance: 0.0,
          organization: 'Công ty DV MobiFone KV2',
          pace: 0.0,
          gender: 'Nam',
          status: 1,
          reason_block: '',
        },
        {
          user_id: 3,
          first_name: 'Nguyễn',
          last_name: 'Văn B',
          image: '',
          total_distance: 0.0,
          organization: 'Công ty DV MobiFone KV2',
          pace: 0.0,
          gender: 'Nam',
          status: 1,
          reason_block: '',
        },
        {
          user_id: 4,
          first_name: 'Trần',
          last_name: 'Thiện',
          image: '',
          total_distance: 0.0,
          organization: 'Công ty DV MobiFone KV2',
          pace: 0.0,
          gender: 'Nam',
          status: 0,
          reason_block: 'Không đạt yêu cầu',
        },
        {
          user_id: 5,
          first_name: 'Nguyễn',
          last_name: 'Văn C',
          image: '',
          total_distance: 0.0,
          organization: 'Công ty DV MobiFone KV2',
          pace: 0.0,
          gender: 'Nam',
          status: 1,
          reason_block: '',
        },
        {
          user_id: 6,
          first_name: 'Nguyễn',
          last_name: 'Văn D',
          image: '',
          total_distance: 0.0,
          organization: 'Công ty DV MobiFone KV2',
          pace: 0.0,
          gender: 'Nam',
          status: 0,
          reason_block: 'Không đạt yêu cầu',
        },
        {
          user_id: 21,
          first_name: 'Nguyễn',
          last_name: 'Văn E',
          image: '',
          total_distance: 0.0,
          organization: 'Công ty DV MobiFone KV2',
          pace: 0.0,
          gender: 'Nam',
          status: 1,
          reason_block: '',
        },
      ],
    }
    setUser(data.ranking_user)
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
  const formatNumber = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatNumber(rowData.total_distance.toFixed(2))
    }
    return ''
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
          <span style={{ color: 'red' }}>Đang bị khóa</span>
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
  const blockUser = (rowData) => {
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
            header='Lý do khóa tài khoản'
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
                    Khóa tài khoản
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
            Mở khóa
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
      field: 'total_distance',
      header: 'Tổng quảng đường (km)',
      bodyClassName: 'text-center',
      body: formatNumber,
    },
    {
      field: 'pace',
      header: 'Pace (phút/km)',
      body: formatNumber,
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
      <DataTable
        data={user}
        rows={4}
        loading={loading}
        columns={memberColumns}
      />
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

export default UserManagement
