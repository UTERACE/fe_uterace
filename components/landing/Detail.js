import Link from 'next/link'
import { Button } from 'primereact/button'
import React from 'react'

const Detail = ({ link }) => {
  return (
    <div id='title-wrapper'>
      <div id='button-container'>
        <Link href={link}>
          <div id='button_detail-container'>
            <Button
              id='button-detail'
              label='Xem thêm'
              severity='secondary'
              raised
              icon='pi pi-arrow-circle-right'
              iconPos='right'
            />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Detail
