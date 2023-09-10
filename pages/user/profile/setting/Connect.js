import { Button } from 'primereact/button'
import React from 'react'

const Connect = () => {
  const linkStrava = (rowData) => {
    return (
      <a
        target='_blank'
        href={`https://www.strava.com/activities/${rowData.activity_link_stava}`}
      >
        <img
          style={{ width: '50px', height: '50px', cursor: 'pointer' }}
          src='https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/323_Strava_logo-512.png'
        ></img>
      </a>
    )
  }
  return (
    <div id='connect-container'>
      <img src='/strava-icon.png' alt='Strava' id='strava-icon' />
      <div id='default-container'>
        <span>Mặc định</span>
      </div>
      <a
        id='connect-container'
        href='https://www.strava.com/athletes/108382917'
      >
        https://www.strava.com/athletes/108382917
      </a>
      <Button
        id='button-detail'
        severity='secondary'
        raised
        icon='pi pi-paperclip'
        iconPos='right'
        label='Kết nối'
      />
    </div>
  )
}

export default Connect
