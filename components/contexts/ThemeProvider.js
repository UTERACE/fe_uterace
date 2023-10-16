import React, { useEffect, useState } from 'react'

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light')
    theme === 'dark'
      ? document.body.className = 'dark'
      : document.body.className = 'light'
  }
  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    localTheme && setTheme(localTheme)
  }, [])
  return (
    <div id='theme-container'>
      <button id='theme-button' onClick={toggleTheme}>
        {theme === 'light' ? 'Dark' : 'Light'}
      </button>
      {children}
    </div>
  )
}

export default ThemeProvider
