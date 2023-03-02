export default {
  stripNonIntegers(value){
    if (value) return value.toString().replace(/[^0-9\.]/g, '')
  },
  formatToDecimal(value, decimalsPlaces = 2) {
    return new Intl.NumberFormat('en-AU', {
      style: 'decimal',
      maximumFractionDigits: decimalsPlaces
    }).format(value)
  },
  formatToPercent(value, decimalsPlaces = 2){
    return new Intl.NumberFormat('en-AU', {
      style: 'percent',
      minimumFractionDigits: decimalsPlaces,
      maximumFractionDigits: decimalsPlaces
    }).format(value / 100)
  },
  formatToMoney(value, decimalsPlaces = 0){
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: decimalsPlaces,
    }).format(value)
  },
  formatWithCommas(value, decimalsPlaces = 0){
    return new Intl.NumberFormat('en-AU', {
      minimumFractionDigits: decimalsPlaces,
      maximumFractionDigits: decimalsPlaces
    }).format(value)
  },
  roundToNearestRounding(num, rounding = 100) {
    return Math.round(num / rounding) * rounding
  },
  singleOrPluralText(value) {
    return value > 1 ? 's' : ''
  },
}