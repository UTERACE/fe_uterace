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
import { useToast } from '@/components/contexts/ToastContext'

const Scoreboard = () => {
  const [scoreboard, setScoreboard] = useState([])
  const [current_page, setCurrentPage] = useState(1)
  const [per_page, setPerPage] = useState(10)
  const [totalRecords, setTotalRecords] = useState(1)
  const [first, setFirst] = useState(0)
  const [activeIndex, setActiveIndex] = useState(1)
  const [month, setMonth] = useState(0)
  const [year, setYear] = useState(2024)
  const [search_name, setSearchName] = useState('')
  const [search, setSearch] = useState(false)

  const setLoading = useContext(LoadingContext)
  const showToast = useToast().showToast

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth() + 1
  const currentYear = currentDate.getFullYear()

  const { t } = useTranslation('scoreboard')

  useEffect(() => {
    if (activeIndex === 1) {
      fetchSearchRankingUser()
    } else {
      fetchSearchRankingClub()
    }
  }, [month, year, search, activeIndex, current_page, per_page])

  const fetchSearchRankingUser = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/scoreboard?ranking=user&month=${month}&year=${year}&current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res.status === 200) {
        setCurrentPage(res.data.current_page)
        setPerPage(res.data.per_page)
        setTotalRecords(res.data.total_user)
        setScoreboard(res.data.ranking_user)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', err)
      setLoading(false)
    }
  }

  const fetchSearchRankingClub = async () => {
    setLoading(true)
    try {
      const res = await apiInstance.get(
        `/scoreboard?ranking=club&month=${month}&year=${year}&current_page=${current_page}&per_page=${per_page}&search_name=${search_name}`
      )
      if (res.status === 200) {
        setCurrentPage(res.data.current_page)
        setPerPage(res.data.per_page)
        setTotalRecords(res.data.total_club)
        setScoreboard(res.data.ranking_club)
        setLoading(false)
      }
    } catch (err) {
      showToast('error', err)
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
            label={t('member')}
            style={{ minWidth: '10rem' }}
            onClick={() => {
              setSearchName('')
              setActiveIndex(1)
            }}
          />
          <Button
            id={activeIndex === 2 ? 'button-tab--active' : 'button-tab'}
            icon='pi pi-chart-line'
            label={t('club')}
            style={{ minWidth: '10rem' }}
            onClick={() => {
              setSearchName('')
              setActiveIndex(2)
            }}
          />
        </div>
        {activeIndex === 1 ? (
          <div>
            <div id='month-button-container'>
              <Button
                id={month === 0 ? 'button-tab-month' : ''}
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
                  setYear(currentYear)
                }}
              />
              <Button
                id={
                  month === (currentMonth === 1 ? 12 : currentMonth - 1)
                    ? 'button-tab-month'
                    : ''
                }
                icon='pi pi-calendar-minus'
                label={`${t('month')} ${
                  currentMonth === 1 ? 12 : currentMonth - 1
                }`}
                onClick={() => {
                  if (currentMonth === 1) {
                    setMonth(12)
                    setYear(currentYear - 1)
                  } else setMonth(currentMonth - 1)
                }}
              />
              <Button
                id={
                  month === (currentMonth === 1 ? 11 : currentMonth - 2)
                    ? 'button-tab-month'
                    : ''
                }
                icon='pi pi-calendar-times'
                label={`${t('month')} ${
                  currentMonth === 1 ? 11 : currentMonth - 2
                }`}
                onClick={() => {
                  if (currentMonth === 1) {
                    setMonth(11)
                    setYear(currentYear - 1)
                  } else setMonth(currentMonth - 2)
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
            <RankMember value={scoreboard} isRankingUser={true}></RankMember>
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
                id={month === 0 ? 'button-tab-month' : ''}
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
                  setYear(currentYear)
                }}
              />
              <Button
                id={
                  month === (currentMonth === 1 ? 12 : currentMonth - 1)
                    ? 'button-tab-month'
                    : ''
                }
                icon='pi pi-calendar-minus'
                label={`${t('month')} ${
                  currentMonth === 1 ? 12 : currentMonth - 1
                }`}
                onClick={() => {
                  if (currentMonth === 1) {
                    setMonth(12)
                    setYear(currentYear - 1)
                  } else setMonth(currentMonth - 1)
                }}
              />
              <Button
                id={
                  month === (currentMonth === 1 ? 11 : currentMonth - 2)
                    ? 'button-tab-month'
                    : ''
                }
                icon='pi pi-calendar-times'
                label={`${t('month')} ${
                  currentMonth === 1 ? 11 : currentMonth - 2
                }`}
                onClick={() => {
                  if (currentMonth === 1) {
                    setMonth(11)
                    setYear(currentYear - 1)
                  } else setMonth(currentMonth - 2)
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
