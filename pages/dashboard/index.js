import AppMenu from '@/components/dashboard/AppMenu'
import React, { useEffect, useState } from 'react'
import Dashboard from './Dashboard'
import store from '@/store/store'
import HomePage from './HomePage'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Avatar } from 'primereact/avatar'
import EventManagement from './EventManagement'
import ClubManagement from './ClubManagement'
import NewsManagement from './NewsManagement'
import UserManagement from './UserManagement'
import { Button } from 'primereact/button'

const DashboardPage = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const avatarImage = store.getState().auth.image
  const avatarLabel = store.getState().auth.firstname
    ? store.getState().auth.firstname[0].toUpperCase()
    : 'B'
  const firstname = store.getState().auth.firstname || ''
  const lastname = store.getState().auth.last_name || ''
  const router = useRouter()
  const roles = store.getState().auth.roles
  const hasAdminRole = roles ? roles.some((role) => role.roleId === 1) : false
  console.log('hasAdminRole', hasAdminRole)
  useEffect(() => {
    if (!hasAdminRole) {
      router.push('/landing')
    }
  }, [hasAdminRole])
  const model = [
    {
      label: 'Dashboard',
      icon: 'pi pi-fw pi-chart-line',
      to: '/dashboard',
    },
    {
      label: 'Quản trị hệ thống',
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
  const [isCollapsed, setIsCollapsed] = useState(true)
  return (
    <div id='dashboard-container'>
      <Button
        id='button-menu-hide'
        icon='pi pi-bars'
        className='p-button-rounded p-button-text'
        onClick={() => setIsCollapsed(!isCollapsed)}
      />
      {isCollapsed ? (
        <div id='dashboard-menu-container'>
          <Link href='/user/profile'>
            <Avatar
              style={{
                border: '1px solid #ffffff',
                marginTop: '2rem',
                width: '10rem',
                height: '10rem',
                fontSize: '5rem',
              }}
              size='xlarge'
              shape='circle'
              label={!avatarImage ? avatarLabel : null}
              image={avatarImage}
            />
          </Link>

          <h4>{lastname + ' ' + firstname}</h4>
          <h6>Quản trị viên hệ thống</h6>
          <AppMenu
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            model={model}
          />
        </div>
      ) : null}
      {activeIndex === 0 ? (
        <Dashboard />
      ) : activeIndex === 1 ? (
        <HomePage />
      ) : activeIndex === 2 ? (
        <EventManagement />
      ) : activeIndex === 3 ? (
        <ClubManagement />
      ) : activeIndex === 4 ? (
        <NewsManagement />
      ) : activeIndex === 5 ? (
        <UserManagement />
      ) : null}
    </div>
  )
}

export default DashboardPage
