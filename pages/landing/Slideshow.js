import Detail from '@/components/landing/Detail'
import Image from 'next/image'
import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'

const Slideshow = ({ data, interval = 3000 }) => {
  const events = data
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % events.length)
    }, interval)
    return () => clearInterval(slideInterval)
  }, [interval])

  return (
    <div id='slideshow-container'>
      {events.map((slide, index) => (
        <div
          key={slide.event_id}
          id='slide'
          style={{ display: index === currentSlide ? 'block' : 'none' }}
        >
          <Image src={slide.image} alt={slide.title} width={1920} height={1080} />
          <div id='slide-caption-content'>
            <div id='slide-name'>{slide.title}</div>
            <div>{slide.content}</div>
            <div id='slide-detail-container'>
              <div id='slide-detail'>
                <Detail link={`/events/event-detail/${slide.event_id}`} />
              </div>

              <div id='overview-slide'>
                <div>
                  <span>{slide.total_members}</span>
                  <h>Thành viên </h>
                </div>
                <div>
                  <span>{slide.total_activities}</span>
                  <h>Hoạt động </h>
                </div>
              </div>
            </div>
          </div>
          <Button
            id='prev'
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0 ? events.length - 1 : currentSlide - 1
              )
            }
            icon='pi pi-chevron-left'
          ></Button>
          <Button
            id='next'
            onClick={() => setCurrentSlide((currentSlide + 1) % events.length)}
            icon='pi pi-chevron-right'
          ></Button>
        </div>
      ))}
    </div>
  )
}

export default Slideshow
