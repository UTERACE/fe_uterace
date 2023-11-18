import DataView from '@/components/dataview/DataView'
import Title from '@/components/landing/Title'
import OutstandingEdit from '@/components/management/OutstandingEdit'
import store from '@/store/store'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import { AutoComplete } from 'primereact/autocomplete'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import apiInstance from '@/api/apiInstance'
import { Dialog } from 'primereact/dialog'
import Update from './UpdateEvent'
import AddEvent from './AddEvent'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'

const EventManagement = () => {
  const [events, setEvents] = useState([])
  const [dataEvent, setDataEvent] = useState({})
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState(false)

  const [index, setIndex] = useState(2)
  const [visibleChange, setVisibleChange] = useState(false)
  const [visibleAdd, setVisibleAdd] = useState(false)
  const [updateStatus, setUpdateStatus] = useState(false)
  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast
  const router = useRouter()

  const { t } = useTranslation('event')
  const { t: tDetail } = useTranslation('detail')

  const roles = store.getState().auth.roles
  const hasAdminRole = roles ? roles.some((role) => role.roleId === 1) : false

  useEffect(() => {
    if (index === 3) {
      fetchEventsOnGoing()
    } else if (index === 2) {
      fetchEventsCreated()
    }
  }, [
    current_page,
    per_page,
    search,
    index,
    visibleAdd,
    visibleChange,
    updateStatus,
  ])

  const fetchEventsOnGoing = async () => {
    const res = await apiInstance.get(
      `/events?current_page=${current_page}&per_page=${per_page}&ongoing=1&search_name=${search_name}`
    )
    if (res.status === 200) {
      const data = res.data
      setEvents(data.events)
      setTotalRecords(data.total_events)
      setCurrentPage(data.current_page)
      setPerPage(data.per_page)
    }
  }

  const fetchEventsCreated = async () => {
    try {
      const res = await apiInstance.get(
        `/events/created-event?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res.status === 200) {
        const data = res.data
        setEvents(data.events)
        setTotalRecords(data.total_events)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
      }
    } catch (error) {
      showToast('error', 'Lỗi', error)
    }
  }

  const handleClick = (url) => {
    router.push(url)
  }

  const itemTemplate = (item) => {
    return (
      <div id='dataview-container'>
        <div id='image-container-dataview'>
          <Link
            id='link-dataview'
            href={`/events/event-management/${item.event_id}`}
          >
            <img src={item.image} alt={item.name} />
          </Link>
          <OutstandingEdit
            items={items(item.event_id)}
            isOutstanding={item.outstanding}
            id={item.event_id}
            title={'sự kiện'}
          />
        </div>
        <Link
          id='link-dataview-container'
          href={`/events/event-management/${item.event_id}`}
        >
          <div id='info-dataview'>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.total_members} {t('member-join')}
            </h4>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.total_clubs} {t('club-join')}
            </h4>
          </div>
          <div id='name-dataview'>
            <i class='fa fa-briefcase icon-run' aria-hidden='true'></i>
            <div id='share-register-container'>
              <h4>{item.name}</h4>
              <div id='share-register-content'>
                <Link
                  id='link-dataview'
                  href={`/events/event-management/${item.event_id}`}
                >
                  {t('event-join')}{' '}
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

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  const handleClickEdit = (event_id) => {
    fetchDetailEvent(event_id)
  }

  const fetchDetailEvent = async (event_id) => {
    try {
      const res = await apiInstance.get(`/events/${event_id}`)
      if (res.status === 200) {
        const data = res.data
        setDataEvent(data)
        setVisibleChange(true)
      }
    } catch (error) {
      showToast('error', 'Lỗi', error)
    }
  }

  const items = (event_id) => [
    {
      label: 'Add',
      icon: 'pi pi-plus',
      command: () => handleClick('/events/event-new'),
    },
    {
      label: 'Update',
      icon: 'pi pi-pencil',
      command: () => {
        handleClickEdit(event_id)
      },
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {},
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
            ? t('on-going-event')
            : index === 2
            ? t('created-event')
            : null
        }
      />
      <Dialog
        header={t('button_update')}
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
          event_id={dataEvent.event_id}
          image={dataEvent.image}
          name={dataEvent.name}
          description={dataEvent.description}
          start_time={dataEvent.from_date}
          end_time={dataEvent.to_date}
          min_pace={dataEvent.min_pace}
          max_pace={dataEvent.max_pace}
          setLoading={setLoading}
          showToast={showToast}
          setVisibleChange={setVisibleChange}
          setUpdateStatus={setUpdateStatus}
          t={t}
          tDetail={tDetail}
        />
      </Dialog>
      <Dialog
        header={t('new-event')}
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
        <AddEvent
          setLoading={setLoading}
          showToast={showToast}
          setVisibleAdd={setVisibleAdd}
          setUpdateStatus={setUpdateStatus}
          t={t}
          tDetail={tDetail}
        />
      </Dialog>
      <div className='centered-content-layout'>
        {hasAdminRole ? (
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
              label={t('new-event')}
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
              label={t('created-event')}
              icon='pi pi-list'
              iconPos='right'
              onClick={() => {
                setIndex(2)
              }}
            />
            <Button
              id={index == 3 ? 'button-tab--active' : 'button-tab'}
              type='button'
              style={{ width: '100%' }}
              label={t('on-going-event')}
              icon='pi pi-list'
              iconPos='right'
              onClick={() => {
                setIndex(3)
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: '50%',
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              gap: '2rem',
            }}
          >
            <Button
              id={index == 2 ? 'button-tab--active' : 'button-tab'}
              type='button'
              style={{ width: '100%' }}
              label={t('joined-event')}
              icon='pi pi-list'
              iconPos='right'
              onClick={() => {
                setIndex(2)
              }}
            />
            <Button
              id={index == 3 ? 'button-tab--active' : 'button-tab'}
              type='button'
              style={{ width: '100%' }}
              label={t('on-going-event')}
              icon='pi pi-list'
              iconPos='right'
              onClick={() => {
                setIndex(3)
              }}
            />
          </div>
        )}
      </div>
      <DataView
        data={events}
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

export default EventManagement
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['event', 'topbar', 'detail'])),
    },
  }
}
