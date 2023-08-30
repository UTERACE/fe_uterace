const isBrowser = typeof window !== "undefined";

let defaultLocale =  'en-US';

if (isBrowser) {
  defaultLocale =  navigator.language || 'en-US';
}

function formatNumber(number, locale = defaultLocale) {
  return new Intl.NumberFormat(locale).format(number);
}

function formatDate(date, locale = defaultLocale) {
  return new Intl.DateTimeFormat(locale).format(date);
}

export default {
  formatNumber,
  formatDate
};