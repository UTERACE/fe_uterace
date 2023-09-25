import Form, { Field } from '@/components/react-hook-form/Form'
import React, { useContext, useEffect, useState } from 'react'
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
import { Avatar } from 'primereact/avatar'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'

const Register = (props) => {
  let {
    id,
    firstName,
    lastName,
    email,
    image,
    type = 'default',
    setVisibleThirdParty = false,
  } = props
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  const router = useRouter()
  const [initialValues, setInitialValues] = useState({})
  const recaptcha_site_key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
  useEffect(() => {
    setInitialValues({
      firstname: firstName || '',
      lastname: lastName || '',
      username: id || '',
      email: email || '',
      image: image || '',
    })
  }, [type])
  async function onSubmit(data) {
    // Lấy giá trị token từ reCAPTCHA
    window.grecaptcha.ready(function () {
      window.grecaptcha
        .execute(recaptcha_site_key, {
          action: 'submit',
        })
        .then(function (token) {
          const date = new Date(data.birthday)
          const strBirthday =
            date.getFullYear() +
            '-' +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            '-' +
            date.getDate().toString().padStart(2, '0')
          data.recaptcha_token = token
          data.birthday = strBirthday
          data.image = image
          data.type_account = type
          if (type === 'facebook') {
            data.username = id
          }
          let { agree, confirmPassword, ...rest } = data
          console.log('rest', rest)
          handleRegister(rest)
        })
    })
  }
  const handleRegister = async (data) => {
    setLoading(true)
    try {
      const response = await apiInstance.post('/auth/register', data, {
        hearders: {
          'Content-Type': 'application/json',
        },
      })
      console.log('response', response)
      if (response.data.status === 201) {
        showToast('success', 'Đăng ki thành công ', response.data.message)
        setVisibleThirdParty(false)
        router.push('/login')
        setLoading(false)
      }
    } catch (error) {
      showToast(
        'error',
        'Đăng ki không thành công ',
        error.response.data.message
      )
      setLoading(false)
    }
  }
  const genderOptions = [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nu' },
  ]
  return (
    <div className='centered-content-full'>
      <Helmet>
        <script
          src='https://www.google.com/recaptcha/api.js?render=6LdE3BQoAAAAAKY9Qt2fzCo9m0qVW1H-g-fpnYJj'
          async
          defer
        ></script>
      </Helmet>
      <ReCAPTCHA sitekey={recaptcha_site_key} size='invisible' />
      <div id='signup-container'>
        <div id='signup-card'>
          <div id='signup-title'>
            {type === 'default' ? (
              <h1>Sign up</h1>
            ) : (
              <Avatar image={image} size='xlarge' shape='circle' />
            )}
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
              {type !== 'google' ? (
                <div className='grid-form'>
                  <div className='col-12' id='width-100-center'>
                    <Field name='username' label='Username ' required>
                      <InputText
                        type='text'
                        style={{ width: '100%' }}
                        disabled={type === 'facebook'}
                      />
                    </Field>
                  </div>
                </div>
              ) : null}
              {/* {type !== 'facebook' ? ( */}
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
              {/* ) : null}
              {type !== 'facebook' ? ( */}
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
              {/* ) : null} */}
              <div className='grid-form'>
                <div className='col-6' id='width-100-center'>
                  <Field name='birthday' label='Ngày sinh' required>
                    <Calendar showTime={false} style={{ width: '100%' }} />
                  </Field>
                </div>
                <div className='col-6' id='width-100-center'>
                  <Field name='gender' label='Giới tính' required>
                    <Dropdown
                      options={genderOptions}
                      style={{ width: '100%', borderRadius: '10px' }}
                    />
                  </Field>
                </div>
              </div>
              <div className='grid-form'>
                <div className='col-12' id='width-100-center'>
                  <Field name='email' label='Email address' required>
                    <InputText
                      type='text'
                      style={{ width: '100%' }}
                      disabled={type === 'google'}
                    />
                  </Field>
                </div>
              </div>
              <div className='grid' id='agree-container'>
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
