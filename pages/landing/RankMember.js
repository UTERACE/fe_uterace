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
        {rowData.RANKING === 1 ? (
          <img
            src='https://mobirace.net//Images/no1.png'
            alt='rank1'
            className='customer-rank'
          />
        ) : rowData.RANKING === 2 ? (
          <img
            src='https://mobirace.net//Images/no2.png'
            alt='rank2'
            className='customer-rank'
          />
        ) : rowData.RANKING === 3 ? (
          <img
            src='https://mobirace.net//Images/no3.png'
            alt='rank3'
            className='customer-rank'
          />
        ) : (
          <div>{rowData.RANKING}</div>
        )}
      </div>
    )
  }
  const fullnameWithImageTemplate = (rowData) => {
    return (
      <div id='member-info'>
        <Avatar image={rowData.AVATAR_PATH} size='xlarge' shape='circle' />
        <Link href={`club/detail-club/${rowData.USER_ID}`}>
          <span id='member-name'>{rowData.FULL_NAME}</span>
        </Link>
      </div>
    )
  }
  const formatNumber = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatNumber(rowData.TOTAL_DISTANCE.toFixed(2))
    }
    return ''
  }
  const clubsColumns = [
    {
      field: 'RANKING',
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
      field: 'TOTAL_DISTANCE',
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
