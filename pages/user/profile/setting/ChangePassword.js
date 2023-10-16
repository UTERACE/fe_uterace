import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import Form, { Field } from '@/components/react-hook-form/Form'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import React, { useContext } from 'react'

const ChangePassword = () => {
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  const onSubmit = (data) => {
    handleResetPassword(data)
  }
  const handleResetPassword = async (data) => {
    setLoading(true)
    let { confirmPassword, ...rest } = data
    console.log('data', rest)
    try {
      const res = await apiInstance.put('/user/change-password', rest)
      console.log('res', res.data)
      if (res.data.status === 200) {
        showToast('success', 'Đổi mật khẩu thành công!', res.data.message)
      } else {
        showToast('error', 'Đổi mật khẩu thất bại!', res.data.message)
      }
    } catch (err) {
      showToast('error', 'Đổi mật khẩu thất bại!', err.response.data.message)
    }
    setLoading(false)
  }
  return (
    <Form onSubmit={onSubmit}>
      <div id='form-setting'>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field name='old_password' label='Mật khẩu cũ' required>
              <Password type='password' style={{ width: '100%' }} toggleMask />
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field name='new_password' label='Mật khẩu mới' required>
              <Password type='password' style={{ width: '100%' }} toggleMask />
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field name='confirmPassword' label='Xác nhận mật khẩu' required>
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
              label='Cập nhật'
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

export default ChangePassword
