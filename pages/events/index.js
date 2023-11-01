import apiInstance from '@/api/apiInstance'
import DataView from '@/components/dataview/DataView'
import Title from '@/components/landing/Title'
import Link from 'next/link'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Events = () => {
  const [events, setEvents] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [onGoing, setOnGoing] = useState(true)

  const [activeIndex, setActiveIndex] = useState(1)

  const { t } = useTranslation('event')

  useEffect(() => {
    fetchEvents()
  }, [onGoing, current_page, per_page])

  const fetchEvents = async () => {
    const res = await apiInstance.get(
      `/events?current_page=${current_page}&per_page=${per_page}&ongoing=${onGoing}`
    )
    if (res.status === 200) {
      const data = res.data
      setEvents(data.events)
      setTotalRecords(data.total_events)
      setCurrentPage(data.current_page)
      setPerPage(data.per_page)
    }
  }

  const itemTemplate = (item) => {
    return (
      <Link
        id='link-dataview-container'
        href={`/events/event-detail/${item.event_id}`}
      >
        <div id='dataview-container'>
          <div id='image-container-dataview'>
            <img src={item.image} alt={item.name} />
          </div>
          <div id='info-dataview'>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.member} {t('member-join')}
            </h4>
            <h4>
              <i className='pi pi-users ml2-icon' aria-hidden='true'></i>
              {item.club} {t('club-join')}
            </h4>
          </div>
          <div id='name-dataview'>
            <i class='fa fa-running icon-run' aria-hidden='true'></i>
            <div id='share-register-container'>
              <h4>{item.name}</h4>
              <div id='share-register-content'>
                <Link
                  id='link-dataview'
                  href={`/events/event-detail/${item.event_id}`}
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
        </div>
      </Link>
    )
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  return (
    <div className='centered-content-dataview'>
      <Title
        title={activeIndex === 1 ? t('on-going-event') : t('finished-event')}
      />
      <div className='centered-content-layout'>
        <div
          id='profile-button-container'
          style={{ width: '100%', justifyContent: 'start', gap: '2rem' }}
        >
          <Button
            id={activeIndex === 1 ? 'button-tab--active' : 'button-tab'}
            icon='pi pi-chart-bar'
            label={t('on-going-event')}
            onClick={() => {
              setActiveIndex(1)
              setOnGoing(true)
            }}
          />
          <Button
            id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
            icon='pi pi-chart-line'
            label={t('finished-event')}
            onClick={() => {
              setActiveIndex(2)
              setOnGoing(false)
            }}
          />
        </div>
      </div>
      <DataView
        data={events}
        href='/events/event-detail/'
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

export default Events

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['event', 'topbar'])),
    },
  }
}
