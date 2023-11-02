import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Form, { Field } from '@/components/react-hook-form/Form'
import AvatarEditor from 'react-avatar-editor'
import { FileUpload } from 'primereact/fileupload'
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
const NewNews = ({ club_id, setLoading, showToast, setVisibleAdd }) => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [background, setBackground] = useState('')
  const [initialValues, setInitialValues] = useState({})

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
    console.log(data)
    handleAddNews(data)
  }

  const handleAddNews = async (data) => {
    try {
      const res = await apiInstance.post('/news', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', 'Tạo bài viết thành công', dataRes.message)
        setLoading(false)
        setVisibleAdd(false)
      }
    } catch (error) {
      showToast('error', 'Tạo bài viết thất bại', error)
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
            style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
            width={1200}
            height={630}
            scale={1}
          />
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
