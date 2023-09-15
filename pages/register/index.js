import Form, { Field } from '@/components/react-hook-form/Form'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Checkbox } from 'primereact/checkbox'
import Link from 'next/link'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { ReCAPTCHA } from 'react-google-recaptcha'
import { Helmet } from 'react-helmet'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import apiInstance from '@/api/apiInstance'
import { useRouter } from 'next/router'
import { useToast } from '@/components/contexts/ToastContext'

const Register = () => {
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  const router = useRouter()
  const [initialValues, setInitialValues] = useState({})

  async function onSubmit(data) {
    // Lấy giá trị token từ reCAPTCHA
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute('6LdE3BQoAAAAAKY9Qt2fzCo9m0qVW1H-g-fpnYJj', {
          action: 'submit',
        })
        .then(function (token) {
          // Thêm token vào formData và gửi lên server
          // data.recaptcha = token
          // Gửi formData đến server của bạn
          handleRegister(data)
        })
    })
  }
  const handleRegister = async (data) => {
    setLoading(true)
    console.log(data)
    let { agree, confirmPassword, ...rest } = data
    console.log('rest', rest)
    const response = await apiInstance.post('/auth/register', rest, {
      hearders: {
        'Content-Type': 'application/json',
      },
    })
    console.log('response', response)
    if (response.data.status === 201) {
      showToast('success', 'Đăng ki thành công ', response.data.message)
      router.push('/login')
      setLoading(false)
    }
  }

  return (
    <div className='centered-content-full'>
      <Helmet>
        <script
          src='https://www.google.com/recaptcha/api.js?render=6LdE3BQoAAAAAKY9Qt2fzCo9m0qVW1H-g-fpnYJj'
          async
          defer
        ></script>
      </Helmet>
      <ReCAPTCHA
        sitekey='6LdE3BQoAAAAAKY9Qt2fzCo9m0qVW1H-g-fpnYJj'
        size='invisible'
      />
      <div id='signup-container'>
        <div id='signup-card'>
          <div id='signup-title'>
            <h1>Sign up</h1>
          </div>
          <Form onSubmit={onSubmit} initialValue={initialValues}>
            <div id='form'>
              <div className='grid-form'>
                <div className='col-6' id='width-100-center'>
                  <Field name='firstname' label='First name' required>
                    <InputText type='text' style={{ width: '100%' }} />
                  </Field>
                </div>
                <div className='col-6' id='width-100-center'>
                  <Field name='lastname' label='Last name' required>
                    <InputText type='text' style={{ width: '100%' }} />
                  </Field>
                </div>
              </div>
              <div className='grid-form'>
                <div className='col-12' id='width-100-center'>
                  <Field name='username' label='Username ' required>
                    <InputText type='text' style={{ width: '100%' }} />
                  </Field>
                </div>
              </div>
              <div className='grid-form'>
                <div className='col-6' id='width-100-center'>
                  <Field name='password' label='Password' required>
                    <Password
                      type='password'
                      style={{ width: '100%' }}
                      toggleMask
                    />
                  </Field>
                </div>
              </div>
              <div className='grid-form'>
                <div className='col-6' id='width-100-center'>
                  <Field
                    name='confirmPassword'
                    label='Confirm password'
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
              <div className='grid-form'>
                <div className='col-12' id='width-100-center'>
                  <Field name='email' label='Email address' required>
                    <InputText type='text' style={{ width: '100%' }} />
                  </Field>
                </div>
              </div>
              <div className='grid-form' id='agree-container'>
                <div className='col-6' id='checkbox'>
                  <Field name='agree' label='I Agree with privacy and policy'>
                    <Checkbox
                      inputId='agree'
                      checked
                      onChange={(e) => onChange(e.checked)}
                    />
                  </Field>
                </div>
              </div>
              <div className='grid-form'>
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
              <div className='grid-form'>
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
