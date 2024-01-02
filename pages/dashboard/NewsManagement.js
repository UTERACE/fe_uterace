import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import DataTable from '@/components/datatable/DataTable'
import LocaleHelper from '@/components/locale/LocaleHelper'
import OutstandingEdit from '@/components/management/OutstandingEdit'
import Image from 'next/image'
import Link from 'next/link'
import { AutoComplete } from 'primereact/autocomplete'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputTextarea } from 'primereact/inputtextarea'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useState } from 'react'

const NewsManagement = () => {
  const [news, setNews] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const [visibleReason, setVisibleReason] = useState(false)
  const [visibleBlock, setVisibleBlock] = useState(false)
  const [reason, setReason] = useState('')
  const showToast = useToast().showToast
  const setLoading = useContext(LoadingContext)
  const [search_name, setSearchName] = useState('')
  const [news_id, setNewsId] = useState()
  const [reasonBlock, setReasonBlock] = useState('')
  const [search, setSearch] = useState(false)

  useEffect(() => {
    fetchNewsManagement()
  }, [per_page, current_page, search])
  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  const fetchNewsManagement = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/manage-news?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res.status === 200) {
        setNews(res.data.news)
        setCurrentPage(res.data.current_page)
        setPerPage(res.data.per_page)
        setTotalRecords(res.data.total_news)
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleBlockNews = async (news_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-news/lock/${news_id}`, {
        reason: reason,
      })
      if (res.status === 200) {
        setVisibleReason(false)
        setVisibleBlock(false)
        showToast('success', 'Successfully', res.data.message)
        setNewsId(null)
        setReason('')
        fetchNewsManagement()
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleUnlockNews = async (news_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-news/unlock/${news_id}`)
      if (res.status === 200) {
        showToast('success', 'Successfully', res.data.message)
        fetchNewsManagement()
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleOutstandingNews = async (news_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/manage-news/outstanding/${news_id}`)
      if (res.status === 200) {
        showToast('success', 'Successfully', res.data.message)
        fetchNewsManagement()
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleNotOutstandingNews = async (news_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(
        `/manage-news/not-outstanding/${news_id}`
      )
      if (res.status === 200) {
        showToast('success', 'Successfully', res.data.message)
        fetchNewsManagement()
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  const handleClickEdit = (news_id) => {
    if (news_id == 1) {
      setDataClub(dataDetail)
    } else {
      setDataClub({})
    }
    setVisibleChange(true)
  }

  const fullnameWithImageTemplate = (rowData) => {
    const avatarImage = rowData.image
    return (
      <div id='info-detail-container'>
        <div id='info-image-container'>
          <Image src={avatarImage} alt={rowData.name} width={100} height={100} />
        </div>
        <div id='info-name-container'>
          <Link href={`events/detail-event/${rowData.news_id}`}>
            <span>{rowData.name}</span>
          </Link>
        </div>
      </div>
    )
  }
  const formatCreateAt = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatDateTime(new Date(rowData.createdAt))
    }
    return ''
  }
  const formatUpdateAt = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatDateTime(new Date(rowData.updatedAt))
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
              handleNotOutstandingNews(rowData.news_id)
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
              handleOutstandingNews(rowData.news_id)
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
              handleUnlockNews(rowData.news_id)
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
              setNewsId(rowData.news_id)
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
          <Image
            src='/lock.png'
            alt='lock'
            style={{ width: '1.5rem', height: '1.5rem' }}
            width={20}
            height={20}
          />{' '}
          <span style={{ color: 'red' }}>Đang bị chặn</span>
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
  const newsColumns = [
    {
      field: 'news_id',
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
      <Dialog
        header='Lý do chặn tin tức'
        visible={visibleReason}
        position='top'
        style={{ width: '30%', height: 'auto', borderRadius: '20px' }}
        onHide={() => {
          setVisibleReason(false)
          setNewsId(null)
          setReason('')
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
                  handleBlockNews(news_id)
                }}
              >
                Chặn tin tức
              </Button>
            </div>
          ) : (
            <h4> {reasonBlock}</h4>
          )}
        </div>
      </Dialog>
      <DataTable data={news} rows={4} columns={newsColumns} />
      <div>
        <AutoComplete
          value={search_name}
          onChange={(e) => setSearchName(e.target.value)}
          completeMethod={(e) => setSearch(!search)}
          placeholder={'Tìm kiếm tin tức'}
        />
      </div>
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
