import React, { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import Title from '../../components/landing/Title'
import DataView from '@/components/dataview/DataView'
import apiInstance from '@/api/apiInstance'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Clubs = () => {
  const [clubs, setClubs] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)

  const { t } = useTranslation('club')

  useEffect(() => {
    fetchClubs()
  }, [current_page, per_page])
  
  const fetchClubs = async () => {
    const res = await apiInstance.get(
      `/clubs?current_page=${current_page}&per_page=${per_page}`
    )
    if (res.status == 200) {
      const data = res.data
      setClubs(data.clubs)
      setTotalRecords(data.total_clubs)
      setCurrentPage(data.current_page)
      setPerPage(data.per_page)
    }
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  return (
    <div className='centered-content-dataview'>
      <Title title={t('all-clubs')} />
      <DataView data={clubs} href='/clubs/club-detail/' />
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

export default Clubs
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['club', 'topbar'])),
    },
  }
}
