import { useState } from 'react'
import Link from 'next/link'
import LocaleHelper from '@/components/locale/LocaleHelper'
import DataTable from '@/components/datatable/DataTable'
import { Avatar } from 'primereact/avatar'
import { useTranslation } from 'next-i18next'

const RankClub = ({ value }) => {
  const [loading, setLoading] = useState(false)
  
  const { t } = useTranslation('scoreboard')

  const formatRank = (rowData) => {
    return (
      <div className='customer-info-rank '>
        {rowData.ranking === 1 ? (
          <img
            src='/no1.png'
            alt='rank1'
            className='customer-rank'
          />
        ) : rowData.ranking === 2 ? (
          <img
            src='/no2.png'
            alt='rank2'
            className='customer-rank'
          />
        ) : rowData.ranking === 3 ? (
          <img
            src='/no3.png'
            alt='rank3'
            className='customer-rank'
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
          <Avatar image={rowData.image} size='xlarge' shape='circle' />
          <span id='member-name'>{rowData.name}</span>
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
      loading={loading}
      columns={clubsColumns}
      className='custom-datatable'
    />
  )
}
export default RankClub
