import AppMenu from '@/components/dashboard/AppMenu'
import React, { useContext, useEffect, useState } from 'react'
import Title from '@/components/landing/Title'
import Update from './Update'
import Connect from './Connect'
import { useRouter } from 'next/router'
import ChangePassword from './ChangePassword'
import { useToast } from '@/components/contexts/ToastContext'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const SettingPage = () => {
  const router = useRouter()
  const { connect } = router.query
  const index = connect == 1 ? 1 : connect == 2 ? 2 : 0
  const [activeIndex, setActiveIndex] = useState(index)
  const [isMobile, setIsMobile] = useState(false)

  const { t } = useTranslation('setting')

  useEffect(() => {
    setActiveIndex(index)
  }, [connect])
  const model = [
    {
      label: t('update_profile'),
      icon: 'pi pi-fw pi-user-edit',
      to: '/setting',
    },
    {
      label: t('change_password'),
      icon: 'pi pi-lock',
      to: '/change-password',
    },
    {
      label: t('connect_apps'),
      icon: 'pi pi-fw pi-paperclip',
      to: '/connect',
    },
  ]

  const modelMobile = [
    {
      icon: 'pi pi-fw pi-user-edit',
      to: '/setting',
    },
    {
      icon: 'pi pi-lock',
      to: '/change-password',
    },
    {
      icon: 'pi pi-fw pi-paperclip',
      to: '/connect',
    },
  ]

  useEffect(() => {
    //responsive window
    if (window.innerHeight > window.innerWidth) {
      setIsMobile(true)
    }
  }, [])

  return (
    <div className='centered-content-full'>
      <div className='centered-content-layout'>
        <Title title={model[activeIndex].label} />
        <div id='setting-container'>
          <div id='setting-menu-container'>
            <AppMenu
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              model={isMobile ? modelMobile : model}
            />
          </div>
          <div id='setting-profile-container'>
            {activeIndex === 0 ? (
              <Update t={t} isMobile={isMobile} />
            ) : activeIndex === 2 ? (
              <Connect t={t} isMobile={isMobile} />
            ) : (
              <ChangePassword t={t} isMobile={isMobile} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingPage
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['setting', 'topbar'])),
    },
  }
}
