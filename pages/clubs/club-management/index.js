import DataView from '@/components/dataview/DataView'
import Title from '@/components/landing/Title'
import OutstandingEdit from '@/components/management/OutstandingEdit'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useContext, useEffect, useState } from 'react'
import Update from './UpdateClub'
import { Dialog } from 'primereact/dialog'
import { AutoComplete } from 'primereact/autocomplete'
import AddClub from './AddClub'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'
import apiInstance from '@/api/apiInstance'
import Image from 'next/image'
import LocaleHelper from '@/components/locale/LocaleHelper'

const ClubManagement = () => {
  const [clubs, setClubs] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState(false)

  const [visibleChange, setVisibleChange] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [dataClub, setDataClub] = useState({})
  const [index, setIndex] = useState(2)
  const [updateStatus, setUpdateStatus] = useState(false)
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  const { t } = useTranslation('club')

  useEffect(() => {
    if (index === 2) {
      fetchCreatedClubs()
    } else if (index === 3) {
      fetchManageClubs
    } else if (index === 4) {
      fetchJoinedClubs()
    }
  }, [current_page, per_page, visibleChange, visibleAdd, updateStatus, search])

  const fetchCreatedClubs = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/clubs/created-club?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      const data = res.data
      if (res.status === 200) {
        setClubs(data.clubs)
        setTotalRecords(data.total_clubs)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Lỗi', err)
      setLoading(false)
    }
  }
  const fetchManageClubs = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/clubs/manage-club?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      const data = res.data
      if (res.status === 200) {
        setClubs(data.clubs)
        setTotalRecords(data.total_clubs)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Lỗi', err)
      setLoading(false)
    }
  }

  const fetchJoinedClubs = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/clubs/joined-club?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      const data = res.data
      if (res.status === 200) {
        setClubs(data.clubs)
        setTotalRecords(data.total_clubs)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Lỗi', err)
      setLoading(false)
    }
  }

  const fetchDetailClub = async (club_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.get(`/clubs/${club_id}`)
      if (res.status === 200) {
        setDataClub(res.data)
        setVisibleChange(true)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Lỗi', err)
      setLoading(false)
    }
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  const itemTemplate = (item) => {
    return (
      <div id='dataview-container'>
        <div id='image-container-dataview'>
          <Link
            id='link-dataview'
            href={`/clubs/club-management/${item.club_id}`}
          >
            <Image src={item.image} alt={item.name} width={800} height={500} />
          </Link>
          {index == 3 ? null : (
            <OutstandingEdit
              items={items(item.club_id)}
              isOutstanding={item.outstanding}
              id={item.club_id}
              title='câu lạc bộ'
            />
          )}
        </div>
        <Link
          id='link-dataview-container'
          href={`/clubs/club-management/${item.club_id}`}
        >
          <div id='info-dataview'>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.total_member} {t('member-join')}
            </h4>
            <h4>
              <i className='pi pi-map ml2-icon' aria-hidden='true'></i>
              {LocaleHelper.formatNumber(item.total_distance)} Km
            </h4>
          </div>
          <div id='name-dataview'>
            <i class='fa fa-briefcase icon-run' aria-hidden='true'></i>
            <div id='share-register-container'>
              <h4>{item.name}</h4>
              <div id='share-register-content'>
                <Link
                  id='link-dataview'
                  href={`/clubs/club-management/${item.id}`}
                >
                  {t('club-join')}{' '}
                  <i className='pi pi-arrow-right' aria-hidden='true'></i>
                </Link>
                <Link id='link-dataview' href='/share'>
                  {t('share')}{' '}
                  <i className='pi pi-share-alt' aria-hidden='true'></i>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }

  const handleClickEdit = (club_id) => {
    fetchDetailClub(club_id)
  }

  const handleClickDelete = (club_id) => {
    deleteClub(club_id)
  }

  const deleteClub = async (club_id) => {
    setLoading(true)
    try {
      const res = await apiInstance.delete(`/clubs/${club_id}`)
      if (res.status === 200) {
        showToast('success', 'Xóa câu lạc bộ thành công')
        setUpdateStatus(!updateStatus)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', 'Xóa câu lạc bộ thất bại', err)
      setLoading(false)
    }
  }

  const items = (club_id) => [
    {
      label: 'Add',
      icon: 'pi pi-plus',
      command: () => {},
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: () => {
        handleClickEdit(club_id)
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {
        handleClickDelete(club_id)
      },
    },
    {
      label: 'React Website',
      icon: 'pi pi-external-link',
      command: () => {},
    },
  ]

  return (
    <div className='centered-content-dataview'>
      <div id='search-container'>
        <AutoComplete
          value={search_name}
          onChange={(e) => setSearchName(e.target.value)}
          completeMethod={(e) => setSearch(!search)}
          placeholder={t('search')}
        />
      </div>
      <Title
        title={
          index === 3
            ? t('joined-clubs')
            : index === 2
            ? t('created-clubs')
            : null
        }
      />
      <Dialog
        header={t('update-clubs')}
        visible={visibleChange}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleChange(false)}
      >
        <Update
          club_id={dataClub.club_id}
          image={dataClub.image}
          name={dataClub.name}
          description={dataClub.description}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleChange={setVisibleChange}
          setUpdate={setUpdateStatus}
          t={t}
        />
      </Dialog>
      <Dialog
        header={t('new-club')}
        visible={visibleAdd}
        position='top'
        style={{
          width: '60%',
          height: '100%',
          borderRadius: '20px',
          textAlign: 'center',
        }}
        onHide={() => setVisibleAdd(false)}
      >
        <AddClub
          setLoading={setLoading}
          showToast={showToast}
          setVisibleAdd={setVisibleAdd}
          setUpdate={setUpdateStatus}
          t={t}
        />
      </Dialog>
      <div className='centered-content-layout'>
        <div
          style={{
            width: '75%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <Button
            id={index == 1 ? 'button-tab--active' : 'button-tab'}
            type='button'
            style={{ width: '100%' }}
            label={t('new-club')}
            icon='pi pi-plus'
            iconPos='right'
            onClick={() => {
              setIndex(1)
              setVisibleAdd(true)
            }}
          />
          <Button
            id={index == 2 ? 'button-tab--active' : 'button-tab'}
            type='button'
            style={{ width: '100%' }}
            label={t('created-clubs')}
            icon='pi pi-list'
            iconPos='right'
            onClick={() => {
              setIndex(2)
              fetchCreatedClubs()
            }}
          />
          <Button
            id={index == 3 ? 'button-tab--active' : 'button-tab'}
            type='button'
            style={{ width: '100%' }}
            label={t('manage-clubs')}
            icon='pi pi-list'
            iconPos='right'
            onClick={() => {
              setIndex(3)
              fetchManageClubs()
            }}
          />
          <Button
            id={index == 4 ? 'button-tab--active' : 'button-tab'}
            type='button'
            style={{ width: '100%' }}
            label={t('joined-clubs')}
            icon='pi pi-list'
            iconPos='right'
            onClick={() => {
              setIndex(4)
              fetchJoinedClubs()
            }}
          />
        </div>
      </div>
      <DataView
        data={clubs}
        href='/clubs/club-management/'
        itemTemplate={itemTemplate}
      />
      <Paginator
        first={first}
        rows={per_page}
        totalRecords={totalRecords}
        rowsPerPageOptions={[6, 9, 12]}
        onPageChange={onPageChange}
        page={current_page}
      />
    </div>
  )
}

export default ClubManagement
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['club', 'topbar'])),
    },
  }
}
