import React, { useEffect } from 'react'
import Image from 'next/image'

const Footer = () => {
  useEffect(() => {
    const width = window.innerWidth
    if (width <= 1024) {
      const carouselElement = document.getElementsByClassName('footer')[0]
      if (carouselElement) {
        carouselElement.style.setProperty('--num-columns', 2)
      }
    }
  }, [])
  return (
    <div id='footer-container'>
      <div className='footer'>
        <div>
          <h3>UTE Race</h3>
          <p style={{ maxWidth: '30rem' }}>
            UTErace là một ứng dụng giúp người dùng có thể tìm kiếm các giải
            chạy và tham gia vào các giải chạy đó. Ngoài ra, người dùng có thể
            tạo ra các đội chạy và tham gia vào các giải chạy đó.
          </p>
          <div id='social-media-icons'>
            <a
              href='https://www.facebook.com/'
              className='pi pi-facebook'
              target='_blank'
              rel='noopener noreferrer'
            ></a>
            <a
              href='https://www.instagram.com/'
              className='pi pi-instagram'
              target='_blank'
              rel='noopener noreferrer'
            ></a>
            <a
              href='https://twitter.com/'
              className='pi pi-twitter'
              target='_blank'
              rel='noopener noreferrer'
            ></a>
            <a
              href='https://www.youtube.com/channel/UC9JUJQx8XQXZG3t5QXq2Y0Q'
              className='pi pi-youtube'
              target='_blank'
              rel='noopener noreferrer'
            ></a>
          </div>
        </div>
        <div style={{ maxWidth: '30rem' }}>
          <h3>Hướng dẫn</h3>
          <p>Hướng dẫn đăng nhập</p>
          <p>Hướng dẫn tạo đội</p>
          <p>Hướng dẫn tham gia giải đấu</p>
          <p>Hướng dẫn từ A-Z cho người mới bắt đầu </p>
        </div>
        <div>
          <h3>Chính sách</h3>
          <p>Chính sách vận chuyển</p>
          <p>Chính sách hoàn trả</p>
          <p>Chính sách bảo mật</p>
          <p>Chính sách thanh toán</p>
        </div>
        <div>
          <h3>Tương thích với</h3>
          <div
            style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'start',
            }}
          >
            <i id='container-icon'>
              <Image
                src='/garmin-icon.png'
                alt='garmin'
                width={20}
                height={20}
              ></Image>
            </i>
            <i id='container-icon'>
              <Image
                src='/logo_suunto.png'
                alt='garmin'
                width={20}
                height={20}
              ></Image>
            </i>
            <a href='http://www.vietmap.vn' target='_blank'>
              <i id='container-icon'>
                <Image
                  src='/logo_vietmap.png'
                  alt='vietmap'
                  width={20}
                  height={20}
                ></Image>
              </i>
            </a>
          </div>
          <div id='strava-footer'>
            <Image src='/strava_cptblWith.png' width={20} height={20}></Image>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
