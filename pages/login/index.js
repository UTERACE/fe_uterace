import Form, { Field } from '@/components/react-hook-form/Form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from 'primereact/checkbox'
import Link from 'next/link'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'

const Login = () => {
  const defaultValues = {
    checked: false,
  }
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <div className='centered-content-full'>
      <div id='signin-container'>
        <div id='signin-card'>
          <div id='signin-title'>
            <h1>Sign in</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)} defaultValues={defaultValues}>
            <div id='form'>
              <div className='grid'>
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
              <div className='grid'>
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
              <div className='grid' id='remember-forgot-container'>
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
              <div className='grid'>
                <div className='col-12' id='multi-color-border-login'>
                  <Button
                    type='submit'
                    label='Sign in'
                    severity='secondary'
                    raised
                    id='button-dark'
                  />
                </div>
              </div>
              <div className='grid' id='top-8'>
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
