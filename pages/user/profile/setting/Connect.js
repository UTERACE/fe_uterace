import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button } from 'primereact/button'
import React, { useContext, useEffect, useState } from 'react'

const Connect = ({ t, isMobile = false }) => {
  const showToast = useToast().showToast
  const setLoading = useContext(LoadingContext)
  const router = useRouter()

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

  // Hàm xử lý khi người dùng muốn kết nối với Strava
  const handleAuth = async () => {
    window.location = `https://www.strava.com/oauth/authorize?client_id=${strava_client_id}&response_type=${strava_response_type}&redirect_uri=${strava_redirect_uri}&approval_prompt=${strava_approval_prompt}&scope=${strava_scope},activity:${strava_activity}`
  }

  // Hàm xử lý khi người dùng đã có mã authorization từ Strava
  const handleConnectStrava = async (authorizationCode) => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/strava/connect`, {
        code: authorizationCode,
      })
      if (res.status === 200) {
        if (res.data.status === 201) {
          showToast('warn', t('connect_strava_fail'), res.data.detail)
          setLoading(false)
          return
        }
        if (res.data.status === 400) {
          showToast('error', t('connect_strava_fail'), res.data.detail)
          setLoading(false)
          return
        }
        showToast('success', t('connect_strava_success'), res.data.detail)
        fetchStatus()
        setLoading(false)
      }
    } catch (e) {
      showToast('error', t('connect_strava_fail'))
      setLoading(false)
    }
  }

  // Hàm xử lý khi người dùng muốn ngắt kết nối với Strava
  const handleDisconnectStrava = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.post(`/strava/disconnect`)
      if (res.status === 200) {
        showToast('success', t('disconnect_strava_success'), res.data.detail)
        fetchStatus()
        setLoading(false)
      }
    } catch (e) {
      showToast('error', t('disconnect_strava_fail'))
      setLoading(false)
    }
  }

  // useEffect để xử lý khi có mã authorization từ Strava
  useEffect(() => {
    const authorizationCode = router.query.code
    if (authorizationCode) {
      handleConnectStrava(authorizationCode)
    }
  }, [router.query.code])

  // useEffect để cập nhật trạng thái kết nối Strava
  useEffect(() => {
    fetchStatus()
  }, [])

  // Hàm lấy trạng thái kết nối Strava từ API
  const fetchStatus = async () => {
    try {
      const res = await apiInstance.get(`/strava/status`)
      if (res.status === 200) {
        const data = res.data
        setDetail(data.detail || '')
        setStravaId(data.stravaId || '')
        setStravaFullName(data.stravaFullname || '')
        setStravaImage(data.stravaImage || '')
        if (data.detail === 'Strava has been connected') {
          setStatus(true)
        } else {
          setStatus(false)
        }
      }
    } catch (e) {
      showToast('error', t('fetch_status_fail'), e.message)
    }
  }

  return (
    <div id='connect-container'>
      <div id='avatar-connect-container'>
        <div>
          <Image
            src='/strava-icon.png'
            alt='Strava'
            id='strava-icon'
            width={20}
            height={20}
          />
        </div>
        {status && stravaImage ? (
          <i className='pi pi-link' aria-hidden='true'></i>
        ) : null}
        {status && stravaImage ? (
          <div>
            <Image
              src={stravaImage}
              alt='Strava'
              id='strava-icon'
              width={20}
              height={20}
            />
          </div>
        ) : null}
      </div>

      <div id='default-container'>
        <span>{status ? t('strava_connected') : t('not_connected')}</span>
      </div>
      <a
        id='connect-container'
        style={isMobile ? { fontSize: '0.8rem' } : {}}
        href={`https://www.strava.com/athletes/${stravaId}`}
      >
        {stravaId ? `https://www.strava.com/athletes/${stravaId}` : ''}
      </a>
      <Button
        id='button-detail'
        severity='secondary'
        raised
        icon='pi pi-paperclip'
        iconPos='right'
        label={status ? t('disconnect_strava') : t('connect_strava')}
        onClick={() => {
          if (status) {
            handleDisconnectStrava()
          } else {
            handleAuth()
          }
        }}
      />
    </div>
  )
}

export default Connect
