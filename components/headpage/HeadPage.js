import Head from 'next/head'
import { useRouter } from 'next/router'
import React from 'react'

const HeadPage = ({
  title = 'Tiêu đề trang',
  description = 'Mô tả trang của bạn',
  image = 'URL ảnh đại diện khi chia sẻ',
}) => {
  const router = useRouter()
  return (
    <Head>
      <title>{title}</title>
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={router.asPath} />
      <meta property='og:type' content='website' />
    </Head>
  )
}

export default HeadPage
