import Form, { Field } from '@/components/react-hook-form/Form'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import React from 'react'
import { useForm } from 'react-hook-form'

const ChangePassword = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div id='form-setting'>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field
              name='oldPassword'
              label='Mật khẩu cũ'
              control={control}
              required
              errors={errors}
            >
              <Password type='password' style={{ width: '100%' }} toggleMask />
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field
              name='newPassword'
              label='Mật khẩu mới'
              control={control}
              required
              errors={errors}
            >
              <Password type='password' style={{ width: '100%' }} toggleMask />
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field
              name='confirmPassword'
              label='Xác nhận mật khẩu'
              control={control}
              required
              errors={errors}
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
              label='Cập nhật'
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

export default ChangePassword
