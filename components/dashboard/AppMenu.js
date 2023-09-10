/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react'
import Link from 'next/link'
import { TabMenu } from 'primereact/tabmenu'

const AppMenu = ({activeIndex,setActiveIndex, model}) => {


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
