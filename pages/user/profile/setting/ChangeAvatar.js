import store from '@/store/store'
import React, { useRef, useState } from 'react'
import { Button } from 'primereact/button'
import apiInstance from '@/api/apiInstance'
import Image from 'next/image'

const ChangeAvatar = ({ setLoading, showToast, setVisibleChange }) => {
  const [background, setBackground] = useState('/bg1.png')
  const [avatar, setAvatar] = useState(`${store.getState().auth.image}`)
  const inputRef = useRef()

  const customBase64Uploader = async (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 2000000) {
        showToast(
          'error',
          'Tải ảnh lên thất bại',
          'Kích thước ảnh tối đa là 2MB'
        )
        return
      }
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64Data = e.target.result
        setAvatar(base64Data)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpdateAvatar = async () => {
    setLoading(true)
    const data = {
      image: avatar,
    }
    console.log('data', data)
    try {
      const res = await apiInstance.put('/user/update', data)
      const dataRes = res.data
      if (res.status == 200) {
        showToast(
          'success',
          'Cập nhật ảnh đại diện thành công',
          dataRes.message
        )
        setLoading(false)
        setVisibleChange(false)
      }
    } catch (error) {
      showToast('error', 'Cập nhật ảnh đại diện thất bại', error)
      setLoading(false)
    }
  }

  const customBase64UploaderAvatar = async (event) => {
    const file = event.files[0]
    const reader = new FileReader()
    let blob = await fetch(file.objectURL).then((r) => r.blob())
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      const base64data = reader.result
      setAvatar(base64data)
    }
  }

  return (
    <div id='change-avatar-container'>
      <div id='background-container'>
        <Image src={background} alt='background' width={20} height={20} />
        <div id='camera-container-background'>
          <i className='pi pi-camera p-icon-lg'></i>
        </div>
      </div>
      <div id='avatar-container'>
        <Image src={avatar} alt='avatar' width={20} height={20} />
        <div
          id='camera-container-avatar'
          onClick={() => {
            inputRef.current.click()
          }}
        >
          <i className='pi pi-camera p-icon-lg'></i>
        </div>
        <input
          type='file'
          accept='image/*'
          ref={inputRef}
          onChange={customBase64Uploader}
          style={{ display: 'none' }}
        />
      </div>
      <div id='button-update-container'>
        <Button
          id='button-detail'
          type='button'
          severity='secondary'
          raised
          icon='pi pi-pencil'
          iconPos='right'
          label='Cập nhật'
          onClick={() => {
            handleUpdateAvatar()
          }}
        />
      </div>
    </div>
  )
}

export default ChangeAvatar
