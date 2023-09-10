import { useState, useEffect } from 'react'
import Link from 'next/link'
import LocaleHelper from '@/components/locale/LocaleHelper'
import DataTable from '@/components/datatable/DataTable'
import { Avatar } from 'primereact/avatar'

const RankMember = ({ value }) => {
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
      <Link href={`/user/${rowData.user_id}`}>
        <div id='member-info'>
          <Avatar image={rowData.image} size='xlarge' shape='circle' />
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
      header: 'Hạng',
      body: formatRank,
      bodyClassName: 'text-center',
      className: 'text-rank',
    },
    {
      header: 'Tên thành viên',
      body: fullnameWithImageTemplate,
      className: 'text-name',
    },
    {
      field: 'pace',
      header: 'Pace (km/phút)',
      body: formatNumber,
      bodyClassName: 'text-center',
      className: 'text-km',
    },
    {
      field: 'organization',
      header: 'Cơ quan, tổ chức',
      bodyClassName: 'text-center',
      className: 'text-km',
    },
    {
      field: 'total_distance',
      header: 'Tổng quảng đường',
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
