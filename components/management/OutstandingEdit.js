import store from '@/store/store'
import { SpeedDial } from 'primereact/speeddial'
import React from 'react'

const OutstandingEdit = ({ items, isOutstanding, id, title }) => {
  const roles = store.getState().auth.roles
  const hasAdminRole = roles ? roles.some((role) => role.roleId === 1) : false
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
      {hasAdminRole ? (
        <div id='outstanding-container'>
          {isOutstanding ? (
            <i
              className='pi pi-star-fill p-icon-large'
              aria-hidden='true'
              title={`Đang làm ${title} nổi bật`}
            ></i>
          ) : (
            <i
              className='pi pi-star p-icon-large'
              aria-hidden='true'
              title={`Chọn làm ${title} nổi bật`}
            ></i>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default OutstandingEdit
