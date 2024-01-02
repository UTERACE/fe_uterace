import React, { useContext, useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import { AutoComplete } from 'primereact/autocomplete'
import DataView from '@/components/dataview/DataView'
import Title from '@/components/landing/Title'
import Link from 'next/link'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import Image from 'next/image'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

const NewsPage = () => {
  const [news, setNews] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState(false)

  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  const { t } = useTranslation('news')

  useEffect(() => {
    fetchNews()
  }, [per_page, current_page, search])

  const fetchNews = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/news?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
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

  const [visible, setVisible] = useState(false)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('T')
  const [image, setImage] = useState('')
  const [caption, setCaption] = useState('')

  const onClickShare = () => {
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?caption=${encodeURIComponent(
      caption
    )}&description=${encodeURIComponent(caption)}&u=${encodeURIComponent(
      url
    )}&picture=${encodeURIComponent(image)}`

    window.open(fbShareUrl, 'facebook-share-dialog', 'width=1080,height=720')
  }

  const itemTemplate = (item) => {
    return (
      <Link
        id='link-dataview-container'
        href={`/news/news-detail/${item.news_id}`}
      >
        <div id='dataview-container'>
          <div id='image-container-dataview'>
            <Image src={item.image} alt={item.name} width={800} height={500} />
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
          <div id='info-title-dataview' title={item.name}>
            <h4>{item.name}</h4>
          </div>
          <div id='name-dataview'>
            <i class='fa fa-newspaper icon-run' aria-hidden='true'></i>
            <div id='share-register-container'>
              <h6>{item.description}</h6>
              <div id='share-register-content'>
                <Link
                  id='link-dataview'
                  href={`/news/news-detail/${item.news_id}`}
                >
                  {t('watch-now')}{' '}
                  <i className='pi pi-arrow-right' aria-hidden='true'></i>
                </Link>
                <a
                  onClick={(e) => {
                    e.preventDefault()
                    setUrl(
                      `https://fe-uterace.vercel.app/news/news-detail/${item.news_id}`
                    )
                    setCaption(item.name)
                    setTitle(item.name)
                    setImage(item.image)
                    setVisible(true)
                  }}
                >
                  {t('share')}{' '}
                  <i className='pi pi-share-alt' aria-hidden='true'></i>
                </a>
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
      <Dialog visible={visible} onHide={() => setVisible(false)}>
        <div id='share-facebook-container'>
          <Button
            label='Copy link chia sẻ'
            icon='pi pi-copy'
            id='button-detail'
            onClick={() => {
              navigator.clipboard.writeText(url)
              setVisible(false)
            }}
          />
          <Button
            label='Chia sẻ lên Facebook'
            icon='pi pi-facebook'
            style={{
              backgroundColor: '#3b5998',
              color: 'white',
              height: '3rem',
              borderRadius: '3rem',
            }}
            onClick={() => {
              onClickShare()
              setVisible(false)
            }}
          />
        </div>
      </Dialog>
      <div id='search-container'>
        <AutoComplete
          value={search_name}
          onChange={(e) => setSearchName(e.target.value)}
          completeMethod={(e) => setSearch(!search)}
          placeholder={t('search')}
        />
      </div>
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
