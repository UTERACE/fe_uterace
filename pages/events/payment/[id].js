import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import store from '@/store/store'
import { useRouter } from 'next/router'
import { Button } from 'primereact/button'
import { useContext, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

export const getServerSideProps = async ({ locale, params }) => {
  const event = await getEvent(params.id)
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'detail',
        'news',
        'scoreboard',
        'topbar',
      ])),
      event,
    },
  }
}

async function getEvent(id) {
  try {
    const response = await apiInstance.get(`/events/${id}`)
    const data = await response.data
    return data
  } catch (error) {
    console.error('Error fetching event details:', error)
    return null
  }
}

const Payment = ({ event }) => {
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const { user } = store.getState().auth.id
  const router = useRouter()
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const { t } = useTranslation('detail')

  const onSubmit = async () => {
    try {
      setLoading(true)
      const res = await apiInstance.post('/api/payment', {
        user_id: user.id,
        event_id: event.id,
        payment_method: paymentMethod,
      })
      if (res.data.success) {
        showToast('success', t('payment_success'))
        router.push(`/events/event-detail/${event_id}`)
      } else {
        showToast('error', t('payment_fail'), res.data.message)
      }
      setLoading(false)
    } catch (error) {
      showToast('error', t('payment_fail'), error)
      setLoading(false)
    }
  }

  return (
    <div id='payment-container'>
      <div id='payment-method'>
        <h1>{t('payment_method')}</h1>
        <div id='payment-method-container'>
          <div
            className='payment-method-item'
            onClick={() => setPaymentMethod('paypal')}
          >
            <img src='/images/paypal.png' alt='paypal' />
            <h3>{t('paypal')}</h3>
          </div>
          <div
            className='payment-method-item'
            onClick={() => setPaymentMethod('stripe')}
          >
            <img src='/images/stripe.png' alt='stripe' />
            <h3>{t('stripe')}</h3>
          </div>
        </div>
      </div>
      <div id='payment-info'>
        <h1>{t('payment_info')}</h1>
        <div id='payment-info-container'>
          <h3>
            {t('event_name')}: {event.name}
          </h3>
          <h3>
            {t('payment_method')}: {paymentMethod}
          </h3>
          <Button label={t('pay')} onClick={onSubmit} />
        </div>
      </div>
    </div>
  )
}

export default Payment
