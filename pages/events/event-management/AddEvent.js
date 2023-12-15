import Form, { Field } from '@/components/react-hook-form/Form'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useEffect, useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import dynamic from 'next/dynamic'
import apiInstance from '@/api/apiInstance'
import Countdown from '../Countdown'
import { Calendar } from 'primereact/calendar'
import { MultiSelect } from 'primereact/multiselect'

const DynamicTinyMCE = dynamic(
  () => import('../../../components/editor/TinyMCEEditor'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)

const AddEvent = ({
  setLoading,
  showToast,
  setVisibleAdd,
  setUpdateStatus,
  t,
  tDetail,
}) => {
  const [nameEvent, setNameEvent] = useState('')
  const [descriptionEvent, setDescriptionEvent] = useState('')
  const [background, setBackground] = useState('')
  const [introduce, setIntroduce] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [distances, setDistances] = useState([])
  const [selectedCities, setSelectedCities] = useState(null)

  const [initialValues, setInitialValues] = useState({})
  const inputRef = useRef()

  useEffect(() => {
    fetchDistance()
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
    data.distance = selectedCities
    console.log('data', data)
    handleCreateEvent(data)
  }

  const handleCreateEvent = async (data) => {
    setLoading(true)
    try {
      const res = await apiInstance.post('/events', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', t('create_event_success'), dataRes.message)
        setLoading(false)
        setVisibleAdd(false)
        setUpdateStatus(true)
      }
    } catch (error) {
      showToast('error', t('create_event_fail'), error)
      setLoading(false)
    }
  }

  const fetchDistance = async () => {
    try {
      const res = await apiInstance.get('/distance')
      const data = res.data
      if (res.status === 200) {
        const options = data.map((item) => ({
          name: item.runningCategoryName,
          id: item.runningCategoryID,
          distance: item.runningCategoryDistance,
        }))
        setDistances(options)
      }
    } catch (error) {
      showToast('error', t('get_distance_fail'), error)
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
                setNameEvent(e.target.value)
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
          <div className='grid-form'>
            <div className='col-6' id='width-100-center'>
              <MultiSelect
                value={selectedCities}
                onChange={(e) => setSelectedCities(e.value)}
                options={distances}
                optionLabel='name'
                display='chip'
                placeholder={t('select_distance')}
                maxSelectedLabels={3}
                className='w-full md:w-20rem'
              />
            </div>
          </div>
          <h1>{nameEvent}</h1>
          <h6>{descriptionEvent}</h6>
          <div id='event-time-detail'>
            <Countdown from_date={start} to_date={end} t={tDetail} />
          </div>
        </div>
        <h1>{t('intro')}</h1>
        <div id='info-detail'>
          <DynamicTinyMCE
            value={introduce}
            onSave={setIntroduce}
            label={t('button_create')}
          />
        </div>
      </div>
    </Form>
  )
}

export default AddEvent
