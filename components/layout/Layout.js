import React from 'react'
import Footer from './Footer'
import Topbar from './Topbar'

const Layout = ({ children }) => {
  return (
    <div id='layout-main'>
      <Topbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
