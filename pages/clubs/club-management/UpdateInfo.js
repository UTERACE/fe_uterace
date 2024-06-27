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
  t,
}) => {
  const [descriptionEvent, setDescriptionEvent] = useState(description)

  const onSubmit = (data) => {
    data.club_id = parseInt(club_id)
    data.image = image
    data.details = descriptionEvent
    handleUpdateClub(data)
  }

  const handleUpdateClub = async (data) => {
    setLoading(true)
    try {
      const res = await apiInstance.put('/clubs', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', t('update_info_club_success'), dataRes.message)
        setLoading(false)
        setVisibleInfo(false)
        setUpdate(true)
      }
    } catch (error) {
      showToast('error', t('update_info_club_fail'), error)
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <div id='update-info-container'>
        <DynamicTinyMCE
          value={descriptionEvent}
          onSave={setDescriptionEvent}
          label={t('update-info')}
        />
      </div>
    </Form>
  )
}

export default UpdateInfo
