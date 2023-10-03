import { Button } from 'primereact/button'
import React from 'react'

const Connect = () => {
  let strava_client_id = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
    strava_response_type = process.env.NEXT_PUBLIC_STRAVA_REPONSE_TYPE,
    strava_redirect_uri = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI,
    strava_approval_prompt = process.env.NEXT_PUBLIC_STRAVA_APPROVAL_PROMPT,
    strava_scope = process.env.NEXT_PUBLIC_STRAVA_SCOPE,
    strava_activity = process.env.NEXT_PUBLIC_STRAVA_ACTIVATY
  const handleAuth = async () => {
    window.location = `https://www.strava.com/oauth/authorize?client_id=${strava_client_id}&response_type=${strava_response_type}&redirect_uri=${strava_redirect_uri}&approval_prompt=${strava_approval_prompt}&scope=${strava_scope},activity:${strava_activity}`
  }
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
        onClick={handleAuth}
      />
    </div>
  )
}

export default Connect
