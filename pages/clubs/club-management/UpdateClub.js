import apiInstance from '@/api/apiInstance'
import Form, { Field } from '@/components/react-hook-form/Form'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useEffect, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'

const Update = ({
  club_id,
  image,
  name,
  description,
  setLoading,
  showToast,
  setVisibleChange,
  setUpdate,
}) => {
  const [nameEvent, setNameEvent] = useState(name)
  const [descriptionEvent, setDescriptionEvent] = useState(description)
  const [background, setBackground] = useState(image)

  const [initialValues, setInitialValues] = useState({})
  const inputRef = useRef()

  useEffect(() => {
    setInitialValues({
      name: name,
      description: description,
    })
  }, [])

  const onSubmit = (data) => {
    data.club_id = parseInt(club_id)
    data.image = background
    handleUpdateClub(data)
  }

  const handleUpdateClub = async (data) => {
    setLoading(true)
    try {
      const res = await apiInstance.put('/clubs', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', 'Chỉnh sửa câu lạc bộ thành công')
        setLoading(false)
        setVisibleChange(false)
        setUpdate(true)
      }
    } catch (error) {
      showToast('error', 'Chỉnh sửa câu lạc bộ thất bại', error)
      setLoading(false)
    }
  }

  const customBase64Uploader = async (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 2000000) {
        showToast(
          'error',
          'Tải ảnh lên thất bại',
          'Kích thước ảnh tối đa là 2MB'
        )
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64Data = e.target.result
        setBackground(base64Data)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Form onSubmit={onSubmit} initialValue={initialValues}>
      <div id='update-info-container'>
        <div
          id='background-club-container'
          onClick={() => {
            inputRef.current.click()
          }}
        >
          <AvatarEditor
            image={background}
            style={{ width: '100%', height: '100%', borderRadius: '15px' }}
            width={1200}
            height={630}
            scale={1}
          />
          <div id='file-upload'>
            <i className='pi pi-image p-icon-lg'></i>
          </div>
        </div>
        <input
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={customBase64Uploader}
          style={{ display: 'none' }}
        />

        <div id='info-detail'>
          <Field name='name' label='Tên câu lạc bộ' required>
            <InputText
              type='text'
              style={{ width: '100%' }}
              onChange={(e) => {
                setNameEvent(e.target.value)
              }}
            />
          </Field>
          <div style={{ height: '1.5rem' }}></div>
          <Field name='description' label='Mô tả' required>
            <InputTextarea
              type='text'
              style={{ width: '100%', height: '8rem' }}
              onChange={(e) => {
                setDescriptionEvent(e.target.value)
              }}
            />
          </Field>
          <h1>{nameEvent}</h1>
          <h6>{descriptionEvent}</h6>
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
