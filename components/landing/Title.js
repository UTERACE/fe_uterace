import Link from 'next/link'
import { Button } from 'primereact/button'
import React from 'react'

const Title = ({
  title,
  component,
  detail = true,
  link,
  color = '#f5f5f5',
}) => {
  return (
    <div id='title-wrapper'>
      <div
        id='title-item'
        style={{
          backgroundColor: color,
          backgroundImage: "url('/bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <h1>{title}</h1>
      </div>
      {component}
      <div
        id='button-container'
        style={{
          backgroundColor: color,
          backgroundImage: "url('/bg.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {detail && (
          <Link href={link}>
            <div id='button_detail-container'>
              <Button
                id='button-detail'
                label='Detail information'
                severity='secondary'
                raised
                icon='pi pi-arrow-right'
                iconPos='right'
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Title
