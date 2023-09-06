import React, { createContext, useContext, useRef } from 'react'
import { Toast } from 'primereact/toast'

const ToastContext = createContext()
const ToastProvider = ({ children }) => {
  const toast = useRef(null)
  const showToast = (severity, summary, detail) => {
    toast.current.show({
      severity: severity,
      summary: summary,
      detail: detail,
      life: 3000,
    })
  }
  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toast} />
      {children}
    </ToastContext.Provider>
  )
}
export const useToast = () => {
  return useContext(ToastContext)
}
export default ToastProvider
