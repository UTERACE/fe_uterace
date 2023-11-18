import apiInstance from '@/api/apiInstance'
import Form from '@/components/react-hook-form/Form'
import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const DynamicTinyMCE = dynamic(
  () => import('../../../components/editor/TinyMCEEditor'),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
)

const UpdateInfo = ({
  event_id,
  details = '',
  regulations = '',
  prize = '',
  setLoading,
  showToast,
  setVisiblePrize,
  setVisibleRole,
  setVisibleIntroduce,
  setUpdateStatus,
  t,
}) => {
  const [detailsEvent, setDetailsEvent] = useState(details)
  const [regulationsEvent, setRegulationsEvent] = useState(regulations)
  const [prizeEvent, setPrizeEvent] = useState(prize)

  const onSubmit = (data) => {
    data.event_id = parseInt(event_id)
    data.image = ''
    data.details = detailsEvent
    data.regulations = regulationsEvent
    data.prize = prizeEvent
    handleUpdateEvent(data)
  }

  const handleUpdateEvent = async (data) => {
    setLoading(true)
    try {
      const res = await apiInstance.put('/events', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast('success', t('update_event_success'), dataRes.message)
        setLoading(false)
        if (detailsEvent !== '') {
          setVisibleIntroduce(false)
        }
        if (regulationsEvent !== '') {
          setVisibleRole(false)
        }
        if (prizeEvent !== '') {
          setVisiblePrize(false)
        }
        setUpdateStatus(true)
      }
    } catch (error) {
      showToast('error', t('update_event_fail'), error)
      setLoading(false)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <div id='info-detail'>
        <DynamicTinyMCE
          value={
            detailsEvent !== ''
              ? detailsEvent
              : regulationsEvent !== ''
              ? regulationsEvent
              : prizeEvent !== ''
              ? prizeEvent
              : ''
          }
          onSave={(content) => {
            setDetailsEvent(detailsEvent !== '' ? content : detailsEvent)
            setRegulationsEvent(
              regulationsEvent !== '' ? content : regulationsEvent
            )
            setPrizeEvent(prizeEvent !== '' ? content : prizeEvent)
          }}
          label={t('button_create')}
        />
      </div>
    </Form>
  )
}

export default UpdateInfo
