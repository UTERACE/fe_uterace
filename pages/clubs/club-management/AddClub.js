import Form, { Field } from '@/components/react-hook-form/Form'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import React, { useEffect, useRef, useState } from 'react'
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

const AddClub = ({
  setLoading,
  showToast,
  setVisibleAdd,
  fetchCreatedClubs,
  t,
}) => {
  const [nameClub, setNameClub] = useState('')
  const [descriptionClub, setDescriptionClub] = useState('')
  const [background, setBackground] = useState('')
  const [introduce, setIntroduce] = useState('')

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
    handleCreateClub(data)
  }

  const handleCreateClub = async (data) => {
    setLoading(true)
    try {
      const res = await apiInstance.post('/clubs', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', t('create_club_success'), dataRes.message)
        setLoading(false)
        setVisibleAdd(false)
        fetchCreatedClubs()
      }
    } catch (error) {
      showToast('error', t('create_club_fail'), error)
      setLoading(false)
    }
  }

  const customBase64Uploader = async (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 2000000) {
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
          <Field name='name' label={t('name_club')} required>
            <InputText
              type='text'
              style={{ width: '100%' }}
              tooltip={t('name_club_placeholder')}
              tooltipOptions={{ event: 'focus' }}
              onChange={(e) => {
                setNameClub(e.target.value)
              }}
            />
          </Field>
          <div style={{ height: '1.5rem' }}></div>
          <Field name='description' label={t('description_club')} required>
            <InputTextarea
              type='text'
              style={{ width: '100%', height: '8rem' }}
              tooltip={t('description_club_placeholder')}
              tooltipOptions={{ event: 'focus' }}
              onChange={(e) => {
                setDescriptionClub(e.target.value)
              }}
            />
          </Field>
          <div className='grid-form'>
            <div className='col-6' id='width-100-center'>
              <Field name='min_pace' label={t('min_pace')} required>
                <InputText type='number' style={{ width: '100%' }} />
              </Field>
            </div>
            <div className='col-6' id='width-100-center'>
              <Field name='max_pace' label={t('max_pace')} required>
                <InputText type='number' style={{ width: '100%' }} />
              </Field>
            </div>
          </div>
          <h1>{nameClub}</h1>
          <h6>{descriptionClub}</h6>
        </div>
        <h1>{t('intro_club')}</h1>
        <div id='info-detail'>
          <DynamicTinyMCE
            value={introduce}
            onSave={setIntroduce}
            label={t('create_club')}
          />
        </div>
      </div>
    </Form>
  )
}

export default AddClub
