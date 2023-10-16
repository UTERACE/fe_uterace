import AppMenu from '@/components/dashboard/AppMenu'
import React, { useContext, useEffect, useState } from 'react'
import Title from '@/components/landing/Title'
import Update from './Update'
import Connect from './Connect'
import { useRouter } from 'next/router'
import ChangePassword from './ChangePassword'
import { useToast } from '@/components/contexts/ToastContext'
import { LoadingContext } from '@/components/contexts/LoadingContext'

const SettingPage = () => {
  const router = useRouter()
  const { connect } = router.query
  const showToast = useToast().showToast
  const setLoading = useContext(LoadingContext)
  const index = connect == 1 ? 1 : connect == 2 ? 2 : 0
  const [activeIndex, setActiveIndex] = useState(index)
  const [provinceOptions, setProvinceOptions] = useState([])
  const [districtOptions, setDistrictOptions] = useState([])
  const [wardOptions, setWardOptions] = useState([])
  const [organizationOptions, setOrganizationOptions] = useState([])
  const [childOrganizationOptions, setChildOrganizationOptions] = useState([])

  const model = [
    {
      label: 'Cập nhật hồ sơ',
      icon: 'pi pi-fw pi-user-edit',
      to: '/setting',
    },
    {
      label: 'Thay đổi mật khẩu',
      icon: 'pi pi-pencil',
      to: '/change-password',
    },
    {
      label: 'Kết nối ứng dụng',
      icon: 'pi pi-fw pi-paperclip',
      to: '/connect',
    },
  ]
  return (
    <div className='centered-content-full'>
      <div className='centered-content-layout'>
        <Title title={model[activeIndex].label} />
        <div id='setting-container'>
          <div id='setting-menu-container'>
            <AppMenu
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              model={model}
            />
          </div>
          <div id='setting-profile-container'>
            {activeIndex === 0 ? (
              <Update />
            ) : activeIndex === 2 ? (
              <Connect />
            ) : (
              <ChangePassword />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingPage
