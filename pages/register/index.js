import Form, { Field } from '@/components/react-hook-form/Form'
import React, { useContext, useEffect, useState } from 'react'
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
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export const getServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['topbar', 'register'])),
    },
  }
}

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

  const { t } = useTranslation('register')

  const [initialValues, setInitialValues] = useState({})
  const [checked, setChecked] = useState(true)
  const recaptcha_site_key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  useEffect(() => {
    setInitialValues({
      firstname: firstName || '',
      lastname: lastName || '',
      username: id || '',
      email: email || '',
      image: image || '',
      agree: checked,
    })
  }, [type])

  async function onSubmit(data) {
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
          handleRegister(rest)
        })
    })
  }

  const handleRegister = async (data) => {
    setLoading(true)
    try {
      const response = await apiInstance.post('/auth/register', data)
      if (response.data.status === 201) {
        showToast('success', t('sign_up_success'), response.data.message)
        setVisibleThirdParty(false)
        router.push('/login')
        setLoading(false)
      }
    } catch (error) {
      showToast('error', t('sign_up_failed'), error.response.data.message)
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
      <div id='form-container'>
        <div id='form-card'>
          <div id='form-title'>
            {type === 'default' ? (
              <h1>{t('sign_up')}</h1>
            ) : (
              <Avatar image={image} size='xlarge' shape='circle' />
            )}
          </div>
          <Form onSubmit={onSubmit} initialValue={initialValues}>
            <div id='form'>
              <div className='grid-form'>
                <div className='col-6' id='width-100-center'>
                  <Field name='firstname' label={t('first_name')} required>
                    <InputText type='text' style={{ width: '100%' }} />
                  </Field>
                </div>
                <div className='col-6' id='width-100-center'>
                  <Field name='lastname' label={t('last_name')} required>
                    <InputText type='text' style={{ width: '100%' }} />
                  </Field>
                </div>
              </div>
              {type !== 'google' ? (
                <div className='grid-form'>
                  <div className='col-12' id='width-100-center'>
                    <Field name='username' label={t('username')} required>
                      <InputText
                        type='text'
                        style={{ width: '100%' }}
                        disabled={type === 'facebook'}
                      />
                    </Field>
                  </div>
                </div>
              ) : null}
              <div className='grid-form'>
                <div className='col-6' id='width-100-center'>
                  <Field name='password' label={t('password')} required>
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
                    label={t('confirm_password')}
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
                <div className='col-6' id='width-100-center'>
                  <Field name='birthday' label={t('birthday')} required>
                    <Calendar showTime={false} style={{ width: '100%' }} />
                  </Field>
                </div>
                <div className='col-6' id='width-100-center'>
                  <Field name='gender' label='Giới tính' required>
                    <Dropdown
                      options={genderOptions}
                      style={{ width: '100%', borderRadius: '1rem' }}
                    />
                  </Field>
                </div>
              </div>
              <div className='grid-form'>
                <div className='col-12' id='width-100-center'>
                  <Field name='email' label={t('email')} required>
                    <InputText
                      type='text'
                      style={{ width: '100%' }}
                      disabled={type === 'google'}
                    />
                  </Field>
                </div>
              </div>
              <div className='grid' id='remember-forgot-container'>
                <Field name='agree' label={t('policy')}>
                  <Checkbox
                    inputId='agree'
                    checked={checked}
                    onChange={(e) => setChecked(e.checked)}
                  />
                </Field>
              </div>
              <div className='grid-form'>
                <Button
                  type='submit'
                  label={t('sign_up')}
                  severity='secondary'
                  raised
                  id='button-detail'
                  style={{ width: '100%', marginTop: '2rem' }}
                />
              </div>
              <div className='grid-form'>
                <div className='col-12' id='signin-signup-title'>
                  {t('already_have_account')}
                  <Link href='/login'> {t('sign_in_now')}</Link>
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
