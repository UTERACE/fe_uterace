import Form, { Field } from '@/components/react-hook-form/Form'
import React, { useContext, useEffect, useState } from 'react'
import { Checkbox } from 'primereact/checkbox'
import Link from 'next/link'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import apiInstance from '@/api/apiInstance'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '@/store/slices/authSlice'
import { useRouter } from 'next/router'
import { useToast } from '@/components/contexts/ToastContext'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import store from '@/store/store'
import { set } from 'react-hook-form'
import { useGoogleLogin } from '@react-oauth/google'
import { Dialog } from 'primereact/dialog'
import Register from '../register'

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const showToast = useToast().showToast
  const setLoading = useContext(LoadingContext)
  const [initialValues, setInitialValues] = useState({})
  const [visibleThirdParty, setVisibleThirdParty] = useState(false)
  const [visibleFacebook, setVisibleFacebook] = useState(false)

  const [responseThirdParty, setResponseThirdParty] = useState({})
  const [typeThirdParty, setTypeThirdParty] = useState('')
  const [responseFacebook, setResponseFacebook] = useState({})
  const onSubmit = (data) => {
    handleLogin(data)
  }
  const router = useRouter()
  useEffect(() => {
    setLoading(true)
    setIsAuthenticated(store.getState().auth.isAuthenticated)
    setInitialValues({
      username: localStorage.getItem('username') || '',
      password: localStorage.getItem('password') || '',
      remember: true,
    })
    if (isAuthenticated) {
      router.push('/landing')
      setLoading(false)
    }
    setLoading(false)
  }, [isAuthenticated])
  const handleLogin = async (data) => {
    setLoading(true)
    try {
      if (data.remember) {
        localStorage.setItem('username', data.username)
        localStorage.setItem('password', data.password)
      } else {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
      }
      console.log(data)
      let { remember, ...rest } = data
      console.log('rest', rest)
      const response = await apiInstance.post('/auth/login', rest, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log('response', response)
      if (response.status === 200) {
        const { accessToken, refreshToken, firstname, image, roles } =
          response.data
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        store.dispatch(
          login({ accessToken, refreshToken, image, firstname, roles })
        )
        setIsAuthenticated(store.getState().auth.isAuthenticated)
        showToast('success', 'Đăng nhập thành công ', response.data.detail)
        setLoading(false)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showToast('error', 'Đăng nhập thất bại', error.response.data.detail)
        setLoading(false)
      } else {
        showToast(
          'error',
          'Lỗi trong quá trình đăng nhập',
          `Vui lòng đăng nhập lại ${error}`
        )
        setLoading(false)
      }
    }
  }
  const loginGoogle = useGoogleLogin({
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    redirectUri: 'http://localhost:3000',
    onSuccess: (res) => {
      const request = JSON.stringify({
        accessToken: res.access_token,
        type: 'google',
      })
      setTypeThirdParty('google')
      handleLoginThirdParty(request)
    },
    onFailure: (res) => {
      console.log('login google', res)
    },
  })
  const handleLoginThirdParty = async (request) => {
    try {
      const response = await apiInstance.post(
        '/auth/login/third-party',
        request,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.data.newUser) {
        setResponseThirdParty(response.data)
        setVisibleThirdParty(true)
      } else {
        const { accessToken, refreshToken, firstname, image, roles } =
          response.data
        store.dispatch(
          login({ accessToken, refreshToken, image, firstname, roles })
        )
        setIsAuthenticated(store.getState().auth.isAuthenticated)
        showToast('success', 'Đăng nhập thành công ', response.data.detail)
        setLoading(false)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v18.0',
      })
    }
    ;(function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
  }, [])
  const loginFacebook = () => {
    setLoading(true)
    FB.login(
      function (response) {
        if (response.authResponse) {
          var accessToken = response.authResponse.accessToken
          const request = JSON.stringify({
            accessToken: accessToken,
            type: 'facebook',
          })
          console.log('re', request)
          setTypeThirdParty('facebook')
          handleLoginThirdParty(request)
        } else {
          console.log('User cancelled login or did not fully authorize.')
        }
      },
      { scope: 'email' }
    )
  }
  const handleClickLoginGoogle = () => {
    loginGoogle()
  }
  const handleClickLoginFacebook = () => {
    loginFacebook()
  }
  return (
    <div className='centered-content-full'>
      <Dialog
        header={`Đăng ký tài khoản với ${
          typeThirdParty === 'facebook' ? 'Facebook' : 'Google'
        }`}
        visible={visibleThirdParty}
        position='top'
        style={{
          width: '60%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleThirdParty(false)}
      >
        <Register
          id={responseThirdParty.id}
          firstName={responseThirdParty.firstname}
          lastName={responseThirdParty.lastname}
          email={responseThirdParty.email}
          image={responseThirdParty.image}
          type={typeThirdParty}
          setVisibleThirdParty={setVisibleThirdParty}
        />
      </Dialog>
      <div id='signin-container'>
        <div id='signin-card'>
          <div id='signin-title'>
            <h1>Sign in</h1>
          </div>
          <Form onSubmit={onSubmit} initialValue={initialValues}>
            <div id='form'>
              <div className='grid-form'>
                <div className='col-12' id='width-100-center'>
                  <Field
                    name='username'
                    label='Username or email address'
                    required
                  >
                    <InputText type='text' style={{ width: '100%' }} />
                  </Field>
                </div>
              </div>
              <div className='grid-form'>
                <div className='col-12' id='width-100-center'>
                  <Field
                    name='password'
                    label='Password(8 characters minimum)'
                    required
                  >
                    <Password
                      type='password'
                      style={{ width: '100%' }}
                      toggleMask
                    />
                  </Field>
                </div>
              </div>
              <div className='grid-form' id='remember-forgot-container'>
                <div className='col-6' id='checkbox'>
                  <Field name='remember' label='Remember me'>
                    <Checkbox
                      inputId='remember'
                      checked
                      onChange={(e) => onChange(e.checked)}
                    />
                  </Field>
                </div>
                <div className='col-6' id='forgot-title'>
                  <Link href='/landing'>Forgot password?</Link>
                </div>
              </div>
              <div className='grid-form'>
                <div className='col-12' id='multi-color-border-login'>
                  <Button
                    icon='pi pi-sign-in'
                    type='submit'
                    label='Sign in'
                    severity='secondary'
                    raised
                    id='button-dark'
                  />
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignContent: 'center',
                  justifyContent: 'center',
                  marginTop: '2rem',
                }}
              >
                Or Using
              </div>
              <div className='grid-form'>
                <div className='col-12' id='border-login'>
                  <Button
                    label='Countinue with Facebook'
                    icon='pi pi-facebook'
                    severity='secondary'
                    raised
                    id='button-dark'
                    type='button'
                    onClick={() => {
                      handleClickLoginFacebook()
                    }}
                  />
                </div>
                <div className='col-12' id='border-login'>
                  <Button
                    label='Countinue with Google'
                    icon='pi pi-google'
                    severity='secondary'
                    raised
                    id='button-dark'
                    type='button'
                    onClick={() => {
                      handleClickLoginGoogle()
                    }}
                  />
                </div>
              </div>

              <div className='grid-form' id='top-8'>
                <div className='col-12' id='login-signup-title'>
                  Don't have an account?
                  <Link href='/register'> Sign up now</Link>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
