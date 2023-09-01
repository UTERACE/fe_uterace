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
      <div id='event-container'>
        <div id='image-event-container'>
          <img src={event.image} alt={event.name} />
        </div>
        <div id='info-event'>
          <h4>
            <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
            {event.member} members
          </h4>
          <h4>
            <i className='pi pi-briefcase ml2-icon' aria-hidden='true'></i>
            {event.club} clubs
          </h4>
        </div>
        <div id='name-event'>
          <i class='fa fa-running icon-run' aria-hidden='true'></i>
          <div id='share-register-container'>
            <h4>{event.name}</h4>
            <div id='share-register-content'>
              <Link id='link-event' href='/register'>
                Register{' '}
                <i className='pi pi-arrow-right' aria-hidden='true'></i>
              </Link>
              <Link id='link-event' href='/share'>
                Share <i className='pi pi-share-alt' aria-hidden='true'></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#FFE49E',
        backgroundImage: "url('/bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Title title='Event activities' />
      <div className='centered-content-layout'>
        <Carousel
          id='custom-carousel-product'
          value={events}
          numVisible={3}
          numScroll={1}
          responsiveOptions={responsiveOptions}
          itemTemplate={eventTemplate}
        />
      </div>
      <Detail link='/event' />
    </div>
  )
}
export default Event
