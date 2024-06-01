import { useState, useEffect } from 'react'
import Link from 'next/link'
import DataTable from '@/components/datatable/DataTable'
import LocaleHelper from '@/components/locale/LocaleHelper'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { Button } from 'primereact/button'
import apiInstance from '@/api/apiInstance'

const RankMemberClub = ({ value, isRankingUser = false }) => {
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const { t } = useTranslation('scoreboard')

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

  const formatOrganization = (rowData) => {
    if (rowData.organization) {
      return rowData.organization
    }
    return 'Cá nhân, tự do'
  }

  const formatDate = (rowData) => {
    if (rowData.join_date) {
      return LocaleHelper.formatDate(new Date(rowData.join_date))
    }
    return ''
  }

  const handelDelete = async (rowData) => {
    setLoading(true)
    try {
      const res = await apiInstance.delete(
        `/clubs/${rowData.club_id}/members/${rowData.member_id}`
      )
      if (res.status === 200) {
        fetchMembers()
        showToast('success', 'Xóa thành viên thành công')
      }
    } catch (error) {
      showToast('error', 'Xóa thành viên thất bại', error)
    }
    setLoading(false)
  }
  const actionDelete = (rowData) => {
    return (
      <Button
        icon='pi pi-trash'
        className='p-button-danger'
        onClick={() => onDelete(rowData)}
      />
    )
  }

  const rankingUserColumns = [
    {
      field: 'ranking',
      header: t('rank'),
      body: formatRank,
      bodyClassName: 'text-center',
    },
    {
      header: t('member-name'),
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
      body: formatOrganization,
    },
    {
      field: 'gender',
      header: t('gender'),
      bodyClassName: 'text-center',
    },
  ]

  const memberColumns = [
    {
      field: 'ranking',
      header: t('rank'),
      body: formatRank,
      bodyClassName: 'text-center',
    },
    {
      header: t('member-name'),
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
      body: formatOrganization,
    },
    {
      field: 'gender',
      header: t('gender'),
      bodyClassName: 'text-center',
    },
    {
      field: 'join_date',
      header: t('join-date'),
      bodyClassName: 'text-center',
      body: formatDate,
    },
    {
      field: 'member_id',
      header: t('action'),
      bodyClassName: 'text-center',
      body: actionDelete,
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
      header: t('mobile_distance'),
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
      field: 'join_date',
      header: t('join-date'),
      bodyClassName: 'text-center',
      body: formatDate,
    },
  ]

  const scoreboardResponsiveMobile = [
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
      header: t('mobile_distance'),
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
      header: t('mobile_org'),
      bodyClassName: 'text-center',
      body: formatOrganization,
    },
  ]

  return (
    <DataTable
      data={value}
      rows={4}
      loading={loading}
      columns={
        isMobile && isRankingUser
          ? scoreboardResponsiveMobile
          : isMobile && !isRankingUser
          ? memberResponsiveMobile
          : !isMobile && isRankingUser
          ? rankingUserColumns
          : memberColumns
      }
    />
  )
}
export default RankMemberClub
