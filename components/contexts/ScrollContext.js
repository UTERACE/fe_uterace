import React, { useEffect, useState } from 'react'

const ScrollContext = ({ children }) => {
  const [showButton, setShowButton] = useState(false)

  const handleScroll = () => {
    const offset = window.scrollY
    if (offset > 200) {
      setShowButton(true)
    } else {
      setShowButton(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: `smooth` })
  }

  return (
    <div id='scroll-container'>
      {showButton && (
        <button id='scroll-button' onClick={handleClick}>
            <i className='pi pi-arrow-up' />
        </button>
      )}
      {children}
    </div>
  )
}

export default ScrollContext
