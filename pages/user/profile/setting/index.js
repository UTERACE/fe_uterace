import AppMenu from '@/components/dashboard/AppMenu'
import Form, { Field } from '@/components/react-hook-form/Form'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import Title from '@/components/landing/Title'
import Update from './Update'
import Connect from './Connect'
import { useRouter } from 'next/router'
import ChangePassword from './ChangePassword'
import apiInstance from '@/api/apiInstance'

const SettingPage = () => {
  const router = useRouter()
  const { connect } = router.query
  const index = connect == 1 ? 1 : connect == 2 ? 2 : 0
  const [activeIndex, setActiveIndex] = useState(index)

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
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm()
  const onSubmit = (data) => {
    console.log(data)
  }
  const gender = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' },
  ]
  const organization = [
    { label: 'Đại học Bách Khoa Hà Nội', value: 'bk' },
    { label: 'Đại học Công Nghệ', value: 'ctu' },
    { label: 'Đại học Công Nghiệp', value: 'iuh' },
    { label: 'Đại học Kinh Tế', value: 'ueh' },
    { label: 'Đại học Khoa Học Tự Nhiên', value: 'hcmus' },
    { label: 'Đại học Sư Phạm', value: 'hcmup' },
    { label: 'Đại học Sư Phạm Kỹ Thuật', value: 'hcmute' },
    { label: 'Đại học Sư Phạm Thể Dục Thể Thao', value: 'hsp' },
  ]
  const childOrganization = [
    { label: 'Khoa Công Nghệ Thông Tin', value: 'fit' },
    { label: 'Khoa Khoa Học và Kỹ Thuật Máy Tính', value: 'cse' },
    { label: 'Khoa Kiến Trúc', value: 'arch' },
    { label: 'Khoa Kỹ Thuật Hóa Học', value: 'che' },
    { label: 'Khoa Kỹ Thuật Công Nghiệp', value: 'ie' },
    { label: 'Khoa Kỹ Thuật Điện Tử Viễn Thông', value: 'et' },
    { label: 'Khoa Kỹ Thuật Môi Trường', value: 'env' },
    { label: 'Khoa Kỹ Thuật Vật Liệu', value: 'mat' },
    { label: 'Khoa Toán - Cơ - Tin Học', value: 'math' },
    { label: 'Khoa Vật Lý Kỹ Thuật', value: 'pe' },
    { label: 'Khoa Quản Trị Kinh Doanh', value: 'bs' },
    { label: 'Khoa Khoa Học và Kỹ Thuật Vật Liệu', value: 'mse' },
    { label: 'Khoa Kỹ Thuật Cơ Khí', value: 'me' },
    { label: 'Khoa Kỹ Thuật Điện', value: 'ee' },
    { label: 'Khoa Kỹ Thuật Điện Tử', value: 'eet' },
    { label: 'Khoa Kỹ Thuật Máy Tính và Mạng', value: 'cse' },
  ]
  const ward = [
    { label: 'Phường 1', value: '1' },
    { label: 'Phường 2', value: '2' },
    { label: 'Phường 3', value: '3' },
    { label: 'Phường 4', value: '4' },
    { label: 'Phường 5', value: '5' },
  ]
  const district = [
    { label: 'Quận 1', value: '1' },
    { label: 'Quận 2', value: '2' },
    { label: 'Quận 3', value: '3' },
    { label: 'Quận 4', value: '4' },
    { label: 'Quận 5', value: '5' },
  ]
  const city = [
    { label: 'Hồ Chí Minh', value: 'hcm' },
    { label: 'Hà Nội', value: 'hn' },
    { label: 'Đà Nẵng', value: 'dn' },
    { label: 'Cần Thơ', value: 'ct' },
    { label: 'Hải Phòng', value: 'hp' },
  ]
  useEffect(() => {
    fetchUser()
  }, [])
  const fetchUser = async () => {
    try {
      const response = await apiInstance.get('/user')
      console.log('resp',response)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#ffffff',
      }}
    >
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
