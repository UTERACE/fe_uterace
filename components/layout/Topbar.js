import React, { useEffect, useRef, useState } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import { Button } from 'primereact/button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SlideMenu } from 'primereact/slidemenu'
import { logout } from '@/store/slices/authSlice'
import { Badge } from 'primereact/badge'
import store from '@/store/store'
import { useTranslation } from 'next-i18next'
import { Menu } from 'primereact/menu'
import Image from 'next/image'

const Topbar = () => {
  const isAuthenticated = store.getState().auth.isAuthenticated
  //if (isAuthenticated) logout()
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated])

  const avatarImage = store.getState().auth.image
  const fullname = store.getState().auth.firstname
    ? store.getState().auth.firstname + ' ' + store.getState().auth.lastname
    : ''
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
    } else {
      setActiveIndex(8)
    }
  }, [router.pathname])
  const { t } = useTranslation('topbar')
  const items = [
    {
      label: t('homepage'),
      icon: 'pi pi-fw pi-home',
      to: '/',
      command: () => handleClick('/'),
    },
    {
      label: t('scoreboard'),
      icon: 'pi pi-fw pi-chart-bar',
      to: '/scoreboard',
      command: () => handleClick('/scoreboard'),
    },
    {
      label: t('event'),
      icon: 'pi pi-fw pi-calendar',
      to: '/events',
      command: () => handleClick('/events'),
    },
    {
      label: t('club'),
      icon: 'pi pi-fw pi-users',
      to: '/clubs',
      command: () => handleClick('/clubs'),
    },
    {
      label: t('news'),
      icon: 'pi pi-fw pi-book',
      command: () => handleClick('/news'),
      to: '/news',
    },
  ]
  let managementItems
  if (hasAdminRole) {
    items.push({
      label: t('dashboard'),
      icon: 'pi pi-fw pi-chart-line',
      to: '/dashboard',
      command: () => handleClick('/dashboard'),
    })
    managementItems = [
      {
        label: t('manage-events'),
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: t('new-event'),
            icon: 'pi pi-fw pi-plus',
            command: () => handleClick('/events/event-management'),
          },
          {
            label: t('my-events'),
            icon: 'pi pi-fw pi-users',
            command: () => handleClick('/events/event-management'),
          },
        ],
      },
      {
        label: t('manage-news'),
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: t('new-news'),
            icon: 'pi pi-fw pi-plus',
            command: () => handleClick('/news/news-management'),
          },
          {
            label: t('my-news'),
            icon: 'pi pi-fw pi-users',
            command: () => handleClick('/news/news-management'),
          },
        ],
      },
    ]
  } else {
    managementItems = [
      {
        label: t('join-event'),
        icon: 'fa pi-fw fa-running',
        command: () => handleClick('/events/event-management'),
      },
    ]
  }
  const item = (model) => {
    model.map((item, i) => {
      let menuitem = {
        id: item.id,
        label: windowWidth < 1366 ? null : item.label,
        icon: item.icon,
        command: item.command,
        to: item.to,
      }
      model[i] = menuitem
    })
    return model
  }
  const menu = useRef(null)
  const menuHeader = useRef(null)
  const end_items = [
    {
      command: () => {
        toast.current.show({
          severity: 'info',
          summary: 'Info',
          detail: 'Item Selected',
          life: 3000,
        })
      },
      template: (item, options) => {
        return (
          <Link href='/user/profile' id='link-dataview-container'>
            <div id='topbar-profile-menu'>
              <div id='topbar-profile-avatar'>
                <Image
                  style={{ border: '0.1rem solid #ffffff' }}
                  src={avatarImage ? avatarImage : '/default-avatar.png'}
                  width={50}
                  height={50}
                />
              </div>
              <div id='topbar-profile-info'>
                <h1>{fullname}</h1>
                <h4>
                  {hasAdminRole
                    ? 'Quản trị viên hệ thống'
                    : 'Người dùng hệ thống'}
                </h4>
              </div>
            </div>
          </Link>
        )
      },
    },
    { separator: true },
    {
      label: t('change-password'),
      icon: 'pi pi-fw pi-key',
      command: () => handleClick('/user/profile/setting?connect=1'),
    },
    {
      label: t('connect-strava'),
      icon: 'pi pi-fw pi-link',
      command: () => handleClick('/user/profile/setting?connect=2'),
    },
    ...managementItems,
    {
      label: t('manage-clubs'),
      icon: 'pi pi-fw pi-users',
      items: [
        {
          label: t('new-club'),
          icon: 'pi pi-fw pi-plus',
          command: () => handleClick('/clubs/club-management'),
        },
        {
          label: t('my-clubs'),
          icon: 'pi pi-fw pi-users',
          command: () => handleClick('/clubs/club-management'),
        },
      ],
    },
    {
      separator: true,
    },
    {
      label: t('logout'),
      icon: 'pi pi-fw pi-power-off',
      command: () => handleClickLogout(),
    },
  ]
  const [showOptions, setShowOptions] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState(router.locale)

  const toggleDropdown = () => {
    setShowOptions(!showOptions)
  }

  const changeLanguage = (lang) => {
    router.push(router.pathname, router.asPath, { locale: lang })
    setCurrentLanguage(lang)
    setShowOptions(false)
  }
  return (
    <div id='topbar'>
      <div className='centered-content-layout'>
        <div id='topbar-container'>
          <div id='logo-container'>
            <Link href='/'>
              <Image
                src='/logo.png'
                alt='logo'
                style={{ marginTop: '1rem' }}
                width={80}
                height={80}
              />
            </Link>
          </div>
          {windowWidth > 500 ? (
            <div id='menubar'>
              <TabMenu
                id='app-menu-topbar'
                model={item(items)}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
              />
            </div>
          ) : (
            <div>
              <SlideMenu ref={menuHeader} model={items} popup></SlideMenu>

              <Button
                type='button'
                icon='pi pi-bars icon-large'
                severity='secondary'
                raised
                label='Menu'
                onClick={(event) => menuHeader.current.toggle(event)}
              ></Button>
            </div>
          )}

          <div id='end-menu-container'>
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
                    label={t('login')}
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
                    label={t('register')}
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
                    backgroundColor: 'var(--secondary-color)',
                    borderRadius: '50%',
                    color: 'var(--text-color)',
                  }}
                >
                  <Badge value='1'></Badge>
                </i>
                <Image
                  style={{ border: '0.1rem solid #ffffff' }}
                  src={avatarImage ? avatarImage : '/default-avatar.png'}
                  width={50}
                  height={50}
                  onClick={(event) => menu.current.toggle(event)}
                />
                <Menu ref={menu} model={end_items} popup></Menu>
              </div>
            )}
            <div className='custom-dropdown' onClick={toggleDropdown}>
              {currentLanguage === 'en' ? (
                <Image src='/en.png' alt='English' width={20} height={20} />
              ) : (
                <Image src='/vn.png' alt='Tiếng Việt' width={20} height={20} />
              )}
              <i className='pi pi-chevron-down'></i>
              {showOptions && (
                <div className='options'>
                  <div className='option' onClick={() => changeLanguage('en')}>
                    <Image src='/en.png' alt='English' width={20} height={20} />
                    <span>English</span>
                  </div>
                  <div className='option' onClick={() => changeLanguage('vi')}>
                    <Image
                      src='/vn.png'
                      alt='Tiếng Việt'
                      width={20}
                      height={20}
                    />
                    <span>Tiếng Việt</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Topbar
