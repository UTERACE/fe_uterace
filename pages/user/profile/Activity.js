import React, { useEffect, useState } from 'react'

const Activity = ({
  activities = [],
  responsiveOptions = [
    {
      breakpoint: 1920,
      columnNumber: 3,
    },
    {
      breakpoint: 1024,
      columnNumber: 2,
    },
    {
      breakpoint: 768,
      columnNumber: 1,
    },
  ],
}) => {
  const [column, setColumn] = useState(3)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width <= responsiveOptions[2].breakpoint) {
        setColumn(responsiveOptions[2].columnNumber)
      } else if (
        width <= responsiveOptions[1].breakpoint &&
        width > responsiveOptions[2].breakpoint
      )
        setColumn(responsiveOptions[1].columnNumber)
      else if (
        width <= responsiveOptions[0].breakpoint &&
        width > responsiveOptions[1].breakpoint
      )
        setColumn(responsiveOptions[0].columnNumber)
      else {
        setColumn(3)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  useEffect(() => {
    const carouselElement = document.getElementsByClassName(
      'custom-carousel-content'
    )[0]
    if (carouselElement) {
      carouselElement.style.setProperty('--num-columns', column)
    }
  }, [column])
  return (
      <div className='custom-carousel-content'>
        {activities.map((item) => (
          <div id='activities-container'>
            <div id='info-activities'>
              <h4>
                <i className='pi pi-calendar ml2-icon' aria-hidden='true'></i>
                {item.day}
              </h4>
            </div>
            <div id='name-activities'>
              <div>
                <i class='fa fa-running icon-run' aria-hidden='true'></i>
              </div>
              <div>
                <h4>{item.name}</h4>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <img src={'/googlemap-icon.png'} alt='avatar' />
                <img src={'/strava-icon.png'} alt='avatar' />
              </div>
            </div>
            <div id='name-activities'>
              <a id='link-activities'>
                <i className='pi pi-map' aria-hidden='true'></i> {item.distance}
                km
              </a>
              <a id='link-activities'>
                <i className='pi pi-chart-bar' aria-hidden='true'></i>{' '}
                {item.pace}/km
              </a>
              <a id='link-activities'>
                <i className='pi pi-stopwatch' aria-hidden='true'></i>{' '}
                {item.time}
              </a>
            </div>
          </div>
        ))}
      </div>
  )
}

export default Activity
