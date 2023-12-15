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
  return formattedPace + ' /km'
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
  return formattedPace + ' /mi'
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
}
