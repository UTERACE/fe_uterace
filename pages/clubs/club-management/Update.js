import Form, { Field } from '@/components/react-hook-form/Form'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useState } from 'react'
import { set, useForm } from 'react-hook-form'

const Update = ({ image, name, description }) => {
  const [nameClub, setNameClub] = useState(name)
  const [background, setBackground] = useState(image)
  const {
    watch,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }
  const customBase64Uploader = async (event) => {
    const file = event.files[0]
    const reader = new FileReader()

    let blob = await fetch(file.objectURL).then((r) => r.blob())

    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      const base64data = reader.result
      setBackground(base64data)
    }
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div id='update-info-container'>
        <div id='background-club-container'>
          <img src={background} alt='background' />
        </div>
        <div id='camera-upload-container'>
          <i className='fas fa-camera'></i>
        </div>
        <div id='file-upload'>
          <FileUpload
            mode='basic'
            name='demo[]'
            url='/user/profile'
            accept='image/*'
            maxFileSize={1000000}
            onUpload={customBase64Uploader}
            auto
            chooseLabel='Chọn ảnh'
          />
        </div>

        <div id='info-detail'>
          <Field
            name='name'
            label='Tên câu lạc bộ'
            control={control}
            required
            errors={errors}
            watch={watch}
            defaultValues={name || ''}
          >
            <InputText
              type='text'
              style={{ width: '100%' }}
              onChange={(e) => {
                setNameClub(e.target.value)
                console.log(e.target.value)
              }}
            />
          </Field>
          <div style={{ height: '1.5rem' }}></div>
          <Field
            name='description'
            label='Mô tả'
            control={control}
            required
            errors={errors}
            defaultValues={description || ''}
          >
            <InputTextarea
              type='text'
              style={{ width: '100%', height: '8rem' }}
            />
          </Field>
          <h1>{nameClub}</h1>
          <h6>{description}</h6>
        </div>
        <Button
          id='button-detail'
          type='submit'
          style={{
            marginTop: '2rem',
            marginBottom: '2rem',
            height: '3rem',
            fontWeight: 'bold',
          }}
          label='Cập nhật thông tin'
          severity='secondary'
          raised
          icon='pi pi-pencil'
          iconPos='right'
        />
      </div>
    </Form>
  )
}

export default Update
