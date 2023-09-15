import React, { useEffect, useState } from 'react'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import '../styles/layout.scss'
import Layout from '@/components/layout/Layout'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from '@/store/store'
import ToastProvider from '@/components/contexts/ToastContext'
import { LoadingProvider } from '@/components/contexts/LoadingContext'
import { useRouter } from 'next/router'
import { ProgressSpinner } from 'primereact/progressspinner'
export default function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <ToastProvider>
            <LoadingProvider>
              {loading && (
                <div className='loading-overlay'>
                  <ProgressSpinner />
                </div>
              )}
              <Component {...pageProps} />
            </LoadingProvider>
          </ToastProvider>
        </Layout>
      </PersistGate>
    </Provider>
  )
}
