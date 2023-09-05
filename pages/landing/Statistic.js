import React from 'react'
import Title from '../../components/landing/Title'
import Detail from '@/components/landing/Detail'
import LocaleHelper from '@/components/locale/LocaleHelper'

const Statistic = ({ statistic }) => {
  return (
    <div id='target-wrapper'>
      <Title title='Thống kê cộng đồng ' />
      <div id='target-container'>
        <div id='target-item'>
          <img src='/statistic/run_member.png' alt='member' />
          <span>{LocaleHelper.formatNumber(statistic.total_member)}</span>
          <p>Tổng thành viên</p>
        </div>
        <div
          id='target-item'
          style={{ backgroundColor: '#DB2D33', color: 'white' }}
        >
          <img src='/statistic/running.png' alt='running' />
          <span>{LocaleHelper.formatNumber(statistic.total_distance)} km</span>
          <p>Tổng quảng đường</p>
        </div>
        <div id='target-item'>
          <img src='/statistic/run_club.png' alt='club' />
          <span>{LocaleHelper.formatNumber(statistic.total_club)}</span>
          <p>Tổng câu lạc bộ</p>
        </div>
        <div id='target-item'>
          <img src='/statistic/run_event.png' alt='event' />
          <span>{LocaleHelper.formatNumber(statistic.total_event)}</span>
          <p>Tổng sự kiện giải chạy </p>
        </div>
      </div>
      <Detail link='/statistic' />
    </div>
  )
}

export default Statistic
