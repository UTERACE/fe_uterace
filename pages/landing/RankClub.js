import { useState, useEffect } from 'react'
import Link from 'next/link'
import LocaleHelper from '@/components/locale/LocaleHelper'
import DataTable from '@/components/datatable/DataTable'
import { Avatar } from 'primereact/avatar'

const RankClub = ({ value }) => {
  const [loading, setLoading] = useState(false)
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
      header: 'Hạng',
      body: formatRank,
      bodyClassName: 'text-center',
      className: 'text-rank',
    },
    {
      header: 'Tên câu lạc bộ',
      body: fullnameWithImageTemplate,
      className: 'text-name',
    },
    {
      field: 'total_distance',
      header: 'Tổng quảng đường (km)',
      body: formatNumber,
      bodyClassName: 'text-center',
      className: 'text-km',
    },
    {
      field: 'total_members',
      header: 'Tổng thành viên',
      bodyClassName: 'text-center',
      className: 'text-km',
    },
    {
      field: 'total_activities',
      header: 'Tổng hoạt động',
      bodyClassName: 'text-center',
      className: 'text-km',
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
