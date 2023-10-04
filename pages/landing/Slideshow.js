import Detail from '@/components/landing/Detail'
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
  }, [events, interval])
  return (
    <div id='slideshow-container'>
      {events.map((slide, index) => (
        <div
          key={slide.id}
          id='slide'
          style={{ display: index === currentSlide ? 'block' : 'none' }}
        >
          <img src={slide.image} alt={slide.title} />
          <div id='slide-caption-content'>
            <div id='slide-name'>{slide.name}</div>
            <div>{slide.content}</div>
            <div id='slide-detail-container'>
              <div id='slide-detail'>
                <Detail link={`/events/event-detail/${slide.id}`} />
              </div>

              <div id='overview-slide'>
                <div>
                  <span>{slide.member}</span>
                  <h>Thành viên </h>
                </div>
                <div>
                  <span>{slide.club}k+</span>
                  <h>Câu lạc bộ</h>
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
