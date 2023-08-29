import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div id='footer' className='centered-content-layout'>
      <div>
        <h3>UTErace</h3>
        <p>
          UTErace is a website that allows you to create and participate in a 
          race. You can also create a team and invite your friends to join.
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
      <div>
        <h3>Company</h3>
        <p>About</p>
        <p>Features</p>
        <p>Works</p>
        <p>Career</p>
      </div>
      <div>
        <h3>Help</h3>
        <p>Customer Support</p>
        <p>Delivery Detail</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
      </div>
      <div>
        <h3>Resources</h3>
        <p>Blog</p>
        <p>FAQs</p>
        <p>How It Works</p>
        <p>UTErace</p>
      </div>
    </div>
  )
}

export default Footer
