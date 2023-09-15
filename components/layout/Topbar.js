import React, { useEffect, useRef, useState } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import { Button } from 'primereact/button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SlideMenu } from 'primereact/slidemenu'
import { logout } from '@/store/slices/authSlice'
import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'
import store from '@/store/store'

const Topbar = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated
  const avatarImage = store.getState().auth.image
  const avatarLabel = store.getState().auth.firstname
    ? store.getState().auth.firstname[0].toUpperCase()
    : 'B'
  const router = useRouter()
  const handleClick = (url) => {
    router.push(url)
  }
  const handleClickLogout = () => {
    store.dispatch(logout())
    router.push('/login')
  }
  const roles = store.getState().auth.roles
  const hasAdminRole = roles ? roles.some((role) => role.roleId === 1) : false
  const [windowWidth, setWindowWidth] = useState(0)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  const [activeIndex, setActiveIndex] = useState(0)
  useEffect(() => {
    if (router.pathname === '/') {
      setActiveIndex(0)
    } else if (router.pathname.startsWith('/scoreboard')) {
      setActiveIndex(1)
    } else if (router.pathname.startsWith('/events')) {
      setActiveIndex(2)
    } else if (router.pathname.startsWith('/clubs')) {
      setActiveIndex(3)
    } else if (router.pathname.startsWith('/news')) {
      setActiveIndex(4)
    } else if (router.pathname.startsWith('/dashboard')) {
      setActiveIndex(5)
    } else if (router.pathname === '/login') {
      setActiveIndex(6)
    } else if (router.pathname === '/register') {
      setActiveIndex(7)
    }
  }, [router.pathname])

  const items = [
    {
      label: 'Trang chủ',
      icon: 'pi pi-fw pi-home',
      to: '/',
      command: () => handleClick('/'),
    },
    {
      label: 'Bản xếp hạng',
      icon: 'pi pi-fw pi-chart-bar',
      to: '/scoreboard',
      command: () => handleClick('/scoreboard'),
    },
    {
      label: 'Sự kiện',
      icon: 'pi pi-fw pi-calendar',
      to: '/events',
      command: () => handleClick('/events'),
    },
    {
      label: 'Câu lạc bộ',
      icon: 'pi pi-fw pi-users',
      to: '/clubs',
      command: () => handleClick('/clubs'),
    },
    {
      label: 'Tin tức',
      icon: 'pi pi-fw pi-book',
      command: () => handleClick('/news'),
      to: '/news',
    },
  ]
  let managementItems
  if (hasAdminRole) {
    items.push({
      label: 'Dashboard',
      icon: 'pi pi-fw pi-chart-line',
      to: '/dashboard',
      command: () => handleClick('/dashboard'),
    })
    managementItems = [
      {
        label: 'Quản lí giải chạy',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'Tạo mới giải chạy',
            icon: 'pi pi-fw pi-plus',
            command: () => handleClick('/events/event-management'),
          },
          {
            label: 'Giải chạy của tôi',
            icon: 'pi pi-fw pi-users',
            command: () => handleClick('/events/event-management'),
          },
        ],
      },
    ]
  } else {
    managementItems = [
      {
        label: 'Tham gia giải chạy',
        icon: 'fa pi-fw fa-running',
        command: () => handleClick('/my-event'),
      },
    ]
  }
  const item = (model) => {
    model.map((item, i) => {
      let menuitem = {
        id: item.id,
        label: windowWidth < 1350 ? null : item.label,
        icon: item.icon,
        command: item.command,
        to: item.to,
      }
      model[i] = menuitem
    })
    return model
  }
  const menu = useRef(null)
  const end_items = [
    {
      label: 'Trang cá nhân',
      icon: 'pi pi-fw pi-user',
      command: () => handleClick('/user/profile'),
    },
    {
      label: 'Thay đổi mật khẩu',
      icon: 'pi pi-fw pi-key',
      command: () => handleClick('/user/profile/setting?connect=1'),
    },
    {
      label: 'Kết nối ứng dụng',
      icon: 'pi pi-fw pi-link',
      command: () => handleClick('/user/profile/setting?connect=2'),
    },
    ...managementItems,
    {
      label: 'Quản lí câu lạc bộ',
      icon: 'pi pi-fw pi-users',
      items: [
        {
          label: 'Tạo mới câu lạc bộ',
          icon: 'pi pi-fw pi-plus',
          command: () => handleClick('/clubs/club-management'),
        },
        {
          label: 'Câu lạc bộ của tôi',
          icon: 'pi pi-fw pi-users',
          command: () => handleClick('/clubs/club-management'),
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Đăng xuất',
      icon: 'pi pi-fw pi-power-off',
      command: () => handleClickLogout(),
    },
  ]
  return (
    <div id='topbar'>
      <div className='centered-content-layout'>
        <div id='topbar-container'>
          <div id='logo-container'>
            <Link href='/'>
              <img
                src='/logohome.png'
                alt='logo'
                style={{ marginTop: '1rem' }}
              />
            </Link>
          </div>
          <div id='menubar'>
            <TabMenu
              id='app-menu-topbar'
              model={item(items)}
              activeIndex={activeIndex}
              onTabChange={(e) => setActiveIndex(e.index)}
            />
          </div>
          {!isAuthenticated ? (
            <div id='login-container'>
              <Link href='/login'>
                <Button
                  id={
                    activeIndex == 6
                      ? 'topbar-button-login-active'
                      : 'topbar-button-login'
                  }
                  type='button'
                  label='Sign in'
                  severity='warning'
                  raised
                  onClick={() => {
                    setActiveIndex(6)
                  }}
                />
              </Link>
              <Link href='/register'>
                <Button
                  id={
                    activeIndex == 7
                      ? 'topbar-button-login-active'
                      : 'topbar-button-login'
                  }
                  type='button'
                  label='Sign up'
                  severity='warning'
                  outlined
                  onClick={() => {
                    setActiveIndex(7)
                  }}
                />
              </Link>
            </div>
          ) : (
            <div id='login-container'>
              <i
                className='pi pi-bell p-overlay-badge'
                style={{
                  fontSize: '2rem',
                  paddingTop: '0.5rem',
                  width: '3rem',
                  height: '3rem',
                  textAlign: 'center',
                  backgroundColor: '#FFE49E',
                  borderRadius: '50%',
                  color: '#000000',
                }}
              >
                <Badge value='1'></Badge>
              </i>
              <Link href='/user/profile'>
                <Avatar
                  style={{ border: '1px solid #ffffff' }}
                  size='large'
                  shape='circle'
                  label={!avatarImage ? avatarLabel : null}
                  image={avatarImage}
                />
              </Link>
              <div>
                <SlideMenu
                  ref={menu}
                  model={end_items}
                  popup
                  viewportHeight={284}
                  menuWidth={207}
                ></SlideMenu>

                <i
                  className='pi pi-spin pi-cog'
                  title='Settings menu'
                  style={{
                    fontSize: '2rem',
                    paddingTop: '0.5rem',
                    width: '3rem',
                    height: '3rem',
                    textAlign: 'center',
                    backgroundColor: '#FFE49E',
                    borderRadius: '50%',
                  }}
                  onClick={(event) => menu.current.toggle(event)}
                ></i>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Topbar
