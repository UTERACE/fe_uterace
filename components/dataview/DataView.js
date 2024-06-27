import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import LocaleHelper from '../locale/LocaleHelper'

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
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('T')
  const [image, setImage] = useState('')
  const [caption, setCaption] = useState('')
  const { t } = useTranslation('club')

  const onClickShare = () => {
    const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?caption=${encodeURIComponent(
      caption
    )}&description=${encodeURIComponent(caption)}&u=${encodeURIComponent(
      url
    )}&picture=${encodeURIComponent(image)}`

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
          <div id='share-facebook-container'>
            <Button
              label='Copy link chia sẻ'
              icon='pi pi-copy'
              id='button-detail'
              onClick={() => {
                navigator.clipboard.writeText(url)
                setVisible(false)
              }}
            />
            <Button
              label='Chia sẻ lên Facebook'
              icon='pi pi-facebook'
              style={{
                backgroundColor: '#3b5998',
                color: 'white',
                height: '3rem',
                borderRadius: '3rem',
              }}
              onClick={() => {
                onClickShare()
                setVisible(false)
              }}
            />
          </div>
        </Dialog>
        {data.map((item, index) =>
          itemTemplate ? (
            itemTemplate(item, index)
          ) : (
            <Link
              id='link-dataview-container'
              href={href + item.club_id}
              key={item.club_id}
            >
              <div id='dataview-container'>
                <div id='image-container-dataview'>
                  <Image
                    src={item.image ? item.image : '/logoclub.png'}
                    alt={item.name}
                    width={800}
                    height={500}
                  />
                </div>
                <div id='info-dataview'>
                  <h4>
                    <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
                    {item.total_member} {t('member-join')}
                  </h4>
                  <div id='distance-like-container'>
                    <h4>
                      <i className='pi pi-map ml2-icon' aria-hidden='true'></i>
                      {LocaleHelper.formatNumber(item.total_distance)} Km
                    </h4>
                    {item.total_like && (
                      <h4>
                        <i
                          className='pi pi-thumbs-up ml2-icon'
                          aria-hidden='true'
                        ></i>
                        {item.total_like} {t('like')}
                      </h4>
                    )}
                  </div>
                </div>
                <div id='name-dataview'>
                  <i className='fa fa-briefcase icon-run' aria-hidden='true'></i>
                  <div id='share-register-container' title={item.name}>
                    <h4>{item.name}</h4>
                    <div id='share-register-content'>
                      <Link id='link-dataview' href={href + item.club_id}>
                        {t('club-join')}{' '}
                        <i className='pi pi-arrow-right' aria-hidden='true'></i>
                      </Link>
                      <a
                        className='link-share'
                        onClick={(e) => {
                          e.preventDefault()
                          setUrl(
                            `https://fe-uterace.vercel.app${
                              href + item.club_id
                            }`
                          )
                          setCaption(item.name)
                          setTitle(item.name)
                          setImage(item.image)
                          setVisible(true)
                        }}
                      >
                        {t('share')}{' '}
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
