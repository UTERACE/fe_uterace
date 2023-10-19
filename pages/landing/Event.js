import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel'
import Link from 'next/link'
import Title from '../../components/landing/Title'
import Detail from '@/components/landing/Detail'
import { useTranslation } from 'next-i18next'
const Event = ({ event }) => {
  const [events, setEvents] = useState([])
  useEffect(() => {
    setEvents(event.slice(0, 6))
  }, [])
  const responsiveOptions = [
    {
      breakpoint: '1920px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '960px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '500px',
      numVisible: 1,
      numScroll: 1,
    },
  ]
  const { t } = useTranslation('event')
  const eventTemplate = (event) => {
    return (
      <Link
        id='link-dataview-container'
        href={`/events/event-detail/${event.event_id}`}
      >
        <div id='event-container'>
          <div id='image-event-container'>
            <img src={event.image} alt={event.name} />
          </div>
          <div id='info-event'>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {event.member} {t('member-join')}
            </h4>
            <h4>
              <i className='pi pi-briefcase ml2-icon' aria-hidden='true'></i>
              {event.club} {t('club-join')}
            </h4>
          </div>
          <div id='name-event'>
            <i class='fa fa-running icon-run' aria-hidden='true'></i>
            <div id='share-register-container' title={event.name}>
              <h4>{event.name}</h4>
              <div id='share-register-content'>
                <Link
                  id='link-event'
                  href={`/events/event-detail/${event.event_id}`}
                >
                  {t('event-join')}{' '}
                  <i className='pi pi-arrow-right' aria-hidden='true'></i>
                </Link>
                <Link id='link-event' href='/share'>
                  {t('share')}{' '}
                  <i className='pi pi-share-alt' aria-hidden='true'></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <div className='centered-content-layout'>
      <Carousel
        id='custom-carousel-product'
        value={events}
        numVisible={3}
        numScroll={1}
        responsiveOptions={responsiveOptions}
        itemTemplate={eventTemplate}
        circular={true}
      />
      <Detail link='/events' />
    </div>
  )
}
export default Event
