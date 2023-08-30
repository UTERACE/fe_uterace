import Link from 'next/link'
import React, { useState } from 'react'
import Title from './Title'
import Detail from './Detail'

const Club = ({ club }) => {
  return (
    <div className='centered-content-layout'>
      <Title title='Club activities' />
      <div className='custom-carousel-content'>
        {club.map((item) => (
          <div id='club-container'>
            <div id='image-container-club'>
              <img src={item.image} alt={item.name} />
            </div>
            <div id='info-club'>
              <h4>
                <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
                {item.member} members
              </h4>
              <h4>
                <i className='pi pi-map ml2-icon' aria-hidden='true'></i>
                {item.total_distance} km
              </h4>
            </div>
            <div id='name-club'>
              <i class='fa fa-running icon-run' aria-hidden='true'></i>
              <div id='share-register-container'>
                <h4>{item.name}</h4>
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
        ))}
      </div>
      <Detail link='/club' />
    </div>
  )
}

export default Club
