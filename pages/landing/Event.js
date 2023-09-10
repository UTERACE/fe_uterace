import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel'
import Link from 'next/link'
import Title from '../../components/landing/Title'
import Detail from '@/components/landing/Detail'
const Event = ({ event }) => {
  const [events, setEvents] = useState([])
  useEffect(() => {
    setEvents(event.slice(0, 9))
  }, [])
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '991px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
  ]

  const eventTemplate = (event) => {
    return (
      <Link id='link-dataview' href={`/events/event-detail/${event.event_id}`}>
        <div id='event-container'>
          <div id='image-event-container'>
            <img src={event.image} alt={event.name} />
          </div>
          <div id='info-event'>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {event.member} Thành viên
            </h4>
            <h4>
              <i className='pi pi-briefcase ml2-icon' aria-hidden='true'></i>
              {event.club} Câu lạc bộ
            </h4>
          </div>
          <div id='name-event'>
            <i class='fa fa-running icon-run' aria-hidden='true'></i>
            <div id='share-register-container'>
              <h4>{event.name}</h4>
              <div id='share-register-content'>
                <Link
                  id='link-event'
                  href={`/events/event-detail/${event.event_id}`}
                >
                  Tham gia sự kiện{' '}
                  <i className='pi pi-arrow-right' aria-hidden='true'></i>
                </Link>
                <Link id='link-event' href='/share'>
                  Chia sẻ <i className='pi pi-share-alt' aria-hidden='true'></i>
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
      />
      <Detail link='/events' />
    </div>
  )
}
export default Event
