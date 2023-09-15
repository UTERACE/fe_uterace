import { SpeedDial } from 'primereact/speeddial'
import React from 'react'

const OutstandingEdit = ({ items, isOutstanding, id, title }) => {
  return (
    <div>
      <div id='management-container'>
        <SpeedDial
          model={items}
          direction='down'
          style={{
            right: '5%',
            top: '6%',
            position: 'absolute',
            zIndex: 1,
          }}
        />
      </div>
      <div id='outstanding-container'>
        {isOutstanding ? (
          <i
            className='pi pi-star-fill icon-large'
            aria-hidden='true'
            title={`Đang làm ${title} nổi bật`}
          ></i>
        ) : (
          <i
            className='pi pi-star icon-large'
            aria-hidden='true'
            title={`Chọn làm ${title} nổi bật`}
          ></i>
        )}
      </div>
    </div>
  )
}

export default OutstandingEdit
