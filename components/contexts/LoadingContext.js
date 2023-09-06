import React, { createContext, useState } from 'react'
import { ProgressSpinner } from 'primereact/progressspinner'

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={setLoading}>
      {children}
      {loading && (
        <div className='loading-overlay'>
          <ProgressSpinner />
        </div>
      )}
    </LoadingContext.Provider>
  )
}

export { LoadingContext, LoadingProvider }
