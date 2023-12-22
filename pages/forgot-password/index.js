import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import React, { useContext } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Form, { Field } from '@/components/react-hook-form/Form'
import { InputText } from 'primereact/inputtext'
import apiInstance from '@/api/apiInstance'
import { Button } from 'primereact/button'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['topbar', 'forgot-password'])),
    },
  }
}

const ForgotPassword = () => {
  const showToast = useToast().showToast
  const setLoading = useContext(LoadingContext)
  const router = useRouter()

  const { t } = useTranslation('forgot-password')

  const onSubmit = (data) => {
    handleResetPassword(data)
  }
  const handleResetPassword = async (data) => {
    setLoading(true)
    try {
      const res = await apiInstance.post('/auth/reset-password', data)
      if (res.status === 200) {
        if (res.data.status === 409) {
          if (res.data.message === 'Reset password failed') {
            showToast('error', t('forgot_password_fail'), t('email_not_send'))
            setLoading(false)
          } else if (res.data.message === 'Username not found') {
            showToast('error', t('account_not_found'), t('username_not_found'))
            setLoading(false)
          } else if (res.data.message === 'Email not found') {
            showToast('error', t('account_not_found'), t('email_not_found'))
            setLoading(false)
          }
        } else if (res.data.status === 200) {
          showToast('success', t('forgot_password_success'))
          setLoading(false)
          router.push('/login')
        }
      }
    } catch (e) {
      showToast('error', t('forgot_password_fail'))
      setLoading(false)
    }
  }
  return (
    <div className='centered-content-full'>
      <div id='form-container'>
        <div id='form-card'>
          <div id='form-title'>
            <h1>{t('forgot-password')}</h1>
          </div>
          <Form onSubmit={onSubmit}>
            <div id='form'>
              <div className='grid-form'>
                <div className='col-12' id='width-100-center'>
                  <Field name='username' label={t('username')} required>
                    <InputText
                      type='text'
                      style={{ width: '100%' }}
                      tooltip={t('enter_username')}
                      tooltipOptions={{ event: 'focus' }}
                    />
                  </Field>
                </div>
              </div>
              <div className='grid-form'>
                <div className='col-12' id='width-100-center'>
                  <Field name='email' label={t('email')} required>
                    <InputText type='text' style={{ width: '100%' }} />
                  </Field>
                </div>
              </div>
              <div className='grid-form'>
                <Button
                  type='submit'
                  label={t('send_email')}
                  severity='secondary'
                  raised
                  id='button-detail'
                  style={{ width: '100%', marginTop: '2rem' }}
                />
              </div>
              <div className='grid-form'>
                <div className='col-12' id='signin-signup-title'>
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

export default ForgotPassword
