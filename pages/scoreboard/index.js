import React, { useContext, useEffect, useState } from 'react'
import Title from '../../components/landing/Title'
import RankClub from '../landing/RankClub'
import RankMember from './RankMember'
import { Paginator } from 'primereact/paginator'
import { Button } from 'primereact/button'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { LoadingContext } from '@/components/contexts/LoadingContext'
import apiInstance from '@/api/apiInstance'
import { AutoComplete } from 'primereact/autocomplete'

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(10)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [activeIndex, setActiveIndex] = useState(1)
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(2023)
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState(false)
  const [ranking, setRanking] = useState('user')

  const setLoading = useContext(LoadingContext)

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1

  const { t } = useTranslation('scoreboard')

  useEffect(() => {
    fetchRanking()
  }, [month, year, search, ranking, current_page, per_page])

  const fetchRanking = async () => {
    setLoading(true)
    try {
      activeIndex === 1 ? setRanking('user') : setRanking('club')
      const res = await apiInstance.get(
        `/scoreboard?ranking=${ranking}&month=${month}&year=${year}&current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res.status === 200) {
        setCurrentPage(res.data.current_page)
        setPerPage(res.data.per_page)
        activeIndex === 1
          ? setTotalRecords(res.data.total_user)
          : setTotalRecords(res.data.total_club)
        if (activeIndex === 1) {
          setScoreboard(res.data.ranking_user)
        } else {
          setScoreboard(res.data.ranking_club)
        }
        setLoading(false)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const onPageChange = (event) => {
    setFirst(event.first)
    setCurrentPage(event.page + 1)
    setPerPage(event.rows)
  }

  return (
    <div className='centered-content-scoreboard'>
      <Title
        title={
          activeIndex === 1 ? t('scoreboard-member') : t('scoreboard-club')
        }
      />
      <div className='centered-content-layout'>
        <div id='button-header-container'>
          <Button
            id={activeIndex === 1 ? 'button-tab--active' : 'button-tab'}
            icon='pi pi-chart-bar'
            label={t('scoreboard-member')}
            onClick={() => {
              setRanking('user')
              setActiveIndex(1)
              setMonth(0)
            }}
          />
          <Button
            id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
            icon='pi pi-chart-line'
            label={t('scoreboard-club')}
            onClick={() => {
              setRanking('club')
              setActiveIndex(2)
              setMonth(0)
            }}
          />
        </div>
        {activeIndex === 1 ? (
          <div>
            <div id='month-button-container'>
              <Button
                id={month === 1 ? 'button-tab-month' : ''}
                icon='pi pi-chart-bar'
                label={t('total')}
                onClick={() => {
                  setMonth(0)
                }}
              />
              <Button
                id={month === currentMonth ? 'button-tab-month' : ''}
                icon='pi pi-calendar-plus'
                label={`${t('month')} ${currentMonth}`}
                onClick={() => {
                  setMonth(currentMonth)
                  console.log(month)
                }}
              />
              <Button
                id={month === currentMonth - 1 ? 'button-tab-month' : ''}
                icon='pi pi-calendar-minus'
                label={`${t('month')} ${currentMonth - 1}`}
                onClick={() => {
                  setMonth(currentMonth - 1)
                  console.log(month)
                }}
              />
              <Button
                id={month === currentMonth - 2 ? 'button-tab-month' : ''}
                icon='pi pi-calendar-times'
                label={`${t('month')} ${currentMonth - 2}`}
                onClick={() => {
                  setMonth(currentMonth - 2)
                  console.log(month)
                }}
              />
            </div>
            <div id='search-container'>
              <AutoComplete
                value={search_name}
                onChange={(e) => setSearchName(e.target.value)}
                completeMethod={(e) => setSearch(!search)}
                placeholder={t('search_member')}
              />
            </div>
            <RankMember value={scoreboard}></RankMember>
            <Paginator
              first={first}
              rows={per_page}
              totalRecords={totalRecords}
              rowsPerPageOptions={[10, 25, 50]}
              onPageChange={onPageChange}
              page={current_page}
            />
          </div>
        ) : (
          <div>
            <div id='month-button-container'>
              <Button
                id={month === 1 ? 'button-tab-month' : ''}
                icon='pi pi-chart-bar'
                label={t('total')}
                onClick={() => {
                  setMonth(0)
                }}
              />
              <Button
                id={month === currentMonth ? 'button-tab-month' : ''}
                icon='pi pi-calendar-plus'
                label={`${t('month')} ${currentMonth}`}
                onClick={() => {
                  setMonth(currentMonth)
                  console.log(month)
                }}
              />
              <Button
                id={month === currentMonth - 1 ? 'button-tab-month' : ''}
                icon='pi pi-calendar-minus'
                label={`${t('month')} ${currentMonth - 1}`}
                onClick={() => {
                  setMonth(currentMonth - 1)
                  console.log(month)
                }}
              />
              <Button
                id={month === currentMonth - 2 ? 'button-tab-month' : ''}
                icon='pi pi-calendar-times'
                label={`${t('month')} ${currentMonth - 2}`}
                onClick={() => {
                  setMonth(currentMonth - 2)
                  console.log(month)
                }}
              />
            </div>
            <div id='search-container'>
              <AutoComplete
                value={search_name}
                onChange={(e) => setSearchName(e.target.value)}
                completeMethod={(e) => setSearch(!search)}
                placeholder={t('search_club')}
              />
            </div>
            <RankClub value={scoreboard}></RankClub>
            <Paginator
              first={first}
              rows={per_page}
              totalRecords={totalRecords}
              rowsPerPageOptions={[10, 25, 50]}
              onPageChange={onPageChange}
              page={current_page}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Scoreboard
export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['scoreboard', 'topbar'])),
    },
  }
}
