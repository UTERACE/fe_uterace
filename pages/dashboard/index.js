import AppMenu from '@/components/dashboard/AppMenu'
import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import store from '@/store/store'
import HomePage from './HomePage'

const DashboardPage = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div id='dashboard-container'>
      <div id='dashboard-menu-container'>
        <img
          src={store.getState().auth.image}
          alt='dashboard'
          id='dashboard-image'
        />
        <h4>{store.getState().auth.fullName}</h4>
        <h6>Quản trị viên hệ thống</h6>
        <AppMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      </div>
      {activeIndex === 0 ? <Dashboard /> : <HomePage />}
    </div>
  )
}

export default DashboardPage
