import Link from 'next/link'
import { Carousel } from 'primereact/carousel'
import React, { useEffect, useState } from 'react'
import Title from '../../components/landing/Title'

const News = ({ data }) => {
  const [news, setNews] = useState([])
  useEffect(() => {
    setNews(data.slice(0, 9))
  }, [])
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ]
  const newsTemplate = (news) => {
    return (
      <div id='news-container'>
        <div id='image-news-container'>
          <img src={news.image} alt={news.name} />
        </div>
        <div id='name-news'>
          <h4>{news.name}</h4>
          <div id='share-register-content'>
            <i class='fa fa-running icon-run' aria-hidden='true'></i>
            <Link id='link-news' href='/post'>
              Share <i className='pi pi-share-alt' aria-hidden='true'></i>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#DB2D33',
        backgroundImage: "url('/bg1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Title title='News' />
      <div className='centered-content-layout'>
        <Carousel
          id='custom-carousel-product'
          value={news}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={newsTemplate}
        />
      </div>
    </div>
  )
}

export default News
