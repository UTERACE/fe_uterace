import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { Calendar } from 'primereact/calendar'
import Form, { Field } from '@/components/react-hook-form/Form'
import { InputText } from 'primereact/inputtext'
import { InputMask } from 'primereact/inputmask'
import { Button } from 'primereact/button'
import { useToast } from '@/components/contexts/ToastContext'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import apiInstance from '@/api/apiInstance'

const Update = ({ t, isMobile = false }) => {
  const showToast = useToast().showToast
  const setLoading = useContext(LoadingContext)
  const [provinceOptions, setProvinceOptions] = useState([])
  const [districtOptions, setDistrictOptions] = useState([])
  const [wardOptions, setWardOptions] = useState([])
  const [organizationOptions, setOrganizationOptions] = useState([])
  const [childOrganizationOptions, setChildOrganizationOptions] = useState([])
  const [initialValues, setInitialValues] = useState({})

  const [dataProvince, setDataProvince] = useState([])
  const [dataDistrict, setDataDistrict] = useState([])
  const [dataOrganization, setDataOrganization] = useState([])

  useEffect(() => {
    setLoading(true)
    fetchUser()
    fetchProvince()
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchDistrict(dataProvince)
  }, [dataProvince])

  useEffect(() => {
    fetchWard(dataDistrict, dataProvince)
  }, [dataDistrict, dataProvince])

  const fetchUser = async () => {
    try {
      const response = await apiInstance.get('/user')
      const data = response.data
      setDataProvince(data.province)
      setDataDistrict(data.district)
      setDataOrganization(data.organization)
      setInitialValues({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        telNumber: data.telNumber,
        gender: data.gender,
        birthday: new Date(data.birthday),
        organization: data.organization,
        childOrganization: data.childOrganization,
        province: data.province,
        district: data.district,
        ward: data.ward,
        address: data.address,
      })
    } catch (error) {
      showToast('error', 'Lỗi!', error)
    }
  }

  const fetchProvince = async () => {
    try {
      const response = await apiInstance.get('/area/province')
      const data = response.data
      const options = data.map((item) => ({
        label: item.province_name,
        value: item.province_id,
      }))
      setProvinceOptions(options)
    } catch (error) {
      showToast('error', 'Lỗi!', error)
    }
  }

  const fetchDistrict = async (provinceId) => {
    try {
      const response = await apiInstance.get(
        `/area/district?province=${provinceId}`
      )
      const data = response.data
      const options = data.map((item) => ({
        label: item.district_name,
        value: item.district_id,
      }))
      setDistrictOptions(options)
    } catch (error) {
      showToast('error', 'Lỗi!', error)
    }
  }

  const fetchWard = async (districtId, provinceId) => {
    try {
      const response = await apiInstance.get(
        `/area/precinct?district=${districtId}&province=${provinceId}`
      )
      const data = response.data
      const options = data.map((item) => ({
        label: item.precinct_name,
        value: item.precinct_id,
      }))
      setWardOptions(options)
    } catch (error) {
      showToast('error', 'Lỗi!', error)
    }
  }

  const onSubmit = (data) => {
    handleUpdateProfile(data)
  }

  const handleUpdateProfile = async (data) => {
    setLoading(true)
    const date = new Date(data.birthday)
    const strBirthday =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0')
    data.birthday = strBirthday
    if (data.telNumber === null) delete data.telNumber
    else data.telNumber = data.telNumber.replace(/[^0-9]/g, '')
    data.image = ''

    try {
      const res = await apiInstance.put('/user/update', data)
      if (res.data.status === 200) {
        showToast('success', t('update_success'), res.data.message)
      } else {
        showToast('error', t('update_fail'), res.data.message)
      }
    } catch (err) {
      showToast('error', t('update_fail'), err)
    }
    setLoading(false)
  }

  const gender = [
    { label: 'Nam', value: 'Nam' },
    { label: 'Nữ', value: 'Nu' },
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

  return (
    <Form onSubmit={onSubmit} initialValue={initialValues}>
      <div id='form-setting' style={isMobile ? { width: 'auto' } : null}>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field name='firstname' label={t('first_name')} required>
              <InputText type='text' style={{ width: '100%' }} />
            </Field>
          </div>
          <div className='col-6' id='width-100-center'>
            <Field name='lastname' label={t('last_name')} required>
              <InputText type='text' style={{ width: '100%' }} />
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field name='email' label={t('email')} required>
              <InputText type='text' style={{ width: '100%' }} />
            </Field>
          </div>
          <div className='col-6' id='width-100-center'>
            <Field name='telNumber' label={t('phone')}>
              <InputMask
                mask='(999) 999-9999'
                placeholder='(999) 999-9999'
                style={{ width: '100%' }}
              ></InputMask>
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Field name='gender' label={t('sex')}>
              <Dropdown
                options={gender}
                style={{ width: '100%', borderRadius: '10px' }}
              ></Dropdown>
            </Field>
          </div>
          <div className='col-6' id='width-100-center'>
            <Field name='birthday' label={t('dob')}>
              <Calendar style={{ width: '100%' }}></Calendar>
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-12' id='width-100-center'>
            <Field name='organization' label={t('organization')}>
              <Dropdown
                options={organization}
                style={{ width: '100%', borderRadius: '10px' }}
                onChange={(e) => {
                  setDataOrganization(e.value)
                }}
              ></Dropdown>
            </Field>
          </div>
          <div className='col-12' id='width-100-center'>
            <Field name='childOrganization' label={t('child_org')}>
              <Dropdown
                options={childOrganization}
                style={{ width: '100%', borderRadius: '10px' }}
              ></Dropdown>
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-12' id='width-100-center'>
            <Field name='province' label={t('province')}>
              <Dropdown
                options={provinceOptions}
                style={{ width: '100%', borderRadius: '10px' }}
                value={dataProvince}
                onChange={(e) => {
                  setDataProvince(e.value)
                  fetchDistrict(e.value)
                }}
              ></Dropdown>
            </Field>
          </div>
          <div className='col-12' id='width-100-center'>
            <Field name='district' label={t('district')}>
              <Dropdown
                options={districtOptions}
                style={{ width: '100%', borderRadius: '10px' }}
                value={dataDistrict}
                onChange={(e) => {
                  setDataDistrict(e.value)
                  fetchWard(e.value, dataProvince)
                }}
              ></Dropdown>
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-12' id='width-100-center'>
            <Field name='ward' label={t('ward')}>
              <Dropdown
                options={wardOptions}
                style={{ width: '100%', borderRadius: '10px' }}
              ></Dropdown>
            </Field>
          </div>
          <div className='col-12' id='width-100-center'>
            <Field name='address' label={t('address')}>
              <InputText type='text' style={{ width: '100%' }} />
            </Field>
          </div>
        </div>
        <div className='grid-form'>
          <div className='col-6' id='width-100-center'>
            <Button
              id='button-detail'
              type='submit'
              severity='secondary'
              raised
              icon='pi pi-pencil'
              iconPos='right'
              label={t('update')}
            />
          </div>
        </div>
      </div>
    </Form>
  )
}

export default Update
