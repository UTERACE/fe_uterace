import Form, { Field } from '@/components/react-hook-form/Form'
import React from 'react'
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

const Login = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const defaultValues = {
    checked: false,
  }
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
  const handleLogin = async (data) => {
    try {
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
        const { accessToken, refreshToken } = response.data
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        dispatch(login({ accessToken, refreshToken }))
        router.push('/')
      }
    } catch (error) {
      console.log(error)
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
                  >
                    <Password type='password' style={{ width: '100%' }} />
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
