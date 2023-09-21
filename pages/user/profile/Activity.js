import React, { useEffect, useState } from 'react'
import Title from '../../../components/landing/Title'
import Link from 'next/link'

const Activity = ({ activities }) => {
  const [activity, setActivity] = useState(activities)
  useEffect(() => {
    setActivity(activities)
  }, [activities])
  return (
    <div className='centered-content-full'>
      <div className='custom-carousel-content'>
        {activity.map((item) => (
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
    </div>
  )
}

export default Activity
