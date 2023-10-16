import apiInstance from '@/api/apiInstance'
import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'

const Connect = () => {
  let strava_client_id = process.env.NEXT_PUBLIC_STRAVA_CLIENT_ID,
    strava_response_type = process.env.NEXT_PUBLIC_STRAVA_REPONSE_TYPE,
    strava_redirect_uri = process.env.NEXT_PUBLIC_STRAVA_REDIRECT_URI,
    strava_approval_prompt = process.env.NEXT_PUBLIC_STRAVA_APPROVAL_PROMPT,
    strava_scope = process.env.NEXT_PUBLIC_STRAVA_SCOPE,
    strava_activity = process.env.NEXT_PUBLIC_STRAVA_ACTIVATY

  const [detail, setDetail] = useState('')
  const [stravaId, setStravaId] = useState('')
  const [stravaFullName, setStravaFullName] = useState('')
  const [stravaImage, setStravaImage] = useState('')
  const [status, setStatus] = useState(false)
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
  useEffect(() => {
    fetchStatus()
  }, [])
  const fetchStatus = async () => {
    const res = await apiInstance.get(`/strava/status`)
    if (res.status === 200) {
      const data = res.data
      setDetail(data.detail)
      setStravaId(data.stravaId)
      setStravaFullName(data.stravaFullname)
      setStravaImage(data.stravaImage)
      if (data.detail === 'Strava has been connected') {
        setStatus(true)
      }
    }
  }
  return (
    <div id='connect-container'>
      <div id='avatar-connect-container'>
        <div>
          <img src='/strava-icon.png' alt='Strava' id='strava-icon' />
        </div>
        {status ? <i className='pi pi-link' aria-hidden='true'></i> : null}
        {status ? (
          <div>
            <img src={stravaImage} alt='Strava' id='strava-icon' />
          </div>
        ) : null}
      </div>

      <div id='default-container'>
        <span>{detail}</span>
      </div>
      <a
        id='connect-container'
        href={`https://www.strava.com/athletes/${stravaId}`}
      >
        {`https://www.strava.com/athletes/${stravaId}`}
      </a>
      <Button
        id='button-detail'
        severity='secondary'
        raised
        icon='pi pi-paperclip'
        iconPos='right'
        label={status ? 'Hủy kết nối Strava' : 'Kết nối Strava'}
        onClick={handleAuth}
      />
    </div>
  )
}

export default Connect
