import React, { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import DataView from '@/components/dataview/DataView'
import Title from '@/components/landing/Title'
import Link from 'next/link'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import apiInstance from '@/api/apiInstance'

const NewsPage = () => {
  const [news, setNews] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const { t } = useTranslation('news')

  useEffect(() => {
    fetchNews()
  }, [])

  const fetchNews = async () => {
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
      }
    } catch (error) {
      console.log(error)
    }
  }

  const itemTemplate = (item) => {
    return (
      <Link
        id='link-dataview-container'
        href={`/news/news-detail/${item.news_id}`}
      >
        <div id='dataview-container'>
          <div id='image-container-dataview'>
            <img src={item.image} alt={item.name} />
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
      </Link>
    )
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  return (
    <div className='centered-content-dataview'>
      <Title title={t('news')} />
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

export default NewsPage

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['news', 'topbar'])),
    },
  }
}
