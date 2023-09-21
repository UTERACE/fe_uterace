import Link from 'next/link'
import { Button } from 'primereact/button'
import React, { useState } from 'react'

const Manage = ({ title, href, newTitle }) => {
  const [index, setIndex] = useState(0)
  return (
    <div className='centered-content-layout'>
      <div id='title-item' style={{ height: '4rem' }}>
        <h1>{title}</h1>
      </div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Link href={`/${href}s/${href}-new`} style={{ textDecoration: 'none' }}>
          <Button
            id='button-statistic-club'
            type='button'
            style={{ width: '100%' }}
            label={newTitle}
            icon='pi pi-plus'
            iconPos='right'
            onClick={() => {
              setIndex(1)
            }}
          />
        </Link>
        <Link href={`/${href}s/${href}-me`} style={{ textDecoration: 'none' }}>
          <Button
            id='button-statistic-club'
            type='button'
            style={{ width: '100%' }}
            label='Câu lạc bộ đã tạo'
            icon='pi pi-list'
            iconPos='right'
            onClick={() => {
              setIndex(2)
            }}
          />
        </Link>
        <Link href={`/${href}s/${href}-join`} style={{ textDecoration: 'none' }}>
          <Button
            id='button-statistic-club'
            type='button'
            style={{ width: '100%' }}
            label='Câu lạc bộ đã tham gia'
            icon='pi pi-list'
            iconPos='right'
            onClick={() => {
              setIndex(3)
            }}
          />
        </Link>
      </div>
    </div>
  )
}

export default Manage
