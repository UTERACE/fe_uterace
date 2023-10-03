import Link from 'next/link'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useEffect, useState } from 'react'

const DataView = ({
  data,
  href,
  itemTemplate,
  responsiveOptions = [
    {
      breakpoint: 1920,
      columnNumber: 3,
    },
    {
      breakpoint: 1024,
      columnNumber: 2,
    },
    {
      breakpoint: 768,
      columnNumber: 1,
    },
  ],
}) => {
  const [visible, setVisible] = useState(false)
  const [url, setUrl] = useState('https://example.com/')
  const [title, setTitle] = useState('Tiêu đề bài viết hoặc trang')
  const [image, setImage] = useState('https://example.com/image.jpg')
  const [caption, setCaption] = useState('Mô tả bài viết hoặc trang')

  const onClickShare = () => {
    // Mở một cửa sổ mới với URL chia sẻ Facebook
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}&quote=${encodeURIComponent(title)}`
    window.open(fbShareUrl, 'facebook-share-dialog', 'width=1080,height=720')
  }

  const [column, setColumn] = useState(3)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= responsiveOptions[2].breakpoint) {
        setColumn(responsiveOptions[2].columnNumber)
      } else if (
        width <= responsiveOptions[1].breakpoint &&
        width > responsiveOptions[2].breakpoint
      )
        setColumn(responsiveOptions[1].columnNumber)
      else if (
        width <= responsiveOptions[0].breakpoint &&
        width > responsiveOptions[1].breakpoint
      )
        setColumn(responsiveOptions[0].columnNumber)
      else {
        setColumn(3)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useEffect(() => {
    const carouselElement = document.getElementsByClassName(
      'custom-carousel-content'
    )[0]
    if (carouselElement) {
      carouselElement.style.setProperty('--num-columns', column)
    }
  }, [column])
  return (
    <div className='centered-content-layout'>
      <div className='custom-carousel-content'>
        <Dialog visible={visible} onHide={() => setVisible(false)}>
          <Button label='Copy link chia sẻ' className='p-button-success' />
          <Button
            label='Chia sẻ lên Facebook'
            className='p-button-success'
            onClick={() => onClickShare()}
          />
        </Dialog>
        {data.map((item, index) =>
          itemTemplate ? (
            itemTemplate(item, index)
          ) : (
            <Link id='link-dataview-container' href={href + item.club_id}>
              <div id='dataview-container'>
                <div id='image-container-dataview'>
                  <img src={item.image} alt={item.name} />
                </div>
                <div id='info-dataview'>
                  <h4>
                    <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
                    {item.member} Thành viên
                  </h4>
                  <h4>
                    <i className='pi pi-map ml2-icon' aria-hidden='true'></i>
                    {item.total_distance} Km
                  </h4>
                </div>
                <div id='name-dataview'>
                  <i class='fa fa-briefcase icon-run' aria-hidden='true'></i>
                  <div id='share-register-container'>
                    <h4>{item.name}</h4>
                    <div id='share-register-content'>
                      <Link id='link-dataview' href={href + item.club_id}>
                        Tham gia câu lạc bộ{' '}
                        <i className='pi pi-arrow-right' aria-hidden='true'></i>
                      </Link>
                      <a
                        onClick={(e) => {
                          e.preventDefault()
                          setUrl(`https://example.com/${href + item.club_id}}`)
                          setCaption(item.name)
                          setTitle(item.name)
                          setImage(item.image)
                          setVisible(true)
                        }}
                      >
                        Chia sẻ{' '}
                        <i className='pi pi-share-alt' aria-hidden='true'></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  )
}

export default DataView
