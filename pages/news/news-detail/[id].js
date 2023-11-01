import apiInstance from '@/api/apiInstance'
import React from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticPaths() {
  const ids = await fetchNewsIds()
  if (!ids) {
    return { paths: [], fallback: 'blocking' }
  }
  const paths = ids.map((news) => ({
    params: { id: news.news_id.toString() },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}
async function fetchNewsIds() {
  try {
    const response = await apiInstance.get('/news?current_page=1&per_page=6')
    const data = await response.data.news
    return data
  } catch (error) {
    console.error('Error fetching news IDs:', error)
    return null
  }
}
export const getStaticProps = async ({ locale, params }) => {
  const news = await getNews(params.id)
  return {
    props: {
      news,
      ...(await serverSideTranslations(locale, ['news', 'topbar'])),
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
      <div className='centered-content-layout'>
        <div id='news-detail-container'>
          <div id='image-container-detail'>
            <img src={news.image} alt='club1' />
          </div>
          <div id='info-detail'>
            <h1>{news.name}</h1>
            <h6>{news.description}</h6>
          </div>
        </div>
        <div
          id='child-detail-post'
          dangerouslySetInnerHTML={{ __html: news.content }}
        ></div>
      </div>
    </div>
  )
}

export default NewsDetail
