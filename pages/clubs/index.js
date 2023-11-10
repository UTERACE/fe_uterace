import React, { useContext, useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import { AutoComplete } from 'primereact/autocomplete'
import Title from '../../components/landing/Title'
import DataView from '@/components/dataview/DataView'
import apiInstance from '@/api/apiInstance'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import { useToast } from '@/components/contexts/ToastContext'

const Clubs = () => {
  const [clubs, setClubs] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(6)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState(false)

  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  const { t } = useTranslation('club')

  useEffect(() => {
    fetchClubs()
  }, [current_page, per_page, search])

  const fetchClubs = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/clubs?current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res.status == 200) {
        const data = res.data
        setClubs(data.clubs)
        setTotalRecords(data.total_clubs)
        setCurrentPage(data.current_page)
        setPerPage(data.per_page)
        setLoading(false)
      }
    } catch (error) {
      showToast('error', t('get_club_fail'), error)
      setLoading(false)
    }
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

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
