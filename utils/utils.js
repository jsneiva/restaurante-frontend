let lastId = 0;

export default {

  arrayRange(start, end) {
    const range = []
    for (let i = start; i <= end; i++) {
      range.push(i)
    }
    return range
  },

  formatCurrency(value) {
    return Number(value).toLocaleString('pt-BR',{
      minimumFractionDigits: 2,
      style: 'currency',
      currency: 'BRL',
    })
  },

  formatInteger(value) {
    return Number(value).toLocaleString('pt-BR',{minimumFractionDigits: 0})
  },

  isString(value) {
    return typeof value === 'string' || value instanceof String;
  },

  generateID(prefix = '_') {
    return `${prefix}${++lastId}`
  },

  stringToDate(value, iso = true) {
    let year, month, day, date = null
    if (typeof value !== 'string' || !value) {
      return null
    }
    if (iso)
      [year, month, day] = value.split('-').map(v => parseInt(v))
    else
      [day, month, year] = value.split('/').map(v => parseInt(v))
  
    if (day && month && year) {
      const d = new Date(year, month-1, day)
      date = (d.getFullYear() === year && 
              d.getMonth() + 1 === month &&
              d.getDate() === day) ? d : date
    }
    return date
  }
 
}