import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'

const Carousel = ({
  value = [],
  numVisible,
  numScroll,
  responsiveOptions = [
    {
      breakpoint: 1920,
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: 1024,
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: 768,
      numVisible: 1,
      numScroll: 1,
    },
  ],
  itemTemplate,
  interval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [column, setColumn] = useState(3)
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width > 0 && width <= responsiveOptions[2].breakpoint) {
        setColumn(responsiveOptions[2].numVisible)
      } else if (
        width <= responsiveOptions[1].breakpoint &&
        width > responsiveOptions[2].breakpoint
      ) {
        setColumn(responsiveOptions[1].numVisible)
      } else if (
        width <= responsiveOptions[0].breakpoint &&
        width > responsiveOptions[1].breakpoint
      ) {
        setColumn(responsiveOptions[0].numVisible)
      } else {
        setColumn(3)
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Handle scrolling the carousel
  const handleScroll = (direction) => {
    const newIndex = currentIndex + direction * numScroll
    if (newIndex >= value.length + 1 - column) {
      setCurrentIndex(0)
    } else if (newIndex < 0) {
      setCurrentIndex(value.length - 1)
    } else {
      setCurrentIndex(newIndex)
    }
  }

  // Handle autoplay
  useEffect(() => {
    const slideInterval = setInterval(() => {
      handleScroll(1)
    }, interval)
    return () => clearInterval(slideInterval)
  }, [currentIndex, interval])
  useEffect(() => {
    const carouselElement = document.getElementsByClassName(
      'custom-carousel-content'
    )[1]
    if (carouselElement) {
      carouselElement.style.setProperty('--num-columns', column)
    }
  }, [column])
  
  return (
    <div id='carousel-container-wrapper'>
      <div id='carousel-container'>
        <Button
          id='prev-news'
          onClick={() => handleScroll(-1)}
          icon='pi pi-chevron-left'
        ></Button>
        <div className='custom-carousel-content' style={{ width: '100%' }}>
          {value
            .slice(currentIndex, currentIndex + column)
            .map((item, index) => {
              return itemTemplate(item, index)
            })}
        </div>
        <Button
          id='next-news'
          onClick={() => handleScroll(1)}
          icon='pi pi-chevron-right'
        ></Button>
      </div>
      <div id='pagination-container'>
        {value.map((item, index) => {
          return (
            <div
              key={index}
              className={
                index >= currentIndex &&
                index < currentIndex + column &&
                'active'
              }
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
