import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Carousel from '@/components/dataview/Carousel'
import { useTranslation } from 'next-i18next'

const News = ({ data }) => {
  const [news, setNews] = useState([])
  const { t } = useTranslation('news')
  useEffect(() => {
    setNews(data.slice(0, 9))
  }, [data])
  const responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '960px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '800px',
      numVisible: 1,
      numScroll: 1,
    },
  ]
  const newsTemplate = (news) => {
    return (
      <Link id='link-news' href={`news/news-detail/${news.news_id}`}>
        <div id='news-container'>
          <div id='image-news-container'>
            <img src={news.image} alt={news.name} />
          </div>
          <div id='name-news' title={news.name}>
            <h4>{news.name}</h4>
          </div>
          <div id='share-register-content'>
            <i class='fa fa-newspaper icon-run' aria-hidden='true'></i>
            <div id='description-news' title={news.description}>
              <h5>{news.description}</h5>
            </div>
            <Link id='link-event' href='/post'>
              {t('share')} <i className='pi pi-share-alt' aria-hidden='true'></i>
            </Link>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className='centered-content-layout'>
      <Carousel
        id='custom-carousel-product'
        value={news}
        numVisible={3}
        numScroll={1}
        // responsiveOptions={responsiveOptions}
        itemTemplate={newsTemplate}
      />
    </div>
  )
}

export default News
