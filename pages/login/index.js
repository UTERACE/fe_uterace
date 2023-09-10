import Form, { Field } from '@/components/react-hook-form/Form'
import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form'
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

const Login = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const showToast = useToast().showToast
  const setLoading = useContext(LoadingContext)
  const defaultValues = {}
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => {
    handleLogin(data)
  }
  const router = useRouter()
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/landing')
    }
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
        const { accessToken, refreshToken, fullName, image } = response.data
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        dispatch(login({ accessToken, refreshToken, image, fullName }))
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
  const handleClickLoginGoogle = () => {
    console.log('login google')
  }
  const handleClickLoginFacebook = () => {
    console.log('login facebook')
  }
  return (
    <div className='centered-content-full'>
      <div id='signin-container'>
        <div id='signin-card'>
          <div id='signin-title'>
            <h1>Sign in</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)} defaultValues={defaultValues}>
            <div id='form'>
              <div className='grid-form'>
                <div className='col-12' id='width-100-center'>
                  <Field
                    name='username'
                    label='Username or email address'
                    control={control}
                    required
                    errors={errors}
                    defaultValues={localStorage.getItem('username') || ''}
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
                    control={control}
                    required
                    errors={errors}
                    defaultValues={localStorage.getItem('password') || ''}
                  >
                    <Password type='password' style={{ width: '100%' }} toggleMask/>
                  </Field>
                </div>
              </div>
              <div className='grid-form' id='remember-forgot-container'>
                <div className='col-6' id='checkbox'>
                  <Field
                    name='remember'
                    label='Remember me'
                    control={control}
                    errors={errors}
                    defaultValues={true}
                  >
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
