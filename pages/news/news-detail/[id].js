import apiInstance from '@/api/apiInstance'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Image from 'next/image'
import Head from 'next/head'

export const getServerSideProps = async ({ locale, params }) => {
  const news = await getNews(params.id)
  return {
    props: {
      ...(await serverSideTranslations(locale, ['news', 'topbar'])),
      news,
    },
  }
}

async function getNews(id) {
  try {
    const response = await apiInstance.get(`/news/${id}`)
    const data = await response.data
    return data
  } catch (error) {
    console.error('Error fetching news details:', error)
    return null
  }
}

const NewsDetail = ({ news }) => {
  return (
    <div className='centered-content-detailpage'>
      <Head>
        <title>{news.name}</title>
        <meta name='description' content={news.description} />
      </Head>
      <div className='centered-content-layout'>
        <div id='news-detail-container'>
          <div id='image-container-detail'>
            <Image src={news.image} alt={news.name} width={1080} height={780} />
          </div>
          <div id='info-detail'>
            <h1>{news.name}</h1>
            <h6>{news.description}</h6>
          </div>
        </div>
        <div id='info-detail'>
          <div
            id='child-detail-post'
            dangerouslySetInnerHTML={{ __html: news.content }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetail
