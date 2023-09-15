import Link from 'next/link'
import { Button } from 'primereact/button'
import React from 'react'

const NewTitle = ({ title, href, newTitle }) => {
  return (
    <div className='centered-content-layout'>
      <div id='title-item' style={{ height: '4rem' }}>
        <h1>{title}</h1>
      </div>
      <div style={{ width: '20%' }}>
        <Link href={href} style={{ textDecoration: 'none' }}>
          <Button
            id='button-statistic-club'
            type='button'
            style={{ width: '100%' }}
            label={newTitle}
            icon='pi pi-plus'
            iconPos='right'
          />
        </Link>
      </div>
    </div>
  )
}

export default NewTitle
