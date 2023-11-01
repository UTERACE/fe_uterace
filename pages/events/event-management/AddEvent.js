import Form, { Field } from '@/components/react-hook-form/Form'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useEffect, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import dynamic from 'next/dynamic'
import apiInstance from '@/api/apiInstance'

const DynamicTinyMCE = dynamic(
  () => import('../../../components/editor/TinyMCEEditor'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)
const AddEvent = ({ setLoading, showToast, setVisibleAdd }) => {
  const [nameEvent, setNameEvent] = useState('')
  const [descriptionEvent, setDescriptionEvent] = useState('')
  const [background, setBackground] = useState('')
  const [introduce, setIntroduce] = useState('')

  const [initialValues, setInitialValues] = useState({})
  useEffect(() => {
    setInitialValues({
      name: '',
      description: '',
    })
  }, [])
  const onSubmit = (data) => {
    data.image = background
    data.details = introduce
    data.min_pace = parseInt(data.min_pace)
    data.max_pace = parseInt(data.max_pace)
    handleCreateClub(data)
  }
  const handleCreateClub = async (data) => {
    setLoading(true)
    try {
      const res = await apiInstance.post('/clubs', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', 'Tạo câu lạc bộ thành công', dataRes.message)
        setLoading(false)
        setVisibleAdd(false)
      }
    } catch (error) {
      showToast('error', 'Tạo câu lạc bộ thất bại', error)
      setLoading(false)
    }
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
    <Form onSubmit={onSubmit} initialValue={initialValues}>
      <div id='update-info-container'>
        <div id='background-club-container'>
          <AvatarEditor
            image={background}
            style={{ width: '100%', height: '100%', borderRadius: '15px' }}
            width={1200}
            height={630}
            scale={1}
          />
          {/* <img src={background} alt='background' /> */}
        </div>
        {/* <div id='camera-upload-container'>
          <i className='fas fa-camera'></i>
        </div> */}
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
          <div className='grid-form'>
            <div className='col-6' id='width-100-center'>
              <Field name='min_pace' label='Tốc độ tối thiểu' required>
                <InputText type='number' style={{ width: '100%' }} />
              </Field>
            </div>
            <div className='col-6' id='width-100-center'>
              <Field name='max_pace' label='Tốc độ tối đa' required>
                <InputText type='number' style={{ width: '100%' }} />
              </Field>
            </div>
          </div>
          <h1>{nameEvent}</h1>
          <h6>{descriptionEvent}</h6>
        </div>
        <h1>Giới thiệu</h1>
        <div id='info-detail'>
          <DynamicTinyMCE
            value={introduce}
            onSave={setIntroduce}
            label={'Tạo câu lạc bộ của bạn'}
          />
        </div>
      </div>
    </Form>
  )
}

export default AddEvent
