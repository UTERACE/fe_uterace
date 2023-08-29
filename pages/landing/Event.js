import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { Carousel } from 'primereact/carousel'
const Event = ({ event, interval = 3000 }) => {
  const responsiveOptions = [
    {
      breakpoint: '1199px',
      numVisible: 1,
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

  const getSeverity = (event) => {
    switch (event.inventoryStatus) {
      case 'INSTOCK':
        return 'success'

      case 'LOWSTOCK':
        return 'warning'

      case 'OUTOFSTOCK':
        return 'danger'

      default:
        return null
    }
  }
  const eventTemplate = (event) => {
    return (
      <div id='event-container'>
        <div id='imageproduct-container'>
          <img src={event.image} alt={event.name} />
        </div>
        <div id='info-event'>
          <h4>{event.name}</h4>
          <p>RESERVED PRICE</p>
          <h6>${event.price}</h6>
          <div id='rating-event'></div>
        </div>
      </div>
    )
  }

  return (
    <div
      className='centered-content-full'
      style={{ backgroundColor: "#FFE49E", backgroundImage: "url('/bg.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}
    >
      <div className='centered-content-layout'>
        <Carousel
          id='custom-carousel-product'
          value={event}
          numScroll={1}
          numVisible={3}
          responsiveOptions={responsiveOptions}
          itemTemplate={eventTemplate}
          circular={true}
        />
      </div>
    </div>
  )
}
export default Event
