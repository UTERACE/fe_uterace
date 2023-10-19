import { useState, useEffect } from 'react'
import Link from 'next/link'
import LocaleHelper from '@/components/locale/LocaleHelper'
import DataTable from '@/components/datatable/DataTable'
import { Avatar } from 'primereact/avatar'
import { useTranslation } from 'next-i18next'

const RankMember = ({ value }) => {
  const [loading, setLoading] = useState(false)
  const {t}=useTranslation('scoreboard')
  const formatRank = (rowData) => {
    return (
      <div className='customer-info-rank '>
        {rowData.ranking === 1 ? (
          <img
            src='https://mobirace.net//Images/no1.png'
            alt='rank1'
            className='customer-rank'
          />
        ) : rowData.ranking === 2 ? (
          <img
            src='https://mobirace.net//Images/no2.png'
            alt='rank2'
            className='customer-rank'
          />
        ) : rowData.ranking === 3 ? (
          <img
            src='https://mobirace.net//Images/no3.png'
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
    const avatarImage = rowData.image
    const avatarLabel = rowData.first_name
      ? rowData.first_name[0].toUpperCase()
      : 'B'
    return (
      <Link href={`/user/${rowData.user_id}`}>
        <div id='member-info'>
          <Avatar
            label={!avatarImage ? avatarLabel : null}
            image={avatarImage}
            size='xlarge'
            shape='circle'
          />
          <span id='member-name'>
            {rowData.last_name + ' ' + rowData.first_name}
          </span>
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
      className: 'text-rank',
    },
    {
      header: t('member-name'),
      body: fullnameWithImageTemplate,
      className: 'text-name',
    },
    {
      field: 'pace',
      header: t('pace'),
      body: formatNumber,
      bodyClassName: 'text-center',
      className: 'text-km',
    },
    {
      field: 'organization',
      header: t('organization'),
      bodyClassName: 'text-center',
      className: 'text-km',
    },
    {
      field: 'total_distance',
      header: t('total-distance'),
      bodyClassName: 'text-center',
      className: 'text-km',
      body: formatNumber,
    },
  ]

  return (
    <DataTable data={value} rows={4} loading={loading} columns={clubsColumns} />
  )
}
export default RankMember
