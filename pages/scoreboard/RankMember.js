import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Avatar } from 'primereact/avatar'
import DataTable from '@/components/datatable/DataTable'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { useTranslation } from 'next-i18next'

const RankMember = ({ value }) => {
  const [loading, setLoading] = useState(false)
  const [rankMember, setRankMember] = useState(value)
  
  const { t } = useTranslation('scoreboard')

  useEffect(() => {
    setLoading(true)
    setRankMember(value)
    setLoading(false)
  }, [value])

  const formatRank = (rowData) => {
    return (
      <div id='member-ranking'>
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
    const avatarImage = rowData.image
    const avatarLabel = rowData.first_name
      ? rowData.first_name[0].toUpperCase()
      : 'B'
    return (
      <div id='member-info'>
        <Avatar
          label={!avatarImage ? avatarLabel : null}
          image={avatarImage}
          size='xlarge'
          shape='circle'
        />
        <Link href={`club/detail-club/${rowData.id}`}>
          <span id='member-name'>
            {rowData.last_name + ' ' + rowData.first_name}
          </span>
        </Link>
      </div>
    )
  }

  const formatNumber = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatNumber(rowData.total_distance.toFixed(2))
    }
    return ''
  }

  const memberColumns = [
    {
      field: 'ranking',
      header: t('rank'),
      body: formatRank,
      bodyClassName: 'text-center',
    },
    {
      header: t('member'),
      body: fullnameWithImageTemplate,
    },
    {
      field: 'total_distance',
      header: t('total-distance'),
      bodyClassName: 'text-center',
      body: formatNumber,
    },
    {
      field: 'pace',
      header: t('pace'),
      body: formatNumber,
      bodyClassName: 'text-center',
    },
    {
      field: 'organization',
      header: t('organization'),
      bodyClassName: 'text-center',
    },
    {
      field: 'gender',
      header: t('gender'),
      bodyClassName: 'text-center',
    },
  ]

  return (
    <DataTable
      data={rankMember}
      rows={4}
      loading={loading}
      columns={memberColumns}
    />
  )
}
export default RankMember
