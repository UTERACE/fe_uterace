import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import apiInstance from '@/api/apiInstance'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Steps } from 'primereact/steps'
import { Button } from 'primereact/button'

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
//redirect to http://localhost:3000/events/payment/success?partnerCode=MOMOBKUN20180529&orderId=fe9d439c1e504ba3957a6aaab536abd5&requestId=fe9d439c1e504ba3957a6aaab536abd5&amount=10000&orderInfo=testthanhtoanmomo&orderType=momo_wallet&transId=4061170819&resultCode=0&message=Th%C3%A0nh+c%C3%B4ng.&payType=qr&responseTime=1718433401858&extraData=eyJ1c2VybmFtZSI6ICJtb21vIn0&signature=063e4f3de24e5a5b0892203d28fbb594ec925dccae0ff04445a48b497d8ab0d1&paymentOption=momo

const Success = ({ event }) => {
  const { t } = useTranslation('detail')
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(2)

  const itemRenderer = (item, itemIndex) => {
    const isActiveItem = activeIndex === itemIndex

    const textColor = isActiveItem
      ? 'var(--success-color)'
      : 'var(--text-color-secondary)'

    return (
      <div id='payment-success-steps-item-container'>
        <span
          id='payment-success-steps-item'
          onClick={() => setActiveIndex(itemIndex)}
        >
          <i className={`${item.icon} p-icon-large`} />
        </span>
        <span className='p-steps-text' style={{ color: textColor }}>
          {item.label}
        </span>
      </div>
    )
  }

  const items = [
    {
      icon: 'pi pi-check',
      template: (item) => itemRenderer(item, 0),
      label: t('event'),
    },
    {
      icon: 'pi pi-check',
      template: (item) => itemRenderer(item, 1),
      label: t('confirm'),
    },
    {
      icon: 'pi pi-check',
      template: (item) => itemRenderer(item, 2),
      label: t('payment_success'),
    },
  ]
  return (
    <div id='payment-success-container'>
      <div id='payment-success'>
        <div id='payment-success-content'>
          <h1>{t('payment_success')}</h1>
          <h3>{t('thank_you')}</h3>
          <div id='payment-success-steps'>
            <Steps
              model={items}
              activeIndex={activeIndex}
              readOnly={false}
              className='m-2 pt-4'
            />
          </div>
          <div id='payment-success-buttons'>
            <Button
              icon='pi pi-home'
              label={t('back_to_home')}
              onClick={() => router.push('/')}
            />
            <Button
              icon='pi pi-arrow-left'
              label={t('back_to_event')}
              onClick={() =>
                router.push(`/events/event-detail/${event.event_id}`)
              }
            />
          </div>
        </div>
        <div id='event-image-success'>
          <Image src='/test.jpg' alt='event' width={200} height={200} />
          <span id='payment-success-image-item'>
            <i className='pi pi-check p-icon-large' />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Success
