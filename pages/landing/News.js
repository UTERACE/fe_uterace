import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Carousel from '@/components/dataview/Carousel'
import { useTranslation } from 'next-i18next'
import OutstandingEdit from '@/components/management/OutstandingEdit'
import apiInstance from '@/api/apiInstance'
import Image from 'next/image'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

const News = ({
  data,
  update = false,
  setUpdateNewsId,
  setUpdateStatus,
  setLoading,
  showToast,
}) => {
  const [news, setNews] = useState([])

  const { t } = useTranslation('news')

  useEffect(() => {
    setNews(data.slice(0, 9))
  }, [data])

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

  const handleClickEdit = (news_id) => {
    setUpdateNewsId(news_id)
  }

  const handleClickDelete = (news_id) => {
    deleteNews(news_id)
  }

  const deleteNews = async (news_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.delete(`/news/${news_id}`)
      if (res.status === 200) {
        showToast('success', 'Xóa bài viết thành công', res.data.message)
        setUpdateStatus(true)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Xóa bài viết thất bại', err)
      setLoading(false)
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

  const newsTemplate = (news) => {
    return (
      <div
        id='link-news'
        title={news.deleted ? 'Bài viết này đã bị quản trị viên khóa' : null}
      >
        <div id={news.deleted ? 'news-container-hide' : 'news-container'}>
          <Link href={`/news/news-detail/${news.news_id}`}>
            <div id='image-news-container'>
              <Image
                src={news.image}
                alt={news.name}
                width={800}
                height={500}
              />
              {news.deleted ? (
                <div className='lock-news'>
                  <i
                    id='icon-lock'
                    className='fa fa-lock'
                    aria-hidden='true'
                  ></i>
                </div>
              ) : null}
            </div>
          </Link>
          {!update ? null : (
            <OutstandingEdit
              items={items(news.news_id)}
              isOutstanding={news.outstanding}
              id={news.news_id}
              title='bài viết'
            />
          )}
          <Link
            id='name-news'
            title={news.name}
            href={`/news/news-detail/${news.news_id}`}
          >
            <h4>{news.name}</h4>
          </Link>
          <Link href={`/news/news-detail/${news.news_id}`}>
            <div id='share-register-content'>
              <i class='fa fa-newspaper icon-run' aria-hidden='true'></i>
              <div id='description-news' title={news.description}>
                <h5>{news.description}</h5>
              </div>
              <a
                  onClick={(e) => {
                    e.preventDefault()
                    setUrl(
                      `https://fe-uterace.vercel.app/news/news-detail/${news.news_id}`
                    )
                    setCaption(news.name)
                    setTitle(news.name)
                    setImage(news.image)
                    setVisible(true)
                  }}
                >
                  {t('share')}{' '}
                  <i className='pi pi-share-alt' aria-hidden='true'></i>
                </a>
            </div>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
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
      <Carousel
        value={news}
        numVisible={3}
        numScroll={1}
        itemTemplate={newsTemplate}
        circular={true}
      />
    </div>
  )
}

export default News
