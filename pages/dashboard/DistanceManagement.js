import apiInstance from '@/api/apiInstance'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import DataTable from '@/components/datatable/DataTable'
import { Button } from 'primereact/button'
import { ConfirmPopup } from 'primereact/confirmpopup'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import React, { useContext, useEffect, useRef, useState } from 'react'

const DistanceManagement = () => {
  const [distance, setDistance] = useState([])
  const [name, setName] = useState('')
  const [distanceValue, setDistanceValue] = useState()
  const [distanceID, setDistanceID] = useState()

  const [visible, setVisible] = useState(false)
  const buttonEl = useRef(null)
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const [visibleAddDistance, setVisibleAddDistance] = useState(false)
  const [visibleEditDistance, setVisibleEditDistance] = useState(false)

  useEffect(() => {
    fetchDistance()
  }, [])

  const fetchDistance = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get('/distance')
      if (res.status === 200) {
        setDistance(res.data)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Lấy danh sách cự ly thất bại')
      setLoading(false)
    }
  }

  const fetchDetailDistance = async (id) => {
    setLoading(true)
    try {
      const res = await apiInstance.get(`/distance/${id}`)
      if (res.status === 200) {
        setDistanceID(res.data.runningCategoryID)
        setName(res.data.runningCategoryName)
        setDistanceValue(res.data.runningCategoryDistance)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Lấy chi tiết cự ly thất bại')
      setLoading(false)
    }
  }

  const addDistance = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.post('/distance', {
        runningCategoryName: name,
        runningCategoryDistance: distanceValue,
      })
      if (res.status === 200) {
        showToast('success', 'Thêm cự ly thành công', res.data.message)
        fetchDistance()
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Thêm cự ly thất bại')
      setLoading(false)
    }
  }

  const editDistance = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.put(`/distance/${distanceID}`, {
        runningCategoryName: name,
        runningCategoryDistance: distanceValue,
      })
      if (res.status === 200) {
        showToast('success', 'Cập nhật cự ly thành công', res.data.message)
        setName('')
        setDistanceValue('')
        setDistanceID()
        fetchDistance()
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Cập nhật cự ly thất bại')
      setLoading(false)
    }
  }

  const acceptDelete = () => {
    deleteDistance(distanceID)
  }

  const rejectDelete = () => {
    showToast('info', 'Đã hủy xóa cự ly')
  }

  const deleteDistance = async (id) => {
    setLoading(true)
    try {
      const res = await apiInstance.delete(`/distance/${id}`)
      if (res.status === 200) {
        showToast('success', 'Xóa cự ly thành công', res.data.message)
        fetchDistance()
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Xóa cự ly thất bại')
      setLoading(false)
    }
  }

  const formatEditButton = (rowData) => {
    return (
      <div id='content-datatable-container'>
        <i className='pi pi-pencil' style={{ fontSize: '1.5em' }}></i>
        <Button
          label='Cập nhật'
          className='p-button-warning'
          onClick={() => {
            fetchDetailDistance(rowData.runningCategoryID)
            setVisibleEditDistance(true)
          }}
        />
      </div>
    )
  }

  const formatDeleteButton = (rowData) => {
    return (
      <div id='content-datatable-container'>
        <i className='pi pi-trash' style={{ fontSize: '1.5em' }}></i>
        <Button
          ref={buttonEl}
          label='Xóa'
          className='p-button-danger'
          onClick={() => {
            setVisible(true)
            setDistanceID(rowData.runningCategoryID)
          }}
        />
        <ConfirmPopup
          target={buttonEl.current}
          visible={visible}
          onHide={() => setVisible(false)}
          message={'Bạn có chắc chắn muốn xóa cự ly này?'}
          icon='pi pi-exclamation-triangle'
          accept={acceptDelete}
          reject={rejectDelete}
        />
      </div>
    )
  }

  const distanceColumns = [
    { field: 'runningCategoryID', header: 'ID' },
    { field: 'runningCategoryName', header: 'Tên cự ly' },
    { field: 'runningCategoryDistance', header: 'Khoảng cách (km)' },
    { field: 'edit', header: 'Cập nhật cự ly', body: formatEditButton },
    { field: 'delete', header: 'Xóa cự ly', body: formatDeleteButton },
  ]

  return (
    <div id='initial-user-container'>
      <DataTable data={distance} columns={distanceColumns} />
      <div>
        <Button
          label='Thêm cự ly'
          className='p-button-success'
          icon='pi pi-plus'
          onClick={() => {
            setVisibleAddDistance(true)
          }}
        />
      </div>
      <Dialog
        header='Thêm cự ly'
        visible={visibleAddDistance}
        position='top'
        style={{ width: '40vw' }}
        onHide={() => {
          setVisibleAddDistance(false)
        }}
        footer={
          <div id='distance-form-footer'>
            <Button
              label='Hủy'
              icon='pi pi-times'
              className='p-button-danger'
              onClick={() => {
                setVisibleAddDistance(false)
              }}
            />
            <Button
              label='Thêm cự ly'
              className='p-button-success'
              icon='pi pi-plus'
              onClick={() => {
                addDistance()
                setVisibleAddDistance(false)
              }}
            />
          </div>
        }
      >
        <div id='distance-form-container'>
          <InputText
            placeholder='Tên cự ly'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <InputNumber
            placeholder='Khoảng cách (km)'
            value={distanceValue}
            onChange={(e) => {
              setDistanceValue(e.value)
            }}
            min={0}
          />
        </div>
      </Dialog>
      <Dialog
        header='Cập nhật cự ly'
        visible={visibleEditDistance}
        position='top'
        style={{ width: '50vw' }}
        onHide={() => {
          setVisibleEditDistance(false)
        }}
        footer={
          <div id='distance-form-footer'>
            <Button
              label='Hủy'
              icon='pi pi-times'
              className='p-button-danger'
              onClick={() => {
                setVisibleEditDistance(false)
              }}
            />
            <Button
              label='Xóa cự ly'
              icon='pi pi-trash'
              className='p-button-danger'
              onClick={() => {
                setVisible(true)
              }}
            />
            <Button
              label='Cập nhật cự ly'
              className='p-button-warning'
              onClick={() => {
                editDistance()
                setVisibleEditDistance(false)
              }}
            />
          </div>
        }
      >
        <div id='distance-form-container'>
          <InputText
            placeholder='Tên cự ly'
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
          <InputNumber
            placeholder='Khoảng cách (km)'
            value={distanceValue}
            onChange={(e) => {
              setDistanceValue(e.value)
            }}
            suffix='km'
            min={0}
          />
        </div>
      </Dialog>
    </div>
  )
}

export default DistanceManagement
