import React, { useEffect, useState } from 'react'

const Countdown = ({ from_date, to_date }) => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  useEffect(() => {
    const startDate = new Date(from_date).getTime()
    const endDate = new Date(to_date).getTime()
    const now = new Date().getTime()

    if (now >= startDate && now <= endDate) {
      const interval = setInterval(() => {
        const distance = endDate - new Date().getTime()

        if (distance <= 0) {
          clearInterval(interval)
          return
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        )
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        setTime({ days, hours, minutes, seconds })
      }, 1000)

      return () => clearInterval(interval)
    }
  }, [])
  function formatNumber(number) {
    return String(number).padStart(2, '0')
  }
  function formatDate(dateString) {
    const date = new Date(dateString)

    const day = String(date.getUTCDate()).padStart(2, '0')
    const month = String(date.getUTCMonth() + 1).padStart(2, '0') // Bởi vì tháng trong JavaScript bắt đầu từ 0
    const year = date.getUTCFullYear()
    const hours = String(date.getUTCHours()).padStart(2, '0')
    const minutes = String(date.getUTCMinutes()).padStart(2, '0')

    return `${hours}:${minutes} ${day}/${month}/${year}`
  }
  return (
    <div id='countdown'>
      <div id='countdown-title'>Thời gian còn lại</div>
      <div id='countdown-container'>
        <div id='countdown-item'>{formatNumber(time.days)} Ngày</div>
        <div id='countdown-item'>{formatNumber(time.hours)} Giờ</div>
        <div id='countdown-item'>{formatNumber(time.minutes)} Phút</div>
        <div id='countdown-item'>{formatNumber(time.seconds)} Giây</div>
      </div>
      <div id='countdown-subtitle'>
        <div>
          <h4 id='text-from-date'>Từ ngày</h4>
        </div>
        <div>
          <h5>{formatDate(from_date)}</h5>
        </div>
        <div>
          <h4>-</h4>
        </div>
        <div>
          <h5>{formatDate(to_date)}</h5>
        </div>
      </div>
    </div>
  )
}

export default Countdown
