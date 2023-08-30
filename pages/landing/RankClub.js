import { useState, useEffect } from 'react'
import Link from 'next/link'
import LocaleHelper from '@/components/locale/LocaleHelper'
import DataTable from '@/components/datatable/DataTable'
import { Avatar } from 'primereact/avatar'
import Title from './Title'
import Detail from './Detail'

const RankClub = ({ value }) => {
  const [loading, setLoading] = useState(false)
  const formatRank = (rowData) => {
    return (
      <div className='customer-info-rank '>
        {rowData.CLUB_RANKING === 1 ? (
          <img
            src='https://mobirace.net//Images/no1.png'
            alt='rank1'
            className='customer-rank'
          />
        ) : rowData.CLUB_RANKING === 2 ? (
          <img
            src='https://mobirace.net//Images/no2.png'
            alt='rank2'
            className='customer-rank'
          />
        ) : rowData.CLUB_RANKING === 3 ? (
          <img
            src='https://mobirace.net//Images/no3.png'
            alt='rank3'
            className='customer-rank'
          />
        ) : (
          <div>{rowData.CLUB_RANKING}</div>
        )}
      </div>
    )
  }
  const fullnameWithImageTemplate = (rowData) => {
    return (
      <div className='customer-info'>
        <Avatar image={rowData.PICTURE_PATH} size='xlarge' shape='circle' />
        <Link href={`club/detail-club/${rowData.CLUB_ID}`}>
          <span className='customer-name'>{rowData.CLUB_NAME}</span>
        </Link>
      </div>
    )
  }
  const formatNumber = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatNumber(rowData.CLUB_TOTAL_DISTANCE.toFixed(2))
    }
    return ''
  }
  const clubsColumns = [
    {
      field: 'CLUB_RANKING',
      header: 'Rank',
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
      field: 'CLUB_TOTAL_DISTANCE',
      header: 'Km',
      body: formatNumber,
      bodyClassName: 'text-center',
      className: 'text-km',
    },
    {
      field: 'total_member',
      header: 'Tổng thành viên',
      bodyClassName: 'text-center',
      className: 'text-km',
    },
    {
      field: 'admin_name',
      header: 'Admin',
      bodyClassName: 'text-center',
      className: 'text-km',
    },
  ]

  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: "url('/bg1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Title title='Ranking club' />
      <div className='centered-content-layout'>
        <DataTable
          data={value}
          rows={4}
          loading={loading}
          columns={clubsColumns}
          className='custom-datatable'
        />
      </div>
      <Detail link='/club' />
    </div>
  )
}
export default RankClub
