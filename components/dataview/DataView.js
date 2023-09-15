import Link from 'next/link'
import React, { useState } from 'react'

const DataView = ({ data, href, itemTemplate }) => {
  return (
    <div className='centered-content-layout'>
      <div className='custom-carousel-content'>
        {data.map((item, index) =>
          itemTemplate ? (
            itemTemplate(item, index)
          ) : (
            <Link id='link-dataview' href={href + item.club_id}>
              <div id='dataview-container'>
                <div id='image-container-dataview'>
                  <img src={item.image} alt={item.name} />
                </div>
                <div id='info-dataview'>
                  <h4>
                    <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
                    {item.member} Thành viên
                  </h4>
                  <h4>
                    <i className='pi pi-map ml2-icon' aria-hidden='true'></i>
                    {item.total_distance} Km
                  </h4>
                </div>
                <div id='name-dataview'>
                  <i class='fa fa-briefcase icon-run' aria-hidden='true'></i>
                  <div id='share-register-container'>
                    <h4>{item.name}</h4>
                    <div id='share-register-content'>
                      <Link id='link-event' href={href + item.club_id}>
                        Tham gia câu lạc bộ{' '}
                        <i className='pi pi-arrow-right' aria-hidden='true'></i>
                      </Link>
                      <Link id='link-event' href='/share'>
                        Chia sẻ{' '}
                        <i className='pi pi-share-alt' aria-hidden='true'></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  )
}

export default DataView
