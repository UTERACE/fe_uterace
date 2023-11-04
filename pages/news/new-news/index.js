import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Form, { Field } from '@/components/react-hook-form/Form'
import AvatarEditor from 'react-avatar-editor'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import apiInstance from '@/api/apiInstance'

const DynamicTinyMCE = dynamic(
  () => import('../../../components/editor/TinyMCEEditor'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)
const NewNews = ({
  club_id,
  setLoading,
  showToast,
  setVisibleAdd,
  setUpdate,
}) => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [background, setBackground] = useState('')
  const [initialValues, setInitialValues] = useState({})

  const inputRef = useRef()

  useEffect(() => {
    setInitialValues({
      title: '',
      description: '',
    })
  }, [])

  const onSubmit = (data) => {
    data.club_id = parseInt(club_id)
    data.image = background
    data.content = content
    handleAddNews(data)
  }

  const handleAddNews = async (data) => {
    setLoading(true)
    try {
      const res = await apiInstance.post('/news', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', 'Tạo bài viết thành công', dataRes.message)
        setLoading(false)
        setVisibleAdd(false)
        setUpdate(true)
      }
    } catch (error) {
      showToast('error', 'Tạo bài viết thất bại', error)
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
            style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
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
          <Field name='title' label='Tiêu đề bài viết' required>
            <InputText
              type='text'
              style={{ width: '100%' }}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </Field>
          <div style={{ height: '1.5rem' }}></div>
          <Field name='description' label='Mô tả bài viết' required>
            <InputTextarea
              type='text'
              style={{ width: '100%', height: '8rem' }}
              onChange={(e) => {
                setDescription(e.target.value)
              }}
            />
          </Field>
        </div>
        <div id='info-detail'>
          <DynamicTinyMCE
            label='Thêm bài viết'
            value={content}
            onSave={(newContent) => {
              setContent(newContent)
            }}
          />
        </div>
      </div>
    </Form>
  )
}

export default NewNews
