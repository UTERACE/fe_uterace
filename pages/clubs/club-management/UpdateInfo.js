import apiInstance from '@/api/apiInstance'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Form from '@/components/react-hook-form/Form'

const DynamicTinyMCE = dynamic(
  () => import('../../../components/editor/TinyMCEEditor'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)

const UpdateInfo = ({
  club_id,
  image,
  description,
  setLoading,
  showToast,
  setVisibleInfo,
  setUpdate,
}) => {
  const [descriptionEvent, setDescriptionEvent] = useState(description)

  const onSubmit = (data) => {
    data.club_id = parseInt(club_id)
    data.image = image
    data.details = descriptionEvent
    console.log('data', data)
    handleUpdateClub(data)
  }

  const handleUpdateClub = async (data) => {
    setLoading(true)
    try {
      const res = await apiInstance.put('/clubs', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', 'Chỉnh sửa câu lạc bộ thành công', dataRes.message)
        setLoading(false)
        setVisibleInfo(false)
        setUpdate(true)
      }
    } catch (error) {
      showToast('error', 'Chỉnh sửa câu lạc bộ thất bại', error)
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <div id='update-info-container'>
        <DynamicTinyMCE
          value={descriptionEvent}
          onSave={setDescriptionEvent}
          label={'Cập nhật thông tin'}
        />
      </div>
    </Form>
  )
}

export default UpdateInfo
