import OutstandingEdit from '@/components/management/OutstandingEdit'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import apiInstance from '@/api/apiInstance'
import Title from '@/components/landing/Title'
import DataView from '@/components/dataview/DataView'
import { Paginator } from 'primereact/paginator'
import Link from 'next/link'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { Dialog } from 'primereact/dialog'
import NewNews from '../new-news'
import UpdateNews from '@/pages/clubs/club-management/UpdateNews'
import { Button } from 'primereact/button'

const ManagementNews = () => {
  const [news, setNews] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [updateNewsId, setUpdateNewsId] = useState(0)
  const [visibleAddNews, setVisibleAddNews] = useState(false)
  const [visibleUpdateNews, setVisibleUpdateNews] = useState(false)
  const [detailsNews, setDetailsNews] = useState({})
  const [updateStatus, setUpdateStatus] = useState(false)
  const [index, setIndex] = useState(1)

  const { t } = useTranslation('news')

  useEffect(() => {
    if (index == 1) {
      fetchMyNews()
    } else if (index == 2) {
      fetchAllNews()
    }
  }, [per_page, current_page, updateStatus, index])

  const fetchMyNews = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/news/user?current_page=${current_page}&per_page=${per_page}`
      )
      const data = res.data
      if (res.status === 200) {
        setNews(data.news)
        setTotalRecords(data.total_news)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      showToast('error', 'Lấy dữ liệu thất bại', error)
    }
  }

  const fetchAllNews = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/news?current_page=${current_page}&per_page=${per_page}`
      )
      const data = res.data
      if (res.status === 200) {
        setNews(data.news)
        setTotalRecords(data.total_news)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      showToast('error', 'Lấy dữ liệu thất bại', error)
    }
  }

  const itemTemplate = (item) => {
    return (
      <div id='dataview-container'>
        <div id='image-container-dataview'>
          <Link
            id='link-dataview-container'
            href={`/news/news-detail/${item.news_id}`}
          >
            <img src={item.image} alt={item.name} />
          </Link>
          <OutstandingEdit
            items={items(item.news_id)}
            isOutstanding={item.outstanding}
            id={item.news_id}
            title='câu lạc bộ'
          />
        </div>
        <div id='info-dataview'>
          <h4>
            {t('created-at')}:{' '}
            {LocaleHelper.formatDateTime(new Date(item.created_at))}
          </h4>
          <h4>
            {t('updated-at')}:{' '}
            {LocaleHelper.formatDateTime(new Date(item.updated_at))}
          </h4>
        </div>
        <div id='name-dataview'>
          <i class='fa fa-newspaper icon-run' aria-hidden='true'></i>
          <div id='share-register-container'>
            <h4>{item.name}</h4>
            <h6>{item.description}</h6>
            <div id='share-register-content'>
              <Link
                id='link-dataview'
                href={`/news/news-detail/${item.news_id}`}
              >
                {t('watch-now')}{' '}
                <i className='pi pi-arrow-right' aria-hidden='true'></i>
              </Link>
              <Link id='link-dataview' href='/share'>
                {t('share')}{' '}
                <i className='pi pi-share-alt' aria-hidden='true'></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  const items = (news_id) => [
    {
      label: 'Add',
      icon: 'pi pi-plus',
      command: () => {},
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: () => {
        handleClickEdit(news_id)
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        handleClickDelete(news_id)
      },
    },
    {
      label: 'React Website',
      icon: 'pi pi-external-link',
      command: () => {},
    },
  ]

  useEffect(() => {
    fetchDetailNews()
  }, [updateNewsId])

  const fetchDetailNews = async () => {
    try {
      const res = await apiInstance.get(`/news/${updateNewsId}`)
      const data = res.data
      if (res.status === 200) {
        setDetailsNews(data)
        setVisibleUpdateNews(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickEdit = (news_id) => {
    setUpdateNewsId(news_id)
  }

  const handleClickDelete = (news_id) => {
    if (index == 1) {
      deleteNews(news_id)
    } else if (index == 2) {
      hideNews(news_id)
    }
  }

  const deleteNews = async (news_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.delete(`/news/${news_id}`)
      if (res.status === 200) {
        showToast('success', 'Xóa bài viết thành công', res.data.message)
        setUpdateStatus(!updateStatus)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Xóa bài viết thất bại', err)
      setLoading(false)
    }
  }

  const hideNews = async (news_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.put(`/news/hide/${news_id}`)
      if (res.status === 200) {
        showToast('success', 'Ẩn bài viết thành công', res.data.message)
        setUpdateStatus(!updateStatus)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Ẩn bài viết thất bại', err)
      setLoading(false)
    }
  }

  return (
    <div className='centered-content-dataview'>
      <Dialog
        header={t('add-news')}
        visible={visibleAddNews}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleAddNews(false)}
      >
        <NewNews
          setLoading={setLoading}
          showToast={showToast}
          setVisibleAdd={setVisibleAddNews}
          setUpdate={setUpdateStatus}
        />
      </Dialog>
      <Dialog
        header={t('update-news')}
        visible={visibleUpdateNews}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleUpdateNews(false)}
      >
        <UpdateNews
          news_id={detailsNews.news_id}
          title={detailsNews.name}
          description={detailsNews.description}
          image={detailsNews.image}
          content={detailsNews.content}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleUpdateNews={setVisibleUpdateNews}
          setUpdate={setUpdateStatus}
        />
      </Dialog>
      <Title title={t('news')} />
      <div className='centered-content-layout'>
        <div
          style={{
            width: '50%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <Button
            id={index == 1 ? 'button-tab--active' : 'button-tab'}
            type='button'
            style={{ width: '100%' }}
            label={t('created-news')}
            icon='pi pi-list'
            iconPos='right'
            onClick={() => {
              setIndex(1)
            }}
          />
          <Button
            id={index == 2 ? 'button-tab--active' : 'button-tab'}
            type='button'
            style={{ width: '100%' }}
            label={t('all-news')}
            icon='pi pi-list'
            iconPos='right'
            onClick={() => {
              setIndex(2)
            }}
          />
        </div>
      </div>
      <DataView
        data={news}
        href='/news/news-detail/'
        itemTemplate={itemTemplate}
      />
      <Paginator
        first={first}
        rows={per_page}
        totalRecords={totalRecords}
        rowsPerPageOptions={[6, 9, 12]}
        onPageChange={onPageChange}
        page={current_page}
      />
    </div>
  )
}

export default ManagementNews

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['news', 'topbar'])),
    },
  }
}
