import Link from 'next/link'
// import { Carousel } from 'primereact/carousel'
import React, { useEffect, useState } from 'react'
import Title from '../../components/landing/Title'
import Carousel from '@/components/dataview/Carousel'

const News = ({ data }) => {
  const [news, setNews] = useState([])
  useEffect(() => {
    console.log('data', data)
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
          <div id='name-news'>
            <h4>{news.name}</h4>
          </div>
          <div id='share-register-content'>
            <i class='fa fa-running icon-run' aria-hidden='true'></i>
            <div style={{ width: '60%' }}>
              <h5>{news.description}</h5>
            </div>
            <Link id='link-event' href='/post'>
              Share <i className='pi pi-share-alt' aria-hidden='true'></i>
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
