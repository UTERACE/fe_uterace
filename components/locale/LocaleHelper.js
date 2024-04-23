const isBrowser = typeof window !== 'undefined'

let defaultLocale = 'en-US'

if (isBrowser) {
  defaultLocale = navigator.language || 'en-US'
}

function formatNumber(number, locale = defaultLocale) {
  const roundedNumber = Number(number).toFixed(2)
  return new Intl.NumberFormat(locale).format(roundedNumber)
}

function formatDate(date, locale = defaultLocale) {
  return new Intl.DateTimeFormat(locale).format(date)
}

function formatDateTime(date, locale = defaultLocale) {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: 'medium',
      timeStyle: 'medium',
    }).format(date)
  }
  return date
}
function formatDateComment(date, locale = defaultLocale) {
  // 2024-04-21 20:02:42.774
  if (date instanceof Date && !isNaN(date.getTime())) {
    const nowTime = new Date()
    const time = nowTime.getTime() - date.getTime()
    const hours = Math.floor(time / 3600000)
    const minutes = Math.floor((time % 3600000) / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const day = (hours / 24).toFixed(0)
    if (hours > 168) {
      return `${date.getDate()} tháng ${date.getMonth() + 1}`
    } else if (hours > 48) {
      return `${day} ngày trước`
    } else if (hours > 24) {
      return 'Hôm qua'
    } else if (hours > 0) {
      return `${hours} giờ trước`
    } else if (minutes > 0) {
      return `${minutes} phút trước`
    } else {
      return `${seconds} giây trước`
    }
  }
  return date
}

function formatMtoKm(distance, locale = defaultLocale) {
  const distanceInKm = (distance / 1000).toFixed(2)
  return new Intl.NumberFormat(locale).format(distanceInKm)
}

function formatPace(pace, locale = defaultLocale) {
  // return new Intl.NumberFormat(locale).format(pace)
  const minutes = Math.floor(pace)
  const seconds = Math.round((pace % 1) * 60)
  const formattedPace = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`
  return formattedPace
}

function formatKm(distance, locale = defaultLocale) {
  const distanceInKm = distance.toFixed(2)
  return new Intl.NumberFormat(locale).format(distanceInKm) + ' km'
}

function formatKmToMiles(distance, locale = defaultLocale) {
  const distanceInMiles = (distance / 1.609).toFixed(2)
  return new Intl.NumberFormat(locale).format(distanceInMiles) + ' mi'
}

function formatMinutesKmToMilesKm(pace, locale = defaultLocale) {
  const paceInMiles = (pace * 1.609).toFixed(2)
  const minutes = Math.floor(paceInMiles)
  const seconds = Math.round((paceInMiles % 1) * 60)
  const formattedPace = `${String(minutes).padStart(2, '0')}:${String(
    seconds
  ).padStart(2, '0')}`
  return formattedPace
}

export default {
  formatNumber,
  formatDate,
  formatDateTime,
  formatMtoKm,
  formatPace,
  formatKm,
  formatKmToMiles,
  formatMinutesKmToMilesKm,
  formatDateComment,
}
