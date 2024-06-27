import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import Form, { Field } from '@/components/react-hook-form/Form'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import React, { useContext } from 'react'

const ChangePassword = ({ t, isMobile = false }) => {
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  const onSubmit = (data) => {
    handleResetPassword(data)
  }

  const handleResetPassword = async (data) => {
    setLoading(true)
    let { confirmPassword, ...rest } = data
    try {
      const res = await apiInstance.put('/user/change-password', rest)
      if (res.data.status === 200) {
        showToast('success', t('change_password_success'), res.data.message)
      } else {
        showToast('error', t('change_password_fail'), res.data.message)
      }
    } catch (err) {
      showToast('error', t('change_password_fail'), err.response.data.message)
    }
    setLoading(false)
  }

  return (
    <Form onSubmit={onSubmit}>
      <div id='form-setting' style={isMobile ? { width: 'auto' } : null}>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field name='old_password' label={t('old_password')} required>
              <Password type='password' style={{ width: '100%' }} toggleMask />
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field name='new_password' label={t('new_password')} required>
              <Password type='password' style={{ width: '100%' }} toggleMask />
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
              <Password type='password' style={{ width: '100%' }} toggleMask />
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Button
              id='button-detail'
              type='submit'
              severity='secondary'
              raised
              icon='pi pi-pencil'
              iconPos='right'
              label={t('update')}
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

export default ChangePassword
