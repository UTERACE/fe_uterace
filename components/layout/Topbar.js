import React, { useEffect, useState } from 'react'
import { TabMenu } from 'primereact/tabmenu'
import { Button } from 'primereact/button'
import Link from 'next/link'
import { CSSTransition } from 'react-transition-group'
import { classNames } from 'primereact/utils'
import { Ripple } from 'primereact/ripple'
import { useRouter } from 'next/router'

const Topbar = () => {
  const router = useRouter()
  const handleClick = (url) => {
    router.push(url)
  }
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Thiết lập chiều rộng ban đầu khi component được gắn kết
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
      command: () => handleClick('/'),
    },
    {
      label: 'Scoreboard',
      icon: 'pi pi-fw pi-chart-bar',
      command: () => handleClick('/scoreboard'),
    },
    {
      label: 'Event',
      icon: 'pi pi-fw pi-calendar',
      command: () => handleClick('/event'),
    },
    {
      label: 'Club',
      icon: 'pi pi-fw pi-users',
      command: () => handleClick('/club'),
    },
    {
      label: 'Post',
      icon: 'pi pi-fw pi-book',
      command: () => handleClick('/post'),
      to: '/post',
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
      }
      model[i] = menuitem
    })
    return model
  }
  return (
    <div className='centered-content-layout'>
      <div id='topbar-container'>
        <div id='logo-container'>
          <img src='/logohome.png' alt='logo' />
        </div>
        <div id='menubar'>
          <TabMenu model={item(items)} />
        </div>
        <div id='login-container'>
          <Link href='/login'>
            <Button label='Sign in' severity='warning' text raised rounded />
          </Link>
          <Link href='/register'>
            <Button label='Sign up' severity='warning' outlined rounded />{' '}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Topbar
