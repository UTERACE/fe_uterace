import Form, { Field } from '@/components/react-hook-form/Form'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useEffect, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Countdown from '../Countdown'
import { Calendar } from 'primereact/calendar'

const Update = ({ image, name, description, start_time, end_time }) => {
  const [nameClub, setNameClub] = useState(name)
  const [background, setBackground] = useState(image)
  const [initialValues, setInitialValues] = useState({})
  const [start, setStart] = useState(start_time)
  const [end, setEnd] = useState(end_time)

  const onSubmit = (data) => {
    data.background = background
    console.log(data)
  }
  useEffect(() => {
    const start_time = new Date(start)
    start_time.setHours(start_time.getHours() - 7)
    const end_time = new Date(end)
    end_time.setHours(end_time.getHours() - 7)
    setInitialValues({
      name: name,
      description: description,
      start_time: start_time,
      end_time: end_time,
    })
  }, [start, end])

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
                setNameClub(e.target.value)
              }}
            />
          </Field>
          <div style={{ height: '1.5rem' }}></div>
          <Field name='description' label='Mô tả' required>
            <InputTextarea
              type='text'
              style={{ width: '100%', height: '8rem' }}
            />
          </Field>
          <div className='grid-form'>
            <div className='col-6' id='width-100-center'>
              <Field name='start_time' label='Ngày bắt đầu' required>
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
              <Field name='end_time' label='Ngày kết thúc' required>
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
          <h1>{nameClub}</h1>
          <h6>{description}</h6>
          <div id='event-time-detail'>
            <Countdown from_date={start} to_date={end} />
          </div>
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
