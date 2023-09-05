import React, { useEffect, useRef, useState } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import { Button } from 'primereact/button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { SlideMenu } from 'primereact/slidemenu'
import { logout } from '@/store/slices/authSlice'
import { Avatar } from 'primereact/avatar'
import { Badge } from 'primereact/badge'

const Topbar = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const router = useRouter()
  const handleClick = (url) => {
    router.push(url)
  }
  const handleClickLogout = () => {
    dispatch(logout())
  }
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
  const items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      to: '/',
      command: () => handleClick('/'),
    },
    {
      label: 'Scoreboard',
      icon: 'pi pi-fw pi-chart-bar',
      to: '/scoreboard',
      command: () => handleClick('/scoreboard'),
    },
    {
      label: 'Event',
      icon: 'pi pi-fw pi-calendar',
      to: '/events',
      command: () => handleClick('/events'),
    },
    {
      label: 'Club',
      icon: 'pi pi-fw pi-users',
      to: '/clubs',
      command: () => handleClick('/clubs'),
    },
    {
      label: 'News',
      icon: 'pi pi-fw pi-book',
      command: () => handleClick('/news'),
      to: '/news',
    },
    { label: 'Settings', icon: 'pi pi-fw pi-cog', to: '/settings' },
  ]
  const item = (model) => {
    model.forEach((item, i) => {
      let menuitem = {
        id: item.id,
        label: windowWidth < 1400 ? null : item.label,
        icon: item.icon,
        command: item.command,
        style: item.style,
        to: item.to,
        active: item.to === router.pathname,
      }
      model[i] = menuitem
    })
    return model
  }
  const menu = useRef(null)
  const end_items = [
    {
      label: 'Profile',
      icon: 'pi pi-fw pi-user',
      command: () => handleClick('/profile'),
    },
    {
      label: 'Settings',
      icon: 'pi pi-fw pi-cog',
      items: [
        {
          label: 'Edit Profile',
          icon: 'pi pi-fw pi-user-edit',
        },
        {
          label: 'Change Password',
          icon: 'pi pi-fw pi-key',
        },
        {
          label: 'Search',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Filter',
              icon: 'pi pi-fw pi-filter',
              items: [
                {
                  label: 'Print',
                  icon: 'pi pi-fw pi-print',
                },
              ],
            },
            {
              icon: 'pi pi-fw pi-bars',
              label: 'List',
            },
          ],
        },
      ],
    },
    {
      label: 'Events',
      icon: 'pi pi-fw pi-calendar',
      items: [
        {
          label: 'New event',
          icon: 'pi pi-fw pi-plus',
          command: () => handleClick('/new-event'),
        },
        {
          label: 'All event',
          icon: 'pi pi-fw pi-trash',
        },
        {
          separator: true,
        },
        {
          label: 'Export',
          icon: 'pi pi-fw pi-external-link',
        },
      ],
    },
    {
      label: 'Club',
      icon: 'pi pi-fw pi-users',
      items: [
        {
          label: 'New club',
          icon: 'pi pi-fw pi-plus',
          command: () => handleClick('/new-club'),
        },
        {
          label: 'All club',
          icon: 'pi pi-fw pi-trash',
        },
        {
          separator: true,
        },
        {
          label: 'Export',
          icon: 'pi pi-fw pi-external-link',
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: 'Logout',
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
              <img src='/logohome.png' alt='logo' />
            </Link>
          </div>
          <div id='menubar'>
            <TabMenu model={item(items)} />
          </div>
          {!isAuthenticated ? (
            <div id='login-container'>
              <Link href='/login'>
                <Button
                  label='Sign in'
                  severity='warning'
                  text
                  raised
                  rounded
                />
              </Link>
              <Link href='/register'>
                <Button label='Sign up' severity='warning' outlined rounded />{' '}
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
              <Link href='/profile'>
                <Avatar
                  size='large'
                  shape='circle'
                  image={useSelector((state) => state.auth.image)}
                />
              </Link>
              <div className=''>
                <SlideMenu
                  ref={menu}
                  model={end_items}
                  popup
                  viewportHeight={320}
                  menuWidth={200}
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
