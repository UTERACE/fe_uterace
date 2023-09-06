import Title from '@/components/landing/Title'
import News from '@/pages/landing/News'
import Activity from '@/pages/profile/Activity'
import RankMember from '@/pages/scoreboard/RankMember'
import { useRouter } from 'next/router'
import { Button } from 'primereact/button'
import { Paginator } from 'primereact/paginator'
import React, { useState } from 'react'

const NewsDetail = () => {
  const router = useRouter()
  const { id } = router.query

  const data = {}

  return (
    <div
      className='centered-content-full'
      style={{
        backgroundColor: '#ffffff',
      }}
    >
      <div className='centered-content-layout'>
        <div id='news-detail-container'></div>
      </div>
    </div>
  )
}

export default NewsDetail
