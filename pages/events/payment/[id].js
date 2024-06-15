import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import store from '@/store/store'
import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import Form, { Field } from '@/components/react-hook-form/Form'
import { Dropdown } from 'primereact/dropdown'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'

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
  const [isMobile, setIsMobile] = useState(false)
  const { user } = store.getState().auth.id
  const router = useRouter()
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const { t } = useTranslation('detail')
  const [paymentMethod, setPaymentMethod] = useState('momo')
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    fetchUser()
    //responsive window
    if (window.innerHeight > window.innerWidth) {
      setIsMobile(true)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const response = await apiInstance.get('/user')
      const data = response.data
      console.log('data', data)
      setInitialValues({
        email: data.email,
        telNumber: data.telNumber,
        gender: data.gender,
        address: data.address_name,
      })
    } catch (error) {
      showToast('error', 'Lỗi!', error)
    }
  }

  const onSubmit = async (data) => {
    if (!user) {
      router.push('/login')
      return
    }
    if (paymentMethod === 'momo') {
      handlePaymentMoMo(data.gender, data.size)
    }
    if (paymentMethod === 'vnpay') {
      handlePaymentVNPay(data.gender, data.size)
    }
  }

  const handlePaymentMoMo = async (gender, size) => {
    try {
      setLoading(true)
      const response = await apiInstance.post('/payment/momo', {
        eventId: event.id,
        gender,
        size,
      })
      const data = await response.data
      if (data.resultCode === 0) {
        router.push(data.payUrl)
      }
    } catch (error) {
      console.error('Error fetching event details:', error)
      showToast('error', t('payment_error'))
    } finally {
      setLoading(false)
    }
  }

  const handlePaymentVNPay = async (gender, size) => {
    try {
      setLoading(true)
      const response = await apiInstance.post('/payment/vnpay', {
        eventId: event.id,
        gender,
        size,
      })
      const data = await response.data
      if (data.status === 200) {
        router.push(data.message)
      }
    } catch (error) {
      console.error('Error fetching event details:', error)
      showToast('error', t('payment_error'))
    } finally {
      setLoading(false)
    }
  }

  const gender = [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nu' },
  ]

  const size = [
    { label: 'XS', value: 'XS' },
    { label: 'S', value: 'S' },
    { label: 'M', value: 'M' },
    { label: 'L', value: 'L' },
    { label: 'XL', value: 'XL' },
    { label: '2XL', value: '2XL' },
    { label: '3XL', value: '3XL' },
  ]
  return (
    <div id='payment-container'>
      <div id='payment-method'>
        <Image src='/test.jpg' alt='event' width={1080} height={780} />
      </div>
      <div id='payment-info'>
        <div id='payment-info-user-container'>
          <h1>{t('register_event')}</h1>
          <Form initialValue={initialValues} onSubmit={onSubmit}>
            <div
              id='form-payment-setting'
              style={isMobile ? { width: 'auto' } : null}
            >
              <Field name='gender' label={t('sex')} required>
                <Dropdown
                  options={gender}
                  style={{ width: '100%', borderRadius: '10px' }}
                ></Dropdown>
              </Field>
              <Field name='size' label={t('size')} required>
                <Dropdown
                  options={size}
                  style={{ width: '100%', borderRadius: '10px' }}
                ></Dropdown>
              </Field>
              <Field name='telNumber' label={t('phone')} required>
                <InputMask
                  mask='(999) 999-9999'
                  placeholder='(999) 999-9999'
                  style={{ width: '100%' }}
                ></InputMask>
              </Field>
              <Field name='address' label={t('address')} required>
                <InputText type='text' style={{ width: '100%' }} />
              </Field>
              <Field name='email' label={t('email')}>
                <InputText type='text' style={{ width: '100%' }} />
              </Field>
            </div>
          </Form>
        </div>
        <div id='payment-method-container'>
          <h1>
            {t('payment_register')}{' '}
            {LocaleHelper.formatCurrency(event.registration_fee, 'vi')}
          </h1>
          <div id='event-image-payment'>
            <Image src='/test.jpg' alt='event' width={200} height={200} />
          </div>
          <div id='payment-info-container'>
            <h3>{event.name}</h3>
          </div>
          <h5>{t('payment_method')}</h5>
          <div id='payment-button-container'>
            <div
              id='payment-momo'
              onClick={() => {
                setPaymentMethod('momo')
                handlePaymentMoMo('Nam', 'M')
              }}
            >
              <Image src='/momo.png' alt='momo' width={50} height={50} />
              <h5>{t('payment')} Momo</h5>
            </div>
            <div
              id='payment-vnpay'
              onClick={() => {
                setPaymentMethod('vnpay')
                handlePaymentVNPay('Nam', 'M')
              }}
            >
              <Image src='/vnpay.png' alt='paypal' width={50} height={50} />
              <h5>{t('payment')} VNPay</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
