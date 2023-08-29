import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'

const Slideshow = ({ data, interval = 3000 }) => {
  const brand = data.brand
  const [currentSlide, setCurrentSlide] = useState(0)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % brand.length)
    }, interval)
    return () => clearInterval(slideInterval)
  }, [brand, interval])
  return (
    <div id='slideshow-container'>
      {brand.map((slide, index) => (
        <div
          key={slide.id}
          id='slide'
          style={{ display: index === currentSlide ? 'block' : 'none' }}
        >
          <img src={slide.image} alt={slide.title} />
          <div id='slide-caption'>
            <div id='slide-name'>{slide.name}</div>
            <div>{slide.content}</div>
            <div id='multi-color-border'>
              <Button
                id='button-dark'
                label='Explore all artwork'
                severity='secondary'
                raised
              />
            </div>

            <div id='overview-slide'>
              <div>
                <span>{data.total_brand}k+</span>
                <h>Artwork</h>
              </div>
              <div>
                <span>{data.total_product}k+</span>
                <h>Artist</h>
              </div>
            </div>
          </div>
          <Button
            id='prev'
            onClick={() =>
              setCurrentSlide(
                currentSlide === 0 ? brand.length - 1 : currentSlide - 1
              )
            }
          >
            &#10094;
          </Button>
          <Button
            id='next'
            onClick={() => setCurrentSlide((currentSlide + 1) % brand.length)}
          >
            &#10095;
          </Button>
        </div>
      ))}
    </div>
  )
}

export default Slideshow
