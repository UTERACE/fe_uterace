import Form, { Field } from '@/components/react-hook-form/Form'
import { Button } from 'primereact/button'
import { FileUpload } from 'primereact/fileupload'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useEffect, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import Countdown from '../Countdown'
import { Calendar } from 'primereact/calendar'
import apiInstance from '@/api/apiInstance'

const Update = ({
  event_id,
  image,
  name,
  description,
  start_time,
  end_time,
  min_pace,
  max_pace,
  setLoading,
  showToast,
  setVisibleChange,
  fetchEvents,
  t,
  tDetail,
}) => {
  const [nameClub, setNameClub] = useState(name)
  const [background, setBackground] = useState(image)
  const [descriptionEvent, setDescriptionEvent] = useState(description)
  const [initialValues, setInitialValues] = useState({})
  const [start, setStart] = useState(start_time)
  const [end, setEnd] = useState(end_time)
  const inputRef = useRef()

  const onSubmit = (data) => {
    data.event_id = parseInt(event_id)
    data.image = background
    data.from_date = start
    data.to_date = end
    handleUpdateEvent(data)
  }

  useEffect(() => {
    const start_time = new Date(start)
    start_time.setHours(start_time.getHours())
    const end_time = new Date(end)
    end_time.setHours(end_time.getHours())

    setInitialValues({
      name: name,
      description: description,
      from_date: start_time,
      to_date: end_time,
      min_pace: min_pace,
      max_pace: max_pace,
    })
  }, [])

  const handleUpdateEvent = async (data) => {
    setLoading(true)
    try {
      const res = await apiInstance.put('/events', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', t('update_event_success'), dataRes.message)
        setLoading(false)
        setVisibleChange(false)
        fetchEvents()
      }
    } catch (error) {
      showToast('error', t('update_event_fail'), error)
      setLoading(false)
    }
  }

  const customBase64Uploader = async (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 3048576) {
        showToast('error', t('upload_image_fail'), t('max_size_image'))
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
          <Field name='name' label={t('name_event')} required>
            <InputText
              type='text'
              style={{ width: '100%' }}
              tooltip={t('name_event_placeholder')}
              tooltipOptions={{ event: 'focus' }}
              onChange={(e) => {
                setNameClub(e.target.value)
              }}
            />
          </Field>
          <div style={{ height: '1.5rem' }}></div>
          <Field name='description' label={t('description')} required>
            <InputTextarea
              type='text'
              style={{ width: '100%', height: '8rem' }}
              tooltip={t('description_placeholder')}
              tooltipOptions={{ event: 'focus' }}
              onChange={(e) => {
                setDescriptionEvent(e.target.value)
              }}
            />
          </Field>
          <div className='grid-form'>
            <div className='col-6' id='width-100-center'>
              <Field name='min_pace' label={t('min_pace')} required>
                <InputText
                  type='number'
                  style={{ width: '100%' }}
                  tooltip={t('min_pace_placeholder')}
                  tooltipOptions={{ event: 'focus' }}
                />
              </Field>
            </div>
            <div className='col-6' id='width-100-center'>
              <Field name='max_pace' label={t('max_pace')} required>
                <InputText
                  type='number'
                  style={{ width: '100%' }}
                  tooltip={t('max_pace_placeholder')}
                  tooltipOptions={{ event: 'focus' }}
                />
              </Field>
            </div>
          </div>
          <div className='grid-form'>
            <div className='col-6' id='width-100-center'>
              <Field name='from_date' label={t('from_date')} required>
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
              <Field name='to_date' label={t('to_date')} required>
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
          <h6>{descriptionEvent}</h6>
          <div id='event-time-detail'>
            <Countdown from_date={start} to_date={end} t={tDetail} />
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
          label={t('button_update')}
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
