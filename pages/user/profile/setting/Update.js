import React from 'react'
import { useForm } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import Form, { Field } from '@/components/react-hook-form/Form'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import { Button } from 'primereact/button'

const Update = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }
  const gender = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' },
  ]
  const organization = [
    { label: 'Đại học Bách Khoa Hà Nội', value: 'bk' },
    { label: 'Đại học Công Nghệ', value: 'ctu' },
    { label: 'Đại học Công Nghiệp', value: 'iuh' },
    { label: 'Đại học Kinh Tế', value: 'ueh' },
    { label: 'Đại học Khoa Học Tự Nhiên', value: 'hcmus' },
    { label: 'Đại học Sư Phạm', value: 'hcmup' },
    { label: 'Đại học Sư Phạm Kỹ Thuật', value: 'hcmute' },
    { label: 'Đại học Sư Phạm Thể Dục Thể Thao', value: 'hsp' },
  ]
  const childOrganization = [
    { label: 'Khoa Công Nghệ Thông Tin', value: 'fit' },
    { label: 'Khoa Khoa Học và Kỹ Thuật Máy Tính', value: 'cse' },
    { label: 'Khoa Kiến Trúc', value: 'arch' },
    { label: 'Khoa Kỹ Thuật Hóa Học', value: 'che' },
    { label: 'Khoa Kỹ Thuật Công Nghiệp', value: 'ie' },
    { label: 'Khoa Kỹ Thuật Điện Tử Viễn Thông', value: 'et' },
    { label: 'Khoa Kỹ Thuật Môi Trường', value: 'env' },
    { label: 'Khoa Kỹ Thuật Vật Liệu', value: 'mat' },
    { label: 'Khoa Toán - Cơ - Tin Học', value: 'math' },
    { label: 'Khoa Vật Lý Kỹ Thuật', value: 'pe' },
    { label: 'Khoa Quản Trị Kinh Doanh', value: 'bs' },
    { label: 'Khoa Khoa Học và Kỹ Thuật Vật Liệu', value: 'mse' },
    { label: 'Khoa Kỹ Thuật Cơ Khí', value: 'me' },
    { label: 'Khoa Kỹ Thuật Điện', value: 'ee' },
    { label: 'Khoa Kỹ Thuật Điện Tử', value: 'eet' },
    { label: 'Khoa Kỹ Thuật Máy Tính và Mạng', value: 'cse' },
  ]
  const ward = [
    { label: 'Phường 1', value: '1' },
    { label: 'Phường 2', value: '2' },
    { label: 'Phường 3', value: '3' },
    { label: 'Phường 4', value: '4' },
    { label: 'Phường 5', value: '5' },
  ]
  const district = [
    { label: 'Quận 1', value: '1' },
    { label: 'Quận 2', value: '2' },
    { label: 'Quận 3', value: '3' },
    { label: 'Quận 4', value: '4' },
    { label: 'Quận 5', value: '5' },
  ]
  const city = [
    { label: 'Hồ Chí Minh', value: 'hcm' },
    { label: 'Hà Nội', value: 'hn' },
    { label: 'Đà Nẵng', value: 'dn' },
    { label: 'Cần Thơ', value: 'ct' },
    { label: 'Hải Phòng', value: 'hp' },
  ]
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div id='form-setting'>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field
              name='firstName'
              label='Tên'
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
              label='Họ'
              control={control}
              required
              errors={errors}
            >
              <InputText type='text' style={{ width: '100%' }} />
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field
              name='email'
              label='Email'
              control={control}
              required
              errors={errors}
            >
              <InputText type='text' style={{ width: '100%' }} />
            </Field>
          </div>
          <div className='col-6' id='width-100-center'>
            <Field name='phone' label='Số điện thoại' control={control}>
              <InputMask
                mask='(999) 999-9999'
                placeholder='(999) 999-9999'
                style={{ width: '100%' }}
              ></InputMask>
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field name='gender' label='Giới tính' control={control}>
              <Dropdown
                options={gender}
                style={{ width: '100%', borderRadius: '10px' }}
              ></Dropdown>
            </Field>
          </div>
          <div className='col-6' id='width-100-center'>
            <Field name='birthday' label='Ngày sinh' control={control}>
              <Calendar style={{ width: '100%' }}></Calendar>
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-12' id='width-100-center'>
            <Field
              name='organization'
              label='Danh sách tổ chức'
              control={control}
            >
              <Dropdown
                options={organization}
                style={{ width: '100%', borderRadius: '10px' }}
              ></Dropdown>
            </Field>
          </div>
          <div className='col-12' id='width-100-center'>
            <Field
              name='childOrganization'
              label='Danh sách đơn vị'
              control={control}
            >
              <Dropdown
                options={childOrganization}
                style={{ width: '100%', borderRadius: '10px' }}
              ></Dropdown>
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-12' id='width-100-center'>
            <Field name='city' label='Tỉnh/Thành phố' control={control}>
              <Dropdown
                options={city}
                style={{ width: '100%', borderRadius: '10px' }}
              ></Dropdown>
            </Field>
          </div>
          <div className='col-12' id='width-100-center'>
            <Field name='district' label='Quận/Huyện' control={control}>
              <Dropdown
                options={district}
                style={{ width: '100%', borderRadius: '10px' }}
              ></Dropdown>
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-12' id='width-100-center'>
            <Field name='ward' label='Phường/Xã' control={control}>
              <Dropdown
                options={ward}
                style={{ width: '100%', borderRadius: '10px' }}
              ></Dropdown>
            </Field>
          </div>
          <div className='col-12' id='width-100-center'>
            <Field name='address' label='Địa chỉ chi tiết' control={control}>
              <InputText type='text' style={{ width: '100%' }} />
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

export default Update
