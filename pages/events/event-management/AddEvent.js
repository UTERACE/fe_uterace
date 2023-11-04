import Form, { Field } from '@/components/react-hook-form/Form'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useEffect, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import dynamic from 'next/dynamic'
import apiInstance from '@/api/apiInstance'
import Countdown from '../Countdown'
import { Calendar } from 'primereact/calendar'

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
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const [initialValues, setInitialValues] = useState({})
  const inputRef = useRef()

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
    data.from_date = new Date(start).toISOString()
    data.to_date = new Date(end).toISOString()
    console.log('data', data)
    // handleCreateClub(data)
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
          <div className='grid-form'>
            <div className='col-6' id='width-100-center'>
              <Field name='from_date' label='Ngày bắt đầu' required>
                <Calendar
                  showTime={true}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setStart(e.target.value)
                  }}
                />
              </Field>
            </div>
            <div className='col-6' id='width-100-center'>
              <Field name='to_date' label='Ngày kết thúc' required>
                <Calendar
                  showTime={true}
                  style={{ width: '100%' }}
                  onChange={(e) => {
                    setEnd(e.target.value)
                  }}
                />
              </Field>
            </div>
          </div>
          <h1>{nameEvent}</h1>
          <h6>{descriptionEvent}</h6>
          <div id='event-time-detail'>
            <Countdown from_date={start} to_date={end} />
          </div>
        </div>
        <h1>Giới thiệu</h1>
        <div id='info-detail'>
          <DynamicTinyMCE
            value={introduce}
            onSave={setIntroduce}
            label={'Tạo giải chạy cho mọi người'}
          />
        </div>
      </div>
    </Form>
  )
}

export default AddEvent
