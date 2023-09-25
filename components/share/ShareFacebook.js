import React from 'react'
import { LoadingContext } from '../contexts/LoadingContext'
import ShareButton from 'react-facebook-share'

const ShareFacebook = () => {
  const setLoading = useContext(LoadingContext)

  const handleShare = () => {
    setLoading(true)
    // Thực hiện hành động chia sẻ
    console.log('Chia sẻ bài viết lên Facebook')
    setLoading(false)
  }

  return (
    <div>
      <ShareButton
        title='Tiêu đề bài đăng'
        description='Mô tả bài đăng'
        image='https://example.com/image.jpg'
        link='https://example.com/my-page'
        onShare={handleShare}
      />
    </div>
  )
}

export default ShareFacebook
