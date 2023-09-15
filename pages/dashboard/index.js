import AppMenu from '@/components/dashboard/AppMenu'
import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import store from '@/store/store'
import HomePage from './HomePage'

const DashboardPage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const model = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-home',
      to: '/dashboard',
    },
    {
      label: 'Quản lí trang chủ',
      icon: 'pi pi-fw pi-home',
      to: '/homepage',
    },
    {
      label: 'Quản lí giải chạy ',
      icon: 'pi pi-fw pi-calendar',
      to: '/events',
    },
    {
      label: 'Quản lí câu lạc bộ',
      icon: 'pi pi-fw pi-users',
      to: '/clubs',
    },
    {
      label: 'Quản lí tin tức',
      icon: 'pi pi-fw pi-book',
      to: '/news',
    },
    {
      label: 'Quản lí người dùng',
      icon: 'pi pi-fw pi-user',
      to: '/profile',
    },
  ]
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
        <AppMenu
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          model={model}
        />
      </div>
      {activeIndex === 0 ? <Dashboard /> : <HomePage />}
    </div>
  )
}

export default DashboardPage

export async function getServerSideProps(context) {
  const roles = store.getState().auth.roles
  const hasAdminRole = roles ? roles.some((role) => role.roleId === 1) : false
  console.log('h1', hasAdminRole)
  if (!hasAdminRole) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {}, // will be passed to the page component as props
  }
}
