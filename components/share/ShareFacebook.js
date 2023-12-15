import React, { useContext } from 'react'
import { LoadingContext } from '../contexts/LoadingContext'
// import ShareButton from 'react-facebook-share'
import { Button } from 'primereact/button'

const ShareFacebook = ({ title, description, image, link }) => {
  const setLoading = useContext(LoadingContext)

  const handleShare = () => {
    setLoading(true)
    // Thực hiện hành động chia sẻ
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}&quote=${encodeURIComponent(title)}&hashtag=${encodeURIComponent(
      '#uterace'
    )}&caption=${encodeURIComponent(caption)}`
    window.open(fbShareUrl, 'facebook-share-dialog', 'width=1080,height=720')
    setLoading(false)
  }

  return (
    <div>
      <Button
        title={title}
        description={description}
        image={image}
        link={link}
        onShare={handleShare}
      />
    </div>
  )
}

export default ShareFacebook
