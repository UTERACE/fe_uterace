import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const NotFoundPage = () => {
  return (
    <div id='container'>
      <Image src='/logo.png' width={300} height={300} alt='Running' />
      <h1 id='title'>Oops! 404</h1>
      <p id='description'>Trang bạn đang tìm kiếm không tồn tại.</p>
      <Link href='/' id='backHome'>
        Quay về trang chính
      </Link>
    </div>
  )
}
export default NotFoundPage
