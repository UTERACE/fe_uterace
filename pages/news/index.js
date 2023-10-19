import React, { useState } from 'react'
import { Paginator } from 'primereact/paginator'
import DataView from '@/components/dataview/DataView'
import Title from '@/components/landing/Title'
import Link from 'next/link'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const NewsPage = () => {
  const [news, setNews] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(5)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const { t } = useTranslation('news')
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
        image: 'https://mobirace.net/Upload/Images/HuongDan/dang_ky_strava.png',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
      {
        news_id: 2,
        name: 'Hướng dẫn ghi nhận thành tích chạy trong nhà, trên máy',
        description:
          'Hướng dẫn chạy ở chế độ indoor trong nhà/trên máy chạy bộ',
        image: 'https://mobirace.net/Upload/Images/HuongDan/run_indoor.jpg',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
      {
        news_id: 3,
        name: 'Hướng dẫn tham gia giải chạy tại UTE Marathon 2021',
        description: 'Hướng dẫn tham gia giải chạy tại UTE Marathon 2021',
        image: 'https://mobirace.net/Upload/Images/HuongDan/dangkygiai.png',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
      {
        news_id: 4,
        name: 'Hướng dẫn kết nối ứng dụng Strava với Mobirace',
        description:
          'Hướng dẫn kết nối ứng dụng Strava với Mobirace để đồng bộ dữ liệu chạy bộ từ Strava về Mobirace',
        image: 'https://mobirace.net/Upload/Images/HuongDan/ketnoi_strava.png',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
      {
        news_id: 5,
        name: 'Hướng dẫn đăng ký và cài đặt ứng dụng Strava',
        description:
          'Hướng dẫn chi tiết cách đăng ký tài khoản và cài đặt ứng dụng Strava trên điện thoại',
        image: 'https://picsum.photos/200/300',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
      {
        news_id: 6,
        name: 'Các bước tham gia giải chạy bộ tại Mobirace',
        description:
          'Hướng dẫn chi tiết các bước tham gia giải chạy bộ tại Mobirace',
        image: 'https://picsum.photos/200/300',
        createAt: '2023-08-01T00:00:00Z',
        updateAt: '2023-09-01T00:00:00Z',
      },
    ],
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
              {LocaleHelper.formatDateTime(new Date(item.createAt))}
            </h4>
            <h4>
              {t('updated-at')}:{' '}
              {LocaleHelper.formatDateTime(new Date(item.updateAt))}
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
                  {t('share')} <i className='pi pi-share-alt' aria-hidden='true'></i>
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
      <Title title={t('news')}/>
      <DataView
        data={data.news}
        href='/news/news-detail/'
        itemTemplate={itemTemplate}
      />
      <Paginator
        first={first}
        rows={data.per_page}
        totalRecords={data.total_news}
        rowsPerPageOptions={[5, 10, 15]}
        onPageChange={onPageChange}
        page={data.current_page}
      />
    </div>
  )
}

export default NewsPage
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['news','topbar'])),
    },
  }
}
