import { useState, useEffect } from 'react'
import Link from 'next/link'
import DataTable from '@/components/datatable/DataTable'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'

const RankMember = ({ value }) => {
  const [loading, setLoading] = useState(false)
  const [rankMember, setRankMember] = useState(value)
  const [isMobile, setIsMobile] = useState(false)

  const { t } = useTranslation('scoreboard')

  useEffect(() => {
    setLoading(true)
    setRankMember(value)
    setLoading(false)
  }, [value])

  useEffect(() => {
    //responsive window
    if (window.innerHeight > window.innerWidth) {
      setIsMobile(true)
    }
  }, [])

  const formatRank = (rowData) => {
    return (
      <div id='member-ranking'>
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
    const avatarImage = rowData.image ? rowData.image : '/default-avatar.png'
    return (
      <Link href={`/user/${rowData.user_id}`}>
        <div id='member-info'>
          <Image src={avatarImage} width={80} height={80} alt='avatar' />
          <div id='member-name-container'>
            <span id='member-name'>
              {rowData.last_name + ' ' + rowData.first_name}
            </span>
          </div>
        </div>
      </Link>
    )
  }

  const formatPace = (rowData) => {
    if (rowData) {
      return LocaleHelper.formatPace(rowData.pace)
    }
    return ''
  }

  const formatNumberKm = (rowData) => {
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
      body: formatNumberKm,
    },
    {
      field: 'pace',
      header: t('pace'),
      body: formatPace,
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

  const memberResponsiveMobile = [
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
      body: formatNumberKm,
    },
    {
      field: 'pace',
      header: t('pace'),
      body: formatPace,
      bodyClassName: 'text-center',
    },
    {
      field: 'organization',
      header: t('organization'),
      bodyClassName: 'text-center',
    },
  ]

  return (
    <DataTable
      data={rankMember}
      rows={4}
      loading={loading}
      columns={isMobile ? memberResponsiveMobile : memberColumns}
    />
  )
}
export default RankMember
