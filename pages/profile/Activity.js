import React from 'react'
import Title from '../../components/landing/Title'
import Link from 'next/link'

const Activity = ({ activities }) => {
  return (
    <div className='centered-content-full' style={{ width: '95%' }}>
      <div className='custom-carousel-content'>
        {activities.map((item) => (
          <div id='activities-container'>
            <div id='info-activities'>
              <h4>
                <i className='pi pi-calendar ml2-icon' aria-hidden='true'></i>
                {item.member} members
              </h4>
            </div>
            <div id='name-activities'>
              <i class='fa fa-running icon-run' aria-hidden='true'></i>
              <h4>{item.name}</h4>
            </div>
            <div id='name-activities'>
              <a id='link-event'>
                <i className='pi pi-map' aria-hidden='true'></i> 2.49 km
              </a>
              <a id='link-event'>
                <i className='pi pi-chart-bar' aria-hidden='true'></i> 05:18/km
              </a>
              <a id='link-event'>
                <i className='pi pi-stopwatch' aria-hidden='true'></i> 0:12:45
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Activity
