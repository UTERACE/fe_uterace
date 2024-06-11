import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Form, { Field } from '@/components/react-hook-form/Form'
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
const NewPost = ({
  club_id,
  setLoading,
  showToast,
  setVisibleAdd,
  fetchPosts,
  t,
}) => {
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
    handleAddNews(data)
  }

  const handleAddNews = async (data) => {
    setLoading(true)
    try {
      const res = await apiInstance.post('/news', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', t('hide_news_success'), dataRes.message)
        setVisibleAdd(false)
        fetchPosts()
        setLoading(false)
      }
    } catch (error) {
      showToast('error', t('add_news_fail'), error)
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={onSubmit} initialValue={initialValues}>
      <div id='update-info-container'>
        <div id='info-detail'>
          <Field name='title' label={t('title')} required>
            <InputText
              type='text'
              style={{ width: '100%' }}
              tooltip={t('title_placeholder')}
              tooltipOptions={{ event: 'focus' }}
              onChange={(e) => {
                setTitle(e.target.value)
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
                setDescription(e.target.value)
              }}
            />
          </Field>
        </div>
        <div id='info-detail'>
          <DynamicTinyMCE
            label={t('add-news')}
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

export default NewPost
