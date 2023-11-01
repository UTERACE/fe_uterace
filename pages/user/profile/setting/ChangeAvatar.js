import store from '@/store/store'
import React, { useState } from 'react'
import { FileUpload } from 'primereact/fileupload'
import { Button } from 'primereact/button'

const ChangeAvatar = () => {
  const [background, setBackground] = useState('/bg1.png')
  const [avatar, setAvatar] = useState(`${store.getState().auth.image}`)

  const customBase64Uploader = async (event) => {
    const file = event.files[0]
    const reader = new FileReader()
    let blob = await fetch(file.objectURL).then((r) => r.blob())
    reader.readAsDataURL(blob)
    reader.onloadend = function () {
      const base64data = reader.result
      setBackground(base64data)
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
        <img src={background} alt='background' />
        <div id='camera-container-background'>
          <i className='fas fa-camera'></i>
          <FileUpload
            mode='basic'
            name='demo[]'
            url='/user/profile'
            accept='image/*'
            maxFileSize={1000000}
            onUpload={customBase64Uploader}
            auto
            chooseLabel=' '
          />
        </div>
      </div>
      <div id='avatar-container'>
        <img src={avatar} alt='avatar' />
        <div id='camera-container-avatar'>
          <i className='fas fa-camera'></i>
          <FileUpload
            mode='basic'
            name='demo[]'
            url='/user/profile'
            accept='image/*'
            maxFileSize={1000000}
            onUpload={customBase64UploaderAvatar}
            auto
            chooseLabel=' '
          />
        </div>
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
        />
      </div>
    </div>
  )
}

export default ChangeAvatar
