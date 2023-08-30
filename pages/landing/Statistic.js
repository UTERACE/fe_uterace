import React from 'react'
import Title from './Title'
import Detail from './Detail'

const Statistic = ({statistic}) => {
  return (
    <div id='target-wrapper'>
      <Title title='Statistic activities' />
      <div id='target-container'>
        <div id='target-item'>
          <img src='/statistic/run_member.png' alt='member' />
          <span>{statistic.total_member}</span>
          <p>Total member</p>
        </div>
        <div id='target-item' style={{backgroundColor:'#DB2D33', color:'white'}}>
          <img src='/statistic/running.png' alt='running' />
          <span>{statistic.total_distance} km</span>
          <p>Total distance</p>
        </div>
        <div id='target-item'>
          <img src='/statistic/run_club.png' alt='club' />
          <span>{statistic.total_club}</span>
          <p>Total club</p>
        </div>
        <div id='target-item'>
          <img src='/statistic/run_event.png' alt='event' />
          <span>{statistic.total_event}</span>
          <p>Total event</p>
        </div>
      </div>
      <Detail link='/statistic' />
    </div>
  )
}

export default Statistic
