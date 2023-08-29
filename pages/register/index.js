import Form, { Field } from '@/components/react-hook-form/Form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from 'primereact/checkbox'
import Link from 'next/link'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'

const Register = () => {
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
      <div id='signup-container'>
        <div id='signup-card'>
          <div id='signup-title'>
            <h1>Sign up</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)} defaultValues={defaultValues}>
            <div id='form'>
              <div className='grid'>
                <div className='col-6' id='width-100-center'>
                  <Field
                    name='firstName'
                    label='First name'
                    control={control}
                    required
                    errors={errors}
                  >
                    <InputText type='text' style={{ width: '100%' }} />
                  </Field>
                </div>
                <div className='col-6' id='width-100-center'>
                  <Field
                    name='lastName'
                    label='Last name'
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
                    name='username'
                    label='Username '
                    control={control}
                    required
                    errors={errors}
                  >
                    <InputText type='text' style={{ width: '100%' }} />
                  </Field>
                </div>
              </div>
              <div className='grid'>
                <div className='col-6' id='width-100-center'>
                  <Field
                    name='password'
                    label='Password'
                    control={control}
                    required
                    errors={errors}
                  >
                    <Password type='password' style={{ width: '100%' }} />
                  </Field>
                </div>
              </div>
              <div className='grid'>
                <div className='col-6' id='width-100-center'>
                  <Field
                    name='confirmPassword'
                    label='Confirm password'
                    control={control}
                    required
                    errors={errors}
                  >
                    <Password type='password' style={{ width: '100%' }} />
                  </Field>
                </div>
              </div>
              <div className='grid'>
                <div className='col-12' id='width-100-center'>
                  <Field
                    name='email'
                    label='Email address'
                    control={control}
                    required
                    errors={errors}
                  >
                    <InputText type='text' style={{ width: '100%' }} />
                  </Field>
                </div>
              </div>
              <div className='grid' id='agree-container'>
                <div className='col-6' id='checkbox'>
                  <Field
                    name='agree'
                    label='I Agree with privacy and policy'
                    control={control}
                    errors={errors}
                  >
                    <Checkbox
                      inputId='agree'
                      checked
                      onChange={(e) => onChange(e.checked)}
                    />
                  </Field>
                </div>
              </div>
              <div className='grid'>
                <div className='col-12' id='multi-color-border-login'>
                  <Button
                    type='submit'
                    label='Sign up'
                    severity='secondary'
                    raised
                    id='button-dark'
                  />
                </div>
              </div>
              <div className='grid'>
                <div className='col-12' id='register-signin-title'>
                  Already have an account?
                  <Link href='/login'> Sign in now</Link>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register
