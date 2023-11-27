import React, { useEffect, useState } from 'react'
import LeafletMap from './LeafletMap'
import apiInstance from '@/api/apiInstance'
import { Dialog } from 'primereact/dialog'
import LocaleHelper from '@/components/locale/LocaleHelper'
import Image from 'next/image'

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
  setLoading,
  showToast,
}) => {
  const [column, setColumn] = useState(3)
  const [polyline, setPolyline] = useState([])
  const [visibleMap, setVisibleMap] = useState(false)

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

  const fetchDataMap = async (activity_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.get(`/decode_polyline/${activity_id}`)
      if (res.status === 200) {
        setPolyline(res.data)
        setLoading(false)
      }
    } catch (e) {
      showToast('error', 'Error')
      setLoading(false)
    }
  }

  return (
    <div className='custom-carousel-content'>
      {activities.map((item) => (
        <div id='activities-container'>
          <div id='info-activities'>
            <h4>
              <i className='pi pi-calendar ml2-icon' aria-hidden='true'></i>
              {LocaleHelper.formatDateTime(new Date(item.activity_start_date))}
            </h4>
          </div>
          <div id='name-activities'>
            <div>
              <i class='fa fa-running icon-run' aria-hidden='true'></i>
            </div>
            <div>
              <h4>{item.activity_name}</h4>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Image
                src={'/googlemap-icon.png'}
                alt='avatar'
                onClick={() => {
                  fetchDataMap(item.activity_id)
                  setVisibleMap(true)
                }}
                title='Xem bản đồ'
                width={50}
                height={50}
              />
              <Image
                src={'/strava-icon.png'}
                alt='avatar'
                onClick={() => {
                  window.open(item.activity_link_strava, '_blank')
                }}
                title='Xem trên Strava'
                width={50}
                height={50}
              />
            </div>
          </div>
          <div id='name-activities'>
            <a id='link-activities'>
              <i className='pi pi-map' aria-hidden='true'></i>{' '}
              {LocaleHelper.formatMtoKm(item.activity_distance)}
              km
            </a>
            <a id='link-activities'>
              <i className='pi pi-chart-bar' aria-hidden='true'></i>{' '}
              {LocaleHelper.formatPace(item.activity_pace)} min/km
            </a>
            <a id='link-activities'>
              <i className='pi pi-stopwatch' aria-hidden='true'></i>{' '}
              {item.activity_duration}
            </a>
          </div>
        </div>
      ))}
      <Dialog
        header='Bản đồ'
        visible={visibleMap}
        position='top'
        style={{ width: '60vw', marginLeft: '20px' }}
        onHide={() => setVisibleMap(false)}
        draggable={false}
        resizable={false}
      >
        <div
          style={{
            width: '100%',
            height: '50%',
            backgroundColor: 'white',
          }}
        >
          <LeafletMap
            center={polyline[0]}
            startPoint={polyline[0]}
            endPoint={polyline[polyline.length - 1]}
            positions={polyline}
          ></LeafletMap>
        </div>
      </Dialog>
    </div>
  )
}

export default Activity
