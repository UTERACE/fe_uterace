/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react'
import Link from 'next/link'
import { TabMenu } from 'primereact/tabmenu'

const AppMenu = ({activeIndex,setActiveIndex}) => {
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
    <div className='layout-sidebar'>
      <TabMenu
        id='app-menu'
        model={model}
        activeIndex={activeIndex}
        onTabChange={(e) => setActiveIndex(e.index)}
      />
    </div>
  )
}

export default AppMenu
