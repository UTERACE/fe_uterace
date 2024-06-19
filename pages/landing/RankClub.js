import Link from 'next/link'
import LocaleHelper from '@/components/locale/LocaleHelper'
import DataTable from '@/components/datatable/DataTable'
import { useTranslation } from 'next-i18next'
import React from 'react'
import Image from 'next/image'

const RankClub = ({ value, isMobile = false }) => {
  const { t } = useTranslation('scoreboard')

  const formatRank = (rowData) => {
    return (
      <div className='customer-info-rank '>
        {rowData.ranking === 1 ? (
          <Image
            src='/no1.png'
            alt='rank1'
            className='customer-rank'
            width={20}
            height={20}
          />
        ) : rowData.ranking === 2 ? (
          <Image
            src='/no2.png'
            alt='rank2'
            className='customer-rank'
            width={20}
            height={20}
          />
        ) : rowData.ranking === 3 ? (
          <Image
            src='/no3.png'
            alt='rank3'
            className='customer-rank'
            width={20}
            height={20}
          />
        ) : (
          <div>{rowData.ranking}</div>
        )}
      </div>
    )
  }

  const fullnameWithImageTemplate = (rowData) => {
    return (
      <Link href={`clubs/club-detail/${rowData.club_id}`}>
        <div id='member-info'>
          <Image
            src={rowData.image ? rowData.image : '/logoclub.png'}
            width={isMobile ? 50 : 80}
            height={isMobile ? 50 : 80}
            alt='avatar'
          />
          <div id='member-name-container'>
            <span id='member-name'>{rowData.name}</span>
          </div>
        </div>
      </Link>
    )
  }

  const formatNumber = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatNumber(rowData.total_distance.toFixed(2))
    }
    return ''
  }

  const clubsColumns = [
    {
      field: 'ranking',
      header: t('rank'),
      body: formatRank,
      bodyClassName: 'text-center',
    },
    {
      header: t('club-name'),
      body: fullnameWithImageTemplate,
    },
    {
      field: 'total_distance',
      header: t('total-distance'),
      body: formatNumber,
      bodyClassName: 'text-center',
    },
    {
      field: 'total_members',
      header: t('total-members'),
      bodyClassName: 'text-center',
    },
    {
      field: 'total_activities',
      header: t('total-activities'),
      bodyClassName: 'text-center',
    },
  ]

  return (
    <DataTable
      data={value}
      rows={4}
      columns={clubsColumns}
      className='custom-datatable'
    />
  )
}
export default RankClub
