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

const NewsManagement = () => {
  const [news, setNews] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const [loading, setLoading] = useState(false)
  const [visibleReason, setVisibleReason] = useState(false)
  const [visibleBlock, setVisibleBlock] = useState(false)

  useEffect(() => {
    const data = {
      per_page: 5,
      current_page: 1,
      total_page: 5,
      total_news: 22,
      news: [
        {
          news_id: 1,
          name: 'Hướng dẫn đăng ký và cài đặt ứng dụng Strava',
          description:
            'Hướng dẫn chi tiết cách đăng ký tài khoản và cài đặt ứng dụng Strava trên điện thoại',
          image:
            'https://mobirace.net/Upload/Images/HuongDan/dang_ky_strava.png',
          createAt: '2023-08-01T00:00:00Z',
          updateAt: '2023-09-01T00:00:00Z',
          outstanding: true,
          status: 1,
          reason_block: '',
        },
        {
          news_id: 2,
          name: 'Hướng dẫn ghi nhận thành tích chạy trong nhà, trên máy',
          description:
            'Hướng dẫn chạy ở chế độ indoor trong nhà/trên máy chạy bộ',
          image: 'https://mobirace.net/Upload/Images/HuongDan/run_indoor.jpg',
          createAt: '2023-08-01T00:00:00Z',
          updateAt: '2023-09-01T00:00:00Z',
          outstanding: true,
          status: 0,
          reason_block: 'Không đạt yêu cầu',
        },
        {
          news_id: 3,
          name: 'Hướng dẫn tham gia giải chạy tại UTE Marathon 2021',
          description: 'Hướng dẫn tham gia giải chạy tại UTE Marathon 2021',
          image: 'https://mobirace.net/Upload/Images/HuongDan/dangkygiai.png',
          createAt: '2023-08-01T00:00:00Z',
          updateAt: '2023-09-01T00:00:00Z',
          outstanding: false,
          status: 1,
          reason_block: 'Vi phạm quy định',
        },
        {
          news_id: 4,
          name: 'Hướng dẫn kết nối ứng dụng Strava với Mobirace',
          description:
            'Hướng dẫn kết nối ứng dụng Strava với Mobirace để đồng bộ dữ liệu chạy bộ từ Strava về Mobirace',
          image:
            'https://mobirace.net/Upload/Images/HuongDan/ketnoi_strava.png',
          createAt: '2023-08-01T00:00:00Z',
          updateAt: '2023-09-01T00:00:00Z',
          outstanding: true,
          status: 0,
          reason_block: '',
        },
        {
          news_id: 5,
          name: 'Hướng dẫn đăng ký và cài đặt ứng dụng Strava',
          description:
            'Hướng dẫn chi tiết cách đăng ký tài khoản và cài đặt ứng dụng Strava trên điện thoại',
          image: 'https://picsum.photos/200/300',
          createAt: '2023-08-01T00:00:00Z',
          updateAt: '2023-09-01T00:00:00Z',
          outstanding: true,
          status: 0,
          reason_block: '',
        },
        {
          news_id: 6,
          name: 'Các bước tham gia giải chạy bộ tại Mobirace',
          description:
            'Hướng dẫn chi tiết các bước tham gia giải chạy bộ tại Mobirace',
          image: 'https://picsum.photos/200/300',
          createAt: '2023-08-01T00:00:00Z',
          updateAt: '2023-09-01T00:00:00Z',
          outstanding: false,
          status: 1,
          reason_block: 'Sai quy định',
        },
      ],
    }
    setNews(data.news)
    setCurrentPage(data.current_page)
    setPerPage(data.per_page)
    setTotalRecords(data.total_news)
  }, [])
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }
  const itemTemplate = (item) => {
    return (
      <Link id='link-dataview' href={`/news/news-detail/${item.news_id}`}>
        <div id='dataview-container'>
          <div id='image-container-dataview'>
            <img src={item.image} alt={item.name} />
            <OutstandingEdit
              items={items(item.club_id)}
              isOutstanding={item.outstanding}
              id={item.club_id}
              title='câu lạc bộ'
            />
          </div>
          <div id='info-dataview'>
            <h4>
              Ngày tạo: {LocaleHelper.formatDateTime(new Date(item.createAt))}
            </h4>
            <h4>
              Cập nhật: {LocaleHelper.formatDateTime(new Date(item.updateAt))}
            </h4>
          </div>
          <div id='name-dataview'>
            <i class='fa fa-newspaper icon-run' aria-hidden='true'></i>
            <div id='share-register-container'>
              <h4>{item.name}</h4>
              <h6>{item.description}</h6>
            </div>
          </div>
        </div>
      </Link>
    )
  }
  const handleClickEdit = (news_id) => {
    if (news_id == 1) {
      setDataClub(dataDetail)
    } else {
      setDataClub({})
    }
    setVisibleChange(true)
  }
  const items = (news_id) => [
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
        handleClickEdit(news_id)
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
          <Link href={`events/detail-event/${rowData.event_id}`}>
            <span>{rowData.name}</span>
          </Link>
        </div>
      </div>
    )
  }
  const formatCreateAt = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatDateTime(new Date(rowData.createAt))
    }
    return ''
  }
  const formatUpdateAt = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatDateTime(new Date(rowData.updateAt))
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
  const newsColumns = [
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
      body: formatCreateAt,
    },
    {
      field: 'total_clubs',
      header: 'Câu lạc bộ',
      body: formatUpdateAt,
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
        data={news}
        href='/clubs/club-management/'
        itemTemplate={itemTemplate}
      /> */}
      <DataTable data={news} rows={4} loading={loading} columns={newsColumns} />
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

export default NewsManagement
