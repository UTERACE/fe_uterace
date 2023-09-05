import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Avatar } from 'primereact/avatar'
import DataTable from '@/components/datatable/DataTable'
import LocaleHelper from '@/components/locale/LocaleHelper'

const RankMember = ({ value }) => {
  const [loading, setLoading] = useState(false)
  const formatRank = (rowData) => {
    return (
      <div id='member-ranking'>
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
    return (
      <div id='member-info'>
        <Avatar image={rowData.image} size='xlarge' shape='circle' />
        <Link href={`club/detail-club/${rowData.id}`}>
          <span id='member-name'>{rowData.fullname}</span>
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
  const clubsColumns = [
    {
      field: 'ranking',
      header: 'Rank',
      body: formatRank,
      bodyClassName: 'text-center',
      className: 'text-rank',
    },
    {
      header: 'Thành viên',
      body: fullnameWithImageTemplate,
      className: 'text-name',
    },
    {
      field: 'total_distance',
      header: 'Km',
      bodyClassName: 'text-center',
      className: 'text-km',
      body: formatNumber,
    },
    {
      field: 'pace',
      header: 'pace',
      body: formatNumber,
      bodyClassName: 'text-center',
      className: 'text-km',
    },
    {
      field: 'organization',
      header: 'Đơn vị',
      bodyClassName: 'text-center',
      className: 'text-km',
    },
    {
      field: 'gender',
      header: 'Gioi tinh',
      bodyClassName: 'text-center',
      className: '',
    },
  ]

  return (
    <DataTable data={value} rows={4} loading={loading} columns={clubsColumns} />
  )
}
export default RankMember
